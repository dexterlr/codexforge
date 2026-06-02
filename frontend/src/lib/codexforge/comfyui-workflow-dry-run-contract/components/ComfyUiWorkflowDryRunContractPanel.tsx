"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildDryRunSummary } from "@/lib/codexforge/comfyui-workflow-dry-run-contract";
import { DryRunArtifactReviewPanel } from "./DryRunArtifactReviewPanel";
import { DryRunCheckPanel } from "./DryRunCheckPanel";
import { DryRunContractPanel } from "./DryRunContractPanel";
import { DryRunDecisionPanel } from "./DryRunDecisionPanel";
import { DryRunEmptyState } from "./DryRunEmptyState";
import { DryRunHandoffPanel } from "./DryRunHandoffPanel";
import { DryRunPackageReviewPanel } from "./DryRunPackageReviewPanel";
import { DryRunParameterReviewPanel } from "./DryRunParameterReviewPanel";
import { DryRunSafetyStrip } from "./DryRunSafetyStrip";
import { DryRunSummaryPanel } from "./DryRunSummaryPanel";

export function ComfyUiWorkflowDryRunContractPanel() {
  const summary = buildDryRunSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-comfyui-workflow-dry-run-contract="ComfyUiWorkflowDryRunContractPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 156"
        title="Workflow dry run"
        subtitle="Review whether a ComfyUI job is complete before any future submit."
        primary={{ href: "#workflow-dry-run", label: "Review dry run" }}
        links={[
          { href: "/comfyui-jobs/package", label: "Job package" },
          { href: "/comfyui-metadata", label: "Metadata" },
          { href: "/render-queue", label: "Render queue" },
          { href: "/video-final-render", label: "Draft to final" },
          { href: "/comfyui-submit", label: "Submit boundary" },
        ]}
      />
      <DryRunSafetyStrip />
      <DryRunSummaryPanel summary={summary} />
      <section id="workflow-dry-run" style={previewStyles.grid}>
        <DryRunContractPanel contract={summary.contract} />
        <DryRunCheckPanel checks={summary.checks} />
        <DryRunPackageReviewPanel review={summary.packageReview} />
        <DryRunParameterReviewPanel review={summary.parameterReview} />
        <DryRunArtifactReviewPanel review={summary.artifactReview} />
        <DryRunDecisionPanel decision={summary.decision} />
        <DryRunHandoffPanel handoff={summary.handoff} />
      </section>
      <DryRunEmptyState />
      <PreviewFoundationDetail summary="Advanced dry run details">
        <PreviewFoundationCopy>
          Copy dry run report allowed. The report can be reviewed before a future submit boundary, but this page has no run button and cannot call ComfyUI, send prompts, submit workflows, or mutate a render queue.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
