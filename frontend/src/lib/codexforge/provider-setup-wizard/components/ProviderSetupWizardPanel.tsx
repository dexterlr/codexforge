"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { buildDefaultProviderSetupSteps, buildProviderSetupWizardState } from "@/lib/codexforge/provider-setup-wizard";

export function ProviderSetupWizardPanel() {
  const wizard = buildProviderSetupWizardState(buildDefaultProviderSetupSteps());

  return (
    <div style={shell} data-codexforge-provider-setup-wizard="Provider Setup Wizard manual handoff profile-only no unsafe execution buttons">
      <section style={hero}>
        <div>
          <span style={eyebrow}>Phase 116</span>
          <h1 style={headline}>Provider Setup Wizard</h1>
          <p style={lede}>
            Walk through provider setup in small, safe steps. The wizard records profile choices and review notes only;
            it does not connect to providers, test credentials, or call external services.
          </p>
        </div>
        <div style={linkRow}>
          <Link href="/ai-providers" style={link}>Profiles</Link>
          <Link href="/credentials" style={link}>Credential rules</Link>
          <Link href="/token-router" style={primaryLink}>Routing role</Link>
        </div>
      </section>

      <section style={nextAction}>
        <strong>Next safe action</strong>
        <span>{wizard.nextAction}</span>
      </section>

      <section style={steps}>
        {wizard.steps.map((step, index) => (
          <article key={step.id} style={card}>
            <span style={tag}>Step {index + 1} - {step.status}</span>
            <h2 style={cardTitle}>{step.title}</h2>
            <p style={copy}>{step.plainEnglish}</p>
            <p style={copy}>{step.safetyBoundary}</p>
            <Link href={step.route} style={smallLink}>Open related panel</Link>
          </article>
        ))}
      </section>
    </div>
  );
}

const shell: CSSProperties = { display: "grid", gap: 16, color: "#f8fafc" };
const hero: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", border: "1px solid rgba(45,212,191,0.22)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 18 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: "clamp(28px, 5vw, 48px)", lineHeight: 1, margin: "8px 0", letterSpacing: 0, overflowWrap: "anywhere" };
const lede: CSSProperties = { maxWidth: 780, color: "rgba(226,232,240,0.76)", lineHeight: 1.55, margin: 0, fontSize: 14 };
const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, alignContent: "flex-start" };
const link: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", padding: "9px 11px", fontSize: 12, fontWeight: 900, textDecoration: "none" };
const primaryLink: CSSProperties = { ...link, background: "#5eead4", color: "#042f2e" };
const nextAction: CSSProperties = { display: "grid", gap: 4, border: "1px solid rgba(45,212,191,0.16)", borderRadius: 8, padding: 12, background: "rgba(20,83,45,0.16)", color: "#dcfce7", fontSize: 13 };
const steps: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 12 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, background: "rgba(2,6,23,0.68)", padding: 14, display: "grid", gap: 8 };
const tag: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const cardTitle: CSSProperties = { margin: 0, fontSize: 18, letterSpacing: 0 };
const copy: CSSProperties = { margin: 0, color: "rgba(226,232,240,0.76)", fontSize: 13, lineHeight: 1.45 };
const smallLink: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textDecoration: "none" };

