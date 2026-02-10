import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Sprout, Bug, Landmark, Cloud, MessageCircle,
  Bell, Info, User, LogOut, Menu, X, Leaf, ChevronRight
} from "lucide-react";

const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Crop Recommendation", path: "/crops", icon: Sprout },
  { title: "Disease Detection", path: "/disease", icon: Bug },
  { title: "Government Schemes", path: "/schemes", icon: Landmark },
  { title: "Weather & Advisory", path: "/weather", icon: Cloud },
  { title: "AI Assistant", path: "/chat", icon: MessageCircle },
  { title: "Notifications", path: "/notifications", icon: Bell },
  { title: "About & Contact", path: "/about", icon: Info },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-[68px]"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground font-bold text-lg">
            <Leaf className="h-5 w-5" />
          </div>
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden">
              <h1 className="text-sm font-bold leading-tight text-sidebar-foreground">Digital Farming</h1>
              <p className="text-xs text-sidebar-foreground/60">Assistant</p>
            </motion.div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <item.icon className={`h-5 w-5 shrink-0 ${isActive ? "" : "group-hover:scale-110 transition-transform"}`} />
                {sidebarOpen && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Profile */}
        <div className="border-t border-sidebar-border p-3">
          <Link
            to="/profile"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground text-sm font-bold shrink-0">
              R
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-sidebar-foreground">Ramesh Kumar</p>
                <p className="text-xs text-sidebar-foreground/60">Maharashtra</p>
              </div>
            )}
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center gap-4 px-4 lg:px-6 py-3 bg-background/80 backdrop-blur-md border-b border-border">
          <button
            onClick={() => {
              if (window.innerWidth < 1024) setMobileOpen(!mobileOpen);
              else setSidebarOpen(!sidebarOpen);
            }}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1" />
          <Link to="/notifications" className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
          </Link>
          <Link to="/profile" className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
            R
          </Link>
        </header>

        <div className="flex-1 p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
