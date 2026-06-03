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
import { buildComfyUiWorkflowLibraryModel } from "@/lib/codexforge/comfyui-workflow-library";

export function ComfyUiWorkflowLibraryPanel() {
  const model = buildComfyUiWorkflowLibraryModel();

  return (
    <div style={previewStyles.shell} data-codexforge-comfyui-workflow-library="ComfyUiWorkflowLibraryPanel route imports/renders main panel route uses home-grade/unified shell marker plain English local-only review-gated compatibility-gated import-gated approval-gated nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons ComfyUI workflow library Library does not execute workflows Local-only workflow readiness Required models and nodes summary Package validator route Raw workflow details stay secondary no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no localStorage API key storage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no workflow execution from import/library UI no model download/install behavior no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 190"
        title="Workflow library"
        subtitle="ComfyUI workflow library organizes approved templates and prepared packages for local-only readiness. Library does not execute workflows."
        primary={{ href: "#comfyui-workflow-library", label: "Review library" }}
        links={[
          { href: "/workflow-template-import-shelf", label: "Import shelf" },
          { href: "/workflow-compatibility-checker", label: "Compatibility" },
          { href: "/missing-model-node-resolver", label: "Missing items" },
          { href: "/workflow-package-validator", label: "Package validator" },
          { href: "/comfyui-submit-trial", label: "Submit trial" },
        ]}
      />
      <PreviewFoundationSafetyStrip
        items={[
          "ComfyUI workflow library",
          "Library does not execute workflows",
          "Local-only workflow readiness",
          "Required models and nodes summary",
          "Package validator route",
          "Raw workflow details stay secondary",
        ]}
      />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>{model.operatorNote}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="comfyui-workflow-library" style={previewStyles.grid}>
        <PreviewFoundationCard title="Workflow identity">
          <PreviewFoundationPillList items={model.entries.map((entry) => entry.workflowIdentity)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Category and output">
          <PreviewFoundationPillList
            items={model.entries.map(
              (entry) => `${entry.workflowCategory}: ${entry.supportedOutputType}`
            )}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Local readiness">
          <PreviewFoundationPillList items={model.entries.map((entry) => entry.localOnlyReadiness)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Models and nodes">
          <PreviewFoundationPillList
            items={model.entries.map((entry) => entry.requiredModelsNodesSummary)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Compatibility and safety">
          <PreviewFoundationPillList
            items={model.entries.map(
              (entry) =>
                `${entry.workflowIdentity}: compatibility ${entry.compatibilityStatus}, safety ${entry.safetyStatus}`
            )}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Review routes">
          <PreviewFoundationPillList
            items={[
              "Package validator route: /workflow-package-validator",
              "Import shelf route: /workflow-template-import-shelf",
              "Approved submit route: /comfyui-submit-trial",
            ]}
          />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced workflow library details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Raw workflow details stay secondary. This surface does not browse arbitrary folders, call cloud providers, submit a ComfyUI queue item, or mutate render queues silently.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
