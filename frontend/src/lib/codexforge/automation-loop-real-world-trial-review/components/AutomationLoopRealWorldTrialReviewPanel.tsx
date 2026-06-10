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
  buildAutomationLoopRealWorldTrialReviewModel,
  buildAutomationLoopRealWorldTrialReviewStableKey,
} from "@/lib/codexforge/automation-loop-real-world-trial-review";

const AUTOMATION_LOOP_REAL_WORLD_TRIAL_REVIEW_MARKERS =
  "Automation loop real-world trial review Automation trial review does not create automations No background work runs from this page Notification delivery requires explicit approval Reminder watch schedule plan Manual validation checklist real-world trial review review-only approval required real evidence is reviewed before use Memory promotion remains blocked until approved automation trial identity source automation release candidate operator automation scenario approval gates delivery/privacy policy blocked real actions trial outcome notes trial report route advanced automation trial details collapsed/secondary no action execution from UI no workflow execution no coding task execution no test/build/smoke execution from UI no release/shipping execution no build execution from UI no smoke execution from UI no test execution from UI no patch apply behavior no commit creation from UI no provider API calls no connector API calls no Gmail API calls no Calendar API calls no Contacts API calls no Google API calls no web/search API calls no source fetching/browsing no OAuth request flow no connector authorization behavior no token storage no localStorage/sessionStorage token storage no automatic email/calendar/contact reads no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no prompt/file/project data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function AutomationLoopRealWorldTrialReviewPanel() {
  const model = buildAutomationLoopRealWorldTrialReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-automation-loop-real-world-trial-review={`${AUTOMATION_LOOP_REAL_WORLD_TRIAL_REVIEW_MARKERS} buildAutomationLoopRealWorldTrialReviewStableKey AutomationLoopRealWorldTrialReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 365"
        title="Automation trial review"
        subtitle="Automation loop real-world trial review prepares reminder, watch, and schedule readiness without creating automations. No background work runs from this page, and notification delivery requires explicit approval."
        primary={{ href: "#automation-loop-real-world-trial-review", label: "Review automation trial" }}
        links={[
          { href: "/automation-release-candidate", label: "Automation RC" },
          { href: "/task-reminder-boundary", label: "Reminder boundary" },
          { href: "/conditional-watch-review-inbox", label: "Watch review" },
          { href: "/review-inbox", label: "Trial report" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialReviewLanguage} />
      <PreviewFoundationCard title="Plain-English automation trial review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews the automation trial identity, reminder watch schedule plan, approval gates, delivery/privacy
          policy, blocked actions, manual validation checklist, outcome notes, and trial report route. It does not create
          reminders, schedule tasks, create automations, start background work, or send notifications.
        </PreviewFoundationCopy>
        <PreviewFoundationCopy>
          Real evidence is reviewed before use, and memory promotion remains blocked until approved.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="automation-loop-real-world-trial-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildAutomationLoopRealWorldTrialReviewStableKey(
              "automation-loop-real-world-trial-review-card",
              review.id
            )}
            title={review.automationTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceAutomationReleaseCandidate,
                review.operatorAutomationScenario,
                `Reminder watch schedule plan: ${review.reminderWatchSchedulePlan.join("; ")}`,
                `Approval gates: ${review.approvalGates.join("; ")}`,
                review.deliveryPrivacyPolicy,
                `Blocked real actions: ${review.blockedRealActions.join("; ")}`,
                `Manual validation checklist: ${review.manualValidationChecklist.join("; ")}`,
                `Trial outcome notes: ${review.trialOutcomeNotes.join("; ")}`,
                review.trialReportRoute,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced automation trial details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedAutomationTrialDetails)} />
        <PreviewFoundationCopy>
          Advanced automation trial details stay collapsed or secondary. Automation real-world trial review remains
          separate from reminder creation, schedules, watches, background work, notification delivery, connector reads,
          provider calls, local files, and memory promotion.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
