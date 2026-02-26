import { DollarSign, TrendingUp, ArrowRight } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface CostStructureProps {
  data: {
    fixed: { component: string; monthly: number; pctOfTotal: number }[];
    variable: { component: string; monthly: number; pctOfTotal: number }[];
    deferred: { component: string; monthly: number; pctOfTotal: number }[];
    fixedPct: number;
    variablePct: number;
    deferredPct: number;
    previousFixedPct: number;
    previousVariablePct: number;
    previousDeferredPct: number;
  };
}

const fmt = (n: number) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  return `₹${(n / 100000).toFixed(1)} L`;
};

const pieData = (d: CostStructureProps["data"]) => [
  { name: "Fixed", value: d.fixedPct, fill: "hsl(38, 92%, 55%)" },
  { name: "Variable", value: d.variablePct, fill: "hsl(210, 80%, 55%)" },
  { name: "Deferred", value: d.deferredPct, fill: "hsl(152, 60%, 45%)" },
];

const tooltipStyle = {
  backgroundColor: "hsl(222, 44%, 10%)",
  border: "1px solid hsl(222, 30%, 16%)",
  borderRadius: "8px",
  color: "hsl(210, 40%, 93%)",
  fontSize: 12,
};

const sectionConfig = [
  { key: "fixed" as const, label: "Fixed Cost Components", color: "hsl(38, 92%, 55%)", dotClass: "bg-primary" },
  { key: "variable" as const, label: "Variable Cost Components", color: "hsl(210, 80%, 55%)", dotClass: "bg-info" },
  { key: "deferred" as const, label: "Deferred Cost Components", color: "hsl(152, 60%, 45%)", dotClass: "bg-success" },
];

export function CostStructure({ data }: CostStructureProps) {
  return (
    <div id="cost-structure" className="space-y-4 animate-fade-in">
      <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
        <DollarSign className="h-5 w-5 text-primary" />
        Cost Structure Breakdown
      </h2>

      {/* Ratio Overview */}
      <div className="glass-panel rounded-lg p-5">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="w-48 shrink-0">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={pieData(data)} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" stroke="none">
                  {pieData(data).map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Fixed : Variable : Deferred Ratio</h3>

            {/* Current vs Previous */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground uppercase mb-1">Previous</p>
                <p className="font-mono text-sm text-muted-foreground">
                  {data.previousFixedPct} : {data.previousVariablePct} : {data.previousDeferredPct}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="text-center">
                <p className="text-[10px] text-primary uppercase mb-1">Current</p>
                <p className="font-mono text-sm font-bold text-foreground">
                  {data.fixedPct} : {data.variablePct} : {data.deferredPct}
                </p>
              </div>
            </div>

            {/* Legend + shift indicators */}
            <div className="flex flex-wrap gap-4">
              {[
                { label: "Fixed", pct: data.fixedPct, prev: data.previousFixedPct, color: "bg-primary" },
                { label: "Variable", pct: data.variablePct, prev: data.previousVariablePct, color: "bg-info" },
                { label: "Deferred", pct: data.deferredPct, prev: data.previousDeferredPct, color: "bg-success" },
              ].map((item) => {
                const diff = item.pct - item.prev;
                return (
                  <div key={item.label} className="flex items-center gap-2 text-xs">
                    <span className={`h-3 w-3 rounded-full ${item.color}`} />
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-mono text-foreground">{item.pct}%</span>
                    <span className={`text-[10px] ${diff > 0 ? "text-success" : diff < 0 ? "text-destructive" : "text-muted-foreground"}`}>
                      ({diff > 0 ? "+" : ""}{diff.toFixed(1)}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Component Tables */}
      {sectionConfig.map((section) => {
        const items = data[section.key];
        return (
          <div key={section.key} className="glass-panel rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 bg-secondary/50 px-5 py-3 border-b border-border">
              <span className={`h-2.5 w-2.5 rounded-full ${section.dotClass}`} />
              <h3 className="text-sm font-semibold text-foreground">{section.label}</h3>
            </div>
            <div className="divide-y divide-border">
              <div className="grid grid-cols-3 gap-4 px-5 py-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                <span>Component</span>
                <span className="text-right">Monthly Cost</span>
                <span className="text-right">% of Total</span>
              </div>
              {items.map((item) => (
                <div key={item.component} className="grid grid-cols-3 gap-4 px-5 py-2.5 hover:bg-muted/20 transition-colors">
                  <span className="text-sm text-foreground">{item.component}</span>
                  <span className="text-sm font-mono text-foreground text-right">{fmt(item.monthly)}</span>
                  <span className="text-sm font-mono text-muted-foreground text-right">{item.pctOfTotal}%</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
