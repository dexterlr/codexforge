"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { WizardRouteHandoff } from "../workflow-wizard-types";
import { buildWizardRouteHandoffAction } from "../wizard-route-handoff";

export function WizardRouteHandoffPanel({ handoff }: { handoff: WizardRouteHandoff }) {
  return (
    <section style={panel} data-codexforge-wizard-route-handoff-panel="WizardRouteHandoffPanel renders /files /validation /creative /creative-mvp safe route handoff no auto-navigation">
      <span style={eyebrow}>Open page</span>
      <h3 style={title}>{handoff.routeLabel}</h3>
      <p style={copy}>{handoff.whatToDoThere}</p>
      <p style={muted}>Bring: {handoff.whatToBring}</p>
      <Link href={handoff.destinationRoute} style={primaryLink}>{buildWizardRouteHandoffAction(handoff)}</Link>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", borderRadius: 8, display: "grid", gap: 8, minWidth: 0, padding: 14 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 18, lineHeight: 1.2, margin: 0 };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45, margin: 0 };
const muted: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.4, margin: 0 };
const primaryLink: CSSProperties = { background: "#14b8a6", borderRadius: 8, color: "#04111f", display: "inline-flex", fontSize: 13, fontWeight: 950, justifyContent: "center", marginTop: 4, padding: "10px 12px", textDecoration: "none", width: "fit-content" };
