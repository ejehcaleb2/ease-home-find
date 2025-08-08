-- 1) Helper function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2) Enum for booking status
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'booking_status') THEN
    CREATE TYPE public.booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
  END IF;
END$$;

-- 3) Service categories
CREATE TABLE IF NOT EXISTS public.service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
-- Anyone can read categories
DROP POLICY IF EXISTS "Categories are readable by everyone" ON public.service_categories;
CREATE POLICY "Categories are readable by everyone" ON public.service_categories
FOR SELECT USING (true);
-- Prevent client-side writes by default (no insert/update/delete policies)

CREATE OR REPLACE TRIGGER trg_service_categories_updated_at
BEFORE UPDATE ON public.service_categories
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4) Vendors
CREATE TABLE IF NOT EXISTS public.vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  rating NUMERIC(2,1) NOT NULL DEFAULT 5.0 CHECK (rating >= 0 AND rating <= 5),
  verified BOOLEAN NOT NULL DEFAULT false,
  base_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  photo_url TEXT,
  bio TEXT,
  commission_rate NUMERIC(5,4) NOT NULL DEFAULT 0.1000, -- 10%
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
-- Public can view only verified vendors
DROP POLICY IF EXISTS "Public can view verified vendors" ON public.vendors;
CREATE POLICY "Public can view verified vendors" ON public.vendors
FOR SELECT USING (verified = true);

CREATE OR REPLACE TRIGGER trg_vendors_updated_at
BEFORE UPDATE ON public.vendors
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5) Vendor services mapping
CREATE TABLE IF NOT EXISTS public.vendor_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES public.vendors(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.service_categories(id) ON DELETE CASCADE,
  price NUMERIC(10,2) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (vendor_id, category_id)
);
ALTER TABLE public.vendor_services ENABLE ROW LEVEL SECURITY;
-- Public can view vendor services if vendor is verified and service active
DROP POLICY IF EXISTS "Public can view active services of verified vendors" ON public.vendor_services;
CREATE POLICY "Public can view active services of verified vendors" ON public.vendor_services
FOR SELECT USING (
  active = true AND EXISTS (
    SELECT 1 FROM public.vendors v WHERE v.id = vendor_id AND v.verified = true
  )
);

CREATE OR REPLACE TRIGGER trg_vendor_services_updated_at
BEFORE UPDATE ON public.vendor_services
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 6) Bookings
CREATE TABLE IF NOT EXISTS public.service_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  vendor_id UUID NOT NULL REFERENCES public.vendors(id) ON DELETE RESTRICT,
  category_id UUID NOT NULL REFERENCES public.service_categories(id) ON DELETE RESTRICT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  details TEXT,
  price NUMERIC(10,2) NOT NULL,
  commission_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  status public.booking_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.service_bookings ENABLE ROW LEVEL SECURITY;
-- Tenants can view their own bookings
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.service_bookings;
CREATE POLICY "Users can view their own bookings" ON public.service_bookings
FOR SELECT USING (auth.uid() = user_id);
-- Tenants can create their own bookings
DROP POLICY IF EXISTS "Users can create their own bookings" ON public.service_bookings;
CREATE POLICY "Users can create their own bookings" ON public.service_bookings
FOR INSERT WITH CHECK (auth.uid() = user_id);
-- Tenants can update their own bookings
DROP POLICY IF EXISTS "Users can update their own bookings" ON public.service_bookings;
CREATE POLICY "Users can update their own bookings" ON public.service_bookings
FOR UPDATE USING (auth.uid() = user_id);

CREATE OR REPLACE TRIGGER trg_service_bookings_updated_at
BEFORE UPDATE ON public.service_bookings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 7) Commission calculation trigger
CREATE OR REPLACE FUNCTION public.set_booking_commission()
RETURNS TRIGGER AS $$
DECLARE
  v_rate NUMERIC(5,4);
BEGIN
  SELECT commission_rate INTO v_rate FROM public.vendors WHERE id = NEW.vendor_id;
  IF v_rate IS NULL THEN
    v_rate := 0.10; -- default 10%
  END IF;
  NEW.commission_amount := ROUND(NEW.price * v_rate, 2);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_set_booking_commission ON public.service_bookings;
CREATE TRIGGER trg_set_booking_commission
BEFORE INSERT OR UPDATE OF price, vendor_id ON public.service_bookings
FOR EACH ROW EXECUTE FUNCTION public.set_booking_commission();

-- 8) Helpful indexes
CREATE INDEX IF NOT EXISTS idx_vendors_verified ON public.vendors(verified);
CREATE INDEX IF NOT EXISTS idx_vendor_services_category ON public.vendor_services(category_id);
CREATE INDEX IF NOT EXISTS idx_service_bookings_user ON public.service_bookings(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_service_bookings_vendor ON public.service_bookings(vendor_id);
CREATE INDEX IF NOT EXISTS idx_service_bookings_status ON public.service_bookings(status);

-- 9) Seed categories if empty
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.service_categories) THEN
    INSERT INTO public.service_categories (name, description, icon) VALUES
      ('Moving', 'Professional moving and relocation assistance', 'Truck'),
      ('Cleaning', 'Home and deep cleaning services', 'Broom'),
      ('Repairs', 'General household repairs and maintenance', 'Wrench'),
      ('Painting', 'Interior and exterior painting services', 'Paintbrush'),
      ('Others', 'Miscellaneous household services', 'Sparkles');
  END IF;
END$$;