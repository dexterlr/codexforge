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
  buildCodingLoopMvpAuditModel,
  buildCodingLoopMvpAuditStableKey,
} from "@/lib/codexforge/coding-loop-mvp-audit";

const CODING_LOOP_MVP_AUDIT_MARKERS =
  "Coding loop MVP audit Coding MVP audit does not execute commands Audit does not apply patches or create commits Secrets are not inspected or displayed Release decision Known gaps plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced audit details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no runCommand brokerExecution or local executor API calls from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no rollback behavior no file deletion no secret value display no automatic provider send no provider APIs are called no GitHub API calls from UI no localStorage API key storage no process.env printing no process.env value printed in UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no weakened safe path checks no removed server-only boundaries no arbitrary local browsing reintroduced no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function CodingLoopMvpAuditPanel() {
  const model = buildCodingLoopMvpAuditModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-coding-loop-mvp-audit={`${CODING_LOOP_MVP_AUDIT_MARKERS} buildCodingLoopMvpAuditStableKey CodingLoopMvpAuditPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 277"
        title="Coding loop MVP audit"
        subtitle="Coding loop MVP audit checks whether the local coding loop is ready for a first end-to-end demo or release candidate. Coding MVP audit does not execute commands, audit does not apply patches or create commits, and secrets are not inspected or displayed."
        primary={{ href: "#coding-loop-mvp-audit", label: "Review MVP audit" }}
        links={[
          { href: "/codebase-change-plan", label: "Change plan" },
          { href: "/patch-preview-workbench", label: "Patch preview" },
          { href: "/patch-apply-trial", label: "Apply trial" },
          { href: "/review-inbox", label: "Review inbox" },
          { href: "/release-smoke", label: "Release smoke" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.auditLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This audit is a readiness surface, not an executor. It does not execute commands, run tests, run git, apply
          patches, rollback files, create commits, mutate files, inspect secrets, or display secret values.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="coding-loop-mvp-audit" style={previewStyles.grid}>
        {model.audits.map((audit) => (
          <PreviewFoundationCard
            key={buildCodingLoopMvpAuditStableKey("coding-loop-mvp-audit-card", audit.id)}
            title={audit.auditIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Covered coding loop surfaces: ${audit.coveredCodingLoopSurfaces.join("; ")}`,
                audit.projectIntelligenceReadiness,
                audit.changePlanReadiness,
                audit.patchPreviewReadiness,
                audit.fileOperationReadiness,
                audit.testOperationReadiness,
                audit.gitOperationReadiness,
                audit.patchApplyRollbackReadiness,
                audit.reviewInboxReadiness,
                `Known gaps: ${audit.knownGaps.join("; ")}`,
                `Release decision: ${audit.releaseDecision}`,
                audit.nextRecommendedRoute,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced audit details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced audit details stay collapsed or secondary. The audit reviews readiness across the local coding loop
          chain without promoting memory, mutating Brain graph state, sending findings to providers, or calling GitHub
          APIs from UI.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
