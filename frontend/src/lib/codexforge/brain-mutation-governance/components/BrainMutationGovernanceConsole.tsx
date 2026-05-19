"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  buildBrainMutationGovernanceSession,
  summarizeBrainMutationGovernanceSession,
  type BrainMutationGovernanceSession,
} from "../index";
import { BrainMutationGovernanceSafetyNotice } from "./BrainMutationGovernanceSafetyNotice";
import { DirectMutationDetectorPanel } from "./DirectMutationDetectorPanel";
import { GovernanceNextActionPanel } from "./GovernanceNextActionPanel";
import { MutationBoundaryRegistryPanel } from "./MutationBoundaryRegistryPanel";
import { MutationIntegrityReportPanel } from "./MutationIntegrityReportPanel";
import { MutationPolicyPanel } from "./MutationPolicyPanel";
import { MutationRiskBoardPanel } from "./MutationRiskBoardPanel";
import { ReducerImpactGovernancePanel } from "./ReducerImpactGovernancePanel";

export function buildBrainMutationGovernanceReactKey(...parts: Array<string | number | null | undefined>): string {
  return parts
    .map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._/-]+/g, "-"))
    .filter(Boolean)
    .join(":");
}

export function BrainMutationGovernanceConsole({
  session: providedSession,
}: {
  session?: BrainMutationGovernanceSession;
}) {
  const session = useMemo(() => providedSession ?? buildBrainMutationGovernanceSession(), [providedSession]);
  const [copied, setCopied] = useState<string | null>(null);

  function copyText(label: string, text: string) {
    void navigator.clipboard?.writeText(text).then(() => setCopied(label)).catch(() => setCopied(null));
  }

  const summaryText = summarizeBrainMutationGovernanceSession(session.summary).join("\n");
  const handoffText = [
    "Brain Mutation Governance handoff",
    ...summarizeBrainMutationGovernanceSession(session.summary),
    "Brain Snapshot Manager readiness can mitigate risk with snapshot comparison, integrity review, and replay source selection before rollback planning.",
    "Runtime Event Replay Simulator is a mitigation surface for reducer preview, impact analysis, risk detection, and rollback guidance.",
    "Snapshot Restore Approval Gate readiness remains blocked until comparison evidence, replay evidence, governance review, runtime journal review, and explicit approval are reviewed.",
    "Read-only. Do not mutate Brain graph. Do not append runtime events. Do not promote memory. Do not execute runtime events.",
    "appendEvent is executor-domain-only; no direct UI graph mutation; no graph mutation from UI; no auto-promotion; evidence is context, not authority; preserve latest-message authority.",
  ].join("\n");

  return (
    <CodexForgeAppShell
      activePath="/brain-governance"
      workspaceLabel="Brain Mutation Governance"
      nextActionContext={{ hasMemoryReview: session.summary.blockedDirectMutationCount > 0 }}
    >
      <main
        style={shell}
        data-codexforge-brain-mutation-governance-console="BrainMutationGovernanceConsole renders premium dark operator cockpit read-only no direct UI graph mutation appendEvent is executor-domain-only no auto-promotion no graph mutation from UI evidence is context, not authority preserve latest-message authority stable key helper buildBrainMutationGovernanceReactKey Snapshot Restore Gate"
      >
        <section style={hero}>
          <div style={heroCopy}>
            <span style={eyebrow}>CodexForge Phase 48</span>
            <h1 style={headline}>Brain Mutation Governance Console</h1>
            <p style={lede}>
              Approved mutation boundaries, blocked direct mutation visibility, reducer impact governance, runtime
              journal integrity posture, risk review, and next safe action in one read-only console.
            </p>
            <div style={heroActions}>
              <button type="button" style={copyButton} onClick={() => copyText("governance summary", summaryText)}>
                Copy governance summary
              </button>
              <button type="button" style={copyButton} onClick={() => copyText("governance handoff", handoffText)}>
                Copy governance handoff
              </button>
              <Link href="/runtime-journal" style={heroLink}>Runtime Event Journal</Link>
              <Link href="/runtime-replay" style={heroLink}>Runtime Event Replay Simulator</Link>
              <Link href="/brain-snapshots" style={heroLink}>Brain Snapshot Manager</Link>
              <Link href="/snapshot-restore" style={heroLink}>Snapshot Restore Gate</Link>
              <Link href="/memory-inbox" style={heroLink}>Memory Promotion Gate</Link>
              <Link href="/brain" style={heroLink}>Brain audit surface</Link>
              <span style={copiedPill}>{copied ? `${copied} copied` : "copy-only controls"}</span>
            </div>
          </div>
          <div style={heroStats}>
            <HeroStat label="Posture" value={session.summary.overallPosture} />
            <HeroStat label="Boundaries" value={String(session.summary.boundaryCount)} />
            <HeroStat label="Direct blocks" value={String(session.summary.blockedDirectMutationCount)} />
            <HeroStat label="Next" value={session.summary.nextSafeAction} />
          </div>
        </section>

        <BrainMutationGovernanceSafetyNotice />

        <div style={layout}>
          <div style={mainColumn}>
            <MutationBoundaryRegistryPanel registry={session.registry} />
            <MutationPolicyPanel policy={session.policy} />
            <DirectMutationDetectorPanel report={session.detectorReport} />
            <ReducerImpactGovernancePanel governance={session.reducerGovernance} />
            <MutationIntegrityReportPanel report={session.integrityReport} />
          </div>
          <aside style={sideColumn}>
            <GovernanceNextActionPanel plan={session.nextActionPlan} />
            <MutationRiskBoardPanel board={session.riskBoard} />
            <section style={summaryPanel}>
              <div style={summaryHeading}>
                <h2 style={summaryTitle}>Session Summary</h2>
                <p style={summaryTextStyle}>No raw JSON is shown; all keys are deterministic and long paths wrap.</p>
              </div>
              <div style={summaryGrid}>
                {[
                  ["Guarded", String(session.summary.guardedBoundaryCount)],
                  ["Integrity pass", String(session.summary.integrityPassCount)],
                  ["Integrity risk", String(session.summary.integrityRiskCount)],
                  ["Reducer governed", String(session.summary.reducerGovernedEventCount)],
                ].map(([label, value], index) => (
                  <HeroStat
                    key={buildBrainMutationGovernanceReactKey("session-summary", label, index)}
                    label={label}
                    value={value}
                  />
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </CodexForgeAppShell>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div style={stat}>
      <span style={statLabel}>{label}</span>
      <strong style={statValue}>{value}</strong>
    </div>
  );
}

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const shell: CSSProperties = { display: "grid", gap: 16, minWidth: 0, width: "100%" };
const hero: CSSProperties = { alignItems: "center", border: "1px solid rgba(45,212,191,0.2)", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.8))", borderRadius: 8, display: "grid", gap: 18, gridTemplateColumns: "minmax(0, 1.2fr) minmax(min(100%, 450px), 0.8fr)", minWidth: 0, padding: 20 };
const heroCopy: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase", ...safeText };
const headline: CSSProperties = { color: "#f8fafc", fontSize: 42, letterSpacing: 0, lineHeight: 1.06, margin: 0, ...safeText };
const lede: CSSProperties = { color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: 980, ...safeText };
const heroActions: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const copyButton: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", background: "rgba(20,184,166,0.12)", borderRadius: 8, color: "#ccfbf1", cursor: "pointer", fontSize: 12, fontWeight: 900, padding: "9px 11px", ...safeText };
const heroLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.2)", background: "rgba(14,165,233,0.1)", borderRadius: 8, color: "#e0f2fe", fontSize: 12, fontWeight: 900, padding: "9px 11px", textDecoration: "none", ...safeText };
const copiedPill: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, color: "#cbd5e1", fontSize: 12, fontWeight: 850, padding: "9px 11px", ...safeText };
const heroStats: CSSProperties = { display: "grid", gap: 10, gridTemplateColumns: "repeat(2, minmax(0, 1fr))", minWidth: 0 };
const stat: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.42)", borderRadius: 8, display: "grid", gap: 5, minWidth: 0, padding: 12 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 850, textTransform: "uppercase", ...safeText };
const statValue: CSSProperties = { color: "#ccfbf1", fontSize: 18, lineHeight: 1.15, ...safeText };
const layout: CSSProperties = { alignItems: "start", display: "grid", gap: 16, gridTemplateColumns: "minmax(0, 1.25fr) minmax(min(100%, 520px), 0.75fr)", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const sideColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const summaryPanel: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(2,6,23,0.52)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 };
const summaryHeading: CSSProperties = { display: "grid", gap: 5, minWidth: 0 };
const summaryTitle: CSSProperties = { color: "#f8fafc", fontSize: 18, lineHeight: 1.2, margin: 0, ...safeText };
const summaryTextStyle: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText };
const summaryGrid: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "repeat(2, minmax(0, 1fr))", minWidth: 0 };
