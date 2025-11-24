import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCreateLead, useCreateSiteVisit } from "@/hooks/useLeads";
import { Loader2, Calendar } from "lucide-react";

interface SiteVisitFormProps {
  propertyId: string;
  propertyTitle: string;
}

export const SiteVisitForm = ({ propertyId, propertyTitle }: SiteVisitFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    scheduledAt: "",
  });
  const { toast } = useToast();
  const createLead = useCreateLead();
  const createSiteVisit = useCreateSiteVisit();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create lead
      const lead = await createLead.mutateAsync({
        name: formData.name,
        email: formData.email || null,
        phone: formData.phone || null,
        source: "site_visit_form",
        status: "new",
        score: 3, // Site visit = high intent
        notes: `Site visit request for: ${propertyTitle}`,
      });

      // Create site visit
      await createSiteVisit.mutateAsync({
        lead_id: lead.id,
        property_id: propertyId,
        scheduled_at: new Date(formData.scheduledAt).toISOString(),
        status: "booked",
      });

      toast({
        title: "Site Visit Booked!",
        description: "We'll send you a confirmation shortly.",
      });

      setFormData({ name: "", email: "", phone: "", scheduledAt: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book site visit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const minDate = new Date().toISOString().slice(0, 16);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone *</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="scheduledAt">Preferred Date & Time *</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="scheduledAt"
            type="datetime-local"
            value={formData.scheduledAt}
            onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
            min={minDate}
            className="pl-10"
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Booking...
          </>
        ) : (
          "Book Site Visit"
        )}
      </Button>
    </form>
  );
};