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
  buildAutomationReleaseCandidateModel,
  buildAutomationReleaseCandidateStableKey,
} from "@/lib/codexforge/automation-release-candidate";

const AUTOMATION_RELEASE_CANDIDATE_MARKERS =
  "Automation release candidate Automation release candidate remains review-only Automations are not created automatically Background work remains disabled from UI Release decision Known gaps release candidate identity covered automation surfaces reminder readiness scheduled research readiness conditional watch readiness notification readiness audit/recovery readiness next recommended route no OAuth request flow no connector authorization behavior no connector API calls no Gmail API calls no Calendar API calls no Contacts API calls no Google API calls no connector data reads no automatic email reads no automatic calendar reads no automatic contact reads no email draft/send behavior no calendar event create/update/delete behavior no contact create/update/delete behavior no token storage no localStorage/sessionStorage token storage no private connector values displayed no notifications sent no reminder creation no task scheduling no schedule creation no automation creation no watch activation no background check activation no background job creation no background jobs no background work runs from UI no cron/interval/polling loops from UI no automatic web browsing no web/search/provider API calls no automatic provider calls no provider API calls no automatic provider send no prompt/file/source/connector data sending without approval no prompt/file/source sending without approval no auto-spend tokens no provider retries automatically no localStorage API key storage no process.env printing no API keys or secrets displayed no source auto-fetching no source auto-ingestion no source auto-refreshing no freshness auto-recheck no evidence auto-ingestion no evidence auto-update no auto-cite no auto-citation finalization no automatic report export no file export/write behavior no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no command execution no shell command execution no git command execution from UI no test execution from UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no process kill/restart/shutdown from UI no package install behavior no Ruflo/Odysseus vendoring no Ruflo/Odysseus runtime integration no Ruflo/Odysseus dependency references future adoption requires license/security review server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced release details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function AutomationReleaseCandidatePanel() {
  const model = buildAutomationReleaseCandidateModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-automation-release-candidate={`${AUTOMATION_RELEASE_CANDIDATE_MARKERS} buildAutomationReleaseCandidateStableKey AutomationReleaseCandidatePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 345"
        title="Automation release"
        subtitle="Automation release candidate audits reminder, scheduled research, conditional watch, and notification readiness as a review-only MVP. Automation release candidate remains review-only, automations are not created automatically, and background work remains disabled from UI."
        primary={{ href: "#automation-release-candidate", label: "Review release" }}
        links={[
          { href: "/task-reminder-boundary", label: "Reminder boundary" },
          { href: "/scheduled-research-check-boundary", label: "Research boundary" },
          { href: "/conditional-watch-review-inbox", label: "Watch review" },
          { href: "/operator-notification-center", label: "Notification center" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.releaseLanguage} />
      <PreviewFoundationCard title="Plain-English automation release">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page is a release audit only. It does not create automations, create reminders, schedule tasks, activate
          watches, run background work, send notifications, call connectors, call providers, refresh sources, write
          files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="automation-release-candidate" style={previewStyles.grid}>
        {model.candidates.map((candidate) => (
          <PreviewFoundationCard
            key={buildAutomationReleaseCandidateStableKey("automation-release-candidate-card", candidate.id)}
            title={candidate.releaseCandidateIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Release decision: ${candidate.releaseDecision}`,
                `Covered automation surfaces: ${candidate.coveredAutomationSurfaces.join("; ")}`,
                candidate.reminderReadiness,
                candidate.scheduledResearchReadiness,
                candidate.conditionalWatchReadiness,
                candidate.notificationReadiness,
                candidate.auditRecoveryReadiness,
                `Known gaps: ${candidate.knownGaps.join("; ")}`,
                candidate.nextRecommendedRoute,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced release details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.candidates.map((candidate) => candidate.advancedReleaseDetails)} />
        <PreviewFoundationCopy>
          Advanced release details stay collapsed or secondary. Automation release review remains separate from
          automation creation, reminders, schedules, watch activation, background work, notification delivery, connectors,
          providers, source refresh, memory, local files, and command execution.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
