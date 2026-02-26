import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line
} from "recharts";

const wageGrowth = [
  { year: "2010", pct: 5.2 }, { year: "2012", pct: 6.1 }, { year: "2014", pct: 7.5 },
  { year: "2016", pct: 8.0 }, { year: "2018", pct: 7.8 }, { year: "2020", pct: 6.5 },
  { year: "2022", pct: 8.2 }, { year: "2024", pct: 9.1 },
];

const categoryGrowth = [
  { name: "Basic Pay", growth: 30 },
  { name: "Allowances", growth: 42 },
  { name: "Bonus", growth: 18 },
  { name: "Incentives", growth: 25 },
  { name: "Retirement", growth: 35 },
  { name: "Medical", growth: 55 },
];

const riskTrend = [
  { year: "2015", score: 42 }, { year: "2017", score: 48 }, { year: "2019", score: 52 },
  { year: "2021", score: 58 }, { year: "2023", score: 54 }, { year: "2025", score: 50 },
];

const tooltipStyle = {
  backgroundColor: "hsl(222, 44%, 10%)",
  border: "1px solid hsl(222, 30%, 16%)",
  borderRadius: "8px",
  color: "hsl(210, 40%, 93%)",
  fontSize: 12,
};

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Multi-year trends and pattern analysis</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {["All Companies", "All Locations", "All Years", "All Types"].map((f) => (
          <button key={f} className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Wage Growth */}
        <div className="glass-panel rounded-lg p-5 animate-fade-in">
          <h3 className="text-sm font-semibold text-foreground mb-4">Wage Growth Trend (%)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={wageGrowth}>
              <defs>
                <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
              <XAxis dataKey="year" stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="pct" stroke="hsl(38, 92%, 55%)" fill="url(#ag)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Growth */}
        <div className="glass-panel rounded-lg p-5 animate-fade-in">
          <h3 className="text-sm font-semibold text-foreground mb-4">Category Growth (% over 10 years)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categoryGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
              <XAxis dataKey="name" stroke="hsl(215, 20%, 55%)" fontSize={11} />
              <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="growth" radius={[4, 4, 0, 0]} fill="hsl(210, 80%, 55%)" barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Trend */}
        <div className="glass-panel rounded-lg p-5 lg:col-span-2 animate-fade-in">
          <h3 className="text-sm font-semibold text-foreground mb-4">Risk Score Progression</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={riskTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
              <XAxis dataKey="year" stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <YAxis domain={[0, 100]} stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="score" stroke="hsl(0, 72%, 55%)" strokeWidth={2} dot={{ fill: "hsl(0, 72%, 55%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
