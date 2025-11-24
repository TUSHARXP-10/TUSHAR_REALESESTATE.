import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Maximize, MapPin, ArrowRight } from "lucide-react";
import { Property } from "@/hooks/useProperties";
import { Checkbox } from "@/components/ui/checkbox";

interface EnhancedPropertyCardProps {
  property: Property;
  onCompareToggle?: (property: Property, checked: boolean) => void;
  isSelected?: boolean;
}

export const EnhancedPropertyCard = ({ 
  property, 
  onCompareToggle,
  isSelected = false 
}: EnhancedPropertyCardProps) => {
  const statusColors = {
    for_sale: 'default',
    for_rent: 'secondary',
    sold: 'destructive',
    rented: 'outline',
  } as const;

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden border shadow-soft hover:shadow-medium transition-all">
      {onCompareToggle && (
        <div className="absolute top-3 left-3 z-10">
          <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-md px-2 py-1">
            <Checkbox 
              checked={isSelected}
              onCheckedChange={(checked) => onCompareToggle(property, checked as boolean)}
            />
            <label className="text-xs font-medium cursor-pointer">Compare</label>
          </div>
        </div>
      )}

      {/* Image */}
      <Link to={`/project/${property.id}`}>
        <div className="aspect-[4/3] overflow-hidden relative">
          <img 
            src={property.main_image || property.images?.[0] || '/placeholder.svg'} 
            alt={property.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute top-3 right-3">
            <Badge variant={statusColors[property.status]}>
              {property.status.replace('_', ' ')}
            </Badge>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            <Link to={`/project/${property.id}`}>
              {property.title}
            </Link>
          </h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
            <MapPin className="h-3 w-3" />
            {property.city}, {property.state}
          </p>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-primary">
            ${property.price.toLocaleString()}
          </span>
          {property.status === 'for_rent' && (
            <span className="text-sm text-muted-foreground">/month</span>
          )}
        </div>

        {/* Property Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {property.bedrooms && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms}</span>
            </div>
          )}
          {property.square_feet && (
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              <span>{property.square_feet.toLocaleString()} sq ft</span>
            </div>
          )}
        </div>

        {/* Features */}
        {property.features && property.features.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {property.features.slice(0, 3).map((feature, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {property.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{property.features.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* View Details Button */}
        <Button asChild className="w-full group/btn">
          <Link to={`/project/${property.id}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
