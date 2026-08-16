-- Fix: Add missing SELECT policy for Admins on articles table
-- This allows admins to view draft and archived articles in the CMS Dashboard.

CREATE POLICY "Admins can select all articles"
ON public.articles
FOR SELECT
USING ( (SELECT public.is_admin()) );
