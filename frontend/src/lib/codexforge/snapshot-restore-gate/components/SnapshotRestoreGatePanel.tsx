"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import {
  buildSnapshotRestoreGateSession,
  summarizeSnapshotRestoreGateSession,
  type SnapshotRestoreGateSession,
} from "../index";
import { RestoreApprovalPacketPanel } from "./RestoreApprovalPacketPanel";
import { RestoreCandidatePanel } from "./RestoreCandidatePanel";
import { RestoreComparisonEvidencePanel } from "./RestoreComparisonEvidencePanel";
import { RestoreGovernanceLedgerPanel } from "./RestoreGovernanceLedgerPanel";
import { RestoreReplayEvidencePanel } from "./RestoreReplayEvidencePanel";
import { RestoreRequestPreviewPanel } from "./RestoreRequestPreviewPanel";
import { RestoreRiskPolicyPanel } from "./RestoreRiskPolicyPanel";
import { SnapshotRestoreEmptyState } from "./SnapshotRestoreEmptyState";
import { SnapshotRestoreSafetyNotice } from "./SnapshotRestoreSafetyNotice";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export function buildSnapshotRestoreGateReactKey(...parts: Array<string | number | null | undefined>): string {
  return parts
    .map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._/-]+/g, "-"))
    .filter(Boolean)
    .join(":");
}

export function SnapshotRestoreGatePanel({ session: providedSession }: { session?: SnapshotRestoreGateSession }) {
  const session = useMemo(() => providedSession ?? buildSnapshotRestoreGateSession(), [providedSession]);
  const [copied, setCopied] = useState<string | null>(null);

  function copyText(label: string, text: string) {
    void navigator.clipboard?.writeText(text).then(() => setCopied(label)).catch(() => setCopied(null));
  }

  const reviewPrompt = [
    "Review Snapshot Restore Approval Gate evidence.",
    ...summarizeSnapshotRestoreGateSession(session),
    "Do not restore snapshots. Do not mutate the live Brain graph. Do not call saveBrainGraph from UI. Do not appendEvent.",
  ].join("\n");
  const executorRequest = [
    "Future guarded snapshot executor request preview.",
    ...session.requestPreview.summary,
    "This is not executable in Phase 51; future guarded snapshot executor required.",
  ].join("\n");

  return (
    <CodexForgeAppShell activePath="/snapshot-restore" workspaceLabel="Snapshot Restore Gate" contentMaxWidth={1440}>
      <main
        style={shell}
        data-codexforge-snapshot-restore-gate-panel="SnapshotRestoreGatePanel renders premium dark operator cockpit preview-only restore blocked by default no graph mutation no snapshot restore in Phase 51 no saveBrainGraph from UI no appendEvent future guarded snapshot executor required evidence is context, not authority preserve latest-message authority stable key helper buildSnapshotRestoreGateReactKey"
      >
        <section style={hero}>
          <div style={heroCopy}>
            <span style={eyebrow}>CodexForge Phase 51</span>
            <h1 style={headline}>Snapshot Restore Approval Gate</h1>
            <p style={lede}>
              Selected Brain snapshot to restore candidate, comparison evidence, replay evidence, governance review,
              explicit approval packet, and request preview. Restore remains blocked.
            </p>
            <div style={heroActions}>
              <button type="button" style={copyButton} onClick={() => copyText("restore review prompt", reviewPrompt)}>Copy restore review prompt</button>
              <button type="button" style={copyButton} onClick={() => copyText("future executor request", executorRequest)}>Copy future executor request</button>
              <Link href="/brain-snapshots" style={heroLink}>Brain Snapshot Manager</Link>
              <Link href="/runtime-replay" style={heroLink}>Runtime Event Replay</Link>
              <Link href="/brain-governance" style={heroLink}>Brain Mutation Governance</Link>
              <Link href="/runtime-journal" style={heroLink}>Runtime Event Journal</Link>
              <span style={copiedPill}>{copied ? `${copied} copied` : "copy-only controls"}</span>
            </div>
          </div>
          <div style={heroStats}>
            <HeroStat label="Restore" value="blocked" />
            <HeroStat label="Policy ready" value={String(session.policy.requestReady)} />
            <HeroStat label="Approval" value={String(session.approvalPacket.approved)} />
            <HeroStat label="Next" value={session.summary.nextSafeAction} />
          </div>
        </section>

        <SnapshotRestoreSafetyNotice />

        {session.candidate.sourceSnapshotSummary.nodeCount === 0 ? <SnapshotRestoreEmptyState /> : null}

        <div style={layout}>
          <div style={mainColumn}>
            <RestoreCandidatePanel candidate={session.candidate} />
            <RestoreComparisonEvidencePanel evidence={session.comparisonEvidence} />
            <RestoreReplayEvidencePanel evidence={session.replayEvidence} />
            <RestoreRequestPreviewPanel preview={session.requestPreview} />
          </div>
          <aside style={sideColumn}>
            <RestoreRiskPolicyPanel policy={session.policy} />
            <RestoreApprovalPacketPanel packet={session.approvalPacket} validation={session.approvalValidation} />
            <RestoreGovernanceLedgerPanel ledger={session.governanceLedger} />
            <section style={summaryPanel}>
              <h2 style={summaryTitle}>Gate Summary</h2>
              {session.summary.summary.map((line, index) => (
                <span key={buildSnapshotRestoreGateReactKey("summary", line, index)} style={summaryLine}>{line}</span>
              ))}
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
const shell: CSSProperties = { color: "#e5f4ff", display: "grid", gap: 16, minWidth: 0, width: "100%" };
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
const statValue: CSSProperties = { color: "#ccfbf1", fontSize: 17, lineHeight: 1.2, ...safeText };
const layout: CSSProperties = { alignItems: "start", display: "grid", gap: 16, gridTemplateColumns: "minmax(0, 1.22fr) minmax(min(100%, 520px), 0.78fr)", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const sideColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const summaryPanel: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(2,6,23,0.52)", borderRadius: 8, display: "grid", gap: 7, minWidth: 0, padding: 14 };
const summaryTitle: CSSProperties = { color: "#f8fafc", fontSize: 18, lineHeight: 1.2, margin: 0, ...safeText };
const summaryLine: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, ...safeText };
