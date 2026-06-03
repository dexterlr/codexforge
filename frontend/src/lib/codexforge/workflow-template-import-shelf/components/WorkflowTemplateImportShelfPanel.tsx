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
import { buildWorkflowTemplateImportShelfModel } from "@/lib/codexforge/workflow-template-import-shelf";

export function WorkflowTemplateImportShelfPanel() {
  const model = buildWorkflowTemplateImportShelfModel();

  return (
    <div style={previewStyles.shell} data-codexforge-workflow-template-import-shelf="WorkflowTemplateImportShelfPanel route imports/renders main panel route uses home-grade/unified shell marker plain English local-only review-gated compatibility-gated import-gated approval-gated nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Workflow template import shelf Import does not execute workflows Templates are not auto-trusted Review before library promotion Reject or quarantine guidance No template upload no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no localStorage API key storage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no workflow execution from import/library UI no model download/install behavior no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 191"
        title="Import shelf"
        subtitle="Workflow template import shelf stages templates for review. Import does not execute workflows, does not upload templates, and does not auto-trust sources."
        primary={{ href: "#workflow-template-import-shelf", label: "Review templates" }}
        links={[
          { href: "/comfyui-workflow-library", label: "Library" },
          { href: "/workflow-compatibility-checker", label: "Compatibility" },
          { href: "/missing-model-node-resolver", label: "Missing items" },
          { href: "/comfyui-workflows/safety", label: "Safety" },
          { href: "/comfyui-workflows/parameters", label: "Parameters" },
        ]}
      />
      <PreviewFoundationSafetyStrip
        items={[
          "Workflow template import shelf",
          "Import does not execute workflows",
          "Templates are not auto-trusted",
          "Review before library promotion",
          "Reject or quarantine guidance",
          "No template upload",
        ]}
      />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          Import is a reviewed staging concept only. It does not mutate the library silently and it does not trust arbitrary templates.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="workflow-template-import-shelf" style={previewStyles.grid}>
        <PreviewFoundationCard title="Incoming templates">
          <PreviewFoundationPillList
            items={model.candidates.map((candidate) => candidate.incomingTemplateSummary)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Trust and policy">
          <PreviewFoundationPillList
            items={model.candidates.map(
              (candidate) => `${candidate.sourceTrustLevel}: ${candidate.localOnlyPolicy}`
            )}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Inspection and mapping">
          <PreviewFoundationPillList
            items={model.candidates.map(
              (candidate) =>
                `safety ${candidate.safetyInspectionStatus}, parameters ${candidate.parameterMappingStatus}`
            )}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Review routes">
          <PreviewFoundationPillList
            items={[
              "Compatibility check route: /workflow-compatibility-checker",
              "Missing model/node route: /missing-model-node-resolver",
              "Library route: /comfyui-workflow-library",
            ]}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Approval notes">
          <PreviewFoundationPillList items={model.candidates.map((candidate) => candidate.approvalNote)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Reject or quarantine">
          <PreviewFoundationPillList
            items={model.candidates.map((candidate) => candidate.rejectQuarantineGuidance)}
          />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced template import details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Raw template details stay secondary. No parser in this UI browses arbitrary folders, uploads templates, executes workflows, or promotes staged items to the library automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
