import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  source: string;
  assigned_agent_id: string | null;
  status: string;
  score: number;
  budget_min: number | null;
  budget_max: number | null;
  location_preference: string | null;
  property_type: string | null;
  timeline: string | null;
  purpose: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface LeadActivity {
  id: string;
  lead_id: string;
  type: string;
  property_id: string | null;
  metadata: any;
  points: number;
  created_at: string;
}

export interface SiteVisit {
  id: string;
  lead_id: string;
  property_id: string;
  scheduled_at: string;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export const useLeads = () => {
  return useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads" as any)
        .select("*")
        .order("score", { ascending: false });
      
      if (error) throw error;
      return data as unknown as Lead[];
    },
  });
};

export const useCreateLead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (lead: Partial<Lead>) => {
      const { data, error } = await supabase
        .from("leads" as any)
        .insert([lead])
        .select()
        .single();
      
      if (error) throw error;
      return data as unknown as Lead;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
};

export const useTrackActivity = () => {
  return useMutation({
    mutationFn: async (activity: {
      lead_id: string;
      type: string;
      property_id?: string;
      metadata?: any;
      points: number;
    }) => {
      // Insert activity
      const { error: activityError } = await supabase
        .from("lead_activities" as any)
        .insert([activity]);
      
      if (activityError) throw activityError;

      // Update lead score manually
      const { data: lead, error: fetchError } = await supabase
        .from("leads" as any)
        .select("score")
        .eq("id", activity.lead_id)
        .single();
      
      if (fetchError) throw fetchError;
      
      const currentScore = (lead as any)?.score || 0;
      
      const { error: updateError } = await supabase
        .from("leads" as any)
        .update({ score: currentScore + activity.points })
        .eq("id", activity.lead_id);
        
      if (updateError) throw updateError;
    },
  });
};

export const useCreateSiteVisit = () => {
  const queryClient = useQueryClient();
  const trackActivity = useTrackActivity();
  
  return useMutation({
    mutationFn: async (visit: Partial<SiteVisit>) => {
      const { data, error } = await supabase
        .from("site_visits" as any)
        .insert([visit])
        .select()
        .single();
      
      if (error) throw error;
      
      // Track this as a high-value activity
      if (visit.lead_id) {
        await trackActivity.mutateAsync({
          lead_id: visit.lead_id,
          type: "site_visit_booked",
          property_id: visit.property_id,
          points: 3,
        });
      }
      
      return data as unknown as SiteVisit;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site_visits"] });
    },
  });
};