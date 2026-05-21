"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { WizardNextAction } from "../workflow-wizard-types";

export function WizardNextActionPanel({ action }: { action: WizardNextAction }) {
  return (
    <section style={panel} data-codexforge-wizard-next-action-panel="WizardNextActionPanel renders one primary action advanced actions secondary no execution command">
      <span style={eyebrow}>Next safe step</span>
      <h2 style={title}>{action.label}</h2>
      <p style={copy}>{action.description}</p>
      <Link href={action.route} style={primary}>{action.label}</Link>
    </section>
  );
}

const panel: CSSProperties = { background: "rgba(20,184,166,0.1)", border: "1px solid rgba(45,212,191,0.28)", borderRadius: 8, display: "grid", gap: 8, minWidth: 0, padding: 14 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 18, lineHeight: 1.2, margin: 0 };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0 };
const primary: CSSProperties = { background: "#14b8a6", borderRadius: 8, color: "#04111f", display: "inline-flex", fontSize: 13, fontWeight: 950, justifyContent: "center", marginTop: 3, padding: "10px 12px", textDecoration: "none", width: "fit-content" };
