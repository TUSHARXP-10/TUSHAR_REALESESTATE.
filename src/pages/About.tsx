import { motion } from "framer-motion";
import { Award, Users, Building2, Target } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import aboutTeam from "@/assets/about-team.jpg";
import heroBanner from "@/assets/hero-banner.jpg";

const About = () => {
  const awards = [
    { year: "2023", title: "Best Real Estate Developer - Maharashtra" },
    { year: "2022", title: "Excellence in Customer Service Award" },
    { year: "2021", title: "Sustainable Development Award" },
    { year: "2020", title: "Innovation in Architecture Award" },
  ];

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To create exceptional living and working spaces that enhance the quality of life for our customers while maintaining the highest standards of integrity and excellence.",
    },
    {
      icon: Building2,
      title: "Quality Commitment",
      description:
        "Every project is built with premium materials and meticulous attention to detail, ensuring lasting value and satisfaction for our clients.",
    },
    {
      icon: Users,
      title: "Customer First",
      description:
        "We believe in building relationships, not just properties. Our customer-centric approach ensures personalized service at every step.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20">
        <div
          className="relative h-96 bg-cover bg-center"
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
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
                About PropertyHub
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Building dreams, creating communities, delivering excellence since 1998
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-display font-bold">Our Story</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Founded in 1998, PropertyHub began with a simple vision: to create
                homes that people would be proud to call their own. What started as a
                small team of passionate architects and builders has grown into one of
                India's most trusted real estate developers.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Over the past 25 years, we've completed over 500 projects across major
                Indian cities, providing homes to more than 10,000 families. Our
                journey has been marked by innovation, sustainability, and an
                unwavering commitment to customer satisfaction.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Today, PropertyHub stands as a symbol of trust and excellence in the
                real estate industry, continuing to set new benchmarks in quality,
                design, and customer service.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={aboutTeam}
                alt="PropertyHub Team"
                className="rounded-2xl shadow-strong w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold mb-4">
              Our Values & Vision
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-medium transition-shadow">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold mb-4">
              Our Leadership
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Meet the visionaries behind PropertyHub's success
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our leadership team brings together decades of experience in real estate
              development, architecture, and customer service. Their vision and
              dedication have been instrumental in making PropertyHub a household name
              in quality real estate.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Led by industry veterans with a passion for innovation and excellence,
              our team continues to push boundaries and set new standards in the
              real estate sector.
            </p>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold mb-4">
              Awards & Recognition
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Recognized for excellence across the industry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-medium transition-shadow">
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary">
                      {award.year}
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      {award.title}
                    </p>
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

export default About;
