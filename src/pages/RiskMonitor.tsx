import { Shield, AlertTriangle } from "lucide-react";

const riskItems = [
  { agreement: "Maruti Suzuki 2023", category: "Wage Escalation", score: 82, level: "High", reasons: ["Open-ended escalation clause", "No cap on DA linkage", "Retrospective applicability"] },
  { agreement: "Tata Steel 2024", category: "Lock-in Period", score: 65, level: "Medium", reasons: ["3-year lock-in with penalty clause", "Limited union flexibility"] },
  { agreement: "L&T 2024", category: "Compliance Burden", score: 45, level: "Medium", reasons: ["Multiple reporting requirements", "Quarterly audit obligations"] },
  { agreement: "Bajaj Auto 2023", category: "Arrears Exposure", score: 72, level: "High", reasons: ["12-month retrospective", "Lump sum arrears ₹8.5Cr estimated"] },
  { agreement: "Hindalco 2022", category: "Liability", score: 38, level: "Low", reasons: ["Standard gratuity provisions", "Well-defined benefit caps"] },
];

const levelStyles: Record<string, string> = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-warning/10 text-warning",
  Low: "bg-success/10 text-success",
};

const scoreColor = (s: number) => s >= 70 ? "text-destructive" : s >= 40 ? "text-warning" : "text-success";

export default function RiskMonitor() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Risk Monitor</h1>
        <p className="text-sm text-muted-foreground mt-1">AI-detected risk exposure across agreements</p>
      </div>

      <div className="space-y-3">
        {riskItems.map((r, i) => (
          <div key={i} className="glass-panel rounded-lg p-5 hover:border-glow transition-all animate-fade-in">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">{r.agreement}</h3>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${levelStyles[r.level]}`}>{r.level}</span>
                </div>
                <p className="text-xs text-muted-foreground">{r.category}</p>
                <ul className="space-y-1 mt-2">
                  {r.reasons.map((reason, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <AlertTriangle className="h-3 w-3 text-warning shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-2xl font-bold font-mono ${scoreColor(r.score)}`}>{r.score}</p>
                <p className="text-[10px] text-muted-foreground uppercase">Risk Score</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
