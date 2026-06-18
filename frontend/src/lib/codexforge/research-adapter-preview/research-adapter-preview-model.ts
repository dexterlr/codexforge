import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildAdapterBackedExecutionPreviewStableKey as buildResearchAdapterPreviewStableKey } from "../adapter-backed-execution-preview-kit";
import {
  buildAdapterBackedExecutionPreview,
  buildAdapterBackedExecutionPreviewAdvancedDetails,
  buildAdapterBackedExecutionPreviewBoundary,
  buildAdapterBackedExecutionPreviewModel,
  buildAdapterBackedExecutionPreviewSections,
  summarizeAdapterBackedExecutionPreview,
  type AdapterBackedExecutionPreviewPacketInput,
} from "../adapter-backed-execution-preview-kit";

export { buildResearchAdapterPreviewStableKey };

export const RESEARCH_ADAPTER_PREVIEW_LANGUAGE = [
  "Research Adapter Preview",
  "Research adapter preview does not browse, search, or fetch sources",
  "Research execution requires explicit operator approval",
  "Adapter-backed shape",
  "Preview only",
  "Not executed",
  "Approval required",
  "What this unlocks later",
  "Research question",
  "Source scope",
  "Live research boundary",
  "Citation plan",
  "Contradiction review",
  "Evidence/result review",
  "Denied actions",
] as const;

const RESEARCH_ADAPTER_PREVIEW_ADVANCED_DETAILS = [
  "Research adapter preview identity",
  "Research question",
  "Source scope",
  "Live research boundary",
  "Citation plan",
  "Contradiction review",
  "Evidence/result review",
  "Denied actions",
  "Unresolved blockers",
  "Next recommended action",
  "advanced research adapter preview details collapsed/secondary",
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

export function buildResearchAdapterPreview(input: AdapterBackedExecutionPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterBackedExecutionPreview("research-adapter-preview", input);
}

export function buildResearchAdapterPreviews(): UniversalExecutionReviewPacket[] {
  return [
    buildResearchAdapterPreview({
      idHint: "research-adapter-preview",
      status: "blocked",
      identity: "Research adapter preview identity: Research adapter preview does not browse, search, or fetch sources. Research execution requires explicit operator approval, and this surface shows the adapter-backed shape only; it is preview only and not executed.",
      sections: buildAdapterBackedExecutionPreviewSections(
        { label: "Research question", items: ["Research question: preview the question, decision need, freshness requirement, exclusions, and operator approval reason without searching."] },
        { label: "Source scope", items: ["Source scope: preview source types, trusted domains or connectors as categories only, citation expectations, and denied browsing."] },
        { label: "Live research boundary", items: ["Live research boundary: preview whether live search, connector fetch, or manual source paste would be required later, with all live access blocked here."] },
        { label: "Citation plan", items: ["Citation plan: preview citation fields, source quote limit, date/freshness note, and evidence handoff without fetching sources."] },
        { label: "Contradiction review", items: ["Contradiction review: preview conflict detection, stale-source caution, confidence state, and manual review."] },
        { label: "Evidence/result review", items: ["Evidence/result review: preview evidence needs, result acceptance, rejection, and reuse boundary without storing evidence or results."] },
        { label: "Denied actions", items: ["Denied actions: no browsing, search, source fetch, web API call, connector fetch, prompt sending, evidence ingestion, result storage, monitoring job creation, or approval persistence from UI."] },
      ),
      routes: ["/adapter-backed-execution-preview-inventory", "/evidence-store-adapter-preview", "/result-store-adapter-preview"],
      nextRecommendedAction: "Next recommended action: keep research execution blocked while research question, source scope, live boundary, citation plan, contradiction review, and evidence/result previews are reviewed.",
      advancedDetails: buildAdapterBackedExecutionPreviewAdvancedDetails("research adapter preview", RESEARCH_ADAPTER_PREVIEW_LANGUAGE, RESEARCH_ADAPTER_PREVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildResearchAdapterPreviewBoundary() {
  return buildAdapterBackedExecutionPreviewBoundary();
}

export function summarizeResearchAdapterPreview(model: { researchAdapterPreviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterBackedExecutionPreview("Research Adapter Preview", model.researchAdapterPreviews, "Research execution requires explicit operator approval.");
}

export function buildResearchAdapterPreviewModel() {
  const researchAdapterPreviews = buildResearchAdapterPreviews();
  const model = buildAdapterBackedExecutionPreviewModel({
    phase: "Phase 694",
    title: "Research Adapter Preview",
    summarySubject: "Research Adapter Preview",
    approvalCopy: "Research execution requires explicit operator approval.",
    subtitle: "Preview the research adapter packet without browsing, searching, or fetching sources.",
    primaryLabel: "Review research preview",
    anchor: "research-adapter-preview",
    plainEnglishTitle: "Plain-English research adapter preview",
    plainEnglishCopy: "This page shows the packet a future research adapter would need before execution: research question, source scope, live research boundary, citation plan, contradiction review, evidence/result review, and denied actions. It does not browse, search, or fetch sources.",
    language: RESEARCH_ADAPTER_PREVIEW_LANGUAGE,
    advancedDetails: [...RESEARCH_ADAPTER_PREVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/adapter-backed-execution-preview-inventory", label: "Preview inventory" },
      { href: "/evidence-store-adapter-preview", label: "Evidence preview" },
      { href: "/result-store-adapter-preview", label: "Result store preview" },
    ],
    packets: researchAdapterPreviews,
    advancedCopy: "advanced research adapter preview details collapsed/secondary. This route is adapter-backed shape preview only and not executed; it has no live adapter implementation, no adapter execution, no adapter preview execution, no approval automation, and no approval decision persistence.",
    dataScope: "research-adapter-preview buildResearchAdapterPreviewStableKey ResearchAdapterPreviewPanel",
  });
  return { ...model, researchAdapterPreviews };
}
