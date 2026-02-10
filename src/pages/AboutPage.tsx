import { motion } from "framer-motion";
import { Info, Mail, Phone, MapPin, Leaf, Github, Globe, Heart, Users, Award, Target } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const teamMembers = [
  { name: "Dr. Priya Sharma", role: "AI & Agri Scientist", emoji: "👩‍🔬" },
  { name: "Rajesh Patel", role: "Full Stack Developer", emoji: "👨‍💻" },
  { name: "Sunita Devi", role: "Agricultural Expert", emoji: "👩‍🌾" },
  { name: "Amit Kumar", role: "Data Scientist", emoji: "📊" },
];

export default function AboutPage() {
  const { toast } = useToast();

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
  };

  return (
    <AppLayout>
      <div className="space-y-10">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
          <div className="h-16 w-16 rounded-2xl bg-gradient-hero mx-auto mb-4 flex items-center justify-center">
            <Leaf className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-3">About Digital Farming Assistant</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Empowering Indian farmers with AI-powered insights, government scheme discovery, and real-time agricultural advisory — because every farmer deserves smart farming tools.
          </p>
        </motion.div>

        {/* Mission */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Target, title: "Our Mission", desc: "Bridge the technology gap in Indian agriculture by providing accessible, AI-powered tools to every farmer." },
            { icon: Heart, title: "Our Vision", desc: "A future where no farmer faces crop loss due to lack of information or access to government support." },
            { icon: Award, title: "Impact", desc: "Helping 10M+ farmers increase their yield by 25% and access ₹5000Cr+ in government scheme benefits." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-card border border-border text-center"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary mx-auto mb-3 flex items-center justify-center">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Team */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
            <Users className="h-6 w-6 text-primary" /> Our Team
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-5 shadow-card border border-border text-center"
              >
                <div className="text-4xl mb-3">{m.emoji}</div>
                <h3 className="font-semibold text-sm">{m.name}</h3>
                <p className="text-xs text-muted-foreground">{m.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Mail className="h-5 w-5 text-primary" /> Contact Us</h2>
            <form onSubmit={handleContact} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input placeholder="Your name" className="mt-1" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="you@example.com" className="mt-1" />
              </div>
              <div>
                <Label>Message</Label>
                <Textarea placeholder="How can we help?" className="mt-1" rows={4} />
              </div>
              <Button type="submit" className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90">
                Send Message
              </Button>
            </form>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-card border border-border space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2"><Info className="h-5 w-5 text-primary" /> Get in Touch</h2>
            {[
              { icon: Mail, label: "Email", value: "support@digitalfarming.in" },
              { icon: Phone, label: "Phone", value: "+91 1800-XXX-XXXX (Toll Free)" },
              { icon: MapPin, label: "Office", value: "Pune, Maharashtra, India" },
              { icon: Globe, label: "Website", value: "www.digitalfarmingassistant.in" },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  <p className="text-sm font-medium">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
