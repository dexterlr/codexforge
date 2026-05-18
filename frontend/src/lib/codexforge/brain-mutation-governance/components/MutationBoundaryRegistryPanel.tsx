"use client";

import type { CSSProperties } from "react";
import {
  buildBrainMutationGovernanceStableKey,
  type BrainMutationBoundaryRegistry,
} from "../index";
import { BrainMutationGovernanceEmptyState } from "./BrainMutationGovernanceEmptyState";

export function MutationBoundaryRegistryPanel({ registry }: { registry: BrainMutationBoundaryRegistry }) {
  return (
    <section
      style={panel}
      data-codexforge-mutation-boundary-registry-panel="MutationBoundaryRegistryPanel renders boundary registry includes Runtime Event Executor Memory Promotion Gate Runtime Event Journal Direct UI mutation block appendEvent is executor-domain-only"
    >
      <Header title="Mutation Boundary Registry" subtitle="Approved mutation boundaries, blocked UI paths, and next safe review action." />
      <div style={stats}>
        <Stat label="Boundaries" value={String(registry.boundaryCount)} />
        <Stat label="Guarded" value={String(registry.guardedBoundaryCount)} />
        <Stat label="Blocked" value={String(registry.blockedBoundaryCount)} />
        <Stat label="Direct UI allowed" value={String(registry.directUiMutationAllowedCount)} />
      </div>
      {registry.boundaries.length === 0 ? (
        <BrainMutationGovernanceEmptyState />
      ) : (
        <div style={list}>
          {registry.boundaries.map((boundary, index) => (
            <article
              key={buildBrainMutationGovernanceStableKey("boundary-card", boundary.id, index)}
              style={card}
            >
              <div style={cardTop}>
                <div style={copy}>
                  <strong style={itemTitle}>{boundary.label}</strong>
                  <span style={path}>{boundary.sourceModule}</span>
                  <span style={path}>{boundary.sourceRoute}</span>
                </div>
                <span style={mode}>{boundary.mutationMode}</span>
              </div>
              <div style={pillRow}>
                <Pill label="approval" value={boundary.approvalRequired ? "required" : "not required"} />
                <Pill label="policy" value={boundary.policyRequired ? "required" : "not required"} />
                <Pill label="reducer preview" value={boundary.reducerPreviewRequired ? "required" : "not required"} />
                <Pill label="audit journal" value={boundary.auditJournalRequired ? "required" : "not required"} />
                <Pill label="direct UI mutation" value={boundary.directUiMutationAllowed ? "allowed" : "blocked"} />
              </div>
              <p style={text}>{boundary.safetyNote}</p>
              <p style={next}>Next: {boundary.nextSafeAction}</p>
              <span style={path}>Allowed events: {boundary.allowedEventTypes.join(", ")}</span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={heading}>
      <h2 style={titleStyle}>{title}</h2>
      <p style={subtitleStyle}>{subtitle}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={stat}>
      <span style={statLabel}>{label}</span>
      <strong style={statValue}>{value}</strong>
    </div>
  );
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <span style={pill}>
      <span>{label}</span>
      <strong>{value}</strong>
    </span>
  );
}

const safeText: CSSProperties = { minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(2,6,23,0.52)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 };
const heading: CSSProperties = { display: "grid", gap: 5, minWidth: 0 };
const titleStyle: CSSProperties = { color: "#f8fafc", fontSize: 18, lineHeight: 1.2, margin: 0, ...safeText };
const subtitleStyle: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText };
const stats: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 8, minWidth: 0 };
const stat: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.48)", borderRadius: 8, display: "grid", gap: 4, minWidth: 0, padding: 10 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 850, textTransform: "uppercase", ...safeText };
const statValue: CSSProperties = { color: "#ccfbf1", fontSize: 18, lineHeight: 1.15, ...safeText };
const list: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.42)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 12 };
const cardTop: CSSProperties = { alignItems: "start", display: "grid", gap: 8, gridTemplateColumns: "minmax(0, 1fr) auto", minWidth: 0 };
const copy: CSSProperties = { display: "grid", gap: 4, minWidth: 0 };
const itemTitle: CSSProperties = { color: "#f8fafc", fontSize: 14, ...safeText };
const path: CSSProperties = { color: "#94a3b8", fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace", fontSize: 11, lineHeight: 1.4, ...safeText };
const mode: CSSProperties = { border: "1px solid rgba(45,212,191,0.22)", background: "rgba(20,184,166,0.1)", borderRadius: 8, color: "#ccfbf1", fontSize: 11, fontWeight: 900, padding: "6px 8px", ...safeText };
const pillRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6, minWidth: 0 };
const pill: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(14,165,233,0.08)", borderRadius: 8, color: "#cbd5e1", display: "inline-flex", gap: 5, fontSize: 11, lineHeight: 1.25, padding: "6px 8px", ...safeText };
const text: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.5, margin: 0, ...safeText };
const next: CSSProperties = { color: "#e0f2fe", fontSize: 12, fontWeight: 850, lineHeight: 1.45, margin: 0, ...safeText };
