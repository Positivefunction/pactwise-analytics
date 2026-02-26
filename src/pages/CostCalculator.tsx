import { Calculator as CalcIcon, Download } from "lucide-react";
import { useState } from "react";

export default function CostCalculator() {
  const [employees, setEmployees] = useState(500);
  const [wageIncrease, setWageIncrease] = useState(12);
  const [currentWage, setCurrentWage] = useState(18000);
  const [retroMonths, setRetroMonths] = useState(6);
  const [duration, setDuration] = useState(3);

  const monthlyIncrement = currentWage * (wageIncrease / 100);
  const monthlyCost = monthlyIncrement * employees;
  const annualCost = monthlyCost * 12;
  const totalCost = annualCost * duration;
  const arrears = monthlyIncrement * employees * retroMonths;

  const fmt = (n: number) => `₹${(n / 100000).toFixed(1)}L`;
  const fmtCr = (n: number) => n >= 10000000 ? `₹${(n / 10000000).toFixed(2)} Cr` : `₹${(n / 100000).toFixed(1)} L`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Financial Impact Calculator</h1>
        <p className="text-sm text-muted-foreground mt-1">Estimate settlement costs across scenarios</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Inputs */}
        <div className="glass-panel rounded-lg p-6 space-y-5">
          <h3 className="text-sm font-semibold text-foreground">Parameters</h3>
          {[
            { label: "Number of Employees", value: employees, set: setEmployees, min: 1, max: 50000 },
            { label: "Current Avg Wage (₹/month)", value: currentWage, set: setCurrentWage, min: 5000, max: 100000 },
            { label: "Wage Increase (%)", value: wageIncrease, set: setWageIncrease, min: 0, max: 50 },
            { label: "Retrospective Months", value: retroMonths, set: setRetroMonths, min: 0, max: 36 },
            { label: "Agreement Duration (years)", value: duration, set: setDuration, min: 1, max: 10 },
          ].map((field) => (
            <div key={field.label} className="space-y-1.5">
              <label className="text-xs text-muted-foreground">{field.label}</label>
              <input
                type="number"
                value={field.value}
                onChange={(e) => field.set(Number(e.target.value))}
                min={field.min}
                max={field.max}
                className="w-full rounded-md border border-border bg-muted/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="glass-panel rounded-lg p-6 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Cost Breakdown</h3>
            {[
              { label: "Monthly Increment / Employee", value: `₹${monthlyIncrement.toLocaleString()}` },
              { label: "Monthly Incremental Cost", value: fmtCr(monthlyCost) },
              { label: "Annual Cost", value: fmtCr(annualCost) },
              { label: "Agreement Duration Cost", value: fmtCr(totalCost), highlight: true },
              { label: "Arrears Burden", value: fmtCr(arrears) },
              { label: "Total Settlement Cost", value: fmtCr(totalCost + arrears), highlight: true },
            ].map((row) => (
              <div key={row.label} className={`flex justify-between items-center py-2 ${row.highlight ? "border-t border-border" : ""}`}>
                <span className={`text-sm ${row.highlight ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                  {row.label}
                </span>
                <span className={`font-mono text-sm ${row.highlight ? "text-gradient-gold font-bold text-base" : "text-foreground"}`}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <button className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Download className="h-4 w-4" />
            Export as PDF
          </button>
        </div>
      </div>
    </div>
  );
}
