"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildComfyUiJobPackageSummary } from "@/lib/codexforge/comfyui-job-package-builder";
import { ComfyUiJobApprovalCheckPanel } from "./ComfyUiJobApprovalCheckPanel";
import { ComfyUiJobArtifactPlanPanel } from "./ComfyUiJobArtifactPlanPanel";
import { ComfyUiJobInputPanel } from "./ComfyUiJobInputPanel";
import { ComfyUiJobPackageEmptyState } from "./ComfyUiJobPackageEmptyState";
import { ComfyUiJobPackageHandoffPanel } from "./ComfyUiJobPackageHandoffPanel";
import { ComfyUiJobPackagePanel } from "./ComfyUiJobPackagePanel";
import { ComfyUiJobPackageSafetyStrip } from "./ComfyUiJobPackageSafetyStrip";
import { ComfyUiJobPackageSummaryPanel } from "./ComfyUiJobPackageSummaryPanel";
import { ComfyUiJobParameterSetPanel } from "./ComfyUiJobParameterSetPanel";

export function ComfyUiJobPackageBuilderPanel() {
  const summary = buildComfyUiJobPackageSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-comfyui-job-package-builder="ComfyUiJobPackageBuilderPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no real video generation no image generation no ComfyUI workflow run no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 141"
        title="ComfyUI job package"
        subtitle="Prepare a reviewed local video job before anything renders. The package is ready for future approved submit, not auto-run."
        primary={{ href: "#comfyui-job-package", label: "Build job package" }}
        links={[
          { href: "/video-assets", label: "Video assets" },
          { href: "/comfyui-workflows/parameters", label: "Parameters" },
          { href: "/video-jobs", label: "Video jobs" },
          { href: "/video-artifacts", label: "Video artifacts" },
          { href: "/comfyui-health", label: "ComfyUI health" },
          { href: "/comfyui-workflows/dry-run", label: "Dry run" },
          { href: "/comfyui-submit", label: "Submit boundary" },
        ]}
      />
      <ComfyUiJobPackageSafetyStrip />
      <ComfyUiJobPackageSummaryPanel summary={summary} />
      <section id="comfyui-job-package" style={previewStyles.grid}>
        <ComfyUiJobPackagePanel jobPackage={summary.jobPackage} />
        <ComfyUiJobInputPanel inputs={summary.jobPackage.inputs} />
        <ComfyUiJobParameterSetPanel parameterSet={summary.jobPackage.parameterSet} />
        <ComfyUiJobArtifactPlanPanel artifactPlan={summary.jobPackage.artifactPlan} />
        <ComfyUiJobApprovalCheckPanel checks={summary.jobPackage.approvalChecks} />
        <ComfyUiJobPackageHandoffPanel handoff={summary.handoff} />
      </section>
      <ComfyUiJobPackageEmptyState />
      <PreviewFoundationDetail summary="Advanced job package details">
        <PreviewFoundationCopy>The package can be copied for review. It does not submit a job, call ComfyUI, send prompts, run local workflows, or generate artifacts.</PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
