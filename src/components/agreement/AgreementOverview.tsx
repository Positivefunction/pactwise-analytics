import { FileText, Calendar, Building2, MapPin, Shield, AlertTriangle, TrendingUp, Lock, Users, Scale } from "lucide-react";

interface AgreementOverviewProps {
  agreement: {
    type: string;
    effective: string;
    expiry: string;
    duration: string;
    parties: { employer: string; union: string; conciliationOfficer: string };
    categoriesCovered: string[];
    estimatedWorkmen: number;
    overallWageDirection: string;
    majorStructuralShifts: string[];
    incentiveStructureChange: string;
    lockInClauses: string[];
    employerProtectiveClauses: string[];
    unionBenefitClauses: string[];
    settlementNature: string;
  };
}

const natureStyles: Record<string, { bg: string; text: string; desc: string }> = {
  "Wage-heavy": { bg: "bg-warning/10", text: "text-warning", desc: "Settlement is dominated by fixed wage increases with limited productivity linkage." },
  "Productivity-heavy": { bg: "bg-info/10", text: "text-info", desc: "Settlement is driven by performance-linked pay and efficiency targets." },
  "Welfare-enhanced": { bg: "bg-success/10", text: "text-success", desc: "Focus on medical, insurance, retirement and welfare improvements." },
  "Control-strengthened": { bg: "bg-destructive/10", text: "text-destructive", desc: "Management gains significant operational and disciplinary control." },
  "Balanced": { bg: "bg-primary/10", text: "text-primary", desc: "Equitable distribution across wages, productivity, welfare and operational controls." },
};

export function AgreementOverview({ agreement }: AgreementOverviewProps) {
  const nature = natureStyles[agreement.settlementNature] || natureStyles["Balanced"];

  return (
    <div id="overview" className="space-y-4 animate-fade-in">
      <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        Agreement Overview
      </h2>

      {/* Key Metadata Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: FileText, label: "Agreement Type", value: agreement.type },
          { icon: Calendar, label: "Period", value: `${agreement.effective} to ${agreement.expiry}` },
          { icon: Calendar, label: "Duration", value: agreement.duration },
          { icon: Users, label: "Est. Workmen Covered", value: agreement.estimatedWorkmen.toLocaleString() },
        ].map((item) => (
          <div key={item.label} className="stat-card">
            <div className="flex items-center gap-2 mb-1">
              <item.icon className="h-3.5 w-3.5 text-primary" />
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{item.label}</span>
            </div>
            <p className="text-sm font-semibold text-foreground">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Parties Involved */}
      <div className="glass-panel rounded-lg p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Building2 className="h-4 w-4 text-primary" /> Parties Involved
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Employer", value: agreement.parties.employer },
            { label: "Union", value: agreement.parties.union },
            { label: "Conciliation Officer", value: agreement.parties.conciliationOfficer },
          ].map((p) => (
            <div key={p.label}>
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-1">{p.label}</p>
              <p className="text-sm text-foreground">{p.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Covered */}
      <div className="glass-panel rounded-lg p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Categories Covered</h3>
        <div className="flex flex-wrap gap-2">
          {agreement.categoriesCovered.map((cat) => (
            <span key={cat} className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Settlement Nature */}
      <div className={`rounded-lg border p-5 ${nature.bg} border-transparent`}>
        <div className="flex items-center gap-2 mb-2">
          <Scale className="h-4 w-4" />
          <h3 className="text-sm font-semibold text-foreground">Overall Settlement Nature</h3>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${nature.text} ${nature.bg}`}>
            {agreement.settlementNature}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{nature.desc}</p>
      </div>

      {/* Wage Direction + Structural Shifts + Incentives */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="glass-panel rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-success" /> Wage Direction
          </h3>
          <p className="text-sm font-medium text-success">{agreement.overallWageDirection}</p>
        </div>

        <div className="glass-panel rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" /> Major Structural Shifts
          </h3>
          <ul className="space-y-1.5">
            {agreement.majorStructuralShifts.map((s, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-warning shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-info" /> Incentive Structure Change
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{agreement.incentiveStructureChange}</p>
        </div>
      </div>

      {/* Lock-in + Employer Protective + Union Benefit */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="glass-panel rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Lock className="h-4 w-4 text-destructive" /> Lock-in Clauses
          </h3>
          <ul className="space-y-2">
            {agreement.lockInClauses.map((c, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Shield className="h-4 w-4 text-warning" /> Employer-Protective Clauses
          </h3>
          <ul className="space-y-2">
            {agreement.employerProtectiveClauses.map((c, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-warning shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Users className="h-4 w-4 text-success" /> Union-Benefit Clauses
          </h3>
          <ul className="space-y-2">
            {agreement.unionBenefitClauses.map((c, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-success shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
