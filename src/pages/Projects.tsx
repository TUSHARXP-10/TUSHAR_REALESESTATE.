import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { EnhancedPropertyCard } from "@/components/EnhancedPropertyCard";
import { PropertyFilters } from "@/components/PropertyFilters";
import { PropertyComparisonDialog } from "@/components/PropertyComparisonDialog";
import { useProperties, Property, PropertyFilters as Filters } from "@/hooks/useProperties";
import { Button } from "@/components/ui/button";
import { Loader2, SlidersHorizontal, GitCompare } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Projects = () => {
  const [filters, setFilters] = useState<Filters>({});
  const [sortBy, setSortBy] = useState<string>('newest');
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const { data: properties, isLoading } = useProperties(filters);

  const handleCompareToggle = (property: Property, checked: boolean) => {
    if (checked) {
      if (selectedProperties.length < 3) {
        setSelectedProperties([...selectedProperties, property]);
      }
    } else {
      setSelectedProperties(selectedProperties.filter(p => p.id !== property.id));
    }
  };

  const sortedProperties = properties ? [...properties].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'oldest':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      default:
        return 0;
    }
  }) : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="py-20 bg-gradient-sky">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-center mb-4">
              Featured Properties
            </h1>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-8">
              Explore our carefully curated selection of premium properties
            </p>
            
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto mt-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by location, property type, or area (e.g., Bandra, Mumbai, Villa)..."
                  value={filters.searchQuery || ''}
                  onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                  className="w-full px-6 py-4 text-lg rounded-full border-2 border-primary/20 bg-background shadow-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                />
                <Button
                  size="lg"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
                  onClick={() => {}}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Desktop Filters */}
              <aside className="hidden lg:block">
                <PropertyFilters filters={filters} onFiltersChange={setFilters} />
              </aside>

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-6">
                {/* Mobile Filter & Sort Bar */}
                <div className="flex items-center justify-between gap-4">
                  <Sheet>
                    <SheetTrigger asChild className="lg:hidden">
                      <Button variant="outline">
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <PropertyFilters filters={filters} onFiltersChange={setFilters} />
                      </div>
                    </SheetContent>
                  </Sheet>

                  <div className="flex items-center gap-4 flex-1 justify-end">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                      </SelectContent>
                    </Select>

                    {selectedProperties.length > 0 && (
                      <Button 
                        onClick={() => setShowComparison(true)}
                        variant="secondary"
                      >
                        <GitCompare className="mr-2 h-4 w-4" />
                        Compare ({selectedProperties.length})
                      </Button>
                    )}
                  </div>
                </div>

                {/* Results Count */}
                <div className="text-sm text-muted-foreground">
                  {isLoading ? (
                    <span>Loading properties...</span>
                  ) : (
                    <span>
                      {sortedProperties.length} {sortedProperties.length === 1 ? 'property' : 'properties'} found
                    </span>
                  )}
                </div>

                {/* Property Grid */}
                {isLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : sortedProperties.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-lg text-muted-foreground">
                      No properties found. Try adjusting your filters.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {sortedProperties.map((property) => (
                      <EnhancedPropertyCard 
                        key={property.id} 
                        property={property}
                        onCompareToggle={handleCompareToggle}
                        isSelected={selectedProperties.some(p => p.id === property.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Comparison Dialog */}
      <PropertyComparisonDialog 
        open={showComparison}
        onOpenChange={setShowComparison}
        properties={selectedProperties}
      />
    </div>
  );
};

export default Projects;
