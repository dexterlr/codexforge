import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildAdapterBackedExecutionPreviewStableKey as buildAutomationAdapterPreviewStableKey } from "../adapter-backed-execution-preview-kit";
import {
  buildAdapterBackedExecutionPreview,
  buildAdapterBackedExecutionPreviewAdvancedDetails,
  buildAdapterBackedExecutionPreviewBoundary,
  buildAdapterBackedExecutionPreviewModel,
  buildAdapterBackedExecutionPreviewSections,
  summarizeAdapterBackedExecutionPreview,
  type AdapterBackedExecutionPreviewPacketInput,
} from "../adapter-backed-execution-preview-kit";

export { buildAutomationAdapterPreviewStableKey };

export const AUTOMATION_ADAPTER_PREVIEW_LANGUAGE = [
  "Automation Adapter Preview",
  "Automation adapter preview does not create automations or schedules",
  "Automation execution requires explicit operator approval",
  "Adapter-backed shape",
  "Preview only",
  "Not executed",
  "Approval required",
  "What this unlocks later",
  "Schedule",
  "Condition/watch",
  "Notification",
  "Pause/stop",
  "Audit",
  "Recovery",
  "Denied actions",
] as const;

const AUTOMATION_ADAPTER_PREVIEW_ADVANCED_DETAILS = [
  "Automation adapter preview identity",
  "Schedule",
  "Condition/watch",
  "Notification",
  "Pause/stop",
  "Audit",
  "Recovery",
  "Denied actions",
  "Unresolved blockers",
  "Next recommended action",
  "advanced automation adapter preview details collapsed/secondary",
  "no live adapter implementation",
  "no adapter execution",
  "no adapter preview execution",
  "no project scaffold creation",
  "no file write/delete/mutation",
  "no command execution",
  "no local runtime start/stop",
  "no provider/model calls",
  "no prompt sending",
  "no connector access/fetch/mutation",
  "no automation/schedule/reminder/task/watch creation",
  "no evidence capture/ingestion/storage",
  "no output/result storage or reuse",
  "no recovery/retry trigger",
  "no package/export/write behavior",
  "no creative/video/image/3D generation",
  "no research browsing/searching/fetching",
  "no chatbot/agent creation/deployment",
  "no video-call joining/monitoring",
  "no monitoring job creation",
  "no Minecraft/project/server build or launch execution",
  "no copyrighted franchise asset/name/logo/map/dialogue/music copying",
  "no approval automation",
  "no approval decision persistence",
  "no policy/settings/preference persistence",
  "no web/search/GitHub API calls from UI",
  "no arbitrary project scanning/local file browsing/path crawling",
  "no memory/RAG ingestion or memory auto-promotion",
  "no Brain graph mutation",
  "no plugin/tool/agent/MCP execution",
  "no credential/key/token/endpoint/output storage",
  "no process.env printing",
  "no route coverage removal",
  "no duplicate route hrefs or shortLabels",
  "no Ruflo/Odysseus vendoring",
  "no package install behavior",
  "checkpoint documentation smoke still exists and remains registered",
  "server-only path boundary markers remain intact",
  "no Math.random",
  "no Date.now",
  "no mojibake",
] as const;

export function buildAutomationAdapterPreview(input: AdapterBackedExecutionPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterBackedExecutionPreview("automation-adapter-preview", input);
}

export function buildAutomationAdapterPreviews(): UniversalExecutionReviewPacket[] {
  return [
    buildAutomationAdapterPreview({
      idHint: "automation-adapter-preview",
      status: "blocked",
      identity: "Automation adapter preview identity: Automation adapter preview does not create automations or schedules. Automation execution requires explicit operator approval, and this surface shows the adapter-backed shape only; it is preview only and not executed.",
      sections: buildAdapterBackedExecutionPreviewSections(
        { label: "Schedule", items: ["Schedule: preview cadence, timezone, start/end conditions, manual approval checkpoint, and disabled-by-default state without creating a schedule."] },
        { label: "Condition/watch", items: ["Condition/watch: preview watch condition, source boundary, evaluation rule, false-positive review, and no polling loop creation."] },
        { label: "Notification", items: ["Notification: preview recipient class, message summary, delivery channel, opt-out, and no notification sending."] },
        { label: "Pause/stop", items: ["Pause/stop: preview pause, resume, stop, expiration, and emergency hold requirements without creating an automation."] },
        { label: "Audit", items: ["Audit: preview requester, approval scope, schedule summary, watch rule, notification plan, and evidence need without storing rules."] },
        { label: "Recovery", items: ["Recovery: preview missed-run handling, retry limits, cleanup, escalation, and blocked recovery state without triggering recovery."] },
        { label: "Denied actions", items: ["Denied actions: no automation creation, schedule creation, reminder creation, task scheduling, watch creation, polling loop creation, background job creation, notification sending, or approval persistence from UI."] },
      ),
      routes: ["/adapter-backed-execution-preview-inventory", "/connector-adapter-preview", "/recovery-adapter-preview"],
      nextRecommendedAction: "Next recommended action: keep automation execution blocked while schedule, condition/watch, notification, pause/stop, audit, and recovery previews are reviewed.",
      advancedDetails: buildAdapterBackedExecutionPreviewAdvancedDetails("automation adapter preview", AUTOMATION_ADAPTER_PREVIEW_LANGUAGE, AUTOMATION_ADAPTER_PREVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildAutomationAdapterPreviewBoundary() {
  return buildAdapterBackedExecutionPreviewBoundary();
}

export function summarizeAutomationAdapterPreview(model: { automationAdapterPreviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterBackedExecutionPreview("Automation Adapter Preview", model.automationAdapterPreviews, "Automation execution requires explicit operator approval.");
}

export function buildAutomationAdapterPreviewModel() {
  const automationAdapterPreviews = buildAutomationAdapterPreviews();
  const model = buildAdapterBackedExecutionPreviewModel({
    phase: "Phase 688",
    title: "Automation Adapter Preview",
    summarySubject: "Automation Adapter Preview",
    approvalCopy: "Automation execution requires explicit operator approval.",
    subtitle: "Preview the automation adapter packet without creating automations or schedules.",
    primaryLabel: "Review automation preview",
    anchor: "automation-adapter-preview",
    plainEnglishTitle: "Plain-English automation adapter preview",
    plainEnglishCopy: "This page shows the packet a future automation adapter would need before execution: schedule, condition/watch, notification, pause/stop, audit, recovery, and denied actions. It does not create automations or schedules.",
    language: AUTOMATION_ADAPTER_PREVIEW_LANGUAGE,
    advancedDetails: [...AUTOMATION_ADAPTER_PREVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/adapter-backed-execution-preview-inventory", label: "Preview inventory" },
      { href: "/connector-adapter-preview", label: "Connector preview" },
      { href: "/recovery-adapter-preview", label: "Recovery preview" },
    ],
    packets: automationAdapterPreviews,
    advancedCopy: "advanced automation adapter preview details collapsed/secondary. This route is adapter-backed shape preview only and not executed; it has no live adapter implementation, no adapter execution, no adapter preview execution, no approval automation, and no approval decision persistence.",
    dataScope: "automation-adapter-preview buildAutomationAdapterPreviewStableKey AutomationAdapterPreviewPanel",
  });
  return { ...model, automationAdapterPreviews };
}
