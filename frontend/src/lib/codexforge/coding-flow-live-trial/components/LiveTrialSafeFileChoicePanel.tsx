"use client";

import type { CSSProperties } from "react";
import type { LiveTrialSafeFileChoice } from "../coding-flow-live-trial-types";

export function LiveTrialSafeFileChoicePanel({ choices }: { choices: LiveTrialSafeFileChoice[] }) {
  const safe = choices.filter((choice) => choice.posture === "safe");
  const risky = choices.filter((choice) => choice.posture === "risky");
  return (
    <section style={panel} data-codexforge-live-trial-safe-file-choice-panel="LiveTrialSafeFileChoicePanel renders UI copy component package.json tool policy">
      <h2 style={title}>Safe file choices</h2>
      <div style={grid}>
        <ChoiceList title="Pick these" choices={safe} />
        <ChoiceList title="Avoid these" choices={risky} />
      </div>
    </section>
  );
}

function ChoiceList({ title, choices }: { title: string; choices: LiveTrialSafeFileChoice[] }) {
  return <div style={box}><h3 style={itemTitle}>{title}</h3><ul style={list}>{choices.map((choice) => <li key={`live-trial-safe-file-${choice.choiceId}`}><strong>{choice.category}</strong>: {choice.why}</li>)}</ul></div>;
}

const panel: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const title: CSSProperties = { fontSize: 20, letterSpacing: 0, margin: 0 };
const grid: CSSProperties = { display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" };
const box: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, display: "grid", gap: 8, padding: 14 };
const itemTitle: CSSProperties = { fontSize: 15, letterSpacing: 0, margin: 0 };
const list: CSSProperties = { color: "#cbd5e1", display: "grid", fontSize: 13, gap: 8, lineHeight: 1.5, margin: 0, paddingLeft: 18 };
