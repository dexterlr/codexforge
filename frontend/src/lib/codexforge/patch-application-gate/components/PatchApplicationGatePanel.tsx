"use client";

import type { CSSProperties } from "react";
import { useMemo } from "react";
import { buildPatchApplicationGateSession, type ApplyGateInputSource } from "../index";
import { ApplyApprovalPacketPanel } from "./ApplyApprovalPacketPanel";
import { ApplyGateInputPanel } from "./ApplyGateInputPanel";
import { ApplyMutationFirewallPanel } from "./ApplyMutationFirewallPanel";
import { ApplyPolicyPanel } from "./ApplyPolicyPanel";
import { ApplyRequestPreviewPanel } from "./ApplyRequestPreviewPanel";
import { ApplyRollbackGatePanel } from "./ApplyRollbackGatePanel";
import { ApplyVerificationGatePanel } from "./ApplyVerificationGatePanel";
import { PatchApplicationGateSafetyNotice } from "./PatchApplicationGateSafetyNotice";

type Props = {
  source?: ApplyGateInputSource;
  onCopyPrompt?: (prompt: string) => void;
  compact?: boolean;
};

const demoSource: ApplyGateInputSource = {
  previewDiffCompositionId: "preview-diff-composition-demo",
  queueItemId: "patch-preview-queue-demo",
  sourceGroundedFixId: "grounded-fix-demo-ai-panel",
  goal: "Prepare a human-approved apply request preview from a reviewed preview diff package.",
  targetFiles: ["src/app/ai/page.tsx", "src/lib/codexforge/patch-application-gate/index.ts"],
  primaryFile: "src/app/ai/page.tsx",
  pseudoDiffSummary: ["Preview package proposes UI integration and deterministic gate builders."],
  realPatchState: "absent",
  riskLevel: "medium",
  confidence: 0.74,
  verificationChecks: [
    "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-patch-application-gate.ps1",
  ],
  rollbackNotes: ["Use git restore path before commit.", "Use git revert after commit."],
  approvalPosture: "review-required",
  currentFileVerificationState: "unchecked",
  humanReviewState: "not-reviewed",
};

export function PatchApplicationGatePanel({ source, onCopyPrompt, compact = false }: Props) {
  const session = useMemo(() => buildPatchApplicationGateSession(source ?? demoSource), [source]);

  return (
    <section
      style={panel}
      data-codexforge-patch-application-gate-panel="PatchApplicationGatePanel renders Prepare human-approved apply gate explicit human approval required actual mutation remains blocked pseudo diff alone is not applyable apply-diff requires tool-policy approval current files must be verified rollback plan required preserve latest-message authority"
    >
      <div style={header}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>Patch Application Gate</span>
          <h2 style={title}>Prepare human-approved apply gate</h2>
          <p style={copy}>
            Preview diff package becomes an explicit approval packet, display-only apply request preview, policy view,
            mutation firewall, verification gate, and rollback gate. It does not auto-send, auto-run, auto-write,
            call apply-diff, call write-file, call run-command, or mutate Brain graph state.
          </p>
        </div>
        <button type="button" style={button} onClick={() => onCopyPrompt?.(session.applyReviewPrompt)}>
          Copy apply-review prompt
        </button>
      </div>
      <PatchApplicationGateSafetyNotice />
      <ApplyGateInputPanel input={session.input} validation={session.validation} />
      <ApplyApprovalPacketPanel packet={session.approvalPacket} />
      {compact ? null : (
        <div style={grid}>
          <ApplyPolicyPanel policy={session.policy} />
          <ApplyRequestPreviewPanel preview={session.requestPreview} />
          <ApplyMutationFirewallPanel firewall={session.mutationFirewall} />
          <ApplyVerificationGatePanel gate={session.verificationGate} />
          <ApplyRollbackGatePanel gate={session.rollbackGate} />
        </div>
      )}
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(248,113,113,0.24)", background: "linear-gradient(145deg, rgba(15,23,42,0.84), rgba(2,6,23,0.72))", borderRadius: 8, padding: 14, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fca5a5", fontSize: 11, fontWeight: 900, textTransform: "uppercase", overflowWrap: "anywhere" };
const title: CSSProperties = { margin: "4px 0", fontSize: 18, letterSpacing: 0, overflowWrap: "anywhere" };
const copy: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.5, color: "#cbd5e1", overflowWrap: "anywhere" };
const button: CSSProperties = { border: "1px solid rgba(248,113,113,0.32)", background: "rgba(248,113,113,0.14)", color: "#fee2e2", borderRadius: 8, padding: "9px 11px", fontSize: 12, fontWeight: 900, cursor: "pointer" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10, minWidth: 0 };
