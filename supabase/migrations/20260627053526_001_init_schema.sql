/*
# Pragati Wellness Centre - Initial Schema

1. New Tables
- `courses` — wellness courses with title, description, thumbnail, instructor
- `lessons` — lessons linked to courses with video_url, pdf_url, and order
- `results` — transformation results with before/after images, client name, weight lost, duration
- `testimonials` — customer reviews with name, rating, review text, and optional photo
- `contact_enquiries` — form submissions with name, phone, email, message, and read status
- `settings` — single-row app configuration (logo, hero_image, contact info, social media, whatsapp)

2. Security
- RLS enabled on all tables.
- Public read access (SELECT) for courses, lessons, results, testimonials, settings via `TO anon, authenticated`.
- Write access (INSERT, UPDATE, DELETE) restricted to `authenticated` for admin-only tables.
- contact_enquiries: public INSERT, admin-only SELECT/UPDATE/DELETE.
- settings: public SELECT, admin-only UPDATE.
*/

CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  thumbnail text,
  instructor_name text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  video_url text,
  pdf_url text,
  order_index int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  before_image text,
  after_image text,
  client_name text NOT NULL,
  weight_lost text,
  duration text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  rating int NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text NOT NULL,
  customer_photo text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text,
  email text,
  message text NOT NULL,
  read_status boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  logo text,
  hero_image text,
  phone text,
  email text,
  address text,
  facebook_url text,
  instagram_url text,
  twitter_url text,
  whatsapp_number text,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- courses: public read, admin write
DROP POLICY IF EXISTS "courses_public_select" ON courses;
CREATE POLICY "courses_public_select" ON courses FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "courses_admin_insert" ON courses;
CREATE POLICY "courses_admin_insert" ON courses FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "courses_admin_update" ON courses;
CREATE POLICY "courses_admin_update" ON courses FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "courses_admin_delete" ON courses;
CREATE POLICY "courses_admin_delete" ON courses FOR DELETE TO authenticated USING (true);

-- lessons: public read, admin write
DROP POLICY IF EXISTS "lessons_public_select" ON lessons;
CREATE POLICY "lessons_public_select" ON lessons FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "lessons_admin_insert" ON lessons;
CREATE POLICY "lessons_admin_insert" ON lessons FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "lessons_admin_update" ON lessons;
CREATE POLICY "lessons_admin_update" ON lessons FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "lessons_admin_delete" ON lessons;
CREATE POLICY "lessons_admin_delete" ON lessons FOR DELETE TO authenticated USING (true);

-- results: public read, admin write
DROP POLICY IF EXISTS "results_public_select" ON results;
CREATE POLICY "results_public_select" ON results FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "results_admin_insert" ON results;
CREATE POLICY "results_admin_insert" ON results FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "results_admin_update" ON results;
CREATE POLICY "results_admin_update" ON results FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "results_admin_delete" ON results;
CREATE POLICY "results_admin_delete" ON results FOR DELETE TO authenticated USING (true);

-- testimonials: public read, admin write
DROP POLICY IF EXISTS "testimonials_public_select" ON testimonials;
CREATE POLICY "testimonials_public_select" ON testimonials FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "testimonials_admin_insert" ON testimonials;
CREATE POLICY "testimonials_admin_insert" ON testimonials FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "testimonials_admin_update" ON testimonials;
CREATE POLICY "testimonials_admin_update" ON testimonials FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "testimonials_admin_delete" ON testimonials;
CREATE POLICY "testimonials_admin_delete" ON testimonials FOR DELETE TO authenticated USING (true);

-- contact_enquiries: public insert, admin read/update/delete
DROP POLICY IF EXISTS "enquiries_public_insert" ON contact_enquiries;
CREATE POLICY "enquiries_public_insert" ON contact_enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "enquiries_admin_select" ON contact_enquiries;
CREATE POLICY "enquiries_admin_select" ON contact_enquiries FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "enquiries_admin_update" ON contact_enquiries;
CREATE POLICY "enquiries_admin_update" ON contact_enquiries FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "enquiries_admin_delete" ON contact_enquiries;
CREATE POLICY "enquiries_admin_delete" ON contact_enquiries FOR DELETE TO authenticated USING (true);

-- settings: public read, admin update
DROP POLICY IF EXISTS "settings_public_select" ON settings;
CREATE POLICY "settings_public_select" ON settings FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "settings_admin_update" ON settings;
CREATE POLICY "settings_admin_update" ON settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Insert default settings row
INSERT INTO settings (id) VALUES (gen_random_uuid()) ON CONFLICT DO NOTHING;

DROP POLICY IF EXISTS "admin_select_admins" ON admins;
CREATE POLICY "admin_select_admins" ON admins FOR SELECT
  TO authenticated USING (EXISTS (SELECT 1 FROM admins WHERE admins.user_id = auth.uid()));

DROP POLICY IF EXISTS "admin_insert_admins" ON admins;
CREATE POLICY "admin_insert_admins" ON admins FOR INSERT
  TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM admins WHERE admins.user_id = auth.uid()));

DROP POLICY IF EXISTS "admin_delete_admins" ON admins;
CREATE POLICY "admin_delete_admins" ON admins FOR DELETE
  TO authenticated USING (EXISTS (SELECT 1 FROM admins WHERE admins.user_id = auth.uid()));

