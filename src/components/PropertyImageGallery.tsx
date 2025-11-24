import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyImageGalleryProps {
  images: string[];
  title: string;
}

export const PropertyImageGallery = ({ images, title }: PropertyImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openGallery = (index: number) => {
    setSelectedImage(index);
  };

  const closeGallery = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        {/* Main Image */}
        <div 
          className="col-span-4 md:col-span-2 md:row-span-2 cursor-pointer overflow-hidden rounded-lg group relative"
          onClick={() => openGallery(0)}
        >
          <img 
            src={images[0]} 
            alt={`${title} - Main`}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>

        {/* Thumbnail Images */}
        {images.slice(1, 5).map((image, index) => (
          <div 
            key={index + 1}
            className="col-span-2 md:col-span-1 aspect-square cursor-pointer overflow-hidden rounded-lg group relative"
            onClick={() => openGallery(index + 1)}
          >
            <img 
              src={image} 
              alt={`${title} - ${index + 2}`}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  +{images.length - 5} more
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fullscreen Gallery Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={() => closeGallery()}>
        <DialogContent className="max-w-7xl h-[90vh] p-0">
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
              onClick={closeGallery}
            >
              <X className="h-6 w-6" />
            </Button>

            {selectedImage !== null && (
              <>
                <img 
                  src={images[selectedImage]} 
                  alt={`${title} - ${selectedImage + 1}`}
                  className="max-w-full max-h-full object-contain"
                />

                {images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-8 w-8" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-8 w-8" />
                    </Button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
                      {selectedImage + 1} / {images.length}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
