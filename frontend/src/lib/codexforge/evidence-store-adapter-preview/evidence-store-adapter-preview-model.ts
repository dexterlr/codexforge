import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildAdapterBackedExecutionPreviewStableKey as buildEvidenceStoreAdapterPreviewStableKey } from "../adapter-backed-execution-preview-kit";
import {
  buildAdapterBackedExecutionPreview,
  buildAdapterBackedExecutionPreviewAdvancedDetails,
  buildAdapterBackedExecutionPreviewBoundary,
  buildAdapterBackedExecutionPreviewModel,
  buildAdapterBackedExecutionPreviewSections,
  summarizeAdapterBackedExecutionPreview,
  type AdapterBackedExecutionPreviewPacketInput,
} from "../adapter-backed-execution-preview-kit";

export { buildEvidenceStoreAdapterPreviewStableKey };

export const EVIDENCE_STORE_ADAPTER_PREVIEW_LANGUAGE = [
  "Evidence Store Adapter Preview",
  "Evidence store adapter preview does not store or ingest evidence",
  "Evidence storage requires explicit operator approval",
  "Adapter-backed shape",
  "Preview only",
  "Not executed",
  "Approval required",
  "What this unlocks later",
  "Source",
  "Citation",
  "Redaction",
  "Retention",
  "Privacy",
  "Audit",
  "Denied actions",
] as const;

const EVIDENCE_STORE_ADAPTER_PREVIEW_ADVANCED_DETAILS = [
  "Evidence store adapter preview identity",
  "Source",
  "Citation",
  "Redaction",
  "Retention",
  "Privacy",
  "Audit",
  "Denied actions",
  "Unresolved blockers",
  "Next recommended action",
  "advanced evidence store adapter preview details collapsed/secondary",
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

export function buildEvidenceStoreAdapterPreview(input: AdapterBackedExecutionPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterBackedExecutionPreview("evidence-store-adapter-preview", input);
}

export function buildEvidenceStoreAdapterPreviews(): UniversalExecutionReviewPacket[] {
  return [
    buildEvidenceStoreAdapterPreview({
      idHint: "evidence-store-adapter-preview",
      status: "blocked",
      identity: "Evidence store adapter preview identity: Evidence store adapter preview does not store or ingest evidence. Evidence storage requires explicit operator approval, and this surface shows the adapter-backed shape only; it is preview only and not executed.",
      sections: buildAdapterBackedExecutionPreviewSections(
        { label: "Source", items: ["Source: preview source type, owner, collection boundary, freshness note, and excluded data without capturing evidence."] },
        { label: "Citation", items: ["Citation: preview citation format, quote boundary, source title, retrieval note, and evidence pointer expectation without fetching or storing sources."] },
        { label: "Redaction", items: ["Redaction: preview private data removal, credential exclusion, output truncation, and reviewer responsibilities."] },
        { label: "Retention", items: ["Retention: preview retention class, expiry expectation, deletion request path, and no automatic evidence persistence."] },
        { label: "Privacy", items: ["Privacy: preview personal data handling, connector data handling, local file caution, and no memory/RAG ingestion."] },
        { label: "Audit", items: ["Audit: preview requester, approval scope, source summary, redaction state, retention state, and denial reason without appending an audit record."] },
        { label: "Denied actions", items: ["Denied actions: no evidence capture, evidence ingestion, evidence storage, source browsing, connector data storage, memory ingestion, output storage, or approval persistence from UI."] },
      ),
      routes: ["/adapter-backed-execution-preview-inventory", "/research-adapter-preview", "/result-store-adapter-preview"],
      nextRecommendedAction: "Next recommended action: keep evidence storage blocked while source, citation, redaction, retention, privacy, and audit previews are reviewed.",
      advancedDetails: buildAdapterBackedExecutionPreviewAdvancedDetails("evidence store adapter preview", EVIDENCE_STORE_ADAPTER_PREVIEW_LANGUAGE, EVIDENCE_STORE_ADAPTER_PREVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildEvidenceStoreAdapterPreviewBoundary() {
  return buildAdapterBackedExecutionPreviewBoundary();
}

export function summarizeEvidenceStoreAdapterPreview(model: { evidenceStoreAdapterPreviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterBackedExecutionPreview("Evidence Store Adapter Preview", model.evidenceStoreAdapterPreviews, "Evidence storage requires explicit operator approval.");
}

export function buildEvidenceStoreAdapterPreviewModel() {
  const evidenceStoreAdapterPreviews = buildEvidenceStoreAdapterPreviews();
  const model = buildAdapterBackedExecutionPreviewModel({
    phase: "Phase 689",
    title: "Evidence Store Adapter Preview",
    summarySubject: "Evidence Store Adapter Preview",
    approvalCopy: "Evidence storage requires explicit operator approval.",
    subtitle: "Preview the evidence store adapter packet without storing or ingesting evidence.",
    primaryLabel: "Review evidence preview",
    anchor: "evidence-store-adapter-preview",
    plainEnglishTitle: "Plain-English evidence store adapter preview",
    plainEnglishCopy: "This page shows the packet a future evidence store adapter would need before execution: source, citation, redaction, retention, privacy, audit, and denied actions. It does not store or ingest evidence.",
    language: EVIDENCE_STORE_ADAPTER_PREVIEW_LANGUAGE,
    advancedDetails: [...EVIDENCE_STORE_ADAPTER_PREVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/adapter-backed-execution-preview-inventory", label: "Preview inventory" },
      { href: "/research-adapter-preview", label: "Research preview" },
      { href: "/result-store-adapter-preview", label: "Result store preview" },
    ],
    packets: evidenceStoreAdapterPreviews,
    advancedCopy: "advanced evidence store adapter preview details collapsed/secondary. This route is adapter-backed shape preview only and not executed; it has no live adapter implementation, no adapter execution, no adapter preview execution, no approval automation, and no approval decision persistence.",
    dataScope: "evidence-store-adapter-preview buildEvidenceStoreAdapterPreviewStableKey EvidenceStoreAdapterPreviewPanel",
  });
  return { ...model, evidenceStoreAdapterPreviews };
}
