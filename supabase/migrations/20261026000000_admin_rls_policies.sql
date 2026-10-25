-- REVIEW BEFORE APPLYING IN THE SUPABASE DASHBOARD.
-- This file is a prepared fix for the audit finding that admin security
-- depends on Supabase RLS policies which were not in the repo.
-- It does NOT change the live database by itself: apply it only after
-- verifying the live tables/columns match the code (admin_users:
-- user_id, role, is_active; articles and content_categories as used
-- by the website and app CMS). After applying, prove it with an
-- unauthenticated anon-key query (expect 0 rows for drafts / 401
-- for writes) and a non-admin login (expect no admin access).

-- is_admin(): mirrors src/lib/auth/requireAdmin.ts exactly.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid()
      AND is_active = true
      AND role = 'admin'
  );
$$;

-- Articles: public may read published articles only (the blog);
-- admins may read/write everything.
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published articles"
ON public.articles FOR SELECT
USING (status = 'published');

CREATE POLICY "Admins can insert articles"
ON public.articles FOR INSERT
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update articles"
ON public.articles FOR UPDATE
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete articles"
ON public.articles FOR DELETE
USING (public.is_admin());

-- Categories: public may read active categories; admins manage all.
ALTER TABLE public.content_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active categories"
ON public.content_categories FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage categories"
ON public.content_categories FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Admin users: a user may read their own row (required by
-- requireAdmin), admins may read all rows. No public write.
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own admin row"
ON public.admin_users FOR SELECT
USING (user_id = auth.uid() OR public.is_admin());

-- CMS images bucket: public read, admin write only.
CREATE POLICY "Public can read cms images"
ON storage.objects FOR SELECT
USING (bucket_id = 'cms-images');

CREATE POLICY "Admins can upload cms images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'cms-images' AND public.is_admin());

CREATE POLICY "Admins can update cms images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'cms-images' AND public.is_admin())
WITH CHECK (bucket_id = 'cms-images' AND public.is_admin());

CREATE POLICY "Admins can delete cms images"
ON storage.objects FOR DELETE
USING (bucket_id = 'cms-images' AND public.is_admin());
