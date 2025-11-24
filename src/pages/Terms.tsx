import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroBanner from "@/assets/hero-banner.jpg";

const Terms = () => {
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
                Terms & Conditions
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-lg max-w-none"
          >
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using PropertyHub's website and services, you
                  acknowledge that you have read, understood, and agree to be bound
                  by these Terms and Conditions. If you do not agree with any part
                  of these terms, please do not use our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">2. Property Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All property information, images, prices, and specifications
                  displayed on our website are subject to change without prior
                  notice. While we strive to provide accurate information, we do not
                  guarantee the completeness or accuracy of the content. Interested
                  buyers should verify all details before making any decision.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">3. Booking and Payment</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All bookings are subject to availability and confirmation by
                  PropertyHub. Payment terms, refund policies, and cancellation
                  charges will be clearly communicated at the time of booking. Any
                  deposits or advance payments are governed by the specific project's
                  terms and conditions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">
                  4. Intellectual Property
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content on this website, including but not limited to text,
                  images, graphics, logos, and software, is the property of
                  PropertyHub and protected by copyright and intellectual property
                  laws. Unauthorized use or reproduction is strictly prohibited.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">5. User Conduct</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Users agree to use our website and services only for lawful
                  purposes. Any attempt to interfere with the website's operation,
                  introduce malicious code, or engage in fraudulent activities is
                  strictly prohibited and may result in legal action.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">
                  6. Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  PropertyHub shall not be liable for any direct, indirect,
                  incidental, or consequential damages arising from the use of our
                  website or services. This includes but is not limited to loss of
                  profits, data, or business opportunities.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">7. Privacy and Data</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your use of our services is also governed by our Privacy Policy.
                  We are committed to protecting your personal information and will
                  handle it in accordance with applicable data protection laws.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">8. Modifications</h2>
                <p className="text-muted-foreground leading-relaxed">
                  PropertyHub reserves the right to modify these Terms and Conditions
                  at any time. Changes will be effective immediately upon posting on
                  our website. Continued use of our services after such changes
                  constitutes acceptance of the modified terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">9. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms and Conditions shall be governed by and construed in
                  accordance with the laws of India. Any disputes arising from these
                  terms shall be subject to the exclusive jurisdiction of the courts
                  in Pune, Maharashtra.
                </p>
              </div>

              <div className="pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Last Updated: January 2024
                  <br />
                  CIN: L4520OPN1991PLC129428
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
