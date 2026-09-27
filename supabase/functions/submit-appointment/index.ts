import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const allowedOrigins = [
  'https://saq.pro.bd',
  'http://localhost:3000',
  'http://localhost:3001',
  'capacitor://localhost',
  'http://localhost'
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
    const body = await req.json();

    const { fullName, phone, whatsapp, date, time, type, problem, client } = body;

    if (!fullName || !fullName.trim()) {
      return new Response(JSON.stringify({ error: 'নাম প্রদান করা হয়নি।' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    if (!phone || !phone.trim() || phone.length < 11) {
      return new Response(JSON.stringify({ error: 'সঠিক মোবাইল নম্বর প্রদান করুন।' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    if (!date || !time) {
      return new Response(JSON.stringify({ error: 'তারিখ এবং সময় প্রদান করা হয়নি।' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    if (!problem || !problem.trim()) {
      return new Response(JSON.stringify({ error: 'সমস্যা বা কারণ উল্লেখ করা হয়নি।' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const now = new Date();
    const yy = String(now.getFullYear()).slice(2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let suffix = '';
    for (let i = 0; i < 3; i++) {
      suffix += chars.charAt(Math.floor(Math.random() * chars.length));
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
    
    if (client) {
      if (client === 'website') {
        source = 'Website';
      } else if (client === 'app') {
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

    const rowData = [
      submissionId,
      submittedAt,
      fullName.trim(),
      phone.trim(),
      whatsapp ? whatsapp.trim() : '',
      problem.trim(),
      date,
      time,
      status,
      source
    ];

    const spreadsheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Appointments:append?valueInputOption=USER_ENTERED`;

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
