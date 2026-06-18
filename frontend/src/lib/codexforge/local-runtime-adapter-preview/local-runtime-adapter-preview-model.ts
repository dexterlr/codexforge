import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildAdapterBackedExecutionPreviewStableKey as buildLocalRuntimeAdapterPreviewStableKey } from "../adapter-backed-execution-preview-kit";
import {
  buildAdapterBackedExecutionPreview,
  buildAdapterBackedExecutionPreviewAdvancedDetails,
  buildAdapterBackedExecutionPreviewBoundary,
  buildAdapterBackedExecutionPreviewModel,
  buildAdapterBackedExecutionPreviewSections,
  summarizeAdapterBackedExecutionPreview,
  type AdapterBackedExecutionPreviewPacketInput,
} from "../adapter-backed-execution-preview-kit";

export { buildLocalRuntimeAdapterPreviewStableKey };

export const LOCAL_RUNTIME_ADAPTER_PREVIEW_LANGUAGE = [
  "Local Runtime Adapter Preview",
  "Local runtime adapter preview does not start local runtimes",
  "Local runtime adapter execution requires explicit operator approval",
  "Adapter-backed shape",
  "Preview only",
  "Not executed",
  "Approval required",
  "What this unlocks later",
  "Runtime name",
  "Port/network",
  "Process lifecycle",
  "Stop plan",
  "Logging",
  "Evidence",
  "Recovery",
  "Denied actions",
] as const;

const LOCAL_RUNTIME_ADAPTER_PREVIEW_ADVANCED_DETAILS = [
  "Local runtime adapter preview identity",
  "Runtime name",
  "Port/network",
  "Process lifecycle",
  "Stop plan",
  "Logging",
  "Evidence",
  "Recovery",
  "Denied actions",
  "Unresolved blockers",
  "Next recommended action",
  "advanced local runtime adapter preview details collapsed/secondary",
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

export function buildLocalRuntimeAdapterPreview(input: AdapterBackedExecutionPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterBackedExecutionPreview("local-runtime-adapter-preview", input);
}

export function buildLocalRuntimeAdapterPreviews(): UniversalExecutionReviewPacket[] {
  return [
    buildLocalRuntimeAdapterPreview({
      idHint: "local-runtime-adapter-preview",
      status: "blocked",
      identity: "Local runtime adapter preview identity: Local runtime adapter preview does not start local runtimes. Local runtime adapter execution requires explicit operator approval, and this surface shows the adapter-backed shape only; it is preview only and not executed.",
      sections: buildAdapterBackedExecutionPreviewSections(
        { label: "Runtime name", items: ["Runtime name: show the intended runtime label, purpose, owner, local boundary, and reason before any future start action."] },
        { label: "Port/network", items: ["Port/network: preview port, host, network exposure, conflict handling, and denied external access without binding a port."] },
        { label: "Process lifecycle", items: ["Process lifecycle: preview start, health, readiness, failure, timeout, and shutdown states without starting or stopping a process."] },
        { label: "Stop plan", items: ["Stop plan: describe stop request, cleanup, escalation, orphan handling, and blocked stop path without stopping anything."] },
        { label: "Logging", items: ["Logging: preview log capture, redaction, truncation, evidence handoff, and no output storage."] },
        { label: "Evidence", items: ["Evidence: list runtime name, approval scope, port plan, log summary, result state, and audit note without capturing evidence."] },
        { label: "Recovery", items: ["Recovery: preview restart, cleanup, rollback, and escalation requirements without triggering recovery."] },
        { label: "Denied actions", items: ["Denied actions: no local runtime start, stop, restart, server launch, port binding, local bridge calls, process monitoring job, output storage, or approval persistence from UI."] },
      ),
      routes: ["/adapter-backed-execution-preview-inventory", "/command-runner-adapter-preview", "/recovery-adapter-preview"],
      nextRecommendedAction: "Next recommended action: keep local runtime execution blocked while runtime identity, port/network, lifecycle, stop plan, logging, evidence, and recovery previews are reviewed.",
      advancedDetails: buildAdapterBackedExecutionPreviewAdvancedDetails("local runtime adapter preview", LOCAL_RUNTIME_ADAPTER_PREVIEW_LANGUAGE, LOCAL_RUNTIME_ADAPTER_PREVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildLocalRuntimeAdapterPreviewBoundary() {
  return buildAdapterBackedExecutionPreviewBoundary();
}

export function summarizeLocalRuntimeAdapterPreview(model: { localRuntimeAdapterPreviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterBackedExecutionPreview("Local Runtime Adapter Preview", model.localRuntimeAdapterPreviews, "Local runtime adapter execution requires explicit operator approval.");
}

export function buildLocalRuntimeAdapterPreviewModel() {
  const localRuntimeAdapterPreviews = buildLocalRuntimeAdapterPreviews();
  const model = buildAdapterBackedExecutionPreviewModel({
    phase: "Phase 685",
    title: "Local Runtime Adapter Preview",
    summarySubject: "Local Runtime Adapter Preview",
    approvalCopy: "Local runtime adapter execution requires explicit operator approval.",
    subtitle: "Preview the local runtime adapter packet without starting local runtimes.",
    primaryLabel: "Review runtime preview",
    anchor: "local-runtime-adapter-preview",
    plainEnglishTitle: "Plain-English local runtime adapter preview",
    plainEnglishCopy: "This page shows the packet a future local runtime adapter would need before execution: runtime name, port/network, lifecycle, stop plan, logging, evidence, recovery, and denied actions. It does not start local runtimes.",
    language: LOCAL_RUNTIME_ADAPTER_PREVIEW_LANGUAGE,
    advancedDetails: [...LOCAL_RUNTIME_ADAPTER_PREVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/adapter-backed-execution-preview-inventory", label: "Preview inventory" },
      { href: "/command-runner-adapter-preview", label: "Command preview" },
      { href: "/recovery-adapter-preview", label: "Recovery preview" },
    ],
    packets: localRuntimeAdapterPreviews,
    advancedCopy: "advanced local runtime adapter preview details collapsed/secondary. This route is adapter-backed shape preview only and not executed; it has no live adapter implementation, no adapter execution, no adapter preview execution, no approval automation, and no approval decision persistence.",
    dataScope: "local-runtime-adapter-preview buildLocalRuntimeAdapterPreviewStableKey LocalRuntimeAdapterPreviewPanel",
  });
  return { ...model, localRuntimeAdapterPreviews };
}
