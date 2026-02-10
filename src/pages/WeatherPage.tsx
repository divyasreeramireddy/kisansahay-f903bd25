import { motion } from "framer-motion";
import { Cloud, Thermometer, Droplets, Wind, Sun, AlertTriangle, Sprout, Umbrella } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { mockWeather, mockAdvisories } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const tempData = mockWeather.forecast.map((d) => ({ day: d.day, high: d.temp, low: d.low }));

export default function WeatherPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Cloud className="h-6 w-6 text-info" /> Weather & Advisory</h1>
          <p className="text-muted-foreground">Real-time weather data and farming advisories for your location.</p>
        </div>

        {/* Current Weather */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-hero rounded-2xl p-8 text-primary-foreground">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm opacity-80">📍 Pune, Maharashtra</p>
              <div className="text-7xl font-bold mt-2">{mockWeather.current.temp}°C</div>
              <p className="text-lg opacity-80 mt-1">{mockWeather.current.condition}</p>
            </div>
            <div className="text-8xl">{mockWeather.current.icon}</div>
            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: Droplets, label: "Humidity", value: `${mockWeather.current.humidity}%` },
                { icon: Wind, label: "Wind", value: `${mockWeather.current.wind} km/h` },
                { icon: Umbrella, label: "Rain Chance", value: "40%" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <s.icon className="h-5 w-5 mx-auto mb-1 opacity-80" />
                  <p className="text-xs opacity-70">{s.label}</p>
                  <p className="font-bold">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 7-day Forecast */}
        <div className="grid lg:grid-cols-7 gap-3">
          {mockWeather.forecast.map((day, i) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl p-4 shadow-card border border-border text-center hover:shadow-elevated transition-shadow"
            >
              <p className="text-sm font-medium">{day.day}</p>
              <div className="text-3xl my-2">{day.icon}</div>
              <p className="text-sm font-bold">{day.temp}°</p>
              <p className="text-xs text-muted-foreground">{day.low}°</p>
              <p className="text-xs text-muted-foreground mt-1">{day.condition}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Temperature Chart */}
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
            <h3 className="font-semibold flex items-center gap-2 mb-4"><Thermometer className="h-5 w-5 text-destructive" /> Temperature Forecast</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={tempData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(45, 15%, 88%)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="high" stroke="hsl(0, 72%, 51%)" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="low" stroke="hsl(210, 80%, 52%)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Advisories */}
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
            <h3 className="font-semibold flex items-center gap-2 mb-4"><Sprout className="h-5 w-5 text-primary" /> Farming Advisories</h3>
            <div className="space-y-3">
              {mockAdvisories.map((adv, i) => (
                <motion.div
                  key={adv.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{adv.icon}</span>
                    <h4 className="text-sm font-semibold">{adv.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">{adv.message}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Weather Alert */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-warning/10 border border-warning/20 rounded-2xl p-5 flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-warning shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-warning">Weather Alert: Heavy Rainfall Expected</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Heavy rainfall predicted for Thursday-Friday. Consider harvesting mature crops early. Check your PMFBY insurance coverage.
            </p>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
