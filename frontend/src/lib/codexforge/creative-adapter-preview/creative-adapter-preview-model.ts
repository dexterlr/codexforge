import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildAdapterBackedExecutionPreviewStableKey as buildCreativeAdapterPreviewStableKey } from "../adapter-backed-execution-preview-kit";
import {
  buildAdapterBackedExecutionPreview,
  buildAdapterBackedExecutionPreviewAdvancedDetails,
  buildAdapterBackedExecutionPreviewBoundary,
  buildAdapterBackedExecutionPreviewModel,
  buildAdapterBackedExecutionPreviewSections,
  summarizeAdapterBackedExecutionPreview,
  type AdapterBackedExecutionPreviewPacketInput,
} from "../adapter-backed-execution-preview-kit";

export { buildCreativeAdapterPreviewStableKey };

export const CREATIVE_ADAPTER_PREVIEW_LANGUAGE = [
  "Creative Adapter Preview",
  "Creative adapter preview does not generate images, video, or 3D assets",
  "Creative execution requires explicit operator approval",
  "Adapter-backed shape",
  "Preview only",
  "Not executed",
  "Approval required",
  "What this unlocks later",
  "Creative brief",
  "Storyboard",
  "Prompt summary",
  "Provider/local tool boundary",
  "Output review",
  "Packaging/export",
  "Denied actions",
] as const;

const CREATIVE_ADAPTER_PREVIEW_ADVANCED_DETAILS = [
  "Creative adapter preview identity",
  "Creative brief",
  "Storyboard",
  "Prompt summary",
  "Provider/local tool boundary",
  "Output review",
  "Packaging/export",
  "Denied actions",
  "Unresolved blockers",
  "Next recommended action",
  "advanced creative adapter preview details collapsed/secondary",
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

export function buildCreativeAdapterPreview(input: AdapterBackedExecutionPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterBackedExecutionPreview("creative-adapter-preview", input);
}

export function buildCreativeAdapterPreviews(): UniversalExecutionReviewPacket[] {
  return [
    buildCreativeAdapterPreview({
      idHint: "creative-adapter-preview",
      status: "blocked",
      identity: "Creative adapter preview identity: Creative adapter preview does not generate images, video, or 3D assets. Creative execution requires explicit operator approval, and this surface shows the adapter-backed shape only; it is preview only and not executed.",
      sections: buildAdapterBackedExecutionPreviewSections(
        { label: "Creative brief", items: ["Creative brief: preview goal, audience, style boundary, safety notes, asset constraints, and originality requirement without generating assets."] },
        { label: "Storyboard", items: ["Storyboard: preview scene beats, shot list, timing, camera intent, and review state as planning copy only."] },
        { label: "Prompt summary", items: ["Prompt summary: preview prompt intent, redactions, excluded protected assets, and provider/local tool constraints without sending prompts."] },
        { label: "Provider/local tool boundary", items: ["Provider/local tool boundary: preview remote provider versus local tool boundary, cost class, runtime needs, and no live calls."] },
        { label: "Output review", items: ["Output review: preview expected image, video, audio, or 3D review checklist without creating outputs."] },
        { label: "Packaging/export", items: ["Packaging/export: preview artifact packaging, license/provenance, destination, and handoff without exporting."] },
        { label: "Denied actions", items: ["Denied actions: no image generation, video generation, 3D generation, prompt sending, local runtime start, provider call, package export, output storage, or approval persistence from UI."] },
      ),
      routes: ["/adapter-backed-execution-preview-inventory", "/provider-model-adapter-preview", "/packaging-adapter-preview"],
      nextRecommendedAction: "Next recommended action: keep creative execution blocked while brief, storyboard, prompt summary, provider/local boundary, output review, and packaging/export previews are reviewed.",
      advancedDetails: buildAdapterBackedExecutionPreviewAdvancedDetails("creative adapter preview", CREATIVE_ADAPTER_PREVIEW_LANGUAGE, CREATIVE_ADAPTER_PREVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildCreativeAdapterPreviewBoundary() {
  return buildAdapterBackedExecutionPreviewBoundary();
}

export function summarizeCreativeAdapterPreview(model: { creativeAdapterPreviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterBackedExecutionPreview("Creative Adapter Preview", model.creativeAdapterPreviews, "Creative execution requires explicit operator approval.");
}

export function buildCreativeAdapterPreviewModel() {
  const creativeAdapterPreviews = buildCreativeAdapterPreviews();
  const model = buildAdapterBackedExecutionPreviewModel({
    phase: "Phase 693",
    title: "Creative Adapter Preview",
    summarySubject: "Creative Adapter Preview",
    approvalCopy: "Creative execution requires explicit operator approval.",
    subtitle: "Preview the creative adapter packet without generating images, video, or 3D assets.",
    primaryLabel: "Review creative preview",
    anchor: "creative-adapter-preview",
    plainEnglishTitle: "Plain-English creative adapter preview",
    plainEnglishCopy: "This page shows the packet a future creative adapter would need before execution: creative brief, storyboard, prompt summary, provider/local tool boundary, output review, packaging/export, and denied actions. It does not generate images, video, or 3D assets.",
    language: CREATIVE_ADAPTER_PREVIEW_LANGUAGE,
    advancedDetails: [...CREATIVE_ADAPTER_PREVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/adapter-backed-execution-preview-inventory", label: "Preview inventory" },
      { href: "/provider-model-adapter-preview", label: "Provider/model preview" },
      { href: "/packaging-adapter-preview", label: "Packaging preview" },
    ],
    packets: creativeAdapterPreviews,
    advancedCopy: "advanced creative adapter preview details collapsed/secondary. This route is adapter-backed shape preview only and not executed; it has no live adapter implementation, no adapter execution, no adapter preview execution, no approval automation, and no approval decision persistence.",
    dataScope: "creative-adapter-preview buildCreativeAdapterPreviewStableKey CreativeAdapterPreviewPanel",
  });
  return { ...model, creativeAdapterPreviews };
}
