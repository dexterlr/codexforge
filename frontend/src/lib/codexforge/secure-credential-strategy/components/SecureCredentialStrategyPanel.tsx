"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { buildDefaultSecureCredentialStrategyItems, buildSecureCredentialStrategySummary } from "@/lib/codexforge/secure-credential-strategy";

export function SecureCredentialStrategyPanel() {
  const strategy = buildSecureCredentialStrategySummary(buildDefaultSecureCredentialStrategyItems());

  return (
    <div style={shell} data-codexforge-secure-credential-strategy="Secure Credential Strategy no raw password storage no localStorage secrets no real credentials">
      <section style={hero}>
        <div>
          <span style={eyebrow}>Phase 115</span>
          <h1 style={headline}>Secure Credential Strategy</h1>
          <p style={lede}>
            CodexForge can describe provider access safely before any real connector exists. The strategy records
            allowed metadata, blocks secret values, references adapter credential safety, and keeps manual subscriptions
            as operator-owned handoffs.
          </p>
        </div>
        <div style={linkRow}>
          <Link href="/ai-providers" style={link}>Provider registry</Link>
          <Link href="/provider-adapters" style={link}>Adapter safety</Link>
          <Link href="/provider-setup" style={primaryLink}>Setup wizard</Link>
        </div>
      </section>

      <section style={notice}>
        {strategy.blockedStorageRules.map((rule) => <strong key={rule}>{rule}</strong>)}
      </section>

      <section style={grid}>
        {strategy.items.map((item) => (
          <article key={item.id} style={card}>
            <span style={tag}>{item.status}</span>
            <h2 style={cardTitle}>{item.label}</h2>
            <p style={copy}>{item.operatorCopy}</p>
            <p style={copy}>{item.storageRule}</p>
            <div style={columns}>
              <div><strong>Allowed</strong>{item.allowedData.map((data) => <span key={data} style={pill}>{data}</span>)}</div>
              <div><strong>Blocked</strong>{item.blockedData.map((data) => <span key={data} style={blockedPill}>{data}</span>)}</div>
            </div>
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
const notice: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 8 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 12 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, background: "rgba(2,6,23,0.68)", padding: 14, display: "grid", gap: 8 };
const tag: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const cardTitle: CSSProperties = { margin: 0, fontSize: 18, letterSpacing: 0 };
const copy: CSSProperties = { margin: 0, color: "rgba(226,232,240,0.76)", fontSize: 13, lineHeight: 1.45 };
const columns: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 120px), 1fr))", gap: 10, fontSize: 12 };
const pill: CSSProperties = { display: "block", marginTop: 6, border: "1px solid rgba(45,212,191,0.18)", borderRadius: 999, padding: "4px 8px", color: "#ccfbf1" };
const blockedPill: CSSProperties = { ...pill, borderColor: "rgba(248,113,113,0.25)", color: "#fecaca" };
