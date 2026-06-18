import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildAdapterBackedExecutionPreviewStableKey as buildPackagingAdapterPreviewStableKey } from "../adapter-backed-execution-preview-kit";
import {
  buildAdapterBackedExecutionPreview,
  buildAdapterBackedExecutionPreviewAdvancedDetails,
  buildAdapterBackedExecutionPreviewBoundary,
  buildAdapterBackedExecutionPreviewModel,
  buildAdapterBackedExecutionPreviewSections,
  summarizeAdapterBackedExecutionPreview,
  type AdapterBackedExecutionPreviewPacketInput,
} from "../adapter-backed-execution-preview-kit";

export { buildPackagingAdapterPreviewStableKey };

export const PACKAGING_ADAPTER_PREVIEW_LANGUAGE = [
  "Packaging Adapter Preview",
  "Packaging adapter preview does not create packages or exports",
  "Packaging/export execution requires explicit operator approval",
  "Adapter-backed shape",
  "Preview only",
  "Not executed",
  "Approval required",
  "What this unlocks later",
  "Bundle",
  "Artifact",
  "Destination",
  "Redaction/license",
  "Handoff",
  "Rollback",
  "Denied actions",
] as const;

const PACKAGING_ADAPTER_PREVIEW_ADVANCED_DETAILS = [
  "Packaging adapter preview identity",
  "Bundle",
  "Artifact",
  "Destination",
  "Redaction/license",
  "Handoff",
  "Rollback",
  "Denied actions",
  "Unresolved blockers",
  "Next recommended action",
  "advanced packaging adapter preview details collapsed/secondary",
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

export function buildPackagingAdapterPreview(input: AdapterBackedExecutionPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterBackedExecutionPreview("packaging-adapter-preview", input);
}

export function buildPackagingAdapterPreviews(): UniversalExecutionReviewPacket[] {
  return [
    buildPackagingAdapterPreview({
      idHint: "packaging-adapter-preview",
      status: "blocked",
      identity: "Packaging adapter preview identity: Packaging adapter preview does not create packages or exports. Packaging/export execution requires explicit operator approval, and this surface shows the adapter-backed shape only; it is preview only and not executed.",
      sections: buildAdapterBackedExecutionPreviewSections(
        { label: "Bundle", items: ["Bundle: preview included files, excluded files, manifest, size class, and no generated package creation."] },
        { label: "Artifact", items: ["Artifact: preview artifact name, type, provenance, checksum expectation, and result review without writing an artifact."] },
        { label: "Destination", items: ["Destination: preview local handoff, download boundary, connector destination, or external target as blocked until approval."] },
        { label: "Redaction/license", items: ["Redaction/license: preview secret removal, private data exclusion, license/provenance review, and copyright/trademark safety."] },
        { label: "Handoff", items: ["Handoff: preview handoff note, reviewer, recipient class, acceptance state, and no automatic export or send behavior."] },
        { label: "Rollback", items: ["Rollback: preview package cleanup, destination rollback, result rejection, and manual escalation without deleting or exporting anything."] },
        { label: "Denied actions", items: ["Denied actions: no package creation, export creation, file write, artifact write, download behavior, connector upload, handoff send, rollback trigger, or approval persistence from UI."] },
      ),
      routes: ["/adapter-backed-execution-preview-inventory", "/result-store-adapter-preview", "/game-server-adapter-preview"],
      nextRecommendedAction: "Next recommended action: keep packaging/export execution blocked while bundle, artifact, destination, redaction/license, handoff, and rollback previews are reviewed.",
      advancedDetails: buildAdapterBackedExecutionPreviewAdvancedDetails("packaging adapter preview", PACKAGING_ADAPTER_PREVIEW_LANGUAGE, PACKAGING_ADAPTER_PREVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildPackagingAdapterPreviewBoundary() {
  return buildAdapterBackedExecutionPreviewBoundary();
}

export function summarizePackagingAdapterPreview(model: { packagingAdapterPreviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterBackedExecutionPreview("Packaging Adapter Preview", model.packagingAdapterPreviews, "Packaging/export execution requires explicit operator approval.");
}

export function buildPackagingAdapterPreviewModel() {
  const packagingAdapterPreviews = buildPackagingAdapterPreviews();
  const model = buildAdapterBackedExecutionPreviewModel({
    phase: "Phase 692",
    title: "Packaging Adapter Preview",
    summarySubject: "Packaging Adapter Preview",
    approvalCopy: "Packaging/export execution requires explicit operator approval.",
    subtitle: "Preview the packaging adapter packet without creating packages or exports.",
    primaryLabel: "Review packaging preview",
    anchor: "packaging-adapter-preview",
    plainEnglishTitle: "Plain-English packaging adapter preview",
    plainEnglishCopy: "This page shows the packet a future packaging adapter would need before execution: bundle, artifact, destination, redaction/license, handoff, rollback, and denied actions. It does not create packages or exports.",
    language: PACKAGING_ADAPTER_PREVIEW_LANGUAGE,
    advancedDetails: [...PACKAGING_ADAPTER_PREVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/adapter-backed-execution-preview-inventory", label: "Preview inventory" },
      { href: "/result-store-adapter-preview", label: "Result store preview" },
      { href: "/game-server-adapter-preview", label: "Game/server preview" },
    ],
    packets: packagingAdapterPreviews,
    advancedCopy: "advanced packaging adapter preview details collapsed/secondary. This route is adapter-backed shape preview only and not executed; it has no live adapter implementation, no adapter execution, no adapter preview execution, no approval automation, and no approval decision persistence.",
    dataScope: "packaging-adapter-preview buildPackagingAdapterPreviewStableKey PackagingAdapterPreviewPanel",
  });
  return { ...model, packagingAdapterPreviews };
}
