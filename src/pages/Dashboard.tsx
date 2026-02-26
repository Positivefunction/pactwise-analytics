import { FileText, BarChart3, Shield, TrendingUp, AlertTriangle, Users } from "lucide-react";
import { StatCard } from "../components/StatCard";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";

const wageData = [
  { year: "2010", wage: 8500 },
  { year: "2013", wage: 11200 },
  { year: "2016", wage: 14800 },
  { year: "2018", wage: 17500 },
  { year: "2021", wage: 21300 },
  { year: "2024", wage: 26000 },
];

const clauseDistribution = [
  { name: "Monetary", value: 142, fill: "hsl(38, 92%, 55%)" },
  { name: "Operational", value: 89, fill: "hsl(210, 80%, 55%)" },
  { name: "Welfare", value: 67, fill: "hsl(152, 60%, 45%)" },
  { name: "Discipline", value: 34, fill: "hsl(0, 72%, 55%)" },
  { name: "Other", value: 28, fill: "hsl(280, 65%, 60%)" },
];

const riskData = [
  { category: "Wage Escalation", score: 78 },
  { category: "Lock-in Risk", score: 45 },
  { category: "Arrears Exposure", score: 62 },
  { category: "Compliance", score: 35 },
  { category: "Liability", score: 55 },
];

const recentAgreements = [
  { company: "Tata Steel", location: "Jamshedpur", year: 2024, type: "Settlement", risk: "Medium", clauses: 48 },
  { company: "Maruti Suzuki", location: "Gurugram", year: 2023, type: "Wage Revision", risk: "High", clauses: 62 },
  { company: "L&T", location: "Mumbai", year: 2024, type: "MoU", risk: "Low", clauses: 35 },
  { company: "Bajaj Auto", location: "Pune", year: 2023, type: "Settlement", risk: "Medium", clauses: 51 },
];

const riskColors: Record<string, string> = {
  Low: "text-success",
  Medium: "text-warning",
  High: "text-destructive",
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Multi-year settlement intelligence overview
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Agreements"
          value="127"
          change="+12 this year"
          trend="up"
          icon={<FileText className="h-4 w-4" />}
        />
        <StatCard
          title="Active Clauses"
          value="3,842"
          change="+340 new"
          trend="up"
          icon={<BarChart3 className="h-4 w-4" />}
        />
        <StatCard
          title="Avg Risk Score"
          value="54"
          change="-3 pts"
          trend="down"
          icon={<Shield className="h-4 w-4" />}
          subtitle="out of 100"
        />
        <StatCard
          title="Avg Wage Growth"
          value="8.2%"
          change="+0.4% YoY"
          trend="up"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatCard
          title="Expiring Soon"
          value="14"
          change="Next 90 days"
          trend="neutral"
          icon={<AlertTriangle className="h-4 w-4" />}
        />
        <StatCard
          title="Companies"
          value="42"
          change="+5 new"
          trend="up"
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Wage Growth Chart */}
        <div className="glass-panel rounded-lg p-5 lg:col-span-2">
          <h3 className="text-sm font-semibold text-foreground mb-4">Wage Growth Trend (₹/month)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={wageData}>
              <defs>
                <linearGradient id="wageGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
              <XAxis dataKey="year" stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222, 44%, 10%)",
                  border: "1px solid hsl(222, 30%, 16%)",
                  borderRadius: "8px",
                  color: "hsl(210, 40%, 93%)",
                  fontSize: 12,
                }}
              />
              <Area type="monotone" dataKey="wage" stroke="hsl(38, 92%, 55%)" fill="url(#wageGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Clause Distribution */}
        <div className="glass-panel rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Clause Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={clauseDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                {clauseDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222, 44%, 10%)",
                  border: "1px solid hsl(222, 30%, 16%)",
                  borderRadius: "8px",
                  color: "hsl(210, 40%, 93%)",
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2">
            {clauseDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.fill }} />
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk + Recent */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Risk Scores */}
        <div className="glass-panel rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Risk Assessment Overview</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={riskData} layout="vertical" barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <YAxis type="category" dataKey="category" stroke="hsl(215, 20%, 55%)" fontSize={11} width={110} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222, 44%, 10%)",
                  border: "1px solid hsl(222, 30%, 16%)",
                  borderRadius: "8px",
                  color: "hsl(210, 40%, 93%)",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="score" radius={[0, 4, 4, 0]} fill="hsl(38, 92%, 55%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Agreements */}
        <div className="glass-panel rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Recent Agreements</h3>
          <div className="space-y-2">
            {recentAgreements.map((a, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-4 py-3 transition-colors hover:bg-muted/60 cursor-pointer"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{a.company}</p>
                  <p className="text-xs text-muted-foreground">
                    {a.location} · {a.type} · {a.clauses} clauses
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-muted-foreground">{a.year}</span>
                  <p className={`text-xs font-medium ${riskColors[a.risk]}`}>{a.risk} Risk</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
