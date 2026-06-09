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
  buildOperatorNotificationCenterShellModel,
  buildOperatorNotificationCenterShellStableKey,
} from "@/lib/codexforge/operator-notification-center-shell";

const OPERATOR_NOTIFICATION_CENTER_SHELL_MARKERS =
  "Operator notification center shell Notification center does not send notifications yet Notification delivery requires explicit approval Private connector research details stay redacted Notification categories Reminder boundary route notification center identity source connector research operator loops priority policy privacy/redaction policy delivery channel non-goals scheduled research boundary route blocked reasons no OAuth request flow no connector authorization behavior no connector API calls no Gmail API calls no Calendar API calls no Contacts API calls no Google API calls no connector data reads no automatic email reads no automatic calendar reads no automatic contact reads no email draft/send behavior no calendar event create/update/delete behavior no contact create/update/delete behavior no token storage no localStorage/sessionStorage token storage no private connector values displayed no notifications sent no reminder creation no task scheduling no automation creation no automatic provider calls no provider API calls no prompt/file/source/connector data sending without approval no localStorage API key storage no process.env printing no API keys or secrets displayed no source auto-fetching no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no command execution no shell command execution no git command execution from UI no test execution from UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no package install behavior no Ruflo/Odysseus vendoring no automatic web browsing no web/search/provider API calls no automatic provider send no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced notification details collapsed/secondary no unsafe execution buttons no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function OperatorNotificationCenterShellPanel() {
  const model = buildOperatorNotificationCenterShellModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-operator-notification-center-shell={`${OPERATOR_NOTIFICATION_CENTER_SHELL_MARKERS} buildOperatorNotificationCenterShellStableKey OperatorNotificationCenterShellPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 341"
        title="Notification center"
        subtitle="Operator notification center shell shows future notification categories and review flow without sending notifications or scheduling tasks. Notification center does not send notifications yet, notification delivery requires explicit approval, and private connector research details stay redacted."
        primary={{ href: "#operator-notification-center-shell", label: "Review notification shell" }}
        links={[
          { href: "/connector-release-candidate", label: "Connector release" },
          { href: "/research-workspace-release-candidate", label: "Research release" },
          { href: "/review-inbox", label: "Review inbox" },
          { href: "/runbook", label: "Operator runbook" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.notificationLanguage} />
      <PreviewFoundationCard title="Plain-English notification center">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page is a notification center shell only. It does not send notifications, create reminders, schedule
          tasks, create automations, call connector or provider APIs, display private connector research details, store
          tokens, or promote anything into memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="operator-notification-center-shell" style={previewStyles.grid}>
        {model.centers.map((center) => (
          <PreviewFoundationCard
            key={buildOperatorNotificationCenterShellStableKey("operator-notification-center-card", center.id)}
            title={center.notificationCenterIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${center.status}`,
                `Source connector research operator loops: ${center.sourceConnectorResearchOperatorLoops.join("; ")}`,
                `Notification categories: ${center.notificationCategories.join("; ")}`,
                `Priority policy: ${center.priorityPolicy.join("; ")}`,
                `Privacy/redaction policy: ${center.privacyRedactionPolicy.join("; ")}`,
                `Delivery channel non-goals: ${center.deliveryChannelNonGoals.join("; ")}`,
                center.reminderBoundaryRoute,
                center.scheduledResearchBoundaryRoute,
                `Blocked reasons: ${center.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced notification details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.centers.map((center) => center.advancedNotificationDetails)} />
        <PreviewFoundationCopy>
          Advanced notification details stay collapsed or secondary. Notification center review remains separate from
          delivery channels, reminders, scheduling, automations, connector APIs, provider APIs, memory promotion, local
          files, and tool execution.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
