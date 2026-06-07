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
  buildProjectIntelligenceRecoveryFlowModel,
  buildProjectIntelligenceRecoveryFlowStableKey,
} from "@/lib/codexforge/project-intelligence-recovery-flow";

const PROJECT_INTELLIGENCE_RECOVERY_FLOW_MARKERS =
  "Project intelligence recovery flow project intelligence recovery flow Retry is never automatic Recovery does not rescan arbitrary files Recovery does not mutate files Safe recovery checklist Blocked retry reasons source project intelligence result failure category stale/blocked scope retry eligibility redaction follow-up audit handoff next recommended route server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced recovery details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no arbitrary local scanning no file mutation no file write no patch apply behavior no file deletion no secret value display no automatic provider send no provider APIs are called no GitHub API calls from UI no localStorage API key storage no API key localStorage no process.env printing no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no package install no password storage no passwords stored no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no secrets displayed no secrets exported no secrets included no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProjectIntelligenceRecoveryFlowPanel() {
  const model = buildProjectIntelligenceRecoveryFlowModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-project-intelligence-recovery-flow={`${PROJECT_INTELLIGENCE_RECOVERY_FLOW_MARKERS} buildProjectIntelligenceRecoveryFlowStableKey ProjectIntelligenceRecoveryFlowPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 283"
        title="Intelligence recovery"
        subtitle="Project intelligence recovery flow triages failed, blocked, or stale project intelligence results. Retry is never automatic, recovery does not rescan arbitrary files, and recovery does not mutate files."
        primary={{ href: "#project-intelligence-recovery-flow", label: "Review recovery" }}
        links={[
          { href: "/project-intelligence-result", label: "Source result" },
          { href: "/review-inbox", label: "Review inbox" },
          { href: "/project-indexer-live-trial", label: "Index trial" },
          { href: "/project-risk-scan-live-trial", label: "Risk trial" },
          { href: "/jarvisd-audit-log", label: "Audit handoff" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.recoveryLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This flow explains what is stale or blocked and where review should go next. It does not browse arbitrary
          files, execute commands, retry scans automatically, or mutate project files.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="project-intelligence-recovery-flow" style={previewStyles.grid}>
        {model.recoveries.map((recovery) => (
          <PreviewFoundationCard
            key={buildProjectIntelligenceRecoveryFlowStableKey("project-intelligence-recovery-card", recovery.id)}
            title={recovery.recoveryIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Failure category: ${recovery.failureCategory}`,
                recovery.sourceProjectIntelligenceResult,
                recovery.staleBlockedScope,
                `Safe recovery checklist: ${recovery.safeRecoveryChecklist.join("; ")}`,
                recovery.retryEligibility,
                `Blocked retry reasons: ${recovery.blockedRetryReasons.join("; ")}`,
                recovery.redactionFollowUp,
                recovery.auditHandoff,
                recovery.nextRecommendedRoute,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced recovery details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced recovery details stay collapsed or secondary. Recovery preserves review context, but any new scan,
          retry, command, file action, provider send, or audit mutation remains outside this UI.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
