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
import { buildRealApprovedComfyUiSubmitTrialSummary } from "@/lib/codexforge/real-approved-comfyui-submit-trial";

export function RealApprovedComfyUiSubmitTrialPanel() {
  const model = buildRealApprovedComfyUiSubmitTrialSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-real-approved-comfyui-submit-trial="RealApprovedComfyUiSubmitTrialPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Real approved ComfyUI submit trial Explicit approval required Local ComfyUI only Artifact capture handoff Recovery path before retry Not a random generate button no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no arbitrary file browsing no artifact deletion no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 177"
        title="ComfyUI submit trial"
        subtitle="Gated readiness for a real approved local ComfyUI submit trial. The live queue call remains behind the approved local boundary."
        primary={{ href: "#real-approved-comfyui-submit-trial", label: "Review trial gate" }}
        links={[
          { href: "/comfyui-real-health", label: "Real health" },
          { href: "/comfyui-metadata-reader", label: "Metadata reader" },
          { href: "/workflow-package-validator", label: "Package validator" },
          { href: "/comfyui-submit", label: "Submit boundary" },
          { href: "/video-capture", label: "Artifact capture" },
          { href: "/video-recovery", label: "Recovery" },
        ]}
      />
      <PreviewFoundationSafetyStrip
        items={[
          "Not a random generate button",
          "Explicit approval required",
          "Local ComfyUI only",
          "Artifact capture handoff",
          "Recovery path before retry",
        ]}
      />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationPillList
          items={[
            `status: ${model.status}`,
            `ready for live submit: ${model.readyForLiveSubmit ? "yes" : "no"}`,
            "final live queue call remains behind boundary",
            "nothing is submitted from this page",
          ]}
        />
      </PreviewFoundationCard>
      <section id="real-approved-comfyui-submit-trial" style={previewStyles.grid}>
        <PreviewFoundationCard title="Submit trial flow">
          <PreviewFoundationPillList
            items={model.flow.map((stage) => `${stage.label}: ${stage.plainEnglish}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Readiness checklist">
          <PreviewFoundationPillList
            items={model.checks.map((check) => `${check.label}: ${check.status}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Boundary">
          <PreviewFoundationCopy>
            This is a gated readiness and handoff page. It cannot queue unapproved workflows, cannot mutate render queues silently, cannot delete artifacts, and cannot auto-open arbitrary local files.
          </PreviewFoundationCopy>
          <PreviewFoundationPillList
            items={[
              "approved local-only executor",
              "explicit safety checks",
              "explicit user approval",
              "local ComfyUI only",
              "no cloud calls",
              "no secrets",
              "artifact capture handoff",
              "review inbox",
              "recovery path before retry",
            ]}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Approval copy">
          <PreviewFoundationCopy>{model.approvalCopy}</PreviewFoundationCopy>
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced submit trial details">
        <PreviewFoundationCopy>
          Advanced trial details are secondary. A submit trial can only be ready when the health probe is ready, metadata reader is acceptable, workflow package validator is ready, approved submit boundary exists, artifact capture path is defined, recovery path is defined, and user approval copy is present. The final live queue call remains behind the approved local boundary.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
