import { Bell, AlertTriangle, Clock, Shield } from "lucide-react";

const alerts = [
  { type: "renewal", icon: Clock, title: "Tata Steel Settlement Expiring", desc: "Expires in 45 days (March 2025). Begin renewal preparation.", time: "2 hours ago", severity: "warning" },
  { type: "risk", icon: AlertTriangle, title: "High Risk Clause Detected", desc: "Maruti Suzuki 2023: Open-ended wage escalation clause identified.", time: "5 hours ago", severity: "destructive" },
  { type: "cost", icon: Shield, title: "Cost Threshold Exceeded", desc: "L&T settlement projected cost exceeds ₹15Cr annual threshold.", time: "1 day ago", severity: "warning" },
  { type: "renewal", icon: Clock, title: "Bajaj Auto Agreement Renewal", desc: "90-day reminder: Agreement expires December 2025.", time: "2 days ago", severity: "info" },
  { type: "risk", icon: AlertTriangle, title: "Compliance Risk Flagged", desc: "Hindalco 2022: Productivity-linked clause missing ALTS benchmark.", time: "3 days ago", severity: "warning" },
];

const severityStyles: Record<string, string> = {
  destructive: "border-destructive/30 bg-destructive/5",
  warning: "border-warning/30 bg-warning/5",
  info: "border-info/30 bg-info/5",
};

const iconStyles: Record<string, string> = {
  destructive: "text-destructive",
  warning: "text-warning",
  info: "text-info",
};

export default function Alerts() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Alerts & Notifications</h1>
        <p className="text-sm text-muted-foreground mt-1">Renewal reminders, risk alerts, and cost breaches</p>
      </div>

      <div className="space-y-3">
        {alerts.map((a, i) => (
          <div key={i} className={`rounded-lg border p-4 transition-all hover:bg-muted/20 cursor-pointer animate-fade-in ${severityStyles[a.severity]}`}>
            <div className="flex items-start gap-3">
              <a.icon className={`h-5 w-5 mt-0.5 shrink-0 ${iconStyles[a.severity]}`} />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">{a.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{a.desc}</p>
              </div>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap">{a.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
