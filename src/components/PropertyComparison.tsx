import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProperties } from "@/hooks/useProperties";
import { Property } from "@/hooks/useProperties";
import { EnhancedPropertyCard } from "./EnhancedPropertyCard";
import { PropertyComparisonDialog } from "./PropertyComparisonDialog";
import { Scale, X } from "lucide-react";
import { toast } from "sonner";

export const PropertyComparison = () => {
  const { data: properties = [], isLoading } = useProperties();
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  const handleCompareToggle = (property: Property, checked: boolean) => {
    if (checked) {
      if (selectedProperties.length >= 3) {
        toast.error("You can only compare up to 3 properties at a time");
        return;
      }
      setSelectedProperties([...selectedProperties, property]);
      toast.success(`${property.title} added to comparison`);
    } else {
      setSelectedProperties(selectedProperties.filter(p => p.id !== property.id));
      toast.info(`${property.title} removed from comparison`);
    }
  };

  const handleCompare = () => {
    if (selectedProperties.length < 2) {
      toast.error("Please select at least 2 properties to compare");
      return;
    }
    setIsComparisonOpen(true);
  };

  const handleClearAll = () => {
    setSelectedProperties([]);
    toast.info("Comparison cleared");
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-medium">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="h-6 w-6 text-primary" />
              <div>
                <CardTitle className="text-2xl">Property Comparison</CardTitle>
                <CardDescription>
                  Select up to 3 properties to compare side by side
                </CardDescription>
              </div>
            </div>
            {selectedProperties.length > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-base px-3 py-1">
                  {selectedProperties.length} selected
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearAll}
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
                <Button
                  onClick={handleCompare}
                  disabled={selectedProperties.length < 2}
                >
                  Compare Now
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading properties...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.slice(0, 6).map((property) => (
                <EnhancedPropertyCard
                  key={property.id}
                  property={property}
                  onCompareToggle={handleCompareToggle}
                  isSelected={selectedProperties.some(p => p.id === property.id)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <PropertyComparisonDialog
        open={isComparisonOpen}
        onOpenChange={setIsComparisonOpen}
        properties={selectedProperties}
      />
    </div>
  );
};
