import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, AlertTriangle, Info, CheckCircle, Megaphone, Trash2 } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { mockNotifications } from "@/lib/mockData";

const typeConfig = {
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", border: "border-warning/20" },
  info: { icon: Info, color: "text-info", bg: "bg-info/10", border: "border-info/20" },
  success: { icon: CheckCircle, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
  danger: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const dismiss = (id: number) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Bell className="h-6 w-6 text-primary" /> Notifications
              {unreadCount > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold">{unreadCount}</span>
              )}
            </h1>
            <p className="text-muted-foreground">Stay updated with alerts, scheme deadlines, and weather warnings.</p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-sm text-primary font-medium hover:underline">Mark all as read</button>
          )}
        </div>

        <div className="space-y-3">
          {notifications.map((n, i) => {
            const config = typeConfig[n.type as keyof typeof typeConfig] || typeConfig.info;
            const Icon = config.icon;
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-start gap-3 p-4 rounded-xl border ${config.border} ${config.bg} ${!n.read ? "ring-1 ring-primary/20" : "opacity-70"}`}
              >
                <Icon className={`h-5 w-5 ${config.color} shrink-0 mt-0.5`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">{n.title}</h3>
                    {!n.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">{n.time}</p>
                </div>
                <button onClick={() => dismiss(n.id)} className="p-1 rounded hover:bg-background transition-colors text-muted-foreground">
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
