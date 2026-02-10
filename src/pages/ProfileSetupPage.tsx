import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, MapPin, Ruler, Layers, Sprout, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { indianStates, soilTypes } from "@/lib/mockData";

const steps = ["Personal Info", "Location", "Farm Details"];

export default function ProfileSetupPage() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFinish = () => {
    toast({ title: "Profile Saved!", description: "Your farm profile has been set up successfully." });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Set Up Your Farm Profile</h1>
          <p className="text-muted-foreground">Help us personalize your experience</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && <div className={`w-12 h-0.5 ${i < step ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-card shadow-card rounded-2xl p-6 border border-border">
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input placeholder="Ramesh Kumar" className="mt-1" defaultValue="Ramesh Kumar" />
              </div>
              <div>
                <Label>Mobile Number</Label>
                <Input placeholder="+91 98765 43210" className="mt-1" defaultValue="+91 98765 43210" />
              </div>
              <div>
                <Label>Email (optional)</Label>
                <Input placeholder="farmer@example.com" className="mt-1" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label>State</Label>
                <Select defaultValue="Maharashtra">
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select state" /></SelectTrigger>
                  <SelectContent>
                    {indianStates.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>District</Label>
                <Input placeholder="e.g. Pune" className="mt-1" defaultValue="Pune" />
              </div>
              <div>
                <Label>Village/Town</Label>
                <Input placeholder="e.g. Khed" className="mt-1" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label>Land Size (in acres)</Label>
                <Input type="number" placeholder="e.g. 5" className="mt-1" defaultValue="5" />
              </div>
              <div>
                <Label>Soil Type</Label>
                <Select defaultValue="Black (Regur)">
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select soil type" /></SelectTrigger>
                  <SelectContent>
                    {soilTypes.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Preferred Crops</Label>
                <Input placeholder="e.g. Rice, Wheat, Cotton" className="mt-1" defaultValue="Rice, Wheat" />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
              Back
            </Button>
            {step < 2 ? (
              <Button onClick={() => setStep(step + 1)} className="bg-gradient-hero text-primary-foreground">
                Next <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleFinish} className="bg-gradient-hero text-primary-foreground">
                Complete Setup <Check className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
