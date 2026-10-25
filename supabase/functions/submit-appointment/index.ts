import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const allowedOrigins = [
  'https://saq.pro.bd',
  'http://localhost:3000',
  'http://localhost:3001',
  'capacitor://localhost',
  'http://localhost'
];

// Best-effort per-IP rate limit (in-memory; Deno isolates may reset it, so this
// is a spam brake, not a guarantee). Website client only — the mobile app
// client must never be throttled by a website-only rule.
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;

function badRequest(corsHeaders: Record<string, string>, message: string, status = 400) {
  return new Response(JSON.stringify({ error: message }), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}

// Dhaka date (YYYY-MM-DD). Bangladesh has no DST, so UTC+6 arithmetic is exact.
function dhakaToday(): string {
  return new Date(Date.now() + 6 * 3600 * 1000).toISOString().slice(0, 10);
}

const BD_PHONE = /^(?:\+8801|01)[3-9]\d{8}$/;
const WEBSITE_TIME_SLOTS = [
  '10:00 AM - 12:00 PM',
  '03:00 PM - 05:00 PM',
  '06:00 PM - 08:00 PM',
];

serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = {
    'Access-Control-Allow-Origin': origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Body size cap: a real appointment payload is well under 16 KB.
    const rawBody = await req.text();
    if (rawBody.length > 16 * 1024) {
      return badRequest(corsHeaders, 'অনুরোধটি অনেক বড়। আবার চেষ্টা করুন।', 413);
    }
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return badRequest(corsHeaders, 'ভুল ফরম্যাটের অনুরোধ।');
    }

    const { fullName, phone, whatsapp, date, time, type, problem, client } = body as {
      fullName?: unknown; phone?: unknown; whatsapp?: unknown; date?: unknown;
      time?: unknown; type?: unknown; problem?: unknown; client?: unknown;
    };
    const clientValue = typeof client === 'string' ? client : undefined;
    const isWebsite = clientValue === 'website';

    // Website-only spam brakes: honeypot + minimum submit time. The app
    // client does not send these fields, so it is never blocked by them.
    if (isWebsite) {
      const honeypot = (body as Record<string, unknown>)._honeypot;
      if (typeof honeypot === 'string' && honeypot.trim() !== '') {
        return badRequest(corsHeaders, 'অনুরোধটি গ্রহণ করা যায়নি। আবার চেষ্টা করুন।');
      }
      const startedAt = (body as Record<string, unknown>)._startedAt;
      if (typeof startedAt === 'number' && Date.now() - startedAt < 3000) {
        return badRequest(corsHeaders, 'অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।');
      }
      const forwarded = req.headers.get('x-forwarded-for');
      const ip = (forwarded ? forwarded.split(',')[0].trim() : '') || req.headers.get('cf-connecting-ip') || 'unknown';
      const nowMs = Date.now();
      const entry = rateLimit.get(ip);
      if (entry && nowMs < entry.resetAt) {
        if (entry.count >= RATE_MAX) {
          return badRequest(corsHeaders, 'অনেকবার চেষ্টা করা হয়েছে। এক মিনিট পর আবার চেষ্টা করুন।', 429);
        }
        entry.count += 1;
      } else {
        rateLimit.set(ip, { count: 1, resetAt: nowMs + RATE_WINDOW_MS });
      }
    }

    // Server validation mirrors the website form (previously only presence
    // + phone length < 11 were checked, so the client rules were bypassable).
    const name = typeof fullName === 'string' ? fullName.trim() : '';
    const phoneStr = typeof phone === 'string' ? phone.trim() : '';
    const whatsappStr = typeof whatsapp === 'string' ? whatsapp.trim() : '';
    const problemStr = typeof problem === 'string' ? problem.trim() : '';
    const dateStr = typeof date === 'string' ? date.trim() : '';
    const timeStr = typeof time === 'string' ? time.trim() : '';

    if (!name || name.length < 2 || name.length > 100) {
      return badRequest(corsHeaders, 'সঠিক নাম প্রদান করুন।');
    }
    if (!BD_PHONE.test(phoneStr)) {
      return badRequest(corsHeaders, 'সঠিক মোবাইল নম্বর প্রদান করুন।');
    }
    if (whatsappStr && !BD_PHONE.test(whatsappStr)) {
      return badRequest(corsHeaders, 'সঠিক হোয়াটসঅ্যাপ নম্বর প্রদান করুন।');
    }
    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr) || dateStr < dhakaToday()) {
      return badRequest(corsHeaders, 'আজ বা পরের কোনো তারিখ নির্বাচন করুন।');
    }
    if (!timeStr) {
      return badRequest(corsHeaders, 'তারিখ এবং সময় প্রদান করা হয়নি।');
    }
    if (isWebsite && !WEBSITE_TIME_SLOTS.includes(timeStr)) {
      return badRequest(corsHeaders, 'সঠিক সময় স্লট নির্বাচন করুন।');
    }
    if (!problemStr || problemStr.length < 10 || problemStr.length > 2000) {
      return badRequest(corsHeaders, 'সমস্যার বিবরণ কমপক্ষে ১০ অক্ষরের হতে হবে।');
    }

    const now = new Date();
    const yy = String(now.getFullYear()).slice(2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    
    // 6-character suffix (was 3 = only 46,656/day, no uniqueness check).
    // Prefix/format unchanged, so the Sheet column and any reader of
    // APT-YYMMDD-* IDs keep working; collisions become negligible.
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let suffix = '';
    try {
      const bytes = new Uint8Array(6);
      crypto.getRandomValues(bytes);
      for (let i = 0; i < bytes.length; i++) suffix += chars.charAt(bytes[i] % chars.length);
    } catch {
      for (let i = 0; i < 6; i++) {
        suffix += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }
    const submissionId = `APT-${yy}${mm}${dd}-${suffix}`;

    const yyyy = now.getFullYear();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strTime = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
    const submittedAt = `${dd}-${mm}-${yyyy} ${strTime}`;

    const status = 'Pending';
    let source = 'App';
    
    if (clientValue) {
      if (clientValue === 'website') {
        source = 'Website';
      } else if (clientValue === 'app') {
        source = 'App';
      } else {
        return new Response(JSON.stringify({ error: 'Invalid client identifier.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
    }

    const clientEmail = Deno.env.get('GOOGLE_CLIENT_EMAIL');
    const privateKey = Deno.env.get('GOOGLE_PRIVATE_KEY')?.replace(/\\n/g, '\n');
    const sheetId = Deno.env.get('GOOGLE_SHEET_ID');

    if (!clientEmail || !privateKey || !sheetId) {
      console.error('Server configuration error: Google credentials missing.');
      return new Response(JSON.stringify({ error: 'সার্ভার কনফিগারেশন ত্রুটি। কিছুক্ষণ পর আবার চেষ্টা করুন।' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    let accessToken: string;
    try {
      const now = Math.floor(Date.now() / 1000);
      const expiry = now + 3600;
      
      const header = { alg: 'RS256', typ: 'JWT' };
      const claim = {
        iss: clientEmail,
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        aud: 'https://oauth2.googleapis.com/token',
        exp: expiry,
        iat: now,
      };

      const encoder = new TextEncoder();
      const headerB64 = btoa(JSON.stringify(header)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      const claimB64 = btoa(JSON.stringify(claim)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      const unsignedToken = `${headerB64}.${claimB64}`;

      const pemBody = privateKey
        .replace(/-----BEGIN PRIVATE KEY-----/, '')
        .replace(/-----END PRIVATE KEY-----/, '')
        .replace(/\s/g, '');
      
      const binaryKey = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

      const cryptoKey = await crypto.subtle.importKey(
        'pkcs8',
        binaryKey,
        {
          name: 'RSASSA-PKCS1-v1_5',
          hash: 'SHA-256',
        },
        false,
        ['sign']
      );

      const signature = await crypto.subtle.sign(
        'RSASSA-PKCS1-v1_5',
        cryptoKey,
        encoder.encode(unsignedToken)
      );

      const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
      
      const jwt = `${unsignedToken}.${signatureB64}`;

      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
      });

      const tokenResult = await tokenResponse.json();
      
      if (!tokenResponse.ok || !tokenResult.access_token) {
        console.error('Google Auth Error:', tokenResult.error || 'Failed to obtain access token');
        return new Response(JSON.stringify({ error: 'সার্ভার প্রমাণীকরণ ত্রুটি। কিছুক্ষণ পর আবার চেষ্টা করুন।' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      accessToken = tokenResult.access_token;
    } catch (authError: any) {
      console.error('Google Auth Exception:', authError.message);
      return new Response(JSON.stringify({ error: 'সার্ভার প্রমাণীকরণ ত্রুটি। কিছুক্ষণ পর আবার চেষ্টা করুন।' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // Column order unchanged — the Sheet and the app keep reading the same
    // columns. Only the write mode changed: RAW stores values exactly as
    // typed, so a problem starting with =, +, - or @ can no longer run as
    // a Sheet formula, and phone numbers keep their leading 0.
    const rowData = [
      submissionId,
      submittedAt,
      name,
      phoneStr,
      whatsappStr,
      problemStr,
      dateStr,
      timeStr,
      status,
      source
    ];

    const spreadsheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Appointments:append?valueInputOption=RAW`;

    let response: Response;
    try {
      response = await fetch(spreadsheetUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [rowData],
        }),
      });
    } catch (networkError: any) {
      console.error('Google Sheets network error:', networkError.message);
      return new Response(JSON.stringify({ error: 'ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন অথবা কিছুক্ষণ পর আবার চেষ্টা করুন।' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    let result: any = {};
    try {
      result = await response.json();
    } catch (parseError) {
      console.error('Google Sheets response parse error:', parseError);
      return new Response(JSON.stringify({ error: 'ডেটা সংরক্ষণ করা যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    if (!response.ok) {
      console.error('Google Sheets API Error:', result.error?.message || result.error || response.statusText);
      return new Response(JSON.stringify({ error: 'ডেটা সংরক্ষণ করা যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response(
      JSON.stringify({
        success: true,
        appointmentId: submissionId,
        message: 'আপনার অ্যাপয়েন্টমেন্ট সফলভাবে গ্রহণ করা হয়েছে।'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Edge Function Request Error:', error.message);
    return new Response(
      JSON.stringify({ error: 'ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন অথবা কিছুক্ষণ পর আবার চেষ্টা করুন।' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
