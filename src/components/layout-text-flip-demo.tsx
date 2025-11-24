"use client";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "framer-motion";

export default function LayoutTextFlipDemo() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <LayoutTextFlip
        text="Find Your"
        words={["Dream Property", "Perfect Home", "Ideal Investment", "Future Space"]}
        duration={3000}
      />
    </motion.div>
  );
}
