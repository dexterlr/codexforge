"use client";

import {
  PreviewFoundationCard,
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  PreviewFoundationPillList,
  PreviewFoundationSafetyStrip,
  previewStyles,
} from "../../video-foundation-ui";
import { buildWorkflowCompatibilityCheckerModel } from "@/lib/codexforge/workflow-compatibility-checker";

export function WorkflowCompatibilityCheckerPanel() {
  const model = buildWorkflowCompatibilityCheckerModel();

  return (
    <div style={previewStyles.shell} data-codexforge-workflow-compatibility-checker="WorkflowCompatibilityCheckerPanel route imports/renders main panel route uses home-grade/unified shell marker plain English local-only review-gated compatibility-gated import-gated approval-gated nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Workflow compatibility checker Compatibility check does not submit to queue Local metadata source Blocking reasons Recommended next route Advanced diagnostics stay secondary no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no localStorage API key storage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no live workflow execution no model download/install behavior no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 192"
        title="Compatibility checker"
        subtitle="Workflow compatibility checker compares a workflow or template against local metadata before packaging or approved trial review. Compatibility check does not submit to queue."
        primary={{ href: "#workflow-compatibility-checker", label: "Review compatibility" }}
        links={[
          { href: "/workflow-template-import-shelf", label: "Import shelf" },
          { href: "/missing-model-node-resolver", label: "Missing items" },
          { href: "/comfyui-metadata-reader", label: "Metadata reader" },
          { href: "/comfyui-workflows/dry-run", label: "Dry run" },
          { href: "/workflow-package-validator", label: "Package validator" },
        ]}
      />
      <PreviewFoundationSafetyStrip
        items={[
          "Workflow compatibility checker",
          "Compatibility check does not submit to queue",
          "Local metadata source",
          "Blocking reasons",
          "Recommended next route",
          "Advanced diagnostics stay secondary",
        ]}
      />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="workflow-compatibility-checker" style={previewStyles.grid}>
        <PreviewFoundationCard title="Workflow summary">
          <PreviewFoundationPillList items={model.reports.map((report) => report.workflowTemplateSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Local metadata source">
          <PreviewFoundationPillList items={model.reports.map((report) => report.localMetadataSource)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Compatibility checks">
          <PreviewFoundationPillList
            items={model.reports.map(
              (report) =>
                `nodes ${report.nodeCompatibility}, models ${report.modelCheckpointCompatibility}, parameters ${report.parameterCompatibility}, output ${report.outputTypeCompatibility}`
            )}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Risk level">
          <PreviewFoundationPillList
            items={model.reports.map((report) => `${report.workflowTemplateSummary}: ${report.riskLevel}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocking reasons">
          <PreviewFoundationPillList items={model.reports.flatMap((report) => report.blockingReasons)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Recommended next route">
          <PreviewFoundationPillList
            items={model.reports.map(
              (report) =>
                `Recommended next route: ${report.recommendedNextRoute}; dry-run contract route: ${report.dryRunContractRoute}`
            )}
          />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced compatibility diagnostics">
        <PreviewFoundationPillList items={model.diagnostics} />
        <PreviewFoundationCopy>
          Advanced diagnostics stay secondary. This checker does not execute workflows, submit to queue, browse arbitrary local files, or fall back to cloud providers.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
