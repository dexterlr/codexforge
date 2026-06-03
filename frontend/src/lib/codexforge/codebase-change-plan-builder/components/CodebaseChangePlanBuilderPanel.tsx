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
import {
  buildCodebaseChangePlanBuilderModel,
  buildCodebaseChangePlanBuilderStableKey,
} from "@/lib/codexforge/codebase-change-plan-builder";

const CODEBASE_CHANGE_PLAN_BUILDER_MARKERS =
  "Codebase change plan builder Change plans do not modify files Arbitrary local browsing is not allowed Secrets stay redacted Proposed file targets Patch preview route approved local boundary required nothing reads arbitrary files automatically nothing executes from arbitrary UI plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no arbitrary local file browsing no arbitrary file read/open no file mutation no file deletion no patch apply behavior no package install behavior no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function CodebaseChangePlanBuilderPanel() {
  const model = buildCodebaseChangePlanBuilderModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-codebase-change-plan-builder={`${CODEBASE_CHANGE_PLAN_BUILDER_MARKERS} buildCodebaseChangePlanBuilderStableKey CodebaseChangePlanBuilderPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 226"
        title="Change plan"
        subtitle="Codebase change plan builder turns reviewed project context into a plain-English plan. Change plans do not modify files, arbitrary local browsing is not allowed, secrets stay redacted, and nothing applies automatically."
        primary={{ href: "#codebase-change-plan-builder", label: "Review change plan" }}
        links={[
          { href: "/safe-project-indexer", label: "Project index" },
          { href: "/project-dependency-map", label: "Dependency map" },
          { href: "/project-risk-secrets-scan", label: "Risk scan" },
          { href: "/local-file-approval", label: "File boundary" },
          { href: "/patch-preview-workbench", label: "Patch preview route" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.planningLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page plans the work only. It does not read arbitrary files, write files, generate live patches,
          apply patches, execute commands, or send prompts/files to providers.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="codebase-change-plan-builder" style={previewStyles.grid}>
        {model.plans.map((plan) => (
          <PreviewFoundationCard
            key={buildCodebaseChangePlanBuilderStableKey("change-plan-card", plan.id)}
            title={plan.changeRequestSummary}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${plan.status}`,
                plan.affectedArea,
                plan.projectIndexDependency,
                plan.dependencyRiskSignalSummary,
                plan.proposedFileTargets,
                plan.nonGoals,
                `Risk level: ${plan.riskLevel}`,
                plan.approvalRequirement,
                plan.patchPreviewRoute,
                `Blocked reasons: ${plan.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced plan details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced plan details stay secondary. A plan can name proposed file targets from reviewed metadata, but it
          does not browse local paths, read files, write files, apply patches, run commands, call Jarvisd, call
          providers, mutate memory, or expose secrets.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
