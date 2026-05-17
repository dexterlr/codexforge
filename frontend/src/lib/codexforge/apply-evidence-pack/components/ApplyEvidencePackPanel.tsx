"use client";

import type { CSSProperties } from "react";
import { useMemo } from "react";
import { buildApplyEvidencePack, type ApplyEvidenceInputSource } from "../index";
import { ApplyEvidenceApprovalPanel } from "./ApplyEvidenceApprovalPanel";
import { ApplyEvidenceFirewallPanel } from "./ApplyEvidenceFirewallPanel";
import { ApplyEvidenceInputPanel } from "./ApplyEvidenceInputPanel";
import { ApplyEvidenceRiskPanel } from "./ApplyEvidenceRiskPanel";
import { ApplyEvidenceRollbackPanel } from "./ApplyEvidenceRollbackPanel";
import { ApplyEvidenceSummaryPanel } from "./ApplyEvidenceSummaryPanel";
import { ApplyEvidenceTestPlanPanel } from "./ApplyEvidenceTestPlanPanel";
import { CurrentFileVerificationPanel } from "./CurrentFileVerificationPanel";

type Props = {
  source?: ApplyEvidenceInputSource;
  onCopyReport?: (report: string) => void;
  compact?: boolean;
};

const demoSource: ApplyEvidenceInputSource = {
  previewDiffPackageId: "preview-diff-composition-demo",
  applyGateId: "apply-gate:preview-diff-composition-demo",
  queueItemId: "patch-preview-queue-demo",
  goal: "Bundle proof before any future guarded apply executor is considered.",
  targetFiles: ["src/app/ai/page.tsx", "src/lib/codexforge/apply-evidence-pack/index.ts"],
  primaryFile: "src/app/ai/page.tsx",
  previewDiffSummary: [
    "Preview diff package proposes UI integration and deterministic evidence pack builders.",
    "Pseudo diff is context only and current file content remains authority.",
  ],
  evidenceRefs: [
    {
      id: "preview-diff-composer-demo",
      label: "Preview Diff Composer package",
      summary: "Pseudo-diff package with verification and rollback planning.",
    },
    {
      id: "patch-application-gate-demo",
      label: "Patch Application Gate packet",
      summary: "Approval boundary and mutation firewall review packet.",
    },
  ],
  riskLevel: "medium",
  currentFileVerificationState: "review-state-current",
  currentFileReviewNote: "Operator reviewed current file state metadata before preparing evidence pack.",
  rollbackPlan: ["Use git restore before commit.", "Use git revert after commit."],
  testPlan: ["npm run build", "git diff --check"],
  smokeChecks: ["powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-apply-evidence-pack.ps1"],
  operatorApprovalNote: "Approved for future guarded apply review only; do not apply changes here.",
  approvalState: "approved",
  mutationFirewallAcknowledged: true,
  futureGuardedApplyAcknowledged: true,
  noMutationAcknowledged: true,
};

export function ApplyEvidencePackPanel({ source, onCopyReport, compact = false }: Props) {
  const pack = useMemo(() => buildApplyEvidencePack(source ?? demoSource), [source]);

  return (
    <section
      style={panel}
      data-codexforge-apply-evidence-pack-panel="ApplyEvidencePackPanel renders Apply Evidence Pack evidence pack does not apply changes future guarded apply only current file verification required rollback plan required test plan required operator approval note required mutation firewall active"
    >
      <div style={header}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>Apply Evidence Pack</span>
          <h2 style={title}>Bundle proof before guarded apply</h2>
          <p style={copy}>
            Preview diff package, target files, current file verification metadata, risk, rollback plan, test plan,
            approval packet, operator note, evidence refs, smoke placeholders, mutation firewall, and final readiness
            decision are bundled for human review. This evidence pack does not apply changes and is future guarded
            apply only.
          </p>
        </div>
        <button type="button" style={button} onClick={() => onCopyReport?.(pack.evidenceReport)}>
          Copy evidence report
        </button>
      </div>
      <ApplyEvidenceSummaryPanel pack={pack} />
      <ApplyEvidenceInputPanel input={pack.input} />
      {compact ? null : (
        <div style={grid}>
          <CurrentFileVerificationPanel verification={pack.currentFileVerification} />
          <ApplyEvidenceRiskPanel risk={pack.risk} />
          <ApplyEvidenceTestPlanPanel plan={pack.testPlan} />
          <ApplyEvidenceRollbackPanel plan={pack.rollbackPlan} />
          <ApplyEvidenceApprovalPanel approval={pack.approval} />
          <ApplyEvidenceFirewallPanel firewall={pack.firewall} />
        </div>
      )}
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", background: "linear-gradient(145deg, rgba(15,23,42,0.86), rgba(2,6,23,0.74))", borderRadius: 8, padding: 14, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase", overflowWrap: "anywhere" };
const title: CSSProperties = { margin: "4px 0", fontSize: 18, letterSpacing: 0, overflowWrap: "anywhere" };
const copy: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.5, color: "#cbd5e1", overflowWrap: "anywhere" };
const button: CSSProperties = { border: "1px solid rgba(45,212,191,0.32)", background: "rgba(20,184,166,0.14)", color: "#ccfbf1", borderRadius: 8, padding: "9px 11px", fontSize: 12, fontWeight: 900, cursor: "pointer" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10, minWidth: 0 };
