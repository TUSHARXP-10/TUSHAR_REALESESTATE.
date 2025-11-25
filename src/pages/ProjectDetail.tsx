import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PropertyImageGallery } from "@/components/PropertyImageGallery";
import { useProperty } from "@/hooks/useProperties";
import { 
  Bed, Bath, Maximize, Calendar, MapPin, Building, 
  Home, ArrowLeft, Loader2, CheckCircle2, IndianRupee
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SiteVisitForm } from "@/components/SiteVisitForm";
import { useState } from "react";

const ProjectDetail = () => {
  const { id } = useParams();
  const { data: property, isLoading, error } = useProperty(id || '');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
            <Button asChild>
              <Link to="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Properties
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const statusColors = {
    for_sale: 'default',
    for_rent: 'secondary',
    sold: 'destructive',
    rented: 'outline',
  } as const;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Properties
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              {(property.images || property.main_image) && (
                <PropertyImageGallery 
                  images={property.images && property.images.length > 0 ? property.images : property.main_image ? [property.main_image] : []} 
                  title={property.title}
                />
              )}

              {/* Property Info */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                      {property.title}
                    </h1>
                    <p className="text-lg text-muted-foreground flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      {property.location}, {property.city}, {property.state} {property.zip_code}
                    </p>
                  </div>
                  <Badge variant={statusColors[property.status]} className="text-sm">
                    {property.status.replace('_', ' ')}
                  </Badge>
                </div>

                <div className="flex items-baseline gap-2 mb-6">
                  <div className="flex items-center gap-1">
                    <IndianRupee className="h-8 w-8 text-primary" />
                    <span className="text-4xl font-bold text-primary">
                      {property.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {property.status === 'for_rent' && (
                    <span className="text-lg text-muted-foreground">/month</span>
                  )}
                </div>

                {/* Property Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-muted/50 rounded-lg">
                  {property.bedrooms && (
                    <div className="flex flex-col items-center text-center">
                      <Bed className="h-6 w-6 mb-2 text-primary" />
                      <span className="text-2xl font-bold">{property.bedrooms}</span>
                      <span className="text-sm text-muted-foreground">Bedrooms</span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex flex-col items-center text-center">
                      <Bath className="h-6 w-6 mb-2 text-primary" />
                      <span className="text-2xl font-bold">{property.bathrooms}</span>
                      <span className="text-sm text-muted-foreground">Bathrooms</span>
                    </div>
                  )}
                  {property.square_feet && (
                    <div className="flex flex-col items-center text-center">
                      <Maximize className="h-6 w-6 mb-2 text-primary" />
                      <span className="text-2xl font-bold">{property.square_feet.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground">Sq Ft</span>
                    </div>
                  )}
                  {property.year_built && (
                    <div className="flex flex-col items-center text-center">
                      <Calendar className="h-6 w-6 mb-2 text-primary" />
                      <span className="text-2xl font-bold">{property.year_built}</span>
                      <span className="text-sm text-muted-foreground">Year Built</span>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold mb-4">About This Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </div>

              <Separator />

              {/* Property Details */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Property Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <Building className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Property Type</p>
                      <p className="font-semibold capitalize">{property.property_type.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <Home className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-semibold capitalize">{property.status.replace('_', ' ')}</p>
                    </div>
                  </div>
                  {property.lot_size && (
                    <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                      <Maximize className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Lot Size</p>
                        <p className="font-semibold">{property.lot_size.toLocaleString()} sq ft</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Features & Amenities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {property.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="capitalize">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-card border rounded-lg p-6 shadow-soft sticky top-6">
                <h3 className="text-xl font-bold mb-4">Interested in this property?</h3>
                <div className="space-y-3">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full" size="lg">
                        Schedule a Viewing
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Schedule a Site Visit</DialogTitle>
                      </DialogHeader>
                      <SiteVisitForm 
                        propertyId={property.id} 
                        propertyTitle={property.title}
                      />
                    </DialogContent>
                  </Dialog>
                  <Button className="w-full" variant="outline" size="lg" asChild>
                    <Link to="/contact">Contact Agent</Link>
                  </Button>
                </div>
                <Separator className="my-6" />
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="flex justify-between">
                    <span>Listed:</span>
                    <span className="font-medium text-foreground">
                      {new Date(property.created_at).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>Updated:</span>
                    <span className="font-medium text-foreground">
                      {new Date(property.updated_at).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
