import { FileText, Upload, Filter, Calendar, Building2, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockAgreements = [
  {
    id: 1, company: "Tata Steel Ltd", location: "Jamshedpur", union: "Tata Workers' Union",
    type: "Settlement", year: 2024, effective: "2024-01-01", expiry: "2027-12-31",
    clauses: 48, risk: "Medium", status: "Active",
    timeline: [2015, 2018, 2021, 2024],
  },
  {
    id: 2, company: "Maruti Suzuki India", location: "Gurugram", union: "MSIWU",
    type: "Wage Revision", year: 2023, effective: "2023-04-01", expiry: "2026-03-31",
    clauses: 62, risk: "High", status: "Active",
    timeline: [2011, 2014, 2017, 2020, 2023],
  },
  {
    id: 3, company: "Larsen & Toubro", location: "Mumbai", union: "L&T Workers Union",
    type: "MoU", year: 2024, effective: "2024-07-01", expiry: "2027-06-30",
    clauses: 35, risk: "Low", status: "Active",
    timeline: [2018, 2021, 2024],
  },
  {
    id: 4, company: "Bajaj Auto Ltd", location: "Pune", union: "Vishwa Kalyan Kamgar Sanghatana",
    type: "Settlement", year: 2023, effective: "2023-01-01", expiry: "2025-12-31",
    clauses: 51, risk: "Medium", status: "Expiring Soon",
    timeline: [2014, 2017, 2020, 2023],
  },
  {
    id: 5, company: "Hindalco Industries", location: "Renukoot", union: "Hindalco Mazdoor Sabha",
    type: "Settlement", year: 2022, effective: "2022-04-01", expiry: "2025-03-31",
    clauses: 44, risk: "Low", status: "Active",
    timeline: [2013, 2016, 2019, 2022],
  },
];

const statusStyles: Record<string, string> = {
  Active: "bg-success/10 text-success",
  "Expiring Soon": "bg-warning/10 text-warning",
  Expired: "bg-destructive/10 text-destructive",
};

const riskStyles: Record<string, string> = {
  Low: "text-success",
  Medium: "text-warning",
  High: "text-destructive",
};

export default function Agreements() {
  const [view, setView] = useState<"list" | "timeline">("list");
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Agreements</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and browse all industrial settlements</p>
        </div>
        <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Upload className="h-4 w-4" />
          Upload Agreement
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {["All Types", "Settlement", "Wage Revision", "MoU"].map((f) => (
          <button
            key={f}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              f === "All Types"
                ? "bg-primary/10 text-primary border border-primary/30"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {f}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => setView("list")}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              view === "list" ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            List
          </button>
          <button
            onClick={() => setView("timeline")}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              view === "timeline" ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            Timeline
          </button>
        </div>
      </div>

      {/* Agreement Cards */}
      <div className="space-y-3">
        {mockAgreements.map((a) => (
          <div
            key={a.id}
            className="glass-panel rounded-lg p-5 hover:border-glow transition-all cursor-pointer animate-fade-in"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-semibold text-foreground">{a.company}</h3>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusStyles[a.status]}`}>
                    {a.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{a.location}</span>
                  <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{a.union}</span>
                  <span className="flex items-center gap-1"><FileText className="h-3 w-3" />{a.type}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{a.effective} to {a.expiry}</span>
                </div>

                {/* Timeline dots */}
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-[10px] text-muted-foreground mr-1">History:</span>
                  {a.timeline.map((y, i) => (
                    <div key={y} className="flex items-center">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${
                          y === a.year
                            ? "bg-primary/20 text-primary font-semibold"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {y}
                      </span>
                      {i < a.timeline.length - 1 && (
                        <div className="h-px w-4 bg-border mx-0.5" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-right space-y-1 shrink-0">
                <p className="text-lg font-bold font-mono text-foreground">{a.clauses}</p>
                <p className="text-[10px] text-muted-foreground uppercase">Clauses</p>
                <p className={`text-xs font-medium ${riskStyles[a.risk]}`}>{a.risk} Risk</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
