import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Property {
  id: string;
  title: string;
  description: string;
  property_type: 'residential' | 'commercial' | 'land' | 'apartment' | 'villa' | 'townhouse';
  status: 'for_sale' | 'for_rent' | 'sold' | 'rented';
  price: number;
  location: string;
  city: string;
  state: string | null;
  zip_code: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  square_feet: number | null;
  lot_size: number | null;
  year_built: number | null;
  features: string[] | null;
  images: string[] | null;
  main_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface PropertyFilters {
  city?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: string;
  status?: string;
  minBedrooms?: number;
  minBathrooms?: number;
  features?: string[];
  searchQuery?: string;
}

export const useProperties = (filters?: PropertyFilters) => {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: async () => {
      let query = supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters?.city) {
        query = query.ilike('city', `%${filters.city}%`);
      }

      if (filters?.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }

      if (filters?.minPrice) {
        query = query.gte('price', filters.minPrice);
      }

      if (filters?.maxPrice) {
        query = query.lte('price', filters.maxPrice);
      }

      if (filters?.propertyType && filters.propertyType !== 'all') {
        query = query.eq('property_type', filters.propertyType as Property['property_type']);
      }

      if (filters?.status && filters.status !== 'all') {
        query = query.eq('status', filters.status as Property['status']);
      }

      if (filters?.minBedrooms) {
        query = query.gte('bedrooms', filters.minBedrooms);
      }

      if (filters?.minBathrooms) {
        query = query.gte('bathrooms', filters.minBathrooms);
      }

      if (filters?.features && filters.features.length > 0) {
        query = query.contains('features', filters.features);
      }

      if (filters?.searchQuery) {
        query = query.or(`title.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%,location.ilike.%${filters.searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Property[];
    },
  });
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Property;
    },
  });
};
