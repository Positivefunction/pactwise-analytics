import { Sparkles, MessageSquare, Info } from "lucide-react";

interface MajorHappenedProps {
  analysis: {
    aggressiveOrConservative: string;
    productivityShift: string;
    managementFlexibility: string;
    unionFixedComponents: string;
    costStructureDirection: string;
  };
  nature: string;
}

const questions = [
  { key: "aggressiveOrConservative", question: "Was this settlement aggressive or conservative?" },
  { key: "productivityShift", question: "Did it shift toward productivity-linked pay?" },
  { key: "managementFlexibility", question: "Did management gain operational flexibility?" },
  { key: "unionFixedComponents", question: "Did union secure higher fixed components?" },
  { key: "costStructureDirection", question: "Is cost structure more fixed or variable now?" },
] as const;

export function MajorHappened({ analysis, nature }: MajorHappenedProps) {
  return (
    <div id="what-happened" className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          What Majorly Happened?
        </h2>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
          AI Analysis
        </span>
      </div>

      <div className="space-y-3">
        {questions.map((q) => (
          <div key={q.key} className="glass-panel rounded-lg p-5 hover:border-glow transition-all">
            <div className="flex items-start gap-3">
              <MessageSquare className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <div className="space-y-2 flex-1">
                <p className="text-sm font-semibold text-foreground">{q.question}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {analysis[q.key]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="flex items-center gap-2 rounded-md border border-border bg-muted/30 px-4 py-2.5">
        <Info className="h-4 w-4 text-muted-foreground shrink-0" />
        <p className="text-[11px] text-muted-foreground italic">
          AI-generated board-ready analysis. Verify with legal counsel before decision-making.
        </p>
      </div>
    </div>
  );
}
