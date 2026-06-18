import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildAdapterBackedExecutionPreviewStableKey as buildProviderModelAdapterPreviewStableKey } from "../adapter-backed-execution-preview-kit";
import {
  buildAdapterBackedExecutionPreview,
  buildAdapterBackedExecutionPreviewAdvancedDetails,
  buildAdapterBackedExecutionPreviewBoundary,
  buildAdapterBackedExecutionPreviewModel,
  buildAdapterBackedExecutionPreviewSections,
  summarizeAdapterBackedExecutionPreview,
  type AdapterBackedExecutionPreviewPacketInput,
} from "../adapter-backed-execution-preview-kit";

export { buildProviderModelAdapterPreviewStableKey };

export const PROVIDER_MODEL_ADAPTER_PREVIEW_LANGUAGE = [
  "Provider Model Adapter Preview",
  "Provider/model adapter preview does not call providers or models",
  "Provider/model execution requires explicit operator approval",
  "Adapter-backed shape",
  "Preview only",
  "Not executed",
  "Approval required",
  "What this unlocks later",
  "Prompt summary",
  "Redaction",
  "Model/provider boundary",
  "Cost/rate-limit",
  "Output handling",
  "Result review",
  "Denied actions",
] as const;

const PROVIDER_MODEL_ADAPTER_PREVIEW_ADVANCED_DETAILS = [
  "Provider/model adapter preview identity",
  "Prompt summary",
  "Redaction",
  "Model/provider boundary",
  "Cost/rate-limit",
  "Output handling",
  "Result review",
  "Denied actions",
  "Unresolved blockers",
  "Next recommended action",
  "advanced provider/model adapter preview details collapsed/secondary",
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

export function buildProviderModelAdapterPreview(input: AdapterBackedExecutionPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterBackedExecutionPreview("provider-model-adapter-preview", input);
}

export function buildProviderModelAdapterPreviews(): UniversalExecutionReviewPacket[] {
  return [
    buildProviderModelAdapterPreview({
      idHint: "provider-model-adapter-preview",
      status: "blocked",
      identity: "Provider/model adapter preview identity: Provider/model adapter preview does not call providers or models. Provider/model execution requires explicit operator approval, and this surface shows the adapter-backed shape only; it is preview only and not executed.",
      sections: buildAdapterBackedExecutionPreviewSections(
        { label: "Prompt summary", items: ["Prompt summary: show goal, input classes, excluded secrets, expected answer shape, and approval reason without sending a prompt."] },
        { label: "Redaction", items: ["Redaction: preview sensitive field removal, connector data exclusion, file path caution, credential exclusion, and audit note."] },
        { label: "Model/provider boundary", items: ["Model/provider boundary: show provider family, model class, local versus remote boundary, tool access limits, and no live traffic routing."] },
        { label: "Cost/rate-limit", items: ["Cost/rate-limit: preview estimated spend class, token/rate guard, timeout, retry policy, and blocked over-budget state without charging."] },
        { label: "Output handling", items: ["Output handling: preview output type, redaction, truncation, evidence handoff, and no automatic storage or reuse."] },
        { label: "Result review", items: ["Result review: preview accept, reject, revise, blocked, or failed states before any result can be used."] },
        { label: "Denied actions", items: ["Denied actions: no provider calls, model calls, prompt sending, live traffic routing, connector data sending, output storage, retry trigger, or approval persistence from UI."] },
      ),
      routes: ["/adapter-backed-execution-preview-inventory", "/result-store-adapter-preview", "/research-adapter-preview"],
      nextRecommendedAction: "Next recommended action: keep provider/model execution blocked while prompt summary, redaction, boundary, cost, output handling, and result review previews are reviewed.",
      advancedDetails: buildAdapterBackedExecutionPreviewAdvancedDetails("provider/model adapter preview", PROVIDER_MODEL_ADAPTER_PREVIEW_LANGUAGE, PROVIDER_MODEL_ADAPTER_PREVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildProviderModelAdapterPreviewBoundary() {
  return buildAdapterBackedExecutionPreviewBoundary();
}

export function summarizeProviderModelAdapterPreview(model: { providerModelAdapterPreviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterBackedExecutionPreview("Provider Model Adapter Preview", model.providerModelAdapterPreviews, "Provider/model execution requires explicit operator approval.");
}

export function buildProviderModelAdapterPreviewModel() {
  const providerModelAdapterPreviews = buildProviderModelAdapterPreviews();
  const model = buildAdapterBackedExecutionPreviewModel({
    phase: "Phase 686",
    title: "Provider Model Adapter Preview",
    summarySubject: "Provider Model Adapter Preview",
    approvalCopy: "Provider/model execution requires explicit operator approval.",
    subtitle: "Preview the provider/model adapter packet without calling providers or models.",
    primaryLabel: "Review model preview",
    anchor: "provider-model-adapter-preview",
    plainEnglishTitle: "Plain-English provider/model adapter preview",
    plainEnglishCopy: "This page shows the packet a future provider/model adapter would need before execution: prompt summary, redaction, provider/model boundary, cost/rate-limit posture, output handling, result review, and denied actions. It does not call providers or models.",
    language: PROVIDER_MODEL_ADAPTER_PREVIEW_LANGUAGE,
    advancedDetails: [...PROVIDER_MODEL_ADAPTER_PREVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/adapter-backed-execution-preview-inventory", label: "Preview inventory" },
      { href: "/result-store-adapter-preview", label: "Result store preview" },
      { href: "/research-adapter-preview", label: "Research preview" },
    ],
    packets: providerModelAdapterPreviews,
    advancedCopy: "advanced provider/model adapter preview details collapsed/secondary. This route is adapter-backed shape preview only and not executed; it has no live adapter implementation, no adapter execution, no adapter preview execution, no approval automation, and no approval decision persistence.",
    dataScope: "provider-model-adapter-preview buildProviderModelAdapterPreviewStableKey ProviderModelAdapterPreviewPanel",
  });
  return { ...model, providerModelAdapterPreviews };
}
