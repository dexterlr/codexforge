import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildAdapterBackedExecutionPreviewStableKey as buildConnectorAdapterPreviewStableKey } from "../adapter-backed-execution-preview-kit";
import {
  buildAdapterBackedExecutionPreview,
  buildAdapterBackedExecutionPreviewAdvancedDetails,
  buildAdapterBackedExecutionPreviewBoundary,
  buildAdapterBackedExecutionPreviewModel,
  buildAdapterBackedExecutionPreviewSections,
  summarizeAdapterBackedExecutionPreview,
  type AdapterBackedExecutionPreviewPacketInput,
} from "../adapter-backed-execution-preview-kit";

export { buildConnectorAdapterPreviewStableKey };

export const CONNECTOR_ADAPTER_PREVIEW_LANGUAGE = [
  "Connector Adapter Preview",
  "Connector adapter preview does not connect accounts or fetch connector data",
  "Connector execution requires explicit operator approval",
  "Adapter-backed shape",
  "Preview only",
  "Not executed",
  "Approval required",
  "What this unlocks later",
  "Connector scope",
  "Account permissions",
  "Fetch/mutation type",
  "Redaction/audit",
  "Result review",
  "Denied actions",
] as const;

const CONNECTOR_ADAPTER_PREVIEW_ADVANCED_DETAILS = [
  "Connector adapter preview identity",
  "Connector scope",
  "Account permissions",
  "Fetch/mutation type",
  "Redaction/audit",
  "Result review",
  "Denied actions",
  "Unresolved blockers",
  "What this unlocks later",
  "Next recommended action",
  "advanced connector adapter preview details collapsed/secondary",
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

export function buildConnectorAdapterPreview(input: AdapterBackedExecutionPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterBackedExecutionPreview("connector-adapter-preview", input);
}

export function buildConnectorAdapterPreviews(): UniversalExecutionReviewPacket[] {
  return [
    buildConnectorAdapterPreview({
      idHint: "connector-adapter-preview",
      status: "blocked",
      identity: "Connector adapter preview identity: Connector adapter preview does not connect accounts or fetch connector data. Connector execution requires explicit operator approval, and this surface shows the adapter-backed shape only; it is preview only and not executed.",
      sections: buildAdapterBackedExecutionPreviewSections(
        { label: "Connector scope", items: ["Connector scope: show connector family, requested data boundary, object type, time range, and excluded accounts without connecting anything."] },
        { label: "Account permissions", items: ["Account permissions: preview account owner, required permission, least-privilege scope, consent note, and denied credential storage."] },
        { label: "Fetch/mutation type", items: ["Fetch/mutation type: distinguish read preview, mutation preview, attachment preview, and blocked operations without fetching or mutating connector data."] },
        { label: "Redaction/audit", items: ["Redaction/audit: preview private-field redaction, citation expectations, audit note, and evidence need without storing connector data."] },
        { label: "Result review", items: ["Result review: preview result states, operator acceptance, rejection, evidence handoff, and no reuse until approved."] },
        { label: "Denied actions", items: ["Denied actions: no account connection, connector API call, connector fetch, connector mutation, credential storage, connector data storage, notification sending, or approval persistence from UI."] },
        { label: "Unresolved blockers", items: ["Unresolved blockers: no approved connector bridge, no consent flow, no permission boundary, no redaction route, and no audit store keep connector execution blocked."] },
      ),
      routes: ["/adapter-backed-execution-preview-inventory", "/evidence-store-adapter-preview", "/result-store-adapter-preview"],
      nextRecommendedAction: "Next recommended action: keep connector access blocked while scope, permissions, fetch/mutation type, redaction/audit, and result review previews are reviewed.",
      advancedDetails: buildAdapterBackedExecutionPreviewAdvancedDetails("connector adapter preview", CONNECTOR_ADAPTER_PREVIEW_LANGUAGE, CONNECTOR_ADAPTER_PREVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildConnectorAdapterPreviewBoundary() {
  return buildAdapterBackedExecutionPreviewBoundary();
}

export function summarizeConnectorAdapterPreview(model: { connectorAdapterPreviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterBackedExecutionPreview("Connector Adapter Preview", model.connectorAdapterPreviews, "Connector execution requires explicit operator approval.");
}

export function buildConnectorAdapterPreviewModel() {
  const connectorAdapterPreviews = buildConnectorAdapterPreviews();
  const model = buildAdapterBackedExecutionPreviewModel({
    phase: "Phase 687",
    title: "Connector Adapter Preview",
    summarySubject: "Connector Adapter Preview",
    approvalCopy: "Connector execution requires explicit operator approval.",
    subtitle: "Preview the connector adapter packet without connecting accounts or fetching connector data.",
    primaryLabel: "Review connector preview",
    anchor: "connector-adapter-preview",
    plainEnglishTitle: "Plain-English connector adapter preview",
    plainEnglishCopy: "This page shows the packet a future connector adapter would need before execution: connector scope, account permissions, fetch or mutation type, redaction/audit, result review, and denied actions. It does not connect accounts or fetch connector data.",
    language: CONNECTOR_ADAPTER_PREVIEW_LANGUAGE,
    advancedDetails: [...CONNECTOR_ADAPTER_PREVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/adapter-backed-execution-preview-inventory", label: "Preview inventory" },
      { href: "/evidence-store-adapter-preview", label: "Evidence preview" },
      { href: "/result-store-adapter-preview", label: "Result store preview" },
    ],
    packets: connectorAdapterPreviews,
    advancedCopy: "advanced connector adapter preview details collapsed/secondary. This route is adapter-backed shape preview only and not executed; it has no live adapter implementation, no adapter execution, no adapter preview execution, no approval automation, and no approval decision persistence.",
    dataScope: "connector-adapter-preview buildConnectorAdapterPreviewStableKey ConnectorAdapterPreviewPanel",
  });
  return { ...model, connectorAdapterPreviews };
}
