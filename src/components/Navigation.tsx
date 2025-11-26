import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu as MenuIcon, X, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, MenuItem, HoveredLink } from "@/components/ui/navbar-menu";
import logo from "@/assets/logo.png";
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navLinks = [{
    path: "/about",
    label: "ABOUT US"
  }, {
    path: "/projects",
    label: "PROJECTS"
  }, {
    path: "/find-home",
    label: "FIND YOUR PERFECT HOME"
  }, {
    path: "/blog",
    label: "BLOG POST"
  }, {
    path: "/contact",
    label: "CONTACT US"
  }];
  const isActive = (path: string) => location.pathname === path;
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-110">
              <img src={logo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-display text-xl font-bold text-primary hidden md:block"> PropertyHub
(Tushar.dev)</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <DesktopMenu />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex" aria-label="Language selector">
              <Languages className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: "auto"
      }} exit={{
        opacity: 0,
        height: 0
      }} transition={{
        duration: 0.3
      }} className="lg:hidden border-t border-border bg-background">
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map(link => <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)} className={`block py-3 px-4 rounded-lg transition-colors ${isActive(link.path) ? "bg-primary/10 text-primary font-semibold" : "text-foreground hover:bg-muted"}`}>
                  {link.label}
                </Link>)}
            </div>
          </motion.div>}
      </AnimatePresence>
    </nav>;
};
function DesktopMenu() {
  const [active, setActive] = useState<string | null>(null);
  return <Menu setActive={setActive}>
      <MenuItem setActive={setActive} active={active} item="About">
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/about">Our Story</HoveredLink>
          <HoveredLink href="/about#team">Our Team</HoveredLink>
          <HoveredLink href="/about#mission">Our Mission</HoveredLink>
        </div>
      </MenuItem>
      
      <MenuItem setActive={setActive} active={active} item="Properties">
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/projects">All Projects</HoveredLink>
          <HoveredLink href="/find-home">Find Your Home</HoveredLink>
          <HoveredLink href="/projects?type=residential">Residential</HoveredLink>
          <HoveredLink href="/projects?type=commercial">Commercial</HoveredLink>
        </div>
      </MenuItem>
      
      <MenuItem setActive={setActive} active={active} item="Resources">
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/blog">Blog Posts</HoveredLink>
          <HoveredLink href="/contact">Contact Us</HoveredLink>
        </div>
      </MenuItem>
    </Menu>;
}
export default Navigation;