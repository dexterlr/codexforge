"use client";

import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { buildBrainContinuitySummary, type BrainContinuitySession } from "../index";
import { BrainContinuityEmptyState } from "./BrainContinuityEmptyState";
import { BrainContinuitySafetyNotice } from "./BrainContinuitySafetyNotice";
import { ContinuityNextActionPanel } from "./ContinuityNextActionPanel";
import { ContinuitySignalPanel } from "./ContinuitySignalPanel";
import { EventJournalHealthPanel } from "./EventJournalHealthPanel";
import { GovernanceContinuityPanel } from "./GovernanceContinuityPanel";
import { MemoryGrowthPanel } from "./MemoryGrowthPanel";
import { ReplayContinuityPanel } from "./ReplayContinuityPanel";
import { RestoreContinuityRiskPanel } from "./RestoreContinuityRiskPanel";
import { SnapshotContinuityPanel } from "./SnapshotContinuityPanel";
import { button, muted, panel, pill, postureColor } from "./BrainContinuityStyles";

export function BrainContinuityDashboard({ session: providedSession }: { session?: BrainContinuitySession }) {
  const session = useMemo(() => providedSession ?? buildBrainContinuitySummary(), [providedSession]);
  const [copied, setCopied] = useState<string | null>(null);

  function copyText(label: string, text: string) {
    void navigator.clipboard?.writeText(text).then(() => setCopied(label)).catch(() => setCopied(null));
  }

  const compactSummary = session.continuitySummary.summary.join("\n");

  return (
    <CodexForgeAppShell activePath="/brain-continuity" workspaceLabel="Brain Continuity Dashboard">
      <div style={shell} data-codexforge-brain-continuity-dashboard="BrainContinuityDashboard renders read-only no graph mutation no snapshot restore no appendEvent no saveBrainGraph from UI preserve latest-message authority no auto-persistence">
        <section style={hero}>
          <div style={{ display: "grid", gap: 10, minWidth: 0 }}>
            <span style={eyebrow}>CodexForge Phase 52</span>
            <h1 style={headline}>Brain Continuity Dashboard</h1>
            <p style={lede}>
              Memory growth, runtime event journal health, snapshot posture, replay readiness, restore risk, governance posture,
              and the next safe continuity action in one read-only operator cockpit.
            </p>
            <div style={links}>
              <Link href="/runtime-replay" style={link}>Runtime Replay</Link>
              <Link href="/handoff" style={link}>Continuity Handoff</Link>
              <button type="button" style={button} onClick={() => copyText("summary", compactSummary)}>Copy continuity summary</button>
              <button type="button" style={button} onClick={() => copyText("handoff", session.handoff)}>Copy continuity handoff</button>
              <span style={pill}>{copied ? `${copied} copied` : "copy-only controls"}</span>
            </div>
          </div>
          <div style={stats}>
            <HeroStat label="Posture" value={session.continuitySummary.overallPosture} />
            <HeroStat label="Signals" value={String(session.continuitySummary.signalCount)} />
            <HeroStat label="Blockers" value={String(session.continuitySummary.blockerCount)} />
            <HeroStat label="Next" value={session.continuitySummary.nextSafeAction} />
          </div>
        </section>

        <BrainContinuitySafetyNotice />
        {session.signals.length === 0 ? <BrainContinuityEmptyState /> : null}

        <div style={layout}>
          <main style={mainColumn}>
            <ContinuitySignalPanel signals={session.signals} summary={session.signalSummary} />
            <MemoryGrowthPanel model={session.memoryGrowth} />
            <EventJournalHealthPanel health={session.journalHealth} />
            <SnapshotContinuityPanel continuity={session.snapshotContinuity} />
            <ReplayContinuityPanel continuity={session.replayContinuity} />
          </main>
          <aside style={sideColumn}>
            <ContinuityNextActionPanel plan={session.nextActionPlan} />
            <RestoreContinuityRiskPanel risk={session.restoreRisk} />
            <GovernanceContinuityPanel continuity={session.governanceContinuity} />
            <section style={panel}>
              <h2 style={{ margin: 0, fontSize: 18 }}>Session Summary</h2>
              {session.continuitySummary.summary.map((line) => (
                <p key={line} style={muted}>{line}</p>
              ))}
            </section>
          </aside>
        </div>
      </div>
    </CodexForgeAppShell>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div style={stat}>
      <span style={statLabel}>{label}</span>
      <strong style={{ ...statValue, color: postureColor(value) }}>{value}</strong>
    </div>
  );
}

const shell: CSSProperties = { width: "100%", display: "grid", gap: 16, minWidth: 0 };
const hero: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "linear-gradient(135deg, rgba(3,7,18,0.96), rgba(12,20,32,0.86))", borderRadius: 8, padding: 20, display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 18, alignItems: "center", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase", overflowWrap: "anywhere" };
const headline: CSSProperties = { margin: 0, fontSize: 42, lineHeight: 1.06, letterSpacing: 0, maxWidth: 980, overflowWrap: "normal", wordBreak: "normal" };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, maxWidth: 960, overflowWrap: "anywhere" };
const links: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const link: CSSProperties = { border: "1px solid rgba(125,211,252,0.2)", background: "rgba(14,165,233,0.1)", borderRadius: 8, color: "#e0f2fe", fontSize: 12, fontWeight: 900, padding: "9px 11px", textDecoration: "none", overflowWrap: "anywhere" };
const stats: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 10, minWidth: 0 };
const stat: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.46)", borderRadius: 8, padding: 14, display: "grid", gap: 5, minWidth: 0 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 11, textTransform: "uppercase", fontWeight: 850, overflowWrap: "anywhere" };
const statValue: CSSProperties = { fontSize: 22, lineHeight: 1.1, overflowWrap: "anywhere" };
const layout: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 1.25fr) minmax(min(100%, 520px), 0.75fr)", gap: 16, alignItems: "start", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const sideColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
