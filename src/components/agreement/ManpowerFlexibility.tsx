import { Wrench, CheckCircle, AlertCircle, XCircle, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ManpowerFlexibilityProps {
  data: {
    detected: {
      aspect: string;
      status: "detected" | "partial" | "not_detected";
      detail: string;
    }[];
    classifications: {
      label: string;
      direction: "up" | "down" | "neutral";
    }[];
  };
}

const statusConfig = {
  detected: { icon: CheckCircle, color: "text-success", bg: "bg-success/10", label: "Detected" },
  partial: { icon: AlertCircle, color: "text-warning", bg: "bg-warning/10", label: "Partial" },
  not_detected: { icon: XCircle, color: "text-muted-foreground", bg: "bg-muted/50", label: "Not Found" },
};

const directionConfig = {
  up: { icon: TrendingUp, color: "text-success", label: "↑" },
  down: { icon: TrendingDown, color: "text-destructive", label: "↓" },
  neutral: { icon: Minus, color: "text-muted-foreground", label: "—" },
};

export function ManpowerFlexibility({ data }: ManpowerFlexibilityProps) {
  return (
    <div id="manpower-&-productivity" className="space-y-4 animate-fade-in">
      <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
        <Wrench className="h-5 w-5 text-primary" />
        Manpower Flexibility & Productivity Analysis
      </h2>

      {/* Classifications */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {data.classifications.map((c) => {
          const dir = directionConfig[c.direction];
          return (
            <div key={c.label} className="stat-card flex items-center gap-3">
              <dir.icon className={`h-5 w-5 shrink-0 ${dir.color}`} />
              <p className="text-xs font-medium text-foreground">{c.label}</p>
            </div>
          );
        })}
      </div>

      {/* Detection Grid */}
      <div className="space-y-2">
        {data.detected.map((item) => {
          const config = statusConfig[item.status];
          const Icon = config.icon;
          return (
            <div key={item.aspect} className="glass-panel rounded-lg p-4 hover:border-glow transition-all">
              <div className="flex items-start gap-3">
                <div className={`flex h-7 w-7 items-center justify-center rounded-md ${config.bg} shrink-0 mt-0.5`}>
                  <Icon className={`h-4 w-4 ${config.color}`} />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{item.aspect}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${config.bg} ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
