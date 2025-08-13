-- Populate service categories with enhanced descriptions and icons
INSERT INTO public.service_categories (name, description, icon) VALUES
('Moving', 'Professional moving services with packing, loading, and safe transport', 'Moving'),
('Cleaning', 'Deep cleaning, regular maintenance, and specialized cleaning services', 'Cleaning'),
('Repairs', 'Home repairs, maintenance, and handyman services by certified professionals', 'Repairs'),
('Painting', 'Interior and exterior painting with premium materials and expert finish', 'Painting'),
('Others', 'Specialized home services including plumbing, electrical, and landscaping', 'Others')
ON CONFLICT (name) DO UPDATE SET 
description = EXCLUDED.description, 
icon = EXCLUDED.icon;

-- Add 10 verified vendors with realistic data
INSERT INTO public.vendors (name, rating, verified, base_price, commission_rate, photo_url, bio) VALUES
('Swift Movers Lagos', 4.8, true, 25000, 0.12, '/caleb2.jpg', 'Professional moving company with 8+ years experience. Specializing in residential and office relocations with full insurance coverage.'),
('CleanPro Services', 4.9, true, 15000, 0.10, '/caleb2.jpg', 'Award-winning cleaning service using eco-friendly products. Trusted by 500+ families across Lagos with same-day availability.'),
('FixIt Masters', 4.7, true, 8000, 0.15, '/caleb2.jpg', 'Certified handyman service for all home repairs. From plumbing to electrical work, we fix it right the first time.'),
('ColorCraft Painters', 4.6, true, 35000, 0.12, '/caleb2.jpg', 'Premium painting service with 10-year warranty. Using only high-quality paints and professional techniques for lasting results.'),
('Home Solutions Plus', 4.8, true, 20000, 0.11, '/caleb2.jpg', 'Complete home maintenance service covering plumbing, electrical, and general repairs with 24/7 emergency support.'),
('Elite Moving Co', 4.7, true, 30000, 0.13, '/caleb2.jpg', 'Luxury moving service with climate-controlled vehicles. Specialized in handling valuable items and long-distance moves.'),
('Sparkle Clean Team', 4.9, true, 12000, 0.09, '/caleb2.jpg', 'Professional deep cleaning specialists. Post-construction cleanup, move-in/out cleaning, and regular maintenance services.'),
('QuickFix Solutions', 4.5, true, 6000, 0.14, '/caleb2.jpg', 'Fast and reliable repair service. Same-day appointments available for urgent home repairs and maintenance needs.'),
('Premier Paint Works', 4.8, true, 40000, 0.11, '/caleb2.jpg', 'High-end painting contractor serving luxury homes. Specialty finishes, texture work, and custom color consultations.'),
('TotalCare Services', 4.6, true, 18000, 0.12, '/caleb2.jpg', 'Comprehensive home service provider offering cleaning, minor repairs, and maintenance packages tailored to your needs.');

-- Create vendor services for Moving category
INSERT INTO public.vendor_services (vendor_id, category_id, price, active)
SELECT v.id, c.id, v.base_price, true
FROM public.vendors v, public.service_categories c
WHERE v.name IN ('Swift Movers Lagos', 'Elite Moving Co') AND c.name = 'Moving';

-- Create vendor services for Cleaning category
INSERT INTO public.vendor_services (vendor_id, category_id, price, active)
SELECT v.id, c.id, v.base_price, true
FROM public.vendors v, public.service_categories c
WHERE v.name IN ('CleanPro Services', 'Sparkle Clean Team', 'TotalCare Services') AND c.name = 'Cleaning';

-- Create vendor services for Repairs category
INSERT INTO public.vendor_services (vendor_id, category_id, price, active)
SELECT v.id, c.id, v.base_price, true
FROM public.vendors v, public.service_categories c
WHERE v.name IN ('FixIt Masters', 'QuickFix Solutions', 'Home Solutions Plus', 'TotalCare Services') AND c.name = 'Repairs';

-- Create vendor services for Painting category
INSERT INTO public.vendor_services (vendor_id, category_id, price, active)
SELECT v.id, c.id, v.base_price, true
FROM public.vendors v, public.service_categories c
WHERE v.name IN ('ColorCraft Painters', 'Premier Paint Works') AND c.name = 'Painting';

-- Create vendor services for Others category
INSERT INTO public.vendor_services (vendor_id, category_id, price, active)
SELECT v.id, c.id, v.base_price, true
FROM public.vendors v, public.service_categories c
WHERE v.name = 'Home Solutions Plus' AND c.name = 'Others';