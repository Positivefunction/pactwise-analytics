import { Search as SearchIcon, Sparkles, FileText, AlertTriangle } from "lucide-react";
import { useState } from "react";

const sampleResults = [
  {
    query: "lock-in clause",
    results: [
      {
        agreement: "Tata Steel 2024",
        clause: "Clause 42 — Lock-in Period",
        snippet: "The workers shall not raise any demand or resort to any form of agitation during the period of this settlement which shall be operative for a period of 3 years...",
        risk: 65,
        tag: "Employer-Protective",
      },
      {
        agreement: "Maruti Suzuki 2023",
        clause: "Clause 38 — Industrial Peace",
        snippet: "Both parties agree to maintain industrial peace and harmony. The union undertakes not to resort to strike, go-slow, or any other form of agitation during the currency of this agreement...",
        risk: 72,
        tag: "Employer-Protective",
      },
    ],
  },
];

const suggestedQueries = [
  "Show agreements with >10% wage increase",
  "Find strict lock-in clauses",
  "Compare bonus evolution 2015–2024",
  "Clauses related to ALTS methodology",
  "High arrears exposure settlements",
  "Employer-protective discipline clauses",
];

export default function AISearch() {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (query.trim()) setHasSearched(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-2">
          <Sparkles className="h-3 w-3" />
          AI-Powered Semantic Search
        </div>
        <h1 className="text-3xl font-bold text-foreground">Search Across All Agreements</h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Use natural language to find clauses, compare agreements, and discover patterns
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Ask anything about your settlements..."
          className="w-full rounded-lg border border-border bg-card px-12 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Search
        </button>
      </div>

      {/* Suggested Queries */}
      {!hasSearched && (
        <div className="space-y-3 animate-fade-in">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Suggested queries</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestedQueries.map((sq) => (
              <button
                key={sq}
                onClick={() => { setQuery(sq); setHasSearched(true); }}
                className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-3 text-left text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
              >
                <SearchIcon className="h-3.5 w-3.5 shrink-0" />
                {sq}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {hasSearched && (
        <div className="space-y-4 animate-fade-in">
          <p className="text-xs text-muted-foreground">Showing results for: <span className="text-foreground font-medium">"{query}"</span></p>
          {sampleResults[0].results.map((r, i) => (
            <div key={i} className="glass-panel rounded-lg p-5 hover:border-glow transition-all cursor-pointer">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-xs font-mono text-muted-foreground">{r.agreement}</span>
                    <span className="rounded-full bg-info/10 px-2 py-0.5 text-[10px] font-medium text-info">{r.tag}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{r.clause}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{r.snippet}</p>
                </div>
                <div className="shrink-0 text-right">
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3 text-warning" />
                    <span className="text-xs font-mono text-warning">{r.risk}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Risk Score</p>
                </div>
              </div>
            </div>
          ))}
          <p className="text-center text-xs text-muted-foreground italic">
            AI-powered results. Connect Lovable Cloud to enable live semantic search.
          </p>
        </div>
      )}
    </div>
  );
}
