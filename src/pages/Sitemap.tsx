import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroBanner from "@/assets/hero-banner.jpg";

const Sitemap = () => {
  const siteStructure = [
    {
      section: "Main Pages",
      links: [
        { path: "/", label: "Home" },
        { path: "/about", label: "About Us" },
        { path: "/projects", label: "Projects" },
        { path: "/find-home", label: "Find Your Perfect Home" },
        { path: "/blog", label: "Blog" },
        { path: "/contact", label: "Contact Us" },
      ],
    },
    {
      section: "Legal",
      links: [
        { path: "/terms", label: "Terms & Conditions" },
        { path: "/privacy", label: "Privacy Policy" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20">
        <div
          className="relative h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h1 className="text-5xl md:text-6xl font-display font-bold">
                Sitemap
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {siteStructure.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">{section.section}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.path}>
                          <Link
                            to={link.path}
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                          >
                            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            <span>{link.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sitemap;
