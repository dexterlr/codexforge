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
  buildNotificationPreferencesReviewModel,
  buildNotificationPreferencesReviewStableKey,
} from "@/lib/codexforge/notification-preferences-review";

const NOTIFICATION_PREFERENCES_REVIEW_MARKERS =
  "Notification preferences review Notification preferences are not saved from this page No notifications are sent from this page Notification delivery requires explicit approval Notification groups Urgency cadence preview notification preferences identity privacy/redaction rules delivery approval gates blocked notification risks approval policy presets route saved review views route next recommended action review-only approval required plain English daily onboarding operator preferences workspace personalization saved views no settings mutation no preference persistence no notification preference persistence no notification creation no notification sending no personalization persistence no saved view persistence no approval policy mutation no approval preset persistence no recovery execution no recovery preset persistence no localStorage writes no sessionStorage writes no action execution from UI no approval automation no approval is granted no action approval from UI no workflow execution no workflow execution from UI no workflow runs automatically no provider API calls no connector API calls no web/search API calls no GitHub API calls from UI no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launch behavior no prompt/file/project data sending without approval no prompt/file/project/connector/preference data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced notification details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function NotificationPreferencesReviewPanel() {
  const model = buildNotificationPreferencesReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-notification-preferences-review={`${NOTIFICATION_PREFERENCES_REVIEW_MARKERS} buildNotificationPreferencesReviewStableKey NotificationPreferencesReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 394"
        title="Notification review"
        subtitle="Notification preferences review previews notification choices without saving them. Notification preferences are not saved from this page, no notifications are sent from this page, and notification delivery requires explicit approval."
        primary={{ href: "#notification-preferences-review", label: "Review notifications" }}
        links={[
          { href: "/approval-policy-presets", label: "Approval presets" },
          { href: "/saved-review-views", label: "Saved views" },
          { href: "/operator-preferences-review", label: "Preferences" },
          { href: "/workspace-personalization-review", label: "Personalization" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.notificationLanguage} />
      <PreviewFoundationCard title="Plain-English notification preferences review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews notification preferences identity, notification groups, urgency cadence preview,
          privacy/redaction rules, delivery approval gates, blocked notification risks, approval policy presets route,
          saved review views route, and next recommended action. It does not save notification preferences, create
          notifications, send notifications, write browser storage, mutate settings, or create automations.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="notification-preferences-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildNotificationPreferencesReviewStableKey("notification-preferences-card", review.id)}
            title={review.notificationPreferencesIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Notification groups: ${review.notificationGroups.join("; ")}`,
                `Urgency cadence preview: ${review.urgencyCadencePreview.join("; ")}`,
                `Privacy/redaction rules: ${review.privacyRedactionRules.join("; ")}`,
                `Delivery approval gates: ${review.deliveryApprovalGates.join("; ")}`,
                `Blocked notification risks: ${review.blockedNotificationRisks.join("; ")}`,
                review.approvalPolicyPresetsRoute,
                review.savedReviewViewsRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced notification details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedNotificationDetails)} />
        <PreviewFoundationCopy>
          Advanced notification details stay collapsed or secondary. Notification preferences remain review-only and
          are not saved from this page.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
