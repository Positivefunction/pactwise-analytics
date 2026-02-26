import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Sparkles, Shield, Users, Wrench, DollarSign, AlertTriangle, TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import { AgreementOverview } from "../components/agreement/AgreementOverview";
import { MajorHappened } from "../components/agreement/MajorHappened";
import { WorkmenCoverage } from "../components/agreement/WorkmenCoverage";
import { ManpowerFlexibility } from "../components/agreement/ManpowerFlexibility";
import { CostStructure } from "../components/agreement/CostStructure";

const mockAgreement = {
  id: 1,
  company: "Tata Steel Ltd",
  location: "Jamshedpur",
  union: "Tata Workers' Union",
  type: "Long-Term Settlement",
  year: 2024,
  effective: "2024-01-01",
  expiry: "2027-12-31",
  duration: "4 Years",
  clauses: 48,
  risk: "Medium",
  status: "Active",
  parties: {
    employer: "Tata Steel Limited, Jamshedpur Works",
    union: "Tata Workers' Union (Regd. No. 482/1947)",
    conciliationOfficer: "Regional Labour Commissioner (Central), Ranchi",
  },
  categoriesCovered: ["Basic Pay", "Allowances", "Bonus", "Incentives (DPI/PPA/QPI)", "Medical", "Welfare", "Leave", "Productivity", "Discipline", "Retirement", "Insurance", "Safety", "Operational Norms"],
  estimatedWorkmen: 12500,
  overallWageDirection: "Upward – Moderate",
  majorStructuralShifts: [
    "Shift from flat increment to slab-based structure",
    "Introduction of ALTS-linked productivity component",
    "Consolidation of 3 allowances into single Special Allowance",
  ],
  incentiveStructureChange: "DPI restructured from output-based to ALTS methodology with quality multiplier. New QPI introduced at ₹500/quarter.",
  lockInClauses: [
    "4-year peace obligation with no-strike commitment",
    "No demand raising during settlement currency",
    "Penalty clause: 7-day wage deduction for unauthorized stoppage",
  ],
  employerProtectiveClauses: [
    "Management retains sole right of deployment and transfer",
    "Multi-skilling mandatory for all Grade I–III workers",
    "Redeployment across departments without consent",
    "Surveillance and monitoring clause for productivity tracking",
  ],
  unionBenefitClauses: [
    "30.3% wage increase over 4 years (phased)",
    "Enhanced medical coverage from ₹3L to ₹5L per family",
    "New shift allowance of ₹200/shift",
    "Gratuity ceiling raised to ₹25L",
    "Festival advance increased to ₹15,000",
  ],
  settlementNature: "Balanced" as const,
  // Board-ready analysis
  boardAnalysis: {
    aggressiveOrConservative: "Moderately conservative. The settlement maintains cost discipline while providing structured increases. Wage growth of 30.3% over 4 years (~7.6% CAGR) aligns with industry median. The phased implementation limits immediate cost shock.",
    productivityShift: "Yes, significant shift. The restructuring of DPI from output-based to ALTS methodology represents a fundamental change in pay-performance linkage. This moves approximately 8% of total compensation into variable territory, directly tied to value-added labor productivity.",
    managementFlexibility: "Strengthened. Multi-skilling mandate, unilateral redeployment rights, and surveillance provisions give management considerably more operational control. The 4-year lock-in with penalty clauses provides extended industrial peace.",
    unionFixedComponents: "Partially. Union secured a 30.3% increase in basic pay (fixed component), enhanced medical from ₹3L to ₹5L, and improved retirement benefits. However, the consolidation of allowances and productivity-linked restructuring shifts some earning potential into variable territory.",
    costStructureDirection: "More variable. The introduction of ALTS-linked incentives, quality-based QPI, and attendance-linked components shifts the cost structure toward performance-based pay. Estimated fixed:variable ratio moves from 78:22 to 70:30.",
  },
  // Workmen coverage
  workmenCoverage: {
    categoriesCovered: [
      { category: "Permanent Workmen", count: 8200, percentage: 65.6 },
      { category: "Departmental Regular (DR)", count: 2800, percentage: 22.4 },
      { category: "Staff (Non-Executive)", count: 1200, percentage: 9.6 },
      { category: "Probationers", count: 300, percentage: 2.4 },
    ],
    categoriesExcluded: ["Contract Labour", "Apprentices", "Management Staff", "Executive Cadre"],
    totalHeadcount: 12500,
    gradeBreakup: [
      { grade: "Grade I", count: 3200, basicPay: "₹14,500–₹18,200" },
      { grade: "Grade II", count: 3800, basicPay: "₹18,200–₹22,800" },
      { grade: "Grade III", count: 2900, basicPay: "₹22,800–₹28,500" },
      { grade: "Grade IV", count: 1600, basicPay: "₹28,500–₹35,000" },
      { grade: "Grade V", count: 1000, basicPay: "₹35,000–₹42,000" },
    ],
    departmentCoverage: [
      { dept: "Steel Melting Shop", count: 2800 },
      { dept: "Hot Strip Mill", count: 2200 },
      { dept: "Cold Rolling Mill", count: 1800 },
      { dept: "Blast Furnace", count: 1500 },
      { dept: "Coke Ovens", count: 1200 },
      { dept: "Utilities & Services", count: 1600 },
      { dept: "Maintenance", count: 1400 },
    ],
  },
  // Manpower flexibility
  manpowerFlexibility: {
    detected: [
      { aspect: "Multi-skilling Requirement", status: "detected", detail: "Clause 22: All Grade I–III workers must acquire competency in minimum 2 adjacent job roles within 18 months." },
      { aspect: "Redeployment Flexibility", status: "detected", detail: "Clause 24: Management may redeploy workers across departments based on operational needs without prior consent." },
      { aspect: "ALTS Methodology", status: "detected", detail: "Clause 18: Productivity incentive restructured from output-based DPI to Added Labour Time Saved methodology." },
      { aspect: "Engagement Time Definitions", status: "detected", detail: "Clause 15: Effective working time redefined as 7.5 hours excluding meal break of 30 minutes." },
      { aspect: "Machine Utilization Norms", status: "detected", detail: "Clause 19: Minimum machine utilization target of 85% per shift with escalation for consistent underperformance." },
      { aspect: "Production Norm References", status: "detected", detail: "Clause 20: Base production norms revised upward by 8% from 2021 baseline." },
      { aspect: "Indirect Workforce Flexibility", status: "partial", detail: "Clause 26: Support functions may be staffed through internal rotation. No explicit flexibility for indirect outsourcing." },
      { aspect: "Outsourcing Permissions", status: "not_detected", detail: "Not specified in document. Settlement is silent on outsourcing of core operations." },
    ],
    classifications: [
      { label: "Employer flexibility strengthened", direction: "up" as const },
      { label: "Productivity enforcement strengthened", direction: "up" as const },
      { label: "Workforce rigidity reduced", direction: "up" as const },
      { label: "Workforce rigidity increased", direction: "neutral" as const },
    ],
  },
  // Cost structure
  costStructure: {
    fixed: [
      { component: "Basic Pay", monthly: 198000000, pctOfTotal: 42.1 },
      { component: "House Rent Allowance", monthly: 56250000, pctOfTotal: 11.9 },
      { component: "Special Allowance", monthly: 37500000, pctOfTotal: 8.0 },
      { component: "Conveyance Allowance", monthly: 18750000, pctOfTotal: 4.0 },
      { component: "Washing Allowance", monthly: 3125000, pctOfTotal: 0.7 },
    ],
    variable: [
      { component: "DPI (ALTS-linked)", monthly: 45000000, pctOfTotal: 9.6 },
      { component: "Quality Premium (QPI)", monthly: 15625000, pctOfTotal: 3.3 },
      { component: "Attendance Bonus", monthly: 12500000, pctOfTotal: 2.7 },
      { component: "Shift Allowance", monthly: 31250000, pctOfTotal: 6.6 },
    ],
    deferred: [
      { component: "PF Contribution (Employer)", monthly: 23760000, pctOfTotal: 5.0 },
      { component: "Gratuity Provisioning", monthly: 9500000, pctOfTotal: 2.0 },
      { component: "Medical Insurance", monthly: 10416667, pctOfTotal: 2.2 },
      { component: "Long Service Award", monthly: 2083333, pctOfTotal: 0.4 },
      { component: "Superannuation Fund", monthly: 6750000, pctOfTotal: 1.4 },
    ],
    fixedPct: 66.7,
    variablePct: 22.2,
    deferredPct: 11.1,
    previousFixedPct: 78,
    previousVariablePct: 14,
    previousDeferredPct: 8,
  },
};

export default function AgreementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const agreement = mockAgreement; // In production, fetch by id

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/agreements")}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">{agreement.company}</h1>
            <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">{agreement.status}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{agreement.location} · {agreement.type} · {agreement.year}</p>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-3">
        {[
          { icon: FileText, label: "Overview" },
          { icon: Sparkles, label: "What Happened" },
          { icon: Users, label: "Workmen Coverage" },
          { icon: Wrench, label: "Manpower & Productivity" },
          { icon: DollarSign, label: "Cost Structure" },
        ].map((s) => (
          <a
            key={s.label}
            href={`#${s.label.toLowerCase().replace(/\s+/g, '-')}`}
            className="flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
          >
            <s.icon className="h-3 w-3" />
            {s.label}
          </a>
        ))}
      </div>

      {/* All Sections */}
      <AgreementOverview agreement={agreement} />
      <MajorHappened analysis={agreement.boardAnalysis} nature={agreement.settlementNature} />
      <WorkmenCoverage data={agreement.workmenCoverage} />
      <ManpowerFlexibility data={agreement.manpowerFlexibility} />
      <CostStructure data={agreement.costStructure} />
    </div>
  );
}
