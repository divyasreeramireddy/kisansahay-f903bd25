import { useState } from "react";
import { motion } from "framer-motion";
import { Sprout, Thermometer, Droplets, CloudRain, FlaskConical, Gauge, ArrowRight, Star } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { mockCrops } from "@/lib/mockData";

export default function CropRecommendationPage() {
  const [showResults, setShowResults] = useState(false);
  const [nitrogen, setNitrogen] = useState([50]);
  const [phosphorus, setPhosphorus] = useState([40]);
  const [potassium, setPotassium] = useState([45]);
  const [ph, setPh] = useState([6.5]);
  const [rainfall, setRainfall] = useState([120]);
  const [temperature, setTemperature] = useState([28]);
  const [humidity, setHumidity] = useState([65]);

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Sprout className="h-6 w-6 text-primary" /> Smart Crop Recommendation</h1>
          <p className="text-muted-foreground">Enter your soil and weather data to get AI-powered crop suggestions.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Input Form */}
          <form onSubmit={handlePredict} className="lg:col-span-2 bg-card rounded-2xl p-6 shadow-card border border-border space-y-5">
            <h3 className="font-semibold mb-2">Soil & Climate Inputs</h3>

            {[
              { label: "Nitrogen (N)", value: nitrogen, setter: setNitrogen, max: 140, unit: "kg/ha", icon: FlaskConical },
              { label: "Phosphorus (P)", value: phosphorus, setter: setPhosphorus, max: 145, unit: "kg/ha", icon: FlaskConical },
              { label: "Potassium (K)", value: potassium, setter: setPotassium, max: 205, unit: "kg/ha", icon: FlaskConical },
              { label: "Soil pH", value: ph, setter: setPh, max: 14, unit: "", icon: Gauge, step: 0.1 },
              { label: "Rainfall", value: rainfall, setter: setRainfall, max: 300, unit: "mm", icon: CloudRain },
              { label: "Temperature", value: temperature, setter: setTemperature, max: 50, unit: "°C", icon: Thermometer },
              { label: "Humidity", value: humidity, setter: setHumidity, max: 100, unit: "%", icon: Droplets },
            ].map((input) => (
              <div key={input.label}>
                <div className="flex justify-between text-sm mb-1">
                  <Label className="flex items-center gap-1"><input.icon className="h-3.5 w-3.5" /> {input.label}</Label>
                  <span className="font-medium">{input.value[0]}{input.unit}</span>
                </div>
                <Slider value={input.value} onValueChange={input.setter} max={input.max} step={input.step || 1} className="[&_[role=slider]]:bg-primary" />
              </div>
            ))}

            <Button type="submit" className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90">
              Get Recommendations <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          {/* Results */}
          <div className="lg:col-span-3 space-y-4">
            {!showResults ? (
              <div className="bg-card rounded-2xl p-12 shadow-card border border-border text-center">
                <Sprout className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground">Enter Your Data</h3>
                <p className="text-sm text-muted-foreground/70 mt-1">Fill in the soil and climate parameters to get AI-powered crop recommendations.</p>
              </div>
            ) : (
              <>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-hero rounded-2xl p-6 text-primary-foreground">
                  <p className="text-sm opacity-80 mb-1">Best Recommended Crop</p>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">🌾</span>
                    <div>
                      <h2 className="text-3xl font-bold">Rice</h2>
                      <p className="opacity-80">Confidence: 92% • Kharif Season</p>
                    </div>
                  </div>
                </motion.div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { label: "Expected Yield", value: "4.5 tons/ha", icon: "📊" },
                    { label: "Best Season", value: "Kharif (June–Oct)", icon: "📅" },
                    { label: "Fertilizer", value: "NPK 120:60:40", icon: "🧪" },
                  ].map((s) => (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="bg-card rounded-xl p-4 shadow-card border border-border text-center">
                      <span className="text-2xl">{s.icon}</span>
                      <p className="text-xs text-muted-foreground mt-2">{s.label}</p>
                      <p className="text-sm font-bold">{s.value}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
                  <h3 className="font-semibold mb-3">All Recommendations</h3>
                  <div className="space-y-3">
                    {mockCrops.map((crop, i) => (
                      <motion.div key={crop.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{crop.icon}</span>
                          <div>
                            <p className="text-sm font-medium">{crop.name}</p>
                            <p className="text-xs text-muted-foreground">{crop.season} • Yield: {crop.yield}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${crop.confidence}%` }} />
                          </div>
                          <span className="text-sm font-bold text-primary w-10 text-right">{crop.confidence}%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
