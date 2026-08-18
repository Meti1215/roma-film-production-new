-- SQL MIGRATION SCRIPT FOR SUPABASE
-- Run this in your Supabase SQL Editor

-- Insert the existing videos from brand.ts
INSERT INTO videos (title, category, video_url, thumbnail_url) VALUES
('Binyam & Elshaday', 'Highlight Film', '/videos/BINYAM & ELSHADAY INSTAGRAM.mp4', '/images/photos/photo8.jpg'),
('Nahom', 'Highlight Film', '/videos/Nahom SHORT.mp4', '/images/photos/photo9.jpg');

-- This will migrate the existing videos from brand.ts to Supabase
-- Note: The duration field is not in the Supabase schema, so it's omitted
-- You can add new videos through the admin dashboard with custom categories