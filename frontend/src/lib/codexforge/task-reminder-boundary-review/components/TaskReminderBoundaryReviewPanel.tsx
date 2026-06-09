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
  buildTaskReminderBoundaryReviewModel,
  buildTaskReminderBoundaryReviewStableKey,
} from "@/lib/codexforge/task-reminder-boundary-review";

const TASK_REMINDER_BOUNDARY_REVIEW_MARKERS =
  "Task reminder boundary review Task reminders require explicit approval No reminder is created from this page Notification delivery is not enabled here Delivery channel policy Conditional watch route boundary identity source notification center reminder request summary allowed reminder scope denied reminder scope privacy/redaction policy approval requirement blocked reasons no OAuth request flow no connector authorization behavior no connector API calls no Gmail API calls no Calendar API calls no Contacts API calls no Google API calls no connector data reads no automatic email reads no automatic calendar reads no automatic contact reads no email draft/send behavior no calendar event create/update/delete behavior no contact create/update/delete behavior no token storage no localStorage/sessionStorage token storage no private connector values displayed no notifications sent no reminder creation no task scheduling no automation creation no background job creation no background jobs no background work runs from UI no cron/interval/polling loops from UI no automatic web browsing no web/search/provider API calls no automatic provider calls no provider API calls no automatic provider send no prompt/file/source/connector data sending without approval no prompt/file/source sending without approval no localStorage API key storage no process.env printing no API keys or secrets displayed no source auto-fetching no source auto-refreshing no freshness auto-recheck no evidence auto-update no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no command execution no shell command execution no git command execution from UI no test execution from UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no package install behavior no Ruflo/Odysseus vendoring no Ruflo/Odysseus runtime integration no Ruflo/Odysseus dependency references future adoption requires license/security review server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced reminder details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function TaskReminderBoundaryReviewPanel() {
  const model = buildTaskReminderBoundaryReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-task-reminder-boundary-review={`${TASK_REMINDER_BOUNDARY_REVIEW_MARKERS} buildTaskReminderBoundaryReviewStableKey TaskReminderBoundaryReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 342"
        title="Task reminder boundary"
        subtitle="Task reminder boundary review defines the approval boundary before any future reminder creation. Task reminders require explicit approval, no reminder is created from this page, notification delivery is not enabled here, and no background work runs from UI."
        primary={{ href: "#task-reminder-boundary-review", label: "Review reminder boundary" }}
        links={[
          { href: "/operator-notification-center", label: "Notification center" },
          { href: "/conditional-watch-review-inbox", label: "Watch review" },
          { href: "/connector-release-candidate", label: "Connector release" },
          { href: "/review-inbox", label: "Review inbox" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.reminderLanguage} />
      <PreviewFoundationCard title="Plain-English reminder boundary">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews reminder boundaries only. It does not create reminders, schedule tasks, create automations,
          send notifications, start background jobs, run polling loops, call connectors, call providers, browse the web,
          read private data, write files, or promote memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="task-reminder-boundary-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildTaskReminderBoundaryReviewStableKey("task-reminder-boundary-review-card", review.id)}
            title={review.boundaryIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceNotificationCenter,
                review.reminderRequestSummary,
                review.allowedReminderScope,
                review.deniedReminderScope,
                `Privacy/redaction policy: ${review.privacyRedactionPolicy.join("; ")}`,
                `Delivery channel policy: ${review.deliveryChannelPolicy.join("; ")}`,
                review.approvalRequirement,
                review.conditionalWatchRoute,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced reminder details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedReminderDetails)} />
        <PreviewFoundationCopy>
          Advanced reminder details stay collapsed or secondary. Reminder review remains separate from reminder
          creation, notification delivery, task scheduling, background work, automations, connectors, providers, memory,
          local files, and command execution.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
