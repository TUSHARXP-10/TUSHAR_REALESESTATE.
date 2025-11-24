import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroBanner from "@/assets/hero-banner.jpg";
import building1 from "@/assets/building-1.jpg";
import building2 from "@/assets/building-2.jpg";
import building3 from "@/assets/building-3.jpg";

const Blog = () => {
  const blogPosts = [
    {
      id: "1",
      title: "Top 10 Things to Consider When Buying Your First Home",
      excerpt:
        "Buying your first home is an exciting milestone. Here are the essential factors you should consider before making this important decision.",
      image: building1,
      date: "January 15, 2024",
      readTime: "5 min read",
    },
    {
      id: "2",
      title: "Real Estate Investment: Residential vs Commercial Properties",
      excerpt:
        "Explore the pros and cons of investing in residential and commercial properties to make an informed investment decision.",
      image: building2,
      date: "January 10, 2024",
      readTime: "7 min read",
    },
    {
      id: "3",
      title: "Understanding RERA: What Homebuyers Need to Know",
      excerpt:
        "Learn about the Real Estate Regulation and Development Act and how it protects homebuyers' interests in India.",
      image: building3,
      date: "January 5, 2024",
      readTime: "6 min read",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20">
        <div
          className="relative h-80 bg-cover bg-center"
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
                Blog & Insights
              </h1>
              <p className="text-xl text-white/90">
                Expert advice and industry insights to guide your real estate journey
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group hover:shadow-medium transition-all">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>

                    <Button
                      variant="link"
                      className="p-0 h-auto font-semibold"
                      asChild
                    >
                      <Link to={`/blog/${post.id}`}>
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
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

export default Blog;
