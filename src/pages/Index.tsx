import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Users, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import heroBanner from "@/assets/hero-banner.jpg";
import building1 from "@/assets/building-1.jpg";
import building2 from "@/assets/building-2.jpg";
import building3 from "@/assets/building-3.jpg";
import aboutTeam from "@/assets/about-team.jpg";

const Index = () => {
  const [selectedCity, setSelectedCity] = useState("");

  const cities = [
    "PUNE",
    "MUMBAI",
    "BANGALORE",
    "DELHI",
    "HYDERABAD",
    "CHENNAI",
  ];

  const featuredProjects = [
    {
      id: "1",
      image: building1,
      name: "Green Valley Heights",
      location: "Kharadi, Pune",
      price: "85L+",
      type: "Residential",
      bhk: "2 & 3 BHK",
      match: 90,
    },
    {
      id: "2",
      image: building2,
      name: "Tech Park Plaza",
      location: "Hinjewadi, Pune",
      price: "2.5Cr+",
      type: "Commercial",
      match: 80,
    },
    {
      id: "3",
      image: building3,
      name: "Sunset Residency",
      location: "Wakad, Pune",
      price: "95L+",
      type: "Residential",
      bhk: "3 & 4 BHK",
      match: 75,
    },
  ];

  const stats = [
    { icon: Building2, value: "500+", label: "Projects Completed" },
    { icon: Users, value: "10,000+", label: "Happy Families" },
    { icon: Award, value: "50+", label: "Awards Won" },
    { icon: TrendingUp, value: "25+", label: "Years Experience" },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Homeowner",
      content:
        "PropertyHub helped us find our dream home in Pune. The entire process was smooth and professional. Highly recommended!",
      image: building1,
    },
    {
      name: "Priya Sharma",
      role: "Investor",
      content:
        "Excellent service and genuine properties. The team was very helpful in understanding my investment needs.",
      image: building2,
    },
    {
      name: "Amit Patel",
      role: "First-time Buyer",
      content:
        "As a first-time buyer, I was nervous, but PropertyHub made everything easy to understand. Great experience!",
      image: building3,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section with Location Selector */}
      <section className="relative pt-20">
        <div
          className="relative h-[500px] bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl text-white space-y-6"
            >
              <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight">
                Find Your Perfect Home
              </h1>
              <p className="text-xl text-white/90">
                Discover exceptional properties across India's prime locations
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/find-home">
                  Start Your Search <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Location Selector */}
        <div className="bg-white border-t-4 border-primary shadow-medium">
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-center mb-6">
              Select Your Location
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {cities.map((city) => (
                <motion.button
                  key={city}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCity(city)}
                  className={`p-4 rounded-lg border-2 font-semibold transition-all ${
                    selectedCity === city
                      ? "border-primary bg-primary text-white shadow-medium"
                      : "border-border hover:border-primary hover:bg-primary/5"
                  }`}
                >
                  {city}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our handpicked selection of premium properties
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PropertyCard {...project} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link to="/projects">
                View All Projects <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={aboutTeam}
                alt="About PropertyHub"
                className="rounded-2xl shadow-strong w-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-display font-bold">
                Building Trust, Creating Homes
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                With over 25 years of excellence in real estate, PropertyHub has been
                transforming dreams into reality. Our commitment to quality,
                transparency, and customer satisfaction has made us a trusted name in
                the industry.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                From residential complexes to commercial spaces, we deliver projects
                that blend modern architecture with sustainable living, creating
                communities that thrive.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20"
                  >
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button asChild size="lg">
                <Link to="/about">
                  Learn More About Us <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real stories from real people who found their dream homes with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-medium transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-xl text-white/90">
              Let us help you discover the perfect property that matches your needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
              >
                <Link to="/find-home">Take Our Quiz</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
