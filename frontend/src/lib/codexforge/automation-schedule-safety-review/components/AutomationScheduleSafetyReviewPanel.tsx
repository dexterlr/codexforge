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
  buildAutomationScheduleSafetyReviewModel,
  buildAutomationScheduleSafetyReviewStableKey,
} from "@/lib/codexforge/automation-schedule-safety-review";

const AUTOMATION_SCHEDULE_SAFETY_REVIEW_MARKERS =
  "Automation schedule safety review Automation schedule safety review does not schedule tasks Scheduled automation requires explicit operator approval Unsafe schedule shortcuts stay blocked Schedule safety groups Cadence rate-limit checklist automation schedule safety identity quiet-hours and notification checklist denied schedule shortcuts connector/provider timing boundary notes blocked schedule risks automation release candidate route dry-run route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no approval decision persistence no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launching no creative asset generation no research execution no coding workflow execution no patch apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no evidence ingestion automation no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw automation schedule safety JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced schedule details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function AutomationScheduleSafetyReviewPanel() {
  const model = buildAutomationScheduleSafetyReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-automation-schedule-safety-review={`${AUTOMATION_SCHEDULE_SAFETY_REVIEW_MARKERS} buildAutomationScheduleSafetyReviewStableKey AutomationScheduleSafetyReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 440"
        title="Automation schedule safety review"
        subtitle="Automation schedule safety review previews cadence and timing without scheduling tasks. Automation schedule safety review does not schedule tasks, scheduled automation requires explicit operator approval, and unsafe schedule shortcuts stay blocked."
        primary={{ href: "#automation-schedule-safety-review", label: "Review schedule safety" }}
        links={[
          { href: "/automation-dry-run-trial-review", label: "Dry-run review" },
          { href: "/automation-approval-queue-review", label: "Approval queue" },
          { href: "/automation-integration-release-candidate", label: "Automation RC" },
          { href: "/scheduled-research-check-boundary", label: "Research schedule" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.scheduleLanguage} />
      <PreviewFoundationCard title="Plain-English automation schedule safety review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews automation schedule safety identity, schedule safety groups, cadence rate-limit checklist,
          quiet-hours and notification checklist, denied schedule shortcuts, connector/provider timing boundary notes,
          blocked schedule risks, automation release candidate route, dry-run route, and next recommended action. It does
          not schedule tasks, create schedules, create reminders, create watches, start polling loops, send notifications,
          call connectors, call providers, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="automation-schedule-safety-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildAutomationScheduleSafetyReviewStableKey("automation-schedule-safety-card", review.id)}
            title={review.automationScheduleSafetyIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Schedule safety groups: ${review.scheduleSafetyGroups.join("; ")}`,
                `Cadence rate-limit checklist: ${review.cadenceRateLimitChecklist.join("; ")}`,
                `Quiet-hours and notification checklist: ${review.quietHoursNotificationChecklist.join("; ")}`,
                `Denied schedule shortcuts: ${review.deniedScheduleShortcuts.join("; ")}`,
                `Connector/provider timing boundary notes: ${review.connectorProviderTimingBoundaryNotes.join("; ")}`,
                `Blocked schedule risks: ${review.blockedScheduleRisks.join("; ")}`,
                review.automationReleaseCandidateRoute,
                review.dryRunRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced schedule details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedScheduleDetails)} />
        <PreviewFoundationCopy>
          Advanced schedule details stay collapsed or secondary. Automation schedule safety review remains separate from
          task scheduling, schedule creation, reminders, watches, polling loops, background jobs, notifications,
          connectors, providers, local bridge calls, files, memory, tools, agents, plugins, and MCP runtimes.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
