"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { buildAiProviderRegistrySummary, buildDefaultAiProviderAccountProfiles } from "@/lib/codexforge/ai-provider-registry";

export function AiProviderRegistryPanel() {
  const profiles = buildDefaultAiProviderAccountProfiles();
  const registry = buildAiProviderRegistrySummary(profiles);

  return (
    <div style={shell} data-codexforge-ai-provider-registry="AI Provider Account Registry profile-only manual handoff no real credentials no network calls">
      <section style={hero}>
        <div>
          <span style={eyebrow}>Phase 114</span>
          <h1 style={headline}>AI Provider Account Registry</h1>
          <p style={lede}>
            Keep a plain-English map of provider accounts without collecting passwords, tokens, or secret values.
            Manual ChatGPT and Claude subscriptions stay as profile-only handoffs; API and local providers are planned
            profiles until a reviewed credential path exists.
          </p>
        </div>
        <div style={linkRow}>
          <Link href="/credentials" style={primaryLink}>Credential strategy</Link>
          <Link href="/provider-adapters" style={link}>Provider adapters</Link>
          <Link href="/provider-setup" style={link}>Setup wizard</Link>
          <Link href="/token-router" style={link}>Token router</Link>
        </div>
      </section>

      <section style={metricGrid}>
        <div style={metric}><span>Profiles</span><strong>{registry.profiles.length}</strong></div>
        <div style={metric}><span>Manual handoffs</span><strong>{registry.manualHandoffCount}</strong></div>
        <div style={metric}><span>No-secret configured</span><strong>{registry.configuredWithoutSecretsCount}</strong></div>
      </section>

      <section style={grid}>
        {registry.profiles.map((profile) => (
          <article key={profile.id} style={card}>
            <span style={tag}>{profile.kind}</span>
            <h2 style={cardTitle}>{profile.providerName}</h2>
            <p style={copy}>{profile.accessMode}</p>
            <p style={copy}>Status: {profile.status}. Credential posture: {profile.credentialPosture}.</p>
            <div style={list}>{profile.allowedUse.map((item) => <span key={item} style={pill}>{item}</span>)}</div>
            <ul style={notes}>{profile.safetyNotes.map((note) => <li key={note}>{note}</li>)}</ul>
          </article>
        ))}
      </section>

      <section style={notice}>
        {registry.summary.map((item) => <p key={item}>{item}</p>)}
      </section>
    </div>
  );
}

const shell: CSSProperties = { display: "grid", gap: 16, color: "#f8fafc", minWidth: 0 };
const hero: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", border: "1px solid rgba(45,212,191,0.22)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 18 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: "clamp(28px, 5vw, 48px)", lineHeight: 1, margin: "8px 0", letterSpacing: 0, overflowWrap: "anywhere" };
const lede: CSSProperties = { maxWidth: 780, color: "rgba(226,232,240,0.76)", lineHeight: 1.55, margin: 0, fontSize: 14 };
const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, alignContent: "flex-start" };
const link: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", padding: "9px 11px", fontSize: 12, fontWeight: 900, textDecoration: "none" };
const primaryLink: CSSProperties = { ...link, background: "#5eead4", color: "#042f2e" };
const metricGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))", gap: 10 };
const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, padding: 12, background: "rgba(15,23,42,0.62)", display: "grid", gap: 4 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 12 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, background: "rgba(2,6,23,0.68)", padding: 14, display: "grid", gap: 8 };
const tag: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const cardTitle: CSSProperties = { margin: 0, fontSize: 18, letterSpacing: 0 };
const copy: CSSProperties = { margin: 0, color: "rgba(226,232,240,0.76)", fontSize: 13, lineHeight: 1.45 };
const list: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6 };
const pill: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", borderRadius: 999, padding: "4px 8px", fontSize: 11, color: "#ccfbf1" };
const notes: CSSProperties = { margin: 0, paddingLeft: 18, color: "rgba(226,232,240,0.72)", fontSize: 12, lineHeight: 1.45 };
const notice: CSSProperties = { border: "1px solid rgba(45,212,191,0.16)", borderRadius: 8, padding: 12, background: "rgba(20,83,45,0.16)", color: "#dcfce7", fontSize: 13 };
