import { Link } from "react-router-dom";
import { MapPin, Home, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface PropertyCardProps {
  id: string;
  image: string;
  name: string;
  location: string;
  price: string;
  type: string;
  bhk?: string;
  match?: number;
}

const PropertyCard = ({
  id,
  image,
  name,
  location,
  price,
  type,
  bhk,
  match,
}: PropertyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden group hover:shadow-medium transition-all duration-300">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {match && (
            <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
              {match}% Match
            </Badge>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <CardContent className="p-6 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
          </div>

          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{location}</span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            {bhk && (
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-primary" />
                <span className="font-medium">{bhk}</span>
              </div>
            )}
            <Badge variant="secondary">{type}</Badge>
          </div>

          <div className="flex items-center gap-1 text-2xl font-bold text-primary">
            <IndianRupee className="h-5 w-5" />
            <span>{price}</span>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <Button asChild className="w-full" variant="default">
            <Link to={`/project/${id}`}>Explore More</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;
