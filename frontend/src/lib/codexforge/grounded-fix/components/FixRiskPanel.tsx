"use client";

import type { CSSProperties } from "react";
import type { GroundedFixRiskBoard } from "../grounded-fix-types";

export function FixRiskPanel({ riskBoard }: { riskBoard: GroundedFixRiskBoard }) {
  return (
    <section data-codexforge-grounded-fix-risk-panel="FixRiskPanel renders route/API policy runtime memory chat smoke risk factors" style={card}>
      <h3 style={title}>Risk</h3>
      <strong>{riskBoard.level} - {riskBoard.score}</strong>
      <div style={list}>
        {riskBoard.factors.slice(0, 6).map((factor) => (
          <span key={factor.id} style={pill}>{factor.label}</span>
        ))}
      </div>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(248,113,113,0.18)", background: "rgba(127,29,29,0.18)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0, overflowWrap: "anywhere" };
const title: CSSProperties = { margin: 0, fontSize: 14, letterSpacing: 0 };
const list: CSSProperties = { display: "flex", gap: 6, flexWrap: "wrap" };
const pill: CSSProperties = { border: "1px solid rgba(248,113,113,0.22)", borderRadius: 8, padding: "5px 7px", fontSize: 11 };
