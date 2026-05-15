"use client";

import type { CSSProperties } from "react";
import type { BrainMergeReviewModel } from "../brain-merge-types";
import { BrainEventQueuePanel } from "./BrainEventQueuePanel";
import { BrainGraphDiffPanel } from "./BrainGraphDiffPanel";
import { BrainMergeLedgerPanel } from "./BrainMergeLedgerPanel";
import { BrainMergePlanPanel } from "./BrainMergePlanPanel";
import { BrainMergePolicyPanel } from "./BrainMergePolicyPanel";
import { BrainMergeSafetyNotice } from "./BrainMergeSafetyNotice";
import { BrainMergeValidationPanel } from "./BrainMergeValidationPanel";

export function BrainMergeReviewPanel({ model }: { model: BrainMergeReviewModel }) {
  return (
    <section
      style={panel}
      data-codexforge-brain-merge-review-panel="BrainMergeReviewPanel Preview only. No Brain graph mutation. explicit merge approval required memory.promoted"
    >
      <div style={header}>
        <div style={copyBlock}>
          <span style={eyebrow}>Phase 18</span>
          <h2 style={title}>Brain Event Merge Review</h2>
          <p style={copy}>
            Persisted memory events are reduced into a graph diff preview for merge safety review.
            This surface is approval-gated and does not auto-merge.
          </p>
        </div>
        <span style={badge}>{model.plan.nextAction}</span>
      </div>
      <BrainMergeSafetyNotice />
      <BrainEventQueuePanel queue={model.queue} />
      <BrainMergePlanPanel plan={model.plan} />
      <BrainGraphDiffPanel diff={model.diff} />
      <BrainMergePolicyPanel policy={model.policy} />
      <BrainMergeValidationPanel validation={model.validation} />
      <BrainMergeLedgerPanel ledger={model.ledger} />
    </section>
  );
}

const safe: CSSProperties = { overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.72))", borderRadius: 8, padding: 16, display: "grid", gap: 14, minWidth: 0 };
const header: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 12, alignItems: "start", minWidth: 0 };
const copyBlock: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase", ...safe };
const title: CSSProperties = { margin: 0, fontSize: 22, ...safe };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.55, ...safe };
const badge: CSSProperties = { border: "1px solid rgba(45,212,191,0.3)", background: "rgba(20,184,166,0.14)", borderRadius: 8, padding: "8px 10px", color: "#ccfbf1", fontSize: 12, fontWeight: 850, ...safe };
