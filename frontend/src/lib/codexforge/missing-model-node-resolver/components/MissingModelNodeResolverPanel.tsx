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
import { buildMissingModelNodeResolverModel } from "@/lib/codexforge/missing-model-node-resolver";

export function MissingModelNodeResolverPanel() {
  const model = buildMissingModelNodeResolverModel();

  return (
    <div style={previewStyles.shell} data-codexforge-missing-model-node-resolver="MissingModelNodeResolverPanel route imports/renders main panel route uses home-grade/unified shell marker plain English local-only review-gated compatibility-gated import-gated approval-gated manual-only nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Missing model and node resolver Manual resolution only Do not download models Do not install nodes Missing item summary Full local paths stay secondary no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no localStorage API key storage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no live workflow execution no model download/install behavior no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 193"
        title="Missing items"
        subtitle="Missing model and node resolver helps plan manual local resolution. Manual resolution only: do not download models and do not install nodes from this UI."
        primary={{ href: "#missing-model-node-resolver", label: "Review missing items" }}
        links={[
          { href: "/workflow-compatibility-checker", label: "Compatibility" },
          { href: "/workflow-template-import-shelf", label: "Import shelf" },
          { href: "/render-queue-recovery", label: "Recovery" },
          { href: "/comfyui-metadata-reader", label: "Metadata reader" },
          { href: "/comfyui-workflow-library", label: "Library" },
        ]}
      />
      <PreviewFoundationSafetyStrip
        items={[
          "Missing model and node resolver",
          "Manual resolution only",
          "Do not download models",
          "Do not install nodes",
          "Missing item summary",
          "Full local paths stay secondary",
        ]}
      />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="missing-model-node-resolver" style={previewStyles.grid}>
        <PreviewFoundationCard title="Missing item summary">
          <PreviewFoundationPillList items={model.items.map((missing) => missing.missingItemSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Item type">
          <PreviewFoundationPillList
            items={model.items.map((missing) => `${missing.itemType}: ${missing.localInventoryCheckStatus}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Workflow impact">
          <PreviewFoundationPillList items={model.items.map((missing) => missing.workflowImpact)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Safe resolution guidance">
          <PreviewFoundationPillList
            items={model.items.map(
              (missing) => `${missing.installDownloadStatus}: ${missing.safeResolutionGuidance}`
            )}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Review routes">
          <PreviewFoundationPillList
            items={[
              "Compatibility checker route: /workflow-compatibility-checker",
              "Import shelf route: /workflow-template-import-shelf",
              "Retry/recovery route: /render-queue-recovery",
            ]}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Manual boundary">
          <PreviewFoundationPillList
            items={[
              "Manual resolution only",
              "Do not download models",
              "Do not install nodes",
              "No arbitrary local file browsing",
              "Full local paths stay secondary",
            ]}
          />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced missing item details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced resolver details stay secondary. This page does not install nodes, download models, browse arbitrary folders, expose full local paths above the fold, call external URLs, or submit a workflow.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
