import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf, Sprout, Bug, Landmark, Cloud, MessageCircle, ArrowRight, ChevronRight, Shield, BarChart3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-farm.jpg";

const features = [
  { icon: Sprout, title: "Smart Crop Recommendation", desc: "AI-powered suggestions based on soil, weather, and location data.", color: "bg-primary/10 text-primary" },
  { icon: Bug, title: "Disease Detection", desc: "Upload a leaf image to instantly detect crop diseases.", color: "bg-destructive/10 text-destructive" },
  { icon: Landmark, title: "Government Schemes", desc: "Discover and apply for agriculture subsidies and schemes.", color: "bg-secondary/20 text-secondary-foreground" },
  { icon: Cloud, title: "Weather Advisory", desc: "Real-time weather data and farming advisories.", color: "bg-info/10 text-info" },
  { icon: MessageCircle, title: "AI Chat Assistant", desc: "Ask any farming question and get instant expert answers.", color: "bg-accent text-accent-foreground" },
  { icon: Shield, title: "Crop Insurance", desc: "Find the best insurance schemes and file claims easily.", color: "bg-warning/10 text-warning" },
];

const stats = [
  { value: "10M+", label: "Farmers Served" },
  { value: "500+", label: "Schemes Listed" },
  { value: "50+", label: "Crop Models" },
  { value: "28", label: "States Covered" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-hero flex items-center justify-center">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">Digital Farming</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#schemes" className="hover:text-foreground transition-colors">Schemes</a>
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/login">
              <Button size="sm" className="bg-gradient-hero text-primary-foreground hover:opacity-90">
                Get Started <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImage} alt="Smart farming" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        </div>
        <div className="container py-24 lg:py-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sprout className="h-4 w-4" /> AI-Powered Agriculture Platform
            </span>
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-6">
              Grow Smarter with{" "}
              <span className="text-gradient-primary">Digital Farming</span>{" "}
              Assistant
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Get AI-powered crop recommendations, detect diseases instantly, discover government schemes, and access real-time weather advisories — all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/login">
                <Button size="lg" className="bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-elevated text-base px-8">
                  Start Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="outline" className="text-base px-8">
                  Explore Features
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-extrabold text-gradient-primary">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-28">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Everything You Need to Farm Smart</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines AI, weather data, and government resources to empower every farmer.
            </p>
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={item}
                className="group p-6 rounded-2xl bg-card shadow-card border border-border hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`h-12 w-12 rounded-xl ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-hero">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join millions of farmers who use Digital Farming Assistant to increase their yield and income.
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:opacity-90 text-base px-10 font-bold shadow-elevated">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="font-bold">Digital Farming Assistant</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 Digital Farming Assistant. Empowering farmers with technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
