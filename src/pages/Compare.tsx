import { GitCompare, ArrowRight, TrendingUp, TrendingDown, Plus, Minus } from "lucide-react";

const comparisonData = [
  {
    category: "Basic Pay",
    clauses: [
      { title: "Base Wage", prev: "₹15,200/month", curr: "₹19,800/month", change: "+30.3%", flag: "Amended", trend: "up" as const },
      { title: "Grade Pay", prev: "₹2,500/month", curr: "₹3,200/month", change: "+28.0%", flag: "Amended", trend: "up" as const },
    ],
  },
  {
    category: "Allowances",
    clauses: [
      { title: "House Rent Allowance", prev: "₹3,000/month", curr: "₹4,500/month", change: "+50.0%", flag: "Amended", trend: "up" as const },
      { title: "Transport Allowance", prev: "₹1,500/month", curr: "₹1,500/month", change: "0%", flag: "Unchanged", trend: "neutral" as const },
      { title: "Shift Allowance", prev: "—", curr: "₹200/shift", change: "New", flag: "New", trend: "up" as const },
    ],
  },
  {
    category: "Bonus & Incentives",
    clauses: [
      { title: "Annual Bonus", prev: "8.33%", curr: "10%", change: "+1.67%", flag: "Amended", trend: "up" as const },
      { title: "Production Incentive (DPI)", prev: "Linked to output", curr: "Linked to ALTS", change: "Restructured", flag: "Amended", trend: "neutral" as const },
    ],
  },
  {
    category: "Retirement",
    clauses: [
      { title: "Gratuity Enhancement", prev: "As per Act", curr: "₹25L ceiling", change: "Enhanced", flag: "Amended", trend: "up" as const },
      { title: "VRS Scheme", prev: "Available", curr: "—", change: "Removed", flag: "Removed", trend: "down" as const },
    ],
  },
];

const flagStyles: Record<string, string> = {
  Amended: "bg-primary/10 text-primary",
  New: "bg-info/10 text-info",
  Removed: "bg-muted text-muted-foreground",
  Unchanged: "bg-muted/50 text-muted-foreground",
};

export default function Compare() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Agreement Comparison</h1>
        <p className="text-sm text-muted-foreground mt-1">Multi-year change intelligence & clause evolution</p>
      </div>

      {/* Comparison Header */}
      <div className="glass-panel rounded-lg p-5">
        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Previous</p>
            <p className="text-lg font-bold text-foreground mt-1">Tata Steel 2021</p>
            <p className="text-xs text-muted-foreground">Settlement · 42 clauses</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-px w-12 bg-border" />
            <GitCompare className="h-5 w-5 text-primary" />
            <div className="h-px w-12 bg-border" />
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Current</p>
            <p className="text-lg font-bold text-gradient-gold mt-1">Tata Steel 2024</p>
            <p className="text-xs text-muted-foreground">Settlement · 48 clauses</p>
          </div>
        </div>

        {/* Summary Pills */}
        <div className="flex justify-center gap-3 mt-4">
          <span className="flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
            <TrendingUp className="h-3 w-3" /> 18 Increased
          </span>
          <span className="flex items-center gap-1 rounded-full bg-info/10 px-3 py-1 text-xs font-medium text-info">
            <Plus className="h-3 w-3" /> 6 New
          </span>
          <span className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            <Minus className="h-3 w-3" /> 2 Removed
          </span>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="space-y-4">
        {comparisonData.map((cat) => (
          <div key={cat.category} className="glass-panel rounded-lg overflow-hidden animate-fade-in">
            <div className="bg-secondary/50 px-5 py-3 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">{cat.category}</h3>
            </div>
            <div className="divide-y divide-border">
              {cat.clauses.map((c, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 px-5 py-3 items-center hover:bg-muted/20 transition-colors">
                  <div className="col-span-3">
                    <p className="text-sm text-foreground font-medium">{c.title}</p>
                  </div>
                  <div className="col-span-2 text-right">
                    <p className="text-sm font-mono text-muted-foreground">{c.prev}</p>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-mono text-foreground font-medium">{c.curr}</p>
                  </div>
                  <div className="col-span-2">
                    <span className={`text-xs font-medium ${
                      c.trend === "up" ? "text-success" : c.trend === "down" ? "text-destructive" : "text-muted-foreground"
                    }`}>
                      {c.change}
                    </span>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${flagStyles[c.flag]}`}>
                      {c.flag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
