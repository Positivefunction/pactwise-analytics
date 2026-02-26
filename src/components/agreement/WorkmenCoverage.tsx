import { Users, BarChart3, Building2, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface WorkmenCoverageProps {
  data: {
    categoriesCovered: { category: string; count: number; percentage: number }[];
    categoriesExcluded: string[];
    totalHeadcount: number;
    gradeBreakup: { grade: string; count: number; basicPay: string }[];
    departmentCoverage: { dept: string; count: number }[];
  };
}

const pieColors = [
  "hsl(38, 92%, 55%)",
  "hsl(210, 80%, 55%)",
  "hsl(152, 60%, 45%)",
  "hsl(280, 65%, 60%)",
];

const tooltipStyle = {
  backgroundColor: "hsl(222, 44%, 10%)",
  border: "1px solid hsl(222, 30%, 16%)",
  borderRadius: "8px",
  color: "hsl(210, 40%, 93%)",
  fontSize: 12,
};

export function WorkmenCoverage({ data }: WorkmenCoverageProps) {
  return (
    <div id="workmen-coverage" className="space-y-4 animate-fade-in">
      <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
        <Users className="h-5 w-5 text-primary" />
        Workmen Coverage & Workforce Intelligence
      </h2>

      {/* Total + Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="stat-card flex flex-col items-center justify-center text-center">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Total Workmen Covered</p>
          <p className="text-3xl font-bold text-gradient-gold mt-1">{data.totalHeadcount.toLocaleString()}</p>
        </div>

        <div className="glass-panel rounded-lg p-5 lg:col-span-2">
          <h3 className="text-sm font-semibold text-foreground mb-3">Category Breakdown</h3>
          <div className="flex gap-6">
            <div className="w-40 shrink-0">
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie data={data.categoriesCovered} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="count" stroke="none">
                    {data.categoriesCovered.map((_, i) => (
                      <Cell key={i} fill={pieColors[i % pieColors.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {data.categoriesCovered.map((cat, i) => (
                <div key={cat.category} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: pieColors[i % pieColors.length] }} />
                    <span className="text-muted-foreground">{cat.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-foreground">{cat.count.toLocaleString()}</span>
                    <span className="text-muted-foreground w-10 text-right">{cat.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Excluded Categories */}
      <div className="glass-panel rounded-lg p-5">
        <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-muted-foreground" /> Categories Excluded
        </h3>
        <div className="flex flex-wrap gap-2">
          {data.categoriesExcluded.map((cat) => (
            <span key={cat} className="rounded-full border border-destructive/20 bg-destructive/5 px-3 py-1 text-xs text-destructive/80">
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Grade-wise + Department-wise */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-panel rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" /> Grade-wise Breakup
          </h3>
          <div className="space-y-0.5">
            <div className="grid grid-cols-3 gap-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground pb-2 border-b border-border">
              <span>Grade</span>
              <span className="text-right">Headcount</span>
              <span className="text-right">Basic Pay Range</span>
            </div>
            {data.gradeBreakup.map((g) => (
              <div key={g.grade} className="grid grid-cols-3 gap-2 py-2 text-xs hover:bg-muted/20 transition-colors rounded">
                <span className="text-foreground font-medium">{g.grade}</span>
                <span className="text-right font-mono text-foreground">{g.count.toLocaleString()}</span>
                <span className="text-right font-mono text-muted-foreground">{g.basicPay}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" /> Department-wise Coverage
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data.departmentCoverage} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" horizontal={false} />
              <XAxis type="number" stroke="hsl(215, 20%, 55%)" fontSize={11} />
              <YAxis type="category" dataKey="dept" stroke="hsl(215, 20%, 55%)" fontSize={10} width={120} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} fill="hsl(210, 80%, 55%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
