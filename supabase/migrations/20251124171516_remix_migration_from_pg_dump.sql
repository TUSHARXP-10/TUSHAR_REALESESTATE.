CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: app_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.app_role AS ENUM (
    'admin',
    'agent',
    'manager',
    'user'
);


--
-- Name: lead_source; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.lead_source AS ENUM (
    'quiz',
    'contact_form',
    'whatsapp',
    'property_enquiry',
    'site_visit_form',
    'phone'
);


--
-- Name: lead_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.lead_status AS ENUM (
    'new',
    'contacted',
    'qualified',
    'lost',
    'converted'
);


--
-- Name: property_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.property_status AS ENUM (
    'for_sale',
    'for_rent',
    'sold',
    'rented'
);


--
-- Name: property_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.property_type AS ENUM (
    'residential',
    'commercial',
    'land',
    'apartment',
    'villa',
    'townhouse'
);


--
-- Name: visit_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.visit_status AS ENUM (
    'booked',
    'completed',
    'no_show',
    'cancelled'
);


--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  
  -- Assign default 'user' role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;


--
-- Name: has_role(uuid, public.app_role); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: cms_content; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cms_content (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    content_type text NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    content text,
    excerpt text,
    featured_image text,
    metadata jsonb,
    status text DEFAULT 'draft'::text,
    author_id uuid,
    published_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT cms_content_content_type_check CHECK ((content_type = ANY (ARRAY['page'::text, 'blog_post'::text, 'testimonial'::text, 'team_member'::text, 'faq'::text]))),
    CONSTRAINT cms_content_status_check CHECK ((status = ANY (ARRAY['draft'::text, 'published'::text, 'archived'::text])))
);


--
-- Name: homepage_sections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.homepage_sections (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    section_type text NOT NULL,
    title text,
    subtitle text,
    content jsonb,
    display_order integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: lead_activities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lead_activities (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    lead_id uuid NOT NULL,
    type character varying(50) NOT NULL,
    property_id uuid,
    metadata jsonb,
    points integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: leads; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.leads (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(255),
    phone character varying(20),
    source public.lead_source NOT NULL,
    assigned_agent_id uuid,
    status public.lead_status DEFAULT 'new'::public.lead_status,
    score integer DEFAULT 0,
    budget_min numeric,
    budget_max numeric,
    location_preference text,
    property_type text,
    timeline text,
    purpose text,
    notes text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT email_or_phone_required CHECK (((email IS NOT NULL) OR (phone IS NOT NULL)))
);


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    lead_id uuid,
    property_id uuid,
    order_type text NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL,
    amount numeric NOT NULL,
    deposit_amount numeric,
    contract_url text,
    payment_status text DEFAULT 'pending'::text,
    notes text,
    assigned_agent_id uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    completed_at timestamp with time zone,
    CONSTRAINT orders_order_type_check CHECK ((order_type = ANY (ARRAY['sale'::text, 'rental'::text, 'lease'::text]))),
    CONSTRAINT orders_payment_status_check CHECK ((payment_status = ANY (ARRAY['pending'::text, 'partial'::text, 'paid'::text, 'refunded'::text]))),
    CONSTRAINT orders_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'approved'::text, 'in_progress'::text, 'completed'::text, 'cancelled'::text])))
);


