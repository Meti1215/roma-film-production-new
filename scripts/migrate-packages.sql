-- SQL MIGRATION SCRIPT FOR SUPABASE
-- Run this in your Supabase SQL Editor

-- Insert the existing packages from brand.ts
INSERT INTO packages (title, subtitle, price, features, highlighted, cta_text) VALUES
('Wedding Photography', 'Timeless storytelling of your day', NULL, ARRAY['Full day coverage', 'High-resolution edited digital gallery', 'Online sharing platform', 'Luxury wedding album', 'Complimentary engagement session'], false, 'Request Package'),
('Wedding Videography', 'Cinematic wedding films', NULL, ARRAY['2 Professional cinematographers', 'Highlight film (4-6 minutes)', 'Feature documentary film', 'Drone aerial footage (weather permitting)', 'Digital delivery in 4K resolution'], false, 'Request Package'),
('Photography + Videography', 'The ultimate wedding coverage', NULL, ARRAY['Complete photo & video team', 'Full day coverage', 'Luxury layflat album & print box', 'Cinematic 4K highlight film', 'Online gallery & direct download links'], true, 'Request Package'),
('Custom Package', 'Tailored to your celebration', NULL, ARRAY['Hourly coverage options', 'Destinations and multi-day coverage', 'Elopements and intimate ceremonies', 'A-la-carte album and prints ordering'], false, 'Let''s Talk');

-- This will migrate the existing packages from brand.ts to Supabase
-- Note: Price is set to NULL for all packages since the original data didn't include prices
-- You can edit the packages in the admin dashboard to add prices
