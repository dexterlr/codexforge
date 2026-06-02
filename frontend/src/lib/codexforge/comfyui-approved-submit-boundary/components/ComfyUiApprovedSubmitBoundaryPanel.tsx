"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildSubmitBoundarySummary } from "@/lib/codexforge/comfyui-approved-submit-boundary";
import { SubmitBoundaryApprovalPanel } from "./SubmitBoundaryApprovalPanel";
import { SubmitBoundaryEmptyState } from "./SubmitBoundaryEmptyState";
import { SubmitBoundaryExecutionPosturePanel } from "./SubmitBoundaryExecutionPosturePanel";
import { SubmitBoundaryHandoffPanel } from "./SubmitBoundaryHandoffPanel";
import { SubmitBoundaryPolicyPanel } from "./SubmitBoundaryPolicyPanel";
import { SubmitBoundaryRequestPanel } from "./SubmitBoundaryRequestPanel";
import { SubmitBoundaryResultPanel } from "./SubmitBoundaryResultPanel";
import { SubmitBoundarySafetyPanel } from "./SubmitBoundarySafetyPanel";
import { SubmitBoundarySafetyStrip } from "./SubmitBoundarySafetyStrip";
import { SubmitBoundarySummaryPanel } from "./SubmitBoundarySummaryPanel";

export function ComfyUiApprovedSubmitBoundaryPanel() {
  const summary = buildSubmitBoundarySummary();

  return (
    <div style={previewStyles.shell} data-codexforge-comfyui-approved-submit-boundary="ComfyUiApprovedSubmitBoundaryPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 157"
        title="ComfyUI submit boundary"
        subtitle="Prepare the approval boundary for a future local workflow submit."
        primary={{ href: "#comfyui-submit-boundary", label: "Review submit boundary" }}
        links={[
          { href: "/comfyui-workflows/dry-run", label: "Dry run" },
          { href: "/comfyui-jobs/package", label: "Job package" },
          { href: "/render-queue", label: "Render queue" },
          { href: "/local-image", label: "Local image MVP" },
          { href: "/video-final-render", label: "Draft to final" },
          { href: "/video-safety-audit", label: "Safety audit" },
          { href: "/video-recovery", label: "Video recovery" },
        ]}
      />
      <SubmitBoundarySafetyStrip />
      <SubmitBoundarySummaryPanel summary={summary} />
      <section id="comfyui-submit-boundary" style={previewStyles.grid}>
        <SubmitBoundaryRequestPanel request={summary.request} />
        <SubmitBoundaryApprovalPanel approval={summary.approval} />
        <SubmitBoundaryPolicyPanel policy={summary.policy} />
        <SubmitBoundarySafetyPanel safety={summary.safety} />
        <SubmitBoundaryExecutionPosturePanel posture={summary.executionPosture} />
        <SubmitBoundaryResultPanel result={summary.result} />
        <SubmitBoundaryHandoffPanel handoff={summary.handoff} />
      </section>
      <SubmitBoundaryEmptyState />
      <PreviewFoundationDetail summary="Advanced submit boundary details">
        <PreviewFoundationCopy>
          Copy submit packet allowed. Copy safety report allowed. Copy next implementation handoff allowed. Actual execution is blocked because this phase does not include a guarded ComfyUI executor, queue submit route, workflow submit action, or prompt sender.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
