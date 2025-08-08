-- Fix function search_path warnings for functions added in the last migration
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.set_booking_commission()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;