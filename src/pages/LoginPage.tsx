import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Mail, Phone, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [authType, setAuthType] = useState<"email" | "phone">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: mode === "login" ? "Welcome back!" : "Account created!", description: "Redirecting to dashboard..." });
    setTimeout(() => navigate("/dashboard"), 800);
  };

  const handleOtp = () => {
    setOtpSent(true);
    toast({ title: "OTP Sent", description: "A 6-digit OTP has been sent to your phone." });
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <Leaf key={i} className="absolute text-primary-foreground" style={{
              top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random()})`,
              opacity: 0.3 + Math.random() * 0.4,
              width: 24 + Math.random() * 24,
              height: 24 + Math.random() * 24,
            }} />
          ))}
        </div>
        <div className="relative text-center text-primary-foreground">
          <div className="h-20 w-20 mx-auto mb-6 rounded-2xl bg-secondary flex items-center justify-center">
            <Leaf className="h-10 w-10 text-secondary-foreground" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Digital Farming Assistant</h2>
          <p className="text-primary-foreground/80 max-w-sm mx-auto">
            Smart crop recommendations, disease detection, and government schemes — all powered by AI.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="h-9 w-9 rounded-xl bg-gradient-hero flex items-center justify-center">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">Digital Farming</span>
          </div>

          <h1 className="text-2xl font-bold mb-2">{mode === "login" ? "Welcome back" : "Create account"}</h1>
          <p className="text-muted-foreground mb-6">
            {mode === "login" ? "Sign in to your farming dashboard" : "Start your smart farming journey"}
          </p>

          {/* Auth type toggle */}
          <div className="flex mb-6 bg-muted rounded-lg p-1">
            <button
              onClick={() => { setAuthType("email"); setOtpSent(false); }}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${authType === "email" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}
            >
              <Mail className="inline h-4 w-4 mr-1" /> Email
            </button>
            <button
              onClick={() => { setAuthType("phone"); setOtpSent(false); }}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${authType === "phone" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}
            >
              <Phone className="inline h-4 w-4 mr-1" /> Phone
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {authType === "email" ? (
              <>
                {mode === "signup" && (
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Ramesh Kumar" className="mt-1" />
                  </div>
                )}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="farmer@example.com" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative mt-1">
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="phone">Mobile Number</Label>
                  <Input id="phone" type="tel" placeholder="+91 98765 43210" className="mt-1" />
                </div>
                {!otpSent ? (
                  <Button type="button" onClick={handleOtp} className="w-full bg-gradient-hero text-primary-foreground">
                    Send OTP
                  </Button>
                ) : (
                  <div>
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input id="otp" placeholder="••••••" maxLength={6} className="mt-1 text-center tracking-[0.5em] text-lg" />
                  </div>
                )}
              </>
            )}

            {(authType === "email" || otpSent) && (
              <Button type="submit" className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90">
                {mode === "login" ? "Sign In" : "Create Account"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-primary font-medium hover:underline">
              {mode === "login" ? "Sign up" : "Log in"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
