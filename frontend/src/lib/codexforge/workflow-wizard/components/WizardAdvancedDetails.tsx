"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { WizardFlow } from "../workflow-wizard-types";

export function WizardAdvancedDetails({ flow }: { flow: WizardFlow | null }) {
  if (!flow) return null;
  return (
    <details style={details} data-codexforge-wizard-advanced-details="WizardAdvancedDetails renders collapsed advanced details visually secondary advanced routes hidden">
      <summary style={summary}>Advanced details</summary>
      <p style={copy}>{flow.safetySummary}</p>
      <div style={links}>
        {flow.advancedRoutesHidden.map((route) => (
          <Link key={`wizard-advanced-${route}`} href={route} style={link}>{route}</Link>
        ))}
      </div>
    </details>
  );
}

const details: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, color: "#cbd5e1", padding: 12 };
const summary: CSSProperties = { color: "#bfdbfe", cursor: "pointer", fontSize: 13, fontWeight: 900 };
const copy: CSSProperties = { fontSize: 12, lineHeight: 1.45, margin: "10px 0" };
const links: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const link: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, color: "#dbeafe", fontSize: 12, fontWeight: 800, padding: "7px 9px", textDecoration: "none" };