--
-- Name: profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    email text,
    full_name text,
    avatar_url text,
    phone text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: properties; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.properties (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    property_type public.property_type NOT NULL,
    status public.property_status DEFAULT 'for_sale'::public.property_status NOT NULL,
    price numeric(12,2) NOT NULL,
    location text NOT NULL,
    city text NOT NULL,
    state text,
    zip_code text,
    bedrooms integer,
    bathrooms integer,
    square_feet integer,
    lot_size integer,
    year_built integer,
    features text[],
    images text[],
    main_image text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: property_comparisons; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.property_comparisons (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    property_ids uuid[] NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: site_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.site_settings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    key text NOT NULL,
    value jsonb,
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: site_visits; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.site_visits (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    lead_id uuid NOT NULL,
    property_id uuid NOT NULL,
    scheduled_at timestamp with time zone NOT NULL,
    status public.visit_status DEFAULT 'booked'::public.visit_status,
    notes text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role public.app_role DEFAULT 'user'::public.app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: cms_content cms_content_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cms_content
    ADD CONSTRAINT cms_content_pkey PRIMARY KEY (id);


--
-- Name: cms_content cms_content_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cms_content
    ADD CONSTRAINT cms_content_slug_key UNIQUE (slug);


--
-- Name: homepage_sections homepage_sections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.homepage_sections
    ADD CONSTRAINT homepage_sections_pkey PRIMARY KEY (id);


--
-- Name: lead_activities lead_activities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lead_activities
    ADD CONSTRAINT lead_activities_pkey PRIMARY KEY (id);


--
-- Name: leads leads_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: properties properties_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_pkey PRIMARY KEY (id);


--
-- Name: property_comparisons property_comparisons_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.property_comparisons
    ADD CONSTRAINT property_comparisons_pkey PRIMARY KEY (id);


--
-- Name: site_settings site_settings_key_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_key_key UNIQUE (key);


--
-- Name: site_settings site_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_pkey PRIMARY KEY (id);


--
-- Name: site_visits site_visits_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_visits
    ADD CONSTRAINT site_visits_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_user_id_role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);


--
-- Name: idx_lead_activities_lead_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_lead_activities_lead_id ON public.lead_activities USING btree (lead_id);


--
-- Name: idx_lead_activities_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_lead_activities_type ON public.lead_activities USING btree (type);


--
-- Name: idx_leads_email; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_leads_email ON public.leads USING btree (email);


--
-- Name: idx_leads_phone; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_leads_phone ON public.leads USING btree (phone);


--
-- Name: idx_leads_score; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_leads_score ON public.leads USING btree (score DESC);


--
-- Name: idx_leads_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_leads_status ON public.leads USING btree (status);


--
-- Name: idx_properties_city; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_properties_city ON public.properties USING btree (city);


--
-- Name: idx_properties_features; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_properties_features ON public.properties USING gin (features);


--
-- Name: idx_properties_price; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_properties_price ON public.properties USING btree (price);


--
-- Name: idx_properties_property_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_properties_property_type ON public.properties USING btree (property_type);


--
-- Name: idx_properties_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_properties_status ON public.properties USING btree (status);


--
-- Name: idx_site_visits_lead_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_site_visits_lead_id ON public.site_visits USING btree (lead_id);


--
-- Name: idx_site_visits_scheduled_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_site_visits_scheduled_at ON public.site_visits USING btree (scheduled_at);


--
-- Name: cms_content update_cms_content_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_cms_content_updated_at BEFORE UPDATE ON public.cms_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: homepage_sections update_homepage_sections_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_homepage_sections_updated_at BEFORE UPDATE ON public.homepage_sections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: leads update_leads_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: orders update_orders_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: profiles update_profiles_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: properties update_properties_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: site_settings update_site_settings_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: site_visits update_site_visits_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_site_visits_updated_at BEFORE UPDATE ON public.site_visits FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: cms_content cms_content_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cms_content
    ADD CONSTRAINT cms_content_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.profiles(id);


--
-- Name: lead_activities lead_activities_lead_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lead_activities
    ADD CONSTRAINT lead_activities_lead_id_fkey FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON DELETE CASCADE;


--
-- Name: lead_activities lead_activities_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lead_activities
    ADD CONSTRAINT lead_activities_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE SET NULL;


--
-- Name: orders orders_assigned_agent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_assigned_agent_id_fkey FOREIGN KEY (assigned_agent_id) REFERENCES public.profiles(id);


--
-- Name: orders orders_lead_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_lead_id_fkey FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON DELETE SET NULL;


--
-- Name: orders orders_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE SET NULL;


--
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: site_visits site_visits_lead_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_visits
    ADD CONSTRAINT site_visits_lead_id_fkey FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON DELETE CASCADE;


--
-- Name: site_visits site_visits_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_visits
    ADD CONSTRAINT site_visits_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: properties Admins and agents can insert properties; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins and agents can insert properties" ON public.properties FOR INSERT TO authenticated WITH CHECK ((public.has_role(auth.uid(), 'admin'::public.app_role) OR public.has_role(auth.uid(), 'agent'::public.app_role) OR public.has_role(auth.uid(), 'manager'::public.app_role)));


--
-- Name: properties Admins and agents can update properties; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins and agents can update properties" ON public.properties FOR UPDATE TO authenticated USING ((public.has_role(auth.uid(), 'admin'::public.app_role) OR public.has_role(auth.uid(), 'agent'::public.app_role) OR public.has_role(auth.uid(), 'manager'::public.app_role)));


--
-- Name: cms_content Admins and managers can create content; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins and managers can create content" ON public.cms_content FOR INSERT TO authenticated WITH CHECK ((public.has_role(auth.uid(), 'admin'::public.app_role) OR public.has_role(auth.uid(), 'manager'::public.app_role)));


--
-- Name: cms_content Admins and managers can update content; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins and managers can update content" ON public.cms_content FOR UPDATE TO authenticated USING ((public.has_role(auth.uid(), 'admin'::public.app_role) OR public.has_role(auth.uid(), 'manager'::public.app_role)));


--
-- Name: cms_content Admins can delete content; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can delete content" ON public.cms_content FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: properties Admins can delete properties; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can delete properties" ON public.properties FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: user_roles Admins can delete roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can delete roles" ON public.user_roles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: user_roles Admins can insert roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can insert roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: user_roles Admins can update roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can update roles" ON public.user_roles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: user_roles Admins can view all roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: orders Agents and admins can create orders; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Agents and admins can create orders" ON public.orders FOR INSERT TO authenticated WITH CHECK ((public.has_role(auth.uid(), 'admin'::public.app_role) OR public.has_role(auth.uid(), 'agent'::public.app_role) OR public.has_role(auth.uid(), 'manager'::public.app_role)));


--
-- Name: orders Agents and admins can update orders; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Agents and admins can update orders" ON public.orders FOR UPDATE TO authenticated USING ((public.has_role(auth.uid(), 'admin'::public.app_role) OR public.has_role(auth.uid(), 'agent'::public.app_role) OR public.has_role(auth.uid(), 'manager'::public.app_role)));


--
-- Name: property_comparisons Anyone can create comparisons; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can create comparisons" ON public.property_comparisons FOR INSERT WITH CHECK (true);


--
-- Name: lead_activities Anyone can create lead activities; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can create lead activities" ON public.lead_activities FOR INSERT WITH CHECK (true);


--
-- Name: leads Anyone can create leads; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can create leads" ON public.leads FOR INSERT WITH CHECK (true);


--
-- Name: site_visits Anyone can create site visits; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can create site visits" ON public.site_visits FOR INSERT WITH CHECK (true);


--
-- Name: homepage_sections Anyone can view homepage sections; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view homepage sections" ON public.homepage_sections FOR SELECT USING ((is_active = true));


--
-- Name: site_settings Anyone can view site settings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view site settings" ON public.site_settings FOR SELECT USING (true);


--
-- Name: homepage_sections Authenticated users can manage homepage sections; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can manage homepage sections" ON public.homepage_sections USING ((auth.role() = 'authenticated'::text)) WITH CHECK ((auth.role() = 'authenticated'::text));


--
-- Name: leads Authenticated users can update leads; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can update leads" ON public.leads FOR UPDATE TO authenticated USING (true);


--
-- Name: site_settings Authenticated users can update site settings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can update site settings" ON public.site_settings USING ((auth.role() = 'authenticated'::text)) WITH CHECK ((auth.role() = 'authenticated'::text));


--
-- Name: site_visits Authenticated users can update site visits; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can update site visits" ON public.site_visits FOR UPDATE TO authenticated USING (true);


--
-- Name: lead_activities Authenticated users can view all activities; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can view all activities" ON public.lead_activities FOR SELECT TO authenticated USING (true);


--
-- Name: leads Authenticated users can view all leads; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can view all leads" ON public.leads FOR SELECT TO authenticated USING (true);


--
-- Name: site_visits Authenticated users can view all site visits; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can view all site visits" ON public.site_visits FOR SELECT TO authenticated USING (true);


--
-- Name: orders Authenticated users can view orders; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can view orders" ON public.orders FOR SELECT TO authenticated USING (true);


--
-- Name: property_comparisons Comparisons are viewable by everyone; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Comparisons are viewable by everyone" ON public.property_comparisons FOR SELECT USING (true);


--
-- Name: profiles Profiles viewable by authenticated users; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Profiles viewable by authenticated users" ON public.profiles FOR SELECT TO authenticated USING (true);


--
-- Name: properties Properties are viewable by everyone; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Properties are viewable by everyone" ON public.properties FOR SELECT USING (true);


--
-- Name: cms_content Published content viewable by everyone; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Published content viewable by everyone" ON public.cms_content FOR SELECT USING (((status = 'published'::text) OR (auth.uid() IS NOT NULL)));


--
-- Name: profiles Users can update own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING ((auth.uid() = id));


--
-- Name: user_roles Users can view their own roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT TO authenticated USING ((auth.uid() = user_id));


--
-- Name: cms_content; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.cms_content ENABLE ROW LEVEL SECURITY;

--
-- Name: homepage_sections; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;

--
-- Name: lead_activities; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.lead_activities ENABLE ROW LEVEL SECURITY;

--
-- Name: leads; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

--
-- Name: orders; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: properties; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

--
-- Name: property_comparisons; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.property_comparisons ENABLE ROW LEVEL SECURITY;

--
-- Name: site_settings; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

--
-- Name: site_visits; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


