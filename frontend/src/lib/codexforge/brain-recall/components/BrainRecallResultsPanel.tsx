"use client";

import type { CSSProperties } from "react";
import type { BrainRecallResult } from "../brain-recall-types";
import { BrainRecallResultCard } from "./BrainRecallResultCard";

type BrainRecallResultsPanelProps = {
  results: BrainRecallResult[];
  selectedResultId: string | null;
  onSelectResult: (resultId: string) => void;
};

export function BrainRecallResultsPanel({ results, selectedResultId, onSelectResult }: BrainRecallResultsPanelProps) {
  return (
    <section style={panel}>
      <div style={heading}>
        <strong>Ranked recall cards</strong>
        <span>{results.length} results</span>
      </div>
      {results.length === 0 ? (
        <p style={empty}>No approved Brain memory matched. Try broader terms or filters like kind:, tag:, status:, or file:.</p>
      ) : (
        <div style={list}>
          {results.map((result) => (
            <BrainRecallResultCard
              key={result.id}
              result={result}
              selected={selectedResultId === result.id}
              onSelect={onSelectResult}
            />
          ))}
        </div>
      )}
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.44)", borderRadius: 8, padding: 12, display: "grid", gap: 10, minWidth: 0 };
const heading: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, fontSize: 13, overflowWrap: "anywhere" };
const list: CSSProperties = { display: "grid", gap: 8, maxHeight: 470, overflow: "auto", minWidth: 0 };
const empty: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.5, opacity: 0.76, overflowWrap: "anywhere" };
