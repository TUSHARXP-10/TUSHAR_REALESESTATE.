import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroBanner from "@/assets/hero-banner.jpg";

const Privacy = () => {
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
                Privacy Policy
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
                <h2 className="text-2xl font-bold mb-4">
                  1. Information We Collect
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We collect information you provide directly to us, including your
                  name, email address, phone number, and property preferences. We
                  also collect information automatically when you visit our website,
                  such as your IP address, browser type, and browsing behavior.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">
                  2. How We Use Your Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use the information we collect to provide and improve our
                  services, communicate with you about properties and updates, process
                  your inquiries and site visit requests, personalize your experience,
                  and comply with legal obligations.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell or rent your personal information to third parties.
                  We may share your information with service providers who assist us
                  in operating our website and conducting our business, subject to
                  confidentiality agreements. We may also disclose your information
                  when required by law or to protect our rights.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to
                  protect your personal information against unauthorized access,
                  alteration, disclosure, or destruction. However, no method of
                  transmission over the internet is 100% secure, and we cannot
                  guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">5. Cookies and Tracking</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar tracking technologies to enhance your
                  browsing experience, analyze site traffic, and understand user
                  preferences. You can control cookie settings through your browser,
                  but disabling cookies may affect your ability to use certain
                  features of our website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You have the right to access, correct, or delete your personal
                  information. You may also object to or restrict certain processing
                  of your data. To exercise these rights, please contact us using the
                  information provided below.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">7. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not directed to individuals under the age of 18.
                  We do not knowingly collect personal information from children. If
                  we become aware that we have collected information from a child, we
                  will take steps to delete it promptly.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">
                  8. Changes to This Policy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify
                  you of any material changes by posting the new policy on our website
                  and updating the "Last Updated" date. Your continued use of our
                  services after such changes constitutes acceptance of the updated
                  policy.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions or concerns about this Privacy Policy or
                  our data practices, please contact us at:
                  <br />
                  <br />
                  Email: privacy@propertyhub.com
                  <br />
                  Phone: +91 1800-123-4567
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

export default Privacy;
