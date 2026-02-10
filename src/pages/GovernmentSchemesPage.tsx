import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, Search, ExternalLink, ChevronDown, ChevronUp, FileText, Calendar, CheckCircle, ArrowRight, Filter } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockSchemes } from "@/lib/mockData";

const categories = ["All", "Crop Insurance", "Irrigation", "Loan & Credit", "Soil Health", "Farm Equipment", "Seed & Fertilizer"];

export default function GovernmentSchemesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = mockSchemes.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === "All" || s.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Landmark className="h-6 w-6 text-secondary" /> Government Agriculture Schemes</h1>
          <p className="text-muted-foreground">Discover schemes you're eligible for, filtered by your profile and location.</p>
        </div>

        {/* AI Recommendation Banner */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-gold rounded-2xl p-6 text-secondary-foreground">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🤖</span>
            <div>
              <h3 className="font-bold text-lg">AI Scheme Recommendation</h3>
              <p className="text-sm opacity-80 mt-1">Based on your profile (5 acres, Black soil, Maharashtra), we recommend <strong>PMFBY</strong> for crop insurance and <strong>KCC</strong> for affordable credit.</p>
            </div>
          </div>
        </motion.div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search schemes..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Schemes List */}
        <div className="space-y-4">
          {filtered.map((scheme, i) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-2xl shadow-card border border-border overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(expandedId === scheme.id ? null : scheme.id)}
                className="w-full p-5 flex items-center gap-4 text-left hover:bg-muted/30 transition-colors"
              >
                <span className="text-3xl">{scheme.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{scheme.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{scheme.category}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> {scheme.deadline}</span>
                  </div>
                </div>
                {expandedId === scheme.id ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
              </button>

              <AnimatePresence>
                {expandedId === scheme.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
                      <div>
                        <h4 className="text-sm font-semibold text-primary mb-1">Objective</h4>
                        <p className="text-sm text-muted-foreground">{scheme.objective}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-primary mb-1">Eligibility</h4>
                        <p className="text-sm text-muted-foreground">{scheme.eligibility}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-primary mb-1">Benefits</h4>
                        <p className="text-sm text-muted-foreground">{scheme.benefits}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-primary mb-1">Required Documents</h4>
                        <div className="flex flex-wrap gap-2">
                          {scheme.documents.map((doc) => (
                            <span key={doc} className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-muted text-muted-foreground">
                              <FileText className="h-3 w-3" /> {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-primary mb-1">Application Steps</h4>
                        <ol className="space-y-1">
                          {scheme.applicationSteps.map((step, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="h-5 w-5 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{j + 1}</span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                      <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-gradient-hero text-primary-foreground hover:opacity-90">
                          Apply Now <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
