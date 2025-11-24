import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, IndianRupee } from "lucide-react";
import { toast } from "sonner";
import { FileUpload } from "@/components/admin/FileUpload";

const Properties = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    location: "",
    city: "",
    state: "",
    zip_code: "",
    property_type: "residential" as any,
    status: "for_sale" as any,
    bedrooms: 0,
    bathrooms: 0,
    square_feet: 0,
    lot_size: 0,
    year_built: new Date().getFullYear(),
    main_image: "",
    features: [] as string[],
  });

  const { data: properties, isLoading } = useQuery({
    queryKey: ["admin-properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from("properties").insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-properties"] });
      toast.success("Property created successfully");
      setOpen(false);
      resetForm();
    },
    onError: () => toast.error("Failed to create property"),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: any) => {
      const { error } = await supabase.from("properties").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-properties"] });
      toast.success("Property updated successfully");
      setOpen(false);
      resetForm();
    },
    onError: () => toast.error("Failed to update property"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("properties").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-properties"] });
      toast.success("Property deleted successfully");
    },
    onError: () => toast.error("Failed to delete property"),
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: 0,
      location: "",
      city: "",
      state: "",
      zip_code: "",
      property_type: "residential",
      status: "for_sale",
      bedrooms: 0,
      bathrooms: 0,
      square_feet: 0,
      lot_size: 0,
      year_built: new Date().getFullYear(),
      main_image: "",
      features: [],
    });
    setEditItem(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      updateMutation.mutate({ id: editItem.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (item: any) => {
    setEditItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      price: item.price,
      location: item.location,
      city: item.city,
      state: item.state || "",
      zip_code: item.zip_code || "",
      property_type: item.property_type,
      status: item.status,
      bedrooms: item.bedrooms || 0,
      bathrooms: item.bathrooms || 0,
      square_feet: item.square_feet || 0,
      lot_size: item.lot_size || 0,
      year_built: item.year_built || new Date().getFullYear(),
      main_image: item.main_image || "",
      features: item.features || [],
    });
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Properties Management</h2>
          <p className="text-muted-foreground">View and manage all properties</p>
        </div>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editItem ? "Edit Property" : "Create Property"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label>Title</Label>
                  <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Description</Label>
                  <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Price (₹)</Label>
                  <Input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} required />
                </div>
                <div className="space-y-2">
                  <Label>Property Type</Label>
                  <Select value={formData.property_type} onValueChange={(v: any) => setFormData({ ...formData, property_type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={formData.status} onValueChange={(v: any) => setFormData({ ...formData, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="for_sale">For Sale</SelectItem>
                      <SelectItem value="for_rent">For Rent</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                      <SelectItem value="rented">Rented</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>State</Label>
                  <Input value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Zip Code</Label>
                  <Input value={formData.zip_code} onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Bedrooms</Label>
                  <Input type="number" value={formData.bedrooms} onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Bathrooms</Label>
                  <Input type="number" value={formData.bathrooms} onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Square Feet</Label>
                  <Input type="number" value={formData.square_feet} onChange={(e) => setFormData({ ...formData, square_feet: Number(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Lot Size</Label>
                  <Input type="number" value={formData.lot_size} onChange={(e) => setFormData({ ...formData, lot_size: Number(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Year Built</Label>
                  <Input type="number" value={formData.year_built} onChange={(e) => setFormData({ ...formData, year_built: Number(e.target.value) })} />
                </div>
                <div className="space-y-2 col-span-2">
                  <FileUpload
                    bucket="property-images"
                    label="Property Image"
                    value={formData.main_image}
                    onChange={(url) => setFormData({ ...formData, main_image: url })}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                {editItem ? "Update" : "Create"} Property
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Properties</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Beds/Baths</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties?.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell className="font-medium">{property.title}</TableCell>
                    <TableCell>{property.city}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{property.property_type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <IndianRupee className="h-4 w-4" />
                        {property.price.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={property.status === "for_sale" ? "default" : "secondary"}>
                        {property.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {property.bedrooms || 0} / {property.bathrooms || 0}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(property)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => deleteMutation.mutate(property.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Properties;
