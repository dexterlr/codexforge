"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { buildDefaultTokenRoutingRequest, buildTokenEfficiencyRouterSummary } from "@/lib/codexforge/token-efficiency-router";

export function TokenEfficiencyRouterPanel() {
  const summary = buildTokenEfficiencyRouterSummary(buildDefaultTokenRoutingRequest());
  const { request, decision } = summary;

  return (
    <div style={shell} data-codexforge-token-efficiency-router="Token Efficiency Router v1 deterministic approximate no provider API calls no network calls">
      <section style={hero}>
        <div>
          <span style={eyebrow}>Phase 117</span>
          <h1 style={headline}>Token Efficiency Router v1</h1>
          <p style={lede}>
            Estimate token size, sensitivity, and reasoning needs, then choose a local-first, cheap-profile, or manual
            premium handoff. Adapter readiness wording keeps the route honest before any provider call exists. This is
            recommendation-only and never sends prompts to a provider.
          </p>
        </div>
        <div style={linkRow}>
          <Link href="/ai-router" style={link}>AI Router</Link>
          <Link href="/ai-providers" style={link}>Provider profiles</Link>
          <Link href="/provider-adapters" style={link}>Adapter readiness</Link>
          <Link href="/provider-setup" style={primaryLink}>Setup wizard</Link>
        </div>
      </section>

      <section style={decisionCard}>
        <span style={tag}>Recommended lane</span>
        <h2 style={decisionTitle}>{decision.lane}</h2>
        <p style={copy}>{decision.reason}</p>
        <p style={copy}>Fallback lane: {decision.fallbackLane}. Estimated total: {decision.estimatedTotalTokens} tokens.</p>
        <p style={copy}>{decision.handoff}</p>
      </section>

      <section style={grid}>
        <article style={card}>
          <h2 style={cardTitle}>Request</h2>
          <p style={copy}>{request.title}</p>
          <p style={copy}>Sensitivity: {request.sensitivity}. Premium reasoning needed: {request.needsPremiumReasoning ? "yes" : "no"}.</p>
        </article>
        <article style={card}>
          <h2 style={cardTitle}>Rules</h2>
          <ul style={rules}>{summary.rules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
        </article>
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
const decisionCard: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", borderRadius: 8, padding: 16, background: "rgba(20,83,45,0.16)", display: "grid", gap: 6 };
const tag: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const decisionTitle: CSSProperties = { margin: 0, fontSize: 24, letterSpacing: 0 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 12 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, background: "rgba(2,6,23,0.68)", padding: 14, display: "grid", gap: 8 };
const cardTitle: CSSProperties = { margin: 0, fontSize: 18, letterSpacing: 0 };
const copy: CSSProperties = { margin: 0, color: "rgba(226,232,240,0.76)", fontSize: 13, lineHeight: 1.45 };
const rules: CSSProperties = { margin: 0, paddingLeft: 18, color: "rgba(226,232,240,0.76)", fontSize: 13, lineHeight: 1.5 };
