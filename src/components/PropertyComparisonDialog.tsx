import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Property } from "@/hooks/useProperties";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Building, Bed, Bath, Maximize, Calendar, MapPin, IndianRupee } from "lucide-react";

interface PropertyComparisonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  properties: Property[];
}

export const PropertyComparisonDialog = ({ open, onOpenChange, properties }: PropertyComparisonDialogProps) => {
  if (properties.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Property Comparison ({properties.length} properties)</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="border rounded-lg overflow-hidden">
              {/* Property Image */}
              <div className="aspect-video relative">
                <img 
                  src={property.main_image || property.images?.[0] || '/placeholder.svg'} 
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <Badge 
                  className="absolute top-2 right-2"
                  variant={property.status === 'for_sale' ? 'default' : 'secondary'}
                >
                  {property.status.replace('_', ' ')}
                </Badge>
              </div>

              {/* Property Details */}
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {property.city}, {property.state}
                  </p>
                </div>

                <Separator />

                {/* Price */}
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-primary" />
                  <span className="text-xl font-bold text-primary">
                    ₹{property.price.toLocaleString('en-IN')}
                    {property.status === 'for_rent' && <span className="text-sm font-normal">/month</span>}
                  </span>
                </div>

                <Separator />

                {/* Property Type */}
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span className="capitalize">{property.property_type.replace('_', ' ')}</span>
                </div>

                {/* Bedrooms & Bathrooms */}
                {(property.bedrooms || property.bathrooms) && (
                  <div className="flex gap-4">
                    {property.bedrooms && (
                      <div className="flex items-center gap-2">
                        <Bed className="h-4 w-4" />
                        <span>{property.bedrooms} Bed</span>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex items-center gap-2">
                        <Bath className="h-4 w-4" />
                        <span>{property.bathrooms} Bath</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Square Feet */}
                {property.square_feet && (
                  <div className="flex items-center gap-2">
                    <Maximize className="h-4 w-4" />
                    <span>{property.square_feet.toLocaleString()} sq ft</span>
                  </div>
                )}

                {/* Year Built */}
                {property.year_built && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Built in {property.year_built}</span>
                  </div>
                )}

                {/* Features */}
                {property.features && property.features.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm font-semibold mb-2">Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {property.features.slice(0, 4).map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {property.features.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{property.features.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
