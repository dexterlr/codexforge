"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { buildMissionControlReactKey, type MissionNextAction } from "../mission-control-types";

export function MissionNextActions({ actions }: { actions: MissionNextAction[] }) {
  return (
    <section style={section} data-mission-component="MissionNextActions renders">
      <h2 style={heading}>Next Actions</h2>
      <div style={stack}>
        {actions.map((action) => (
          <Link key={buildMissionControlReactKey("action", action.id)} href={action.href} style={action.priority === "primary" ? primary : item}>
            <span style={name}>{action.label}</span>
            <span style={note}>{action.safetyNote}</span>
            <span style={readiness}>{action.readiness}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

const section: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.42)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const heading: CSSProperties = { margin: 0, fontSize: 20 };
const stack: CSSProperties = { display: "grid", gap: 8 };
const item: CSSProperties = { color: "#f8fafc", textDecoration: "none", border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.45)", borderRadius: 8, padding: 11, display: "grid", gridTemplateColumns: "minmax(160px, 0.42fr) minmax(0, 1fr) minmax(110px, 0.22fr)", gap: 10, alignItems: "center", minWidth: 0 };
const primary: CSSProperties = { ...item, border: "1px solid rgba(45,212,191,0.28)", background: "rgba(20,184,166,0.1)" };
const name: CSSProperties = { fontWeight: 900, overflowWrap: "anywhere" };
const note: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, overflowWrap: "anywhere" };
const readiness: CSSProperties = { color: "#c7d2fe", fontSize: 11, fontWeight: 900, textTransform: "uppercase", overflowWrap: "anywhere" };
