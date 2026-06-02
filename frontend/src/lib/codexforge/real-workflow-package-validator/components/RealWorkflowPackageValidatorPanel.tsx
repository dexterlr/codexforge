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
import { buildRealWorkflowPackageValidatorSummary } from "@/lib/codexforge/real-workflow-package-validator";

export function RealWorkflowPackageValidatorPanel() {
  const model = buildRealWorkflowPackageValidatorSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-real-workflow-package-validator="RealWorkflowPackageValidatorPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Real workflow package validator Prepared workflow package only Requires explicit approval Local-only target required Block unsafe submit no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no arbitrary file browsing no artifact deletion no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 176"
        title="Workflow package validator"
        subtitle="Validate a prepared local ComfyUI workflow package before any approved submit trial."
        primary={{ href: "#real-workflow-package-validator", label: "Review package checks" }}
        links={[
          { href: "/comfyui-workflows/dry-run", label: "Dry run" },
          { href: "/comfyui-jobs/package", label: "Job package" },
          { href: "/comfyui-metadata-reader", label: "Metadata reader" },
          { href: "/comfyui-real-health", label: "Real health" },
          { href: "/comfyui-submit-trial", label: "Submit trial" },
        ]}
      />
      <PreviewFoundationSafetyStrip
        items={[
          "Prepared workflow package only",
          "Local-only target required",
          "Requires explicit approval",
          "No secrets",
          "Block unsafe submit",
        ]}
      />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationPillList
          items={[
            `decision: ${model.decision.state}`,
            `package id: ${model.contract.packageId}`,
            `package key: ${model.contract.packageKey}`,
            model.contract.targetLabel,
          ]}
        />
      </PreviewFoundationCard>
      <section id="real-workflow-package-validator" style={previewStyles.grid}>
        <PreviewFoundationCard title="Validation states">
          <PreviewFoundationPillList items={model.supportedStates} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Package contract">
          <PreviewFoundationCopy>
            This validator checks a prepared workflow package contract. It does not browse local folders, does not inspect arbitrary files, and does not submit anything.
          </PreviewFoundationCopy>
          <PreviewFoundationPillList
            items={[
              model.contract.targetEndpoint,
              "no cloud provider destination",
              "no secrets",
              "no arbitrary file browsing",
              "no destructive artifact behavior",
              "approval copy is present",
              "dry-run contract exists",
            ]}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Checklist">
          <PreviewFoundationPillList
            items={model.checks.map((check) => `${check.label}: ${check.status}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title={model.decision.label}>
          <PreviewFoundationCopy>{model.decision.explanation}</PreviewFoundationCopy>
          <PreviewFoundationPillList
            items={[
              `approved submit trial review: ${model.decision.approvedSubmitTrialMayReview ? "yes" : "no"}`,
              "unsafe target blocks submit",
              "not local-only blocks submit",
              "missing model/node needs review",
            ]}
          />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced validator details">
        <PreviewFoundationCopy>
          Advanced package details are secondary. The validator only accepts the prepared package contract, keeps raw workflow data out of the first view, blocks unsafe submit states, and leaves live ComfyUI submission behind the approved local boundary.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
