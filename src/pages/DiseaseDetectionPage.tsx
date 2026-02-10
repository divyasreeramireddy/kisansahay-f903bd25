import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Bug, Upload, Camera, AlertTriangle, Shield, ArrowRight, X } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";

const mockResult = {
  disease: "Bacterial Leaf Blight",
  confidence: 89,
  severity: "High",
  crop: "Rice",
  symptoms: "Water-soaked lesions on leaf margins that turn yellow and then white. Leaves dry up from tips.",
  treatment: [
    "Apply Streptocycline @ 0.5g/L + Copper oxychloride @ 2.5g/L",
    "Drain excess water from the field",
    "Apply potash fertilizer to strengthen plant resistance",
    "Use resistant varieties like IR64 for future planting",
  ],
  relatedSchemes: [
    { name: "PMFBY - Crop Insurance", desc: "Claim compensation for crop loss due to disease" },
    { name: "Soil Health Card Scheme", desc: "Get soil tested to prevent future disease outbreaks" },
  ],
};

export default function DiseaseDetectionPage() {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<typeof mockResult | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResult(mockResult);
      setAnalyzing(false);
    }, 2000);
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Bug className="h-6 w-6 text-destructive" /> Crop Disease Detection</h1>
          <p className="text-muted-foreground">Upload a photo of your crop leaf to detect diseases instantly using AI.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
            <h3 className="font-semibold mb-4">Upload Leaf Image</h3>
            {!image ? (
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full aspect-[4/3] rounded-xl border-2 border-dashed border-border hover:border-primary transition-colors flex flex-col items-center justify-center gap-3 text-muted-foreground hover:text-primary"
              >
                <Upload className="h-12 w-12" />
                <span className="font-medium">Click to upload or drag & drop</span>
                <span className="text-sm">JPG, PNG up to 10MB</span>
              </button>
            ) : (
              <div className="relative">
                <img src={image} alt="Uploaded leaf" className="w-full aspect-[4/3] object-cover rounded-xl" />
                <button onClick={handleReset} className="absolute top-2 right-2 p-1.5 rounded-full bg-foreground/70 text-background hover:bg-foreground transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />

            {image && !result && (
              <Button onClick={handleAnalyze} disabled={analyzing} className="w-full mt-4 bg-gradient-hero text-primary-foreground">
                {analyzing ? (
                  <span className="flex items-center gap-2"><span className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /> Analyzing...</span>
                ) : (
                  <>Detect Disease <ArrowRight className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            {!result ? (
              <div className="bg-card rounded-2xl p-12 shadow-card border border-border text-center h-full flex flex-col items-center justify-center">
                <Camera className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground">Upload & Analyze</h3>
                <p className="text-sm text-muted-foreground/70 mt-1">Take a clear photo of the affected leaf and upload it for instant detection.</p>
              </div>
            ) : (
              <>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <h2 className="text-xl font-bold text-destructive">{result.disease}</h2>
                      <p className="text-sm text-muted-foreground mt-1">Crop: {result.crop} • Confidence: {result.confidence}%</p>
                      <span className="inline-block mt-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-bold">
                        Severity: {result.severity}
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="bg-card rounded-2xl p-6 shadow-card border border-border">
                  <h3 className="font-semibold mb-2">Symptoms</h3>
                  <p className="text-sm text-muted-foreground">{result.symptoms}</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="bg-card rounded-2xl p-6 shadow-card border border-border">
                  <h3 className="font-semibold mb-3">Recommended Treatment</h3>
                  <ul className="space-y-2">
                    {result.treatment.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="h-5 w-5 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{i + 1}</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="bg-card rounded-2xl p-6 shadow-card border border-border">
                  <h3 className="font-semibold flex items-center gap-2 mb-3"><Shield className="h-5 w-5 text-info" /> Related Schemes</h3>
                  {result.relatedSchemes.map((s) => (
                    <div key={s.name} className="p-3 rounded-xl bg-info/5 border border-info/10 mb-2 last:mb-0">
                      <p className="text-sm font-medium">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                  ))}
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
