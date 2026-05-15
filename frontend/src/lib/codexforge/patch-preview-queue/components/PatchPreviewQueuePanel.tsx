"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import type { GroundedFixCandidate } from "../../grounded-fix";
import {
  buildPatchPreviewQueueHandoff,
  buildPatchPreviewQueueItem,
  buildPatchPreviewQueueItems,
  buildPatchPreviewQueueLedger,
  buildPatchPreviewQueuePolicy,
  buildPatchPreviewQueueReadiness,
  buildPatchPreviewQueueSummary,
  type PatchPreviewQueueItemInput,
} from "../index";
import { PatchPreviewQueueBoard } from "./PatchPreviewQueueBoard";
import { PatchPreviewQueueHandoffPanel } from "./PatchPreviewQueueHandoffPanel";
import { PatchPreviewQueueLedgerPanel } from "./PatchPreviewQueueLedgerPanel";
import { PatchPreviewQueuePolicyPanel } from "./PatchPreviewQueuePolicyPanel";
import { PatchPreviewQueueReadinessPanel } from "./PatchPreviewQueueReadinessPanel";
import { PatchPreviewQueueSafetyNotice } from "./PatchPreviewQueueSafetyNotice";

type Props = {
  recommendations?: readonly GroundedFixCandidate[];
  onCopyPrompt?: (prompt: string) => void;
  compact?: boolean;
};

const demoRecommendation: GroundedFixCandidate = {
  id: "grounded-fix-demo-ai-panel",
  kind: "UI-fix",
  title: "Queue reviewed recommendation for Safe Patch Preview",
  goal: "Convert an accepted grounded fix recommendation into a selected Safe Patch Preview package.",
  targetFiles: ["src/app/ai/page.tsx", "src/lib/codexforge/patch-preview-queue/index.ts"],
  suspectedRootCause: "Accepted recommendations need an explicit preview queue between review and Safe Patch Preview.",
  recommendedApproach: "Build deterministic queue item, policy, readiness, ledger, and handoff panels without mutation.",
  evidenceIds: ["phase-30-demo-evidence", "phase-30-demo-memory"],
  sourceSignalIds: ["phase-30-demo-signal"],
  relatedMemories: ["phase-30-evidence-memory"],
  relatedTasks: ["phase-30-patch-preview-queue"],
  relatedRisks: ["UI page/component", "policy file"],
  patchPreviewReadiness: "ready",
  confidence: 0.78,
  confidenceReasons: ["Reviewed target files are specific.", "Safe Patch Preview handoff is available."],
  riskLevel: "medium",
  riskScore: 0.42,
  reviewState: "recommended",
  nextSafeAction: "Queue for Safe Patch Preview and copy handoff only.",
};

export function PatchPreviewQueuePanel({ recommendations, onCopyPrompt, compact = false }: Props) {
  const queueItems = useMemo(() => {
    const source = recommendations?.length ? recommendations : [demoRecommendation];
    const inputs: PatchPreviewQueueItemInput[] = source.map((recommendation, index) => ({
      recommendation,
      reviewState: "reviewed",
      userSelected: index === 0,
      suggestedTests: ["npm run build", "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-patch-preview.ps1"],
      rollbackNotes: ["Keep the preview diff reversible.", "Do not write files without approval."],
      evidenceWarnings: recommendation.confidence < 0.5 ? ["Weak evidence warning"] : [],
    }));
    return buildPatchPreviewQueueItems(inputs);
  }, [recommendations]);
  const [selectedItemId, setSelectedItemId] = useState(queueItems[0]?.id ?? "");
  const selectedItem =
    queueItems.find((item) => item.id === selectedItemId) ?? queueItems[0] ?? buildPatchPreviewQueueItem({ recommendation: demoRecommendation, reviewState: "reviewed" });
  const selectedForPreview = { ...selectedItem, queueState: "selected" as const };
  const policy = buildPatchPreviewQueuePolicy(selectedForPreview);
  const readiness = buildPatchPreviewQueueReadiness([selectedForPreview]).items[0];
  const ledger = buildPatchPreviewQueueLedger([selectedForPreview]);
  const handoff = buildPatchPreviewQueueHandoff(selectedForPreview);
  const summary = buildPatchPreviewQueueSummary({ items: queueItems });

  return (
    <section
      style={panel}
      data-codexforge-patch-preview-queue-panel="PatchPreviewQueuePanel renders Queue for Safe Patch Preview Safe Patch Preview preview diff only evidence is context, not proof verify current files no file writes without approval no command execution without approval preserve latest-message authority"
    >
      <div style={header}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>Patch Preview Queue</span>
          <h2 style={title}>Reviewed recommendation to preview queue</h2>
          <p style={copy}>
            Accepted grounded fix recommendations become local queue packages for explicit operator review. The queue
            does not auto-send, auto-run, write files, apply diffs, or mutate Brain memory.
          </p>
        </div>
        <span style={badge}>{summary.readyCount} ready</span>
      </div>
      <PatchPreviewQueueSafetyNotice />
      <div style={layout}>
        <PatchPreviewQueueBoard items={queueItems} selectedItemId={selectedItem.id} onSelectItem={setSelectedItemId} />
        <div style={side}>
          <PatchPreviewQueuePolicyPanel policy={policy} />
          {readiness ? <PatchPreviewQueueReadinessPanel readiness={readiness} /> : null}
        </div>
      </div>
      {compact ? null : <PatchPreviewQueueLedgerPanel ledger={ledger} />}
      <PatchPreviewQueueHandoffPanel handoff={handoff} onCopyPrompt={onCopyPrompt} />
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(94,234,212,0.2)", background: "linear-gradient(145deg, rgba(15,23,42,0.84), rgba(2,6,23,0.7))", borderRadius: 8, padding: 14, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase", overflowWrap: "anywhere" };
const title: CSSProperties = { margin: "4px 0", fontSize: 18, letterSpacing: 0, overflowWrap: "anywhere" };
const copy: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.5, color: "#cbd5e1", overflowWrap: "anywhere" };
const badge: CSSProperties = { border: "1px solid rgba(94,234,212,0.28)", background: "rgba(20,184,166,0.12)", borderRadius: 8, padding: "6px 8px", color: "#ccfbf1", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const layout: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(min(100%, 390px), 0.9fr)", gap: 10, alignItems: "start", minWidth: 0 };
const side: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
