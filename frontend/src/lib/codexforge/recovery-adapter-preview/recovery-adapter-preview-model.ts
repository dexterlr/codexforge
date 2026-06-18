import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildAdapterBackedExecutionPreviewStableKey as buildRecoveryAdapterPreviewStableKey } from "../adapter-backed-execution-preview-kit";
import {
  buildAdapterBackedExecutionPreview,
  buildAdapterBackedExecutionPreviewAdvancedDetails,
  buildAdapterBackedExecutionPreviewBoundary,
  buildAdapterBackedExecutionPreviewModel,
  buildAdapterBackedExecutionPreviewSections,
  summarizeAdapterBackedExecutionPreview,
  type AdapterBackedExecutionPreviewPacketInput,
} from "../adapter-backed-execution-preview-kit";

export { buildRecoveryAdapterPreviewStableKey };

export const RECOVERY_ADAPTER_PREVIEW_LANGUAGE = [
  "Recovery Adapter Preview",
  "Recovery adapter preview does not trigger recovery or retry",
  "Recovery execution requires explicit operator approval",
  "Adapter-backed shape",
  "Preview only",
  "Not executed",
  "Approval required",
  "What this unlocks later",
  "Recovery mode",
  "Retry scope",
  "Rollback target",
  "Cleanup",
  "Escalation",
  "Audit",
  "Denied actions",
] as const;

const RECOVERY_ADAPTER_PREVIEW_ADVANCED_DETAILS = [
  "Recovery adapter preview identity",
  "Recovery mode",
  "Retry scope",
  "Rollback target",
  "Cleanup",
  "Escalation",
  "Audit",
  "Denied actions",
  "Unresolved blockers",
  "Next recommended action",
  "advanced recovery adapter preview details collapsed/secondary",
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

export function buildRecoveryAdapterPreview(input: AdapterBackedExecutionPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterBackedExecutionPreview("recovery-adapter-preview", input);
}

export function buildRecoveryAdapterPreviews(): UniversalExecutionReviewPacket[] {
  return [
    buildRecoveryAdapterPreview({
      idHint: "recovery-adapter-preview",
      status: "blocked",
      identity: "Recovery adapter preview identity: Recovery adapter preview does not trigger recovery or retry. Recovery execution requires explicit operator approval, and this surface shows the adapter-backed shape only; it is preview only and not executed.",
      sections: buildAdapterBackedExecutionPreviewSections(
        { label: "Recovery mode", items: ["Recovery mode: preview retry, rollback, cleanup, pause, manual escalation, or abandon as choices only."] },
        { label: "Retry scope", items: ["Retry scope: preview adapter family, request scope, retry count, timeout, denied automatic retry, and approval reason."] },
        { label: "Rollback target", items: ["Rollback target: preview file path, runtime, package, result, or automation boundary that would need a rollback target before execution."] },
        { label: "Cleanup", items: ["Cleanup: preview temporary artifact removal, process cleanup, package cleanup, and blocked cleanup state without deleting anything."] },
        { label: "Escalation", items: ["Escalation: preview owner, manual handoff, evidence need, risk note, and stop condition."] },
        { label: "Audit", items: ["Audit: preview failed request, approval scope, recovery choice, denial reason, and evidence pointers without storing a recovery record."] },
        { label: "Denied actions", items: ["Denied actions: no recovery trigger, retry trigger, rollback trigger, cleanup execution, command execution, file mutation, runtime stop/start, notification sending, or approval persistence from UI."] },
      ),
      routes: ["/adapter-backed-execution-preview-inventory", "/file-write-adapter-preview", "/command-runner-adapter-preview"],
      nextRecommendedAction: "Next recommended action: keep recovery execution blocked while mode, retry scope, rollback target, cleanup, escalation, and audit previews are reviewed.",
      advancedDetails: buildAdapterBackedExecutionPreviewAdvancedDetails("recovery adapter preview", RECOVERY_ADAPTER_PREVIEW_LANGUAGE, RECOVERY_ADAPTER_PREVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildRecoveryAdapterPreviewBoundary() {
  return buildAdapterBackedExecutionPreviewBoundary();
}

export function summarizeRecoveryAdapterPreview(model: { recoveryAdapterPreviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterBackedExecutionPreview("Recovery Adapter Preview", model.recoveryAdapterPreviews, "Recovery execution requires explicit operator approval.");
}

export function buildRecoveryAdapterPreviewModel() {
  const recoveryAdapterPreviews = buildRecoveryAdapterPreviews();
  const model = buildAdapterBackedExecutionPreviewModel({
    phase: "Phase 691",
    title: "Recovery Adapter Preview",
    summarySubject: "Recovery Adapter Preview",
    approvalCopy: "Recovery execution requires explicit operator approval.",
    subtitle: "Preview the recovery adapter packet without triggering recovery or retry.",
    primaryLabel: "Review recovery preview",
    anchor: "recovery-adapter-preview",
    plainEnglishTitle: "Plain-English recovery adapter preview",
    plainEnglishCopy: "This page shows the packet a future recovery adapter would need before execution: recovery mode, retry scope, rollback target, cleanup, escalation, audit, and denied actions. It does not trigger recovery or retry.",
    language: RECOVERY_ADAPTER_PREVIEW_LANGUAGE,
    advancedDetails: [...RECOVERY_ADAPTER_PREVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/adapter-backed-execution-preview-inventory", label: "Preview inventory" },
      { href: "/file-write-adapter-preview", label: "File write preview" },
      { href: "/command-runner-adapter-preview", label: "Command preview" },
    ],
    packets: recoveryAdapterPreviews,
    advancedCopy: "advanced recovery adapter preview details collapsed/secondary. This route is adapter-backed shape preview only and not executed; it has no live adapter implementation, no adapter execution, no adapter preview execution, no approval automation, and no approval decision persistence.",
    dataScope: "recovery-adapter-preview buildRecoveryAdapterPreviewStableKey RecoveryAdapterPreviewPanel",
  });
  return { ...model, recoveryAdapterPreviews };
}
