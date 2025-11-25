import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyFilters as Filters } from "@/hooks/useProperties";

interface PropertyFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const COMMON_FEATURES = [
  'pool', 'garage', 'garden', 'balcony', 'fireplace', 
  'hardwood floors', 'updated kitchen', 'smart home', 
  'beach access', 'ocean views', 'near schools'
];

// Common cities and areas
const CITIES = [
  { value: 'Mumbai', label: 'Mumbai', areas: ['Bandra West', 'Juhu', 'Andheri East', 'Powai', 'Worli', 'BKC', 'Malad West', 'Goregaon', 'Colaba', 'Versova', 'Kandivali', 'Thane', 'Lower Parel', 'Dadar', 'Chembur', 'Khar', 'Nariman Point', 'Borivali', 'Prabhadevi', 'Santacruz', 'Lokhandwala', 'Vile Parle', 'Mulund', 'Ghatkopar', 'Wadala', 'Fort', 'Kurla', 'Malabar Hill', 'Matunga', 'Bhandup', 'Oshiwara'] },
  { value: 'Pune', label: 'Pune', areas: ['Hinjewadi', 'Koregaon Park', 'Wakad', 'Baner', 'Aundh', 'Magarpatta', 'Kharadi', 'Pimple Saudagar', 'Hadapsar', 'Viman Nagar', 'Pimpri', 'Bavdhan', 'Katraj', 'Kalyani Nagar', 'Chinchwad', 'Kondhwa', 'Sus', 'Warje', 'Shivaji Nagar', 'Kothrud', 'Wagholi', 'Undri', 'Sinhagad Road', 'Deccan', 'Pashan', 'Dhanori', 'Vishrantwadi', 'Camp', 'Ravet'] },
  { value: 'Bangalore', label: 'Bangalore', areas: ['Whitefield', 'Sarjapur Road', 'Electronic City', 'Koramangala', 'Indiranagar', 'HSR Layout', 'Hennur', 'Marathahalli', 'Bellandur', 'MG Road', 'Yelahanka', 'Devanahalli', 'JP Nagar', 'Jayanagar', 'Malleshwaram', 'Bannerghatta Road', 'Ramamurthy Nagar', 'Kengeri', 'Rajaji Nagar', 'Hoodi', 'Jakkur', 'Bommanahalli', 'Brigade Road', 'Thanisandra', 'Kadugodi', 'Kalyan Nagar', 'Richmond Town', 'Nagarbhavi', 'Hebbal', 'CV Raman Nagar'] },
];

export const PropertyFilters = ({ filters, onFiltersChange }: PropertyFiltersProps) => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [availableAreas, setAvailableAreas] = useState<string[]>([]);

  const updateFilter = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    const cityData = CITIES.find(c => c.value === city);
    setAvailableAreas(cityData?.areas || []);
    updateFilter('city', city);
    // Reset location when city changes
    if (filters.location && city) {
      updateFilter('location', '');
    }
  };

  const addFeature = (feature: string) => {
    const currentFeatures = filters.features || [];
    if (!currentFeatures.includes(feature)) {
      onFiltersChange({ ...filters, features: [...currentFeatures, feature] });
    }
  };

  const removeFeature = (feature: string) => {
    const currentFeatures = filters.features || [];
    onFiltersChange({ 
      ...filters, 
      features: currentFeatures.filter(f => f !== feature) 
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  return (
    <div className="space-y-6 p-6 bg-card rounded-lg border shadow-soft">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search by title, description, or location..."
            value={filters.searchQuery || ''}
            onChange={(e) => updateFilter('searchQuery', e.target.value)}
          />
        </div>

        {/* City */}
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Select value={filters.city || ''} onValueChange={handleCityChange}>
            <SelectTrigger id="city">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Cities</SelectItem>
              {CITIES.map((city) => (
                <SelectItem key={city.value} value={city.value}>
                  {city.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Area/Location - Shows when city is selected */}
        {selectedCity && availableAreas.length > 0 && (
          <div className="space-y-2">
            <Label htmlFor="location">Area</Label>
            <Select value={filters.location || ''} onValueChange={(v) => updateFilter('location', v)}>
              <SelectTrigger id="location">
                <SelectValue placeholder="Select area" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                <SelectItem value="">All Areas</SelectItem>
                {availableAreas.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Price Range */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="minPrice">Min Price</Label>
            <Input
              id="minPrice"
              type="number"
              placeholder="$0"
              value={filters.minPrice || ''}
              onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxPrice">Max Price</Label>
            <Input
              id="maxPrice"
              type="number"
              placeholder="Any"
              value={filters.maxPrice || ''}
              onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
        </div>

        {/* Property Type */}
        <div className="space-y-2">
          <Label>Property Type</Label>
          <Select 
            value={filters.propertyType || 'all'} 
            onValueChange={(value) => updateFilter('propertyType', value === 'all' ? undefined : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="land">Land</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label>Status</Label>
          <Select 
            value={filters.status || 'all'} 
            onValueChange={(value) => updateFilter('status', value === 'all' ? undefined : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="for_sale">For Sale</SelectItem>
              <SelectItem value="for_rent">For Rent</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
              <SelectItem value="rented">Rented</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms & Bathrooms */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Min Bedrooms</Label>
            <Select 
              value={filters.minBedrooms?.toString() || 'any'} 
              onValueChange={(value) => updateFilter('minBedrooms', value === 'any' ? undefined : Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Min Bathrooms</Label>
            <Select 
              value={filters.minBathrooms?.toString() || 'any'} 
              onValueChange={(value) => updateFilter('minBathrooms', value === 'any' ? undefined : Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <Label>Features</Label>
          <Select onValueChange={addFeature}>
            <SelectTrigger>
              <SelectValue placeholder="Select features..." />
            </SelectTrigger>
            <SelectContent>
              {COMMON_FEATURES.map((feature) => (
                <SelectItem key={feature} value={feature}>
                  {feature}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {filters.features && filters.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {filters.features.map((feature) => (
                <Badge key={feature} variant="secondary" className="gap-1">
                  {feature}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeFeature(feature)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
