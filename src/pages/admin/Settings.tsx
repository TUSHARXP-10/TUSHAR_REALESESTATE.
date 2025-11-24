import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Save } from "lucide-react";

const Settings = () => {
  const queryClient = useQueryClient();
  const [settings, setSettings] = useState<Record<string, any>>({});

  const { isLoading } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*");
      if (error) throw error;
      
      const settingsMap: Record<string, any> = {};
      data.forEach((item) => {
        settingsMap[item.key] = item.value;
      });
      setSettings(settingsMap);
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updates: Array<{ key: string; value: any }>) => {
      const promises = updates.map((update) =>
        supabase
          .from("site_settings")
          .upsert({ key: update.key, value: update.value })
      );
      await Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast.success("Settings saved successfully");
    },
    onError: () => toast.error("Failed to save settings"),
  });

  const handleSave = () => {
    const updates = Object.entries(settings).map(([key, value]) => ({
      key,
      value: typeof value === 'string' ? JSON.stringify(value) : value
    }));
    updateMutation.mutate(updates);
  };

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Site Settings</h2>
          <p className="text-muted-foreground">Manage your website configuration</p>
        </div>
        <Button onClick={handleSave} disabled={updateMutation.isPending}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="homepage">Homepage</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic site configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input
                  value={settings.company_name || ""}
                  onChange={(e) => updateSetting("company_name", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Your business contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={settings.company_email || ""}
                  onChange={(e) => updateSetting("company_email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={settings.company_phone || ""}
                  onChange={(e) => updateSetting("company_phone", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>Connect your social media profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((platform) => (
                <div key={platform} className="space-y-2">
                  <Label className="capitalize">{platform}</Label>
                  <Input
                    placeholder={`https://${platform}.com/yourprofile`}
                    value={settings.social_links?.[platform] || ""}
                    onChange={(e) =>
                      updateSetting("social_links", {
                        ...settings.social_links,
                        [platform]: e.target.value,
                      })
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="homepage">
          <Card>
            <CardHeader>
              <CardTitle>Homepage Content</CardTitle>
              <CardDescription>Customize your homepage sections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Hero Title</Label>
                <Input
                  value={settings.hero_title || ""}
                  onChange={(e) => updateSetting("hero_title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Hero Subtitle</Label>
                <Input
                  value={settings.hero_subtitle || ""}
                  onChange={(e) => updateSetting("hero_subtitle", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>About Title</Label>
                <Input
                  value={settings.about_title || ""}
                  onChange={(e) => updateSetting("about_title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>About Description</Label>
                <Input
                  value={settings.about_description || ""}
                  onChange={(e) => updateSetting("about_description", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;