export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      cms_content: {
        Row: {
          author_id: string | null
          content: string | null
          content_type: string
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          metadata: Json | null
          published_at: string | null
          slug: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content?: string | null
          content_type: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          metadata?: Json | null
          published_at?: string | null
          slug: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string | null
          content_type?: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          metadata?: Json | null
          published_at?: string | null
          slug?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cms_content_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      homepage_sections: {
        Row: {
          content: Json | null
          created_at: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          section_type: string
          subtitle: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          section_type: string
          subtitle?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          section_type?: string
          subtitle?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      lead_activities: {
        Row: {
          created_at: string | null
          id: string
          lead_id: string
          metadata: Json | null
          points: number | null
          property_id: string | null
          type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          lead_id: string
          metadata?: Json | null
          points?: number | null
          property_id?: string | null
          type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          lead_id?: string
          metadata?: Json | null
          points?: number | null
          property_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_activities_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_activities_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          assigned_agent_id: string | null
          budget_max: number | null
          budget_min: number | null
          created_at: string | null
          email: string | null
          id: string
          location_preference: string | null
          name: string
          notes: string | null
          phone: string | null
          property_type: string | null
          purpose: string | null
          score: number | null
          source: Database["public"]["Enums"]["lead_source"]
          status: Database["public"]["Enums"]["lead_status"] | null
          timeline: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_agent_id?: string | null
          budget_max?: number | null
          budget_min?: number | null
          created_at?: string | null
          email?: string | null
          id?: string
          location_preference?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          property_type?: string | null
          purpose?: string | null
          score?: number | null
          source: Database["public"]["Enums"]["lead_source"]
          status?: Database["public"]["Enums"]["lead_status"] | null
          timeline?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_agent_id?: string | null
          budget_max?: number | null
          budget_min?: number | null
          created_at?: string | null
          email?: string | null
          id?: string
          location_preference?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          property_type?: string | null
          purpose?: string | null
          score?: number | null
          source?: Database["public"]["Enums"]["lead_source"]
          status?: Database["public"]["Enums"]["lead_status"] | null
          timeline?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          amount: number
          assigned_agent_id: string | null
          completed_at: string | null
          contract_url: string | null
          created_at: string | null
          deposit_amount: number | null
          id: string
          lead_id: string | null
          notes: string | null
          order_type: string
          payment_status: string | null
          property_id: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          assigned_agent_id?: string | null
          completed_at?: string | null
          contract_url?: string | null
          created_at?: string | null
          deposit_amount?: number | null
          id?: string
          lead_id?: string | null
          notes?: string | null
          order_type: string
          payment_status?: string | null
          property_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          assigned_agent_id?: string | null
          completed_at?: string | null
          contract_url?: string | null
          created_at?: string | null
          deposit_amount?: number | null
          id?: string
          lead_id?: string | null
          notes?: string | null
          order_type?: string
          payment_status?: string | null
          property_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_assigned_agent_id_fkey"
            columns: ["assigned_agent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          bathrooms: number | null
          bedrooms: number | null
          city: string
          created_at: string
          description: string
          features: string[] | null
          id: string
          images: string[] | null
          location: string
          lot_size: number | null
          main_image: string | null
          price: number
          property_type: Database["public"]["Enums"]["property_type"]
          square_feet: number | null
          state: string | null
          status: Database["public"]["Enums"]["property_status"]
          title: string
          updated_at: string
          year_built: number | null
          zip_code: string | null
        }
        Insert: {
          bathrooms?: number | null
          bedrooms?: number | null
          city: string
          created_at?: string
          description: string
          features?: string[] | null
          id?: string
          images?: string[] | null
          location: string
          lot_size?: number | null
          main_image?: string | null
          price: number
          property_type: Database["public"]["Enums"]["property_type"]
          square_feet?: number | null
          state?: string | null
          status?: Database["public"]["Enums"]["property_status"]
          title: string
          updated_at?: string
          year_built?: number | null
          zip_code?: string | null
        }
        Update: {
          bathrooms?: number | null
          bedrooms?: number | null
          city?: string
          created_at?: string
          description?: string
          features?: string[] | null
          id?: string
          images?: string[] | null
          location?: string
          lot_size?: number | null
          main_image?: string | null
          price?: number
          property_type?: Database["public"]["Enums"]["property_type"]
          square_feet?: number | null
          state?: string | null
          status?: Database["public"]["Enums"]["property_status"]
          title?: string
          updated_at?: string
          year_built?: number | null
          zip_code?: string | null
        }
        Relationships: []
      }
      property_comparisons: {
        Row: {
          created_at: string
          id: string
          property_ids: string[]
        }
        Insert: {
          created_at?: string
          id?: string
          property_ids: string[]
        }
        Update: {
          created_at?: string
          id?: string
          property_ids?: string[]
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string | null
          value: Json | null
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string | null
          value?: Json | null
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string | null
          value?: Json | null
        }
        Relationships: []
      }
      site_visits: {
        Row: {
          created_at: string | null
          id: string
          lead_id: string
          notes: string | null
          property_id: string
          scheduled_at: string
          status: Database["public"]["Enums"]["visit_status"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          lead_id: string
          notes?: string | null
          property_id: string
          scheduled_at: string
          status?: Database["public"]["Enums"]["visit_status"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          lead_id?: string
          notes?: string | null
          property_id?: string
          scheduled_at?: string
          status?: Database["public"]["Enums"]["visit_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "site_visits_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "site_visits_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "agent" | "manager" | "user"
      lead_source:
        | "quiz"
        | "contact_form"
        | "whatsapp"
        | "property_enquiry"
        | "site_visit_form"
        | "phone"
      lead_status: "new" | "contacted" | "qualified" | "lost" | "converted"
      property_status: "for_sale" | "for_rent" | "sold" | "rented"
      property_type:
        | "residential"
        | "commercial"
        | "land"
        | "apartment"
        | "villa"
        | "townhouse"
      visit_status: "booked" | "completed" | "no_show" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "agent", "manager", "user"],
      lead_source: [
        "quiz",
        "contact_form",
        "whatsapp",
        "property_enquiry",
        "site_visit_form",
        "phone",
      ],
      lead_status: ["new", "contacted", "qualified", "lost", "converted"],
      property_status: ["for_sale", "for_rent", "sold", "rented"],
      property_type: [
        "residential",
        "commercial",
        "land",
        "apartment",
        "villa",
        "townhouse",
      ],
      visit_status: ["booked", "completed", "no_show", "cancelled"],
    },
  },
} as const
