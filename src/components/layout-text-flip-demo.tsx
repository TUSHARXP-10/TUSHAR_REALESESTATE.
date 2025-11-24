"use client";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "framer-motion";

export default function LayoutTextFlipDemo() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-start justify-center gap-2 sm:flex-row sm:items-center"
    >
      <LayoutTextFlip
        text="Find Your "
        words={["Perfect Home", "Dream Property", "Ideal Investment", "Future Space"]}
        duration={3000}
      />
    </motion.div>
  );
}
