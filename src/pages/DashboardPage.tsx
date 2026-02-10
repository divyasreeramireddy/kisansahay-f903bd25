import { motion } from "framer-motion";
import { Cloud, Droplets, Wind, Thermometer, Sprout, Bug, Landmark, Bell, ArrowRight, TrendingUp, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { mockWeather, mockCrops, mockDiseases, mockSchemes, mockNotifications } from "@/lib/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const yieldData = [
  { month: "Jan", yield: 2.1 }, { month: "Feb", yield: 2.4 }, { month: "Mar", yield: 3.0 },
  { month: "Apr", yield: 3.5 }, { month: "May", yield: 4.2 }, { month: "Jun", yield: 4.5 },
];

const fadeIn = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

function DashboardContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Good Morning, Ramesh! 🌾</h1>
        <p className="text-muted-foreground">Here's your farm overview for today.</p>
      </div>

      {/* Weather + Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <motion.div variants={fadeIn} initial="hidden" animate="show" transition={{ delay: 0 }}
          className="md:col-span-2 bg-gradient-hero rounded-2xl p-6 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Current Weather - Pune</p>
              <div className="text-5xl font-bold mt-1">{mockWeather.current.temp}°C</div>
              <p className="mt-1 opacity-80">{mockWeather.current.condition}</p>
            </div>
            <div className="text-6xl">{mockWeather.current.icon}</div>
          </div>
          <div className="flex gap-4 mt-4 text-sm">
            <span className="flex items-center gap-1"><Droplets className="h-4 w-4" /> {mockWeather.current.humidity}%</span>
            <span className="flex items-center gap-1"><Wind className="h-4 w-4" /> {mockWeather.current.wind} km/h</span>
          </div>
        </motion.div>

        {[
          { icon: Sprout, label: "Top Crop", value: "Rice (92%)", color: "text-primary" },
          { icon: Bell, label: "Alerts", value: `${mockNotifications.filter(n => !n.read).length} New`, color: "text-destructive" },
        ].map((stat, i) => (
          <motion.div key={stat.label} variants={fadeIn} initial="hidden" animate="show" transition={{ delay: 0.1 + i * 0.1 }}
            className="bg-card rounded-2xl p-5 shadow-card border border-border">
            <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts + Recommendations */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Yield Chart */}
        <motion.div variants={fadeIn} initial="hidden" animate="show" transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-card rounded-2xl p-6 shadow-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> Yield Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={yieldData}>
              <defs>
                <linearGradient id="yieldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(125, 52%, 33%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(125, 52%, 33%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(45, 15%, 88%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="yield" stroke="hsl(125, 52%, 33%)" fill="url(#yieldGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Crops */}
        <motion.div variants={fadeIn} initial="hidden" animate="show" transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <h3 className="font-semibold flex items-center gap-2 mb-4"><Sprout className="h-5 w-5 text-primary" /> Recommended Crops</h3>
          <div className="space-y-3">
            {mockCrops.slice(0, 4).map((crop) => (
              <div key={crop.name} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{crop.icon}</span>
                  <div>
                    <p className="text-sm font-medium">{crop.name}</p>
                    <p className="text-xs text-muted-foreground">{crop.season}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-primary">{crop.confidence}%</span>
              </div>
            ))}
          </div>
          <Link to="/crops" className="flex items-center gap-1 text-sm text-primary font-medium mt-4 hover:underline">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      {/* Schemes + Alerts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Schemes */}
        <motion.div variants={fadeIn} initial="hidden" animate="show" transition={{ delay: 0.5 }}
          className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <h3 className="font-semibold flex items-center gap-2 mb-4"><Landmark className="h-5 w-5 text-secondary" /> Eligible Schemes</h3>
          <div className="space-y-3">
            {mockSchemes.slice(0, 3).map((scheme) => (
              <Link key={scheme.id} to="/schemes" className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                <span className="text-2xl">{scheme.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{scheme.name}</p>
                  <p className="text-xs text-muted-foreground">{scheme.category}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Disease Alerts */}
        <motion.div variants={fadeIn} initial="hidden" animate="show" transition={{ delay: 0.6 }}
          className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <h3 className="font-semibold flex items-center gap-2 mb-4"><Bug className="h-5 w-5 text-destructive" /> Disease Alerts</h3>
          <div className="space-y-3">
            {mockDiseases.map((d) => (
              <div key={d.name} className="p-3 rounded-xl bg-muted/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium flex items-center gap-2">{d.icon} {d.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    d.severity === "Critical" ? "bg-destructive/10 text-destructive" :
                    d.severity === "High" ? "bg-warning/10 text-warning" : "bg-info/10 text-info"
                  }`}>{d.severity}</span>
                </div>
                <p className="text-xs text-muted-foreground">{d.crop} — {d.treatment}</p>
              </div>
            ))}
          </div>
          <Link to="/disease" className="flex items-center gap-1 text-sm text-primary font-medium mt-4 hover:underline">
            Disease Detection <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return <AppLayout><DashboardContent /></AppLayout>;
}
