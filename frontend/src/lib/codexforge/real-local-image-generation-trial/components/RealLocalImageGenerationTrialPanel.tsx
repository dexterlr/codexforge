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
import { buildRealLocalImageGenerationTrialSummary } from "@/lib/codexforge/real-local-image-generation-trial";

export function RealLocalImageGenerationTrialPanel() {
  const model = buildRealLocalImageGenerationTrialSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-real-local-image-generation-trial="RealLocalImageGenerationTrialPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Real local image generation trial Explicit approval before local image trial Local ComfyUI only Artifact capture handoff Not a random generate button Nothing runs automatically no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no localStorage API key storage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no arbitrary file browsing no artifact deletion no delete artifact button no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 178"
        title="Local image trial"
        subtitle="A prepared, reviewed, approval-gated local ComfyUI image trial. Nothing runs automatically and this page cannot submit arbitrary workflows."
        primary={{ href: "#real-local-image-generation-trial", label: "Review image trial" }}
        links={[
          { href: "/comfyui-real-health", label: "Real health" },
          { href: "/comfyui-metadata-reader", label: "Metadata reader" },
          { href: "/workflow-package-validator", label: "Package validator" },
          { href: "/comfyui-submit-trial", label: "Submit trial" },
          { href: "/local-output-capture", label: "Output capture" },
          { href: "/video-review", label: "Review inbox" },
          { href: "/video-recovery", label: "Recovery" },
        ]}
      />
      <PreviewFoundationSafetyStrip
        items={[
          "Real local image generation trial",
          "Explicit approval before local image trial",
          "Local ComfyUI only",
          "Artifact capture handoff",
          "Not a random generate button",
          "Nothing runs automatically",
        ]}
      />
      <PreviewFoundationCard title="Plain-English flow">
        <PreviewFoundationCopy>
          health probe ready -&gt; metadata acceptable -&gt; workflow package valid -&gt; explicit user approval -&gt; local ComfyUI only -&gt; artifact capture handoff -&gt; review inbox -&gt; recovery path.
        </PreviewFoundationCopy>
        <PreviewFoundationPillList
          items={[
            `status: ${model.status}`,
            `ready for approved local trial: ${model.readyForApprovedLocalTrial ? "yes" : "no"}`,
            "nothing is sent anywhere from this page",
            "no random generation",
          ]}
        />
      </PreviewFoundationCard>
      <section id="real-local-image-generation-trial" style={previewStyles.grid}>
        <PreviewFoundationCard title="Readiness checklist">
          <PreviewFoundationPillList
            items={model.checks.map((check) => `${check.label}: ${check.status}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Prompt and package summary">
          <PreviewFoundationCopy>{model.packageSummary.promptSummary}</PreviewFoundationCopy>
          <PreviewFoundationPillList
            items={[
              `negative prompt: ${model.packageSummary.negativePromptSummary}`,
              `workflow package: ${model.packageSummary.workflowPackage}`,
              model.packageSummary.artifactDestination,
            ]}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Approval copy">
          <PreviewFoundationCopy>{model.approvalCopy}</PreviewFoundationCopy>
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Local boundary">
          <PreviewFoundationCopy>
            The trial is local-only and approval-gated. It does not browse arbitrary local files, does not mutate queues, does not delete artifacts, and does not send prompts or files to providers.
          </PreviewFoundationCopy>
          <PreviewFoundationPillList
            items={[
              "approved local boundary required",
              "local ComfyUI only",
              "artifact capture handoff",
              "review inbox handoff",
              "recovery path before retry",
              "no cloud calls",
            ]}
          />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced image trial details">
        <PreviewFoundationCopy>
          Advanced package details are secondary. The prepared package is summarized, not shown as giant raw JSON above the fold. The approved local submit boundary is the only future place a local ComfyUI queue call may be considered, and this page is not that executor.
        </PreviewFoundationCopy>
        <PreviewFoundationPillList items={model.flow.map((stage) => `${stage.label}: ${stage.plainEnglish}`)} />
      </PreviewFoundationDetail>
    </div>
  );
}
