import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildAdapterBackedExecutionPreviewStableKey as buildChatbotAdapterPreviewStableKey } from "../adapter-backed-execution-preview-kit";
import {
  buildAdapterBackedExecutionPreview,
  buildAdapterBackedExecutionPreviewAdvancedDetails,
  buildAdapterBackedExecutionPreviewBoundary,
  buildAdapterBackedExecutionPreviewModel,
  buildAdapterBackedExecutionPreviewSections,
  summarizeAdapterBackedExecutionPreview,
  type AdapterBackedExecutionPreviewPacketInput,
} from "../adapter-backed-execution-preview-kit";

export { buildChatbotAdapterPreviewStableKey };

export const CHATBOT_ADAPTER_PREVIEW_LANGUAGE = [
  "Chatbot Adapter Preview",
  "Chatbot adapter preview does not create or deploy chatbots agents",
  "Chatbot/agent execution requires explicit operator approval",
  "Adapter-backed shape",
  "Preview only",
  "Not executed",
  "Approval required",
  "What this unlocks later",
  "Bot purpose",
  "Persona/policy",
  "Knowledge scope",
  "Tool access",
  "Test conversation",
  "Deployment/export",
  "Monitoring",
  "Denied actions",
] as const;

const CHATBOT_ADAPTER_PREVIEW_ADVANCED_DETAILS = [
  "Chatbot adapter preview identity",
  "Bot purpose",
  "Persona/policy",
  "Knowledge scope",
  "Tool access",
  "Test conversation",
  "Deployment/export",
  "Monitoring",
  "Denied actions",
  "Unresolved blockers",
  "Next recommended action",
  "advanced chatbot adapter preview details collapsed/secondary",
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

export function buildChatbotAdapterPreview(input: AdapterBackedExecutionPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterBackedExecutionPreview("chatbot-adapter-preview", input);
}

export function buildChatbotAdapterPreviews(): UniversalExecutionReviewPacket[] {
  return [
    buildChatbotAdapterPreview({
      idHint: "chatbot-adapter-preview",
      status: "blocked",
      identity: "Chatbot adapter preview identity: Chatbot adapter preview does not create or deploy chatbots agents. Chatbot/agent execution requires explicit operator approval, and this surface shows the adapter-backed shape only; it is preview only and not executed.",
      sections: buildAdapterBackedExecutionPreviewSections(
        { label: "Bot purpose", items: ["Bot purpose: preview the job, user audience, success criteria, escalation path, and blocked deployment state."] },
        { label: "Persona/policy", items: ["Persona/policy: preview tone, rules, refusal boundary, privacy posture, and explicit policy review before any bot exists."] },
        { label: "Knowledge scope", items: ["Knowledge scope: preview included documents, excluded secrets, source provenance, refresh boundary, and no memory/RAG ingestion."] },
        { label: "Tool access", items: ["Tool access: preview allowed tool categories, denied tools, connector boundaries, provider/model boundary, and no plugin/tool/agent execution."] },
        { label: "Test conversation", items: ["Test conversation: preview test prompts, expected safe behavior, failure cases, and review checklist without running a bot."] },
        { label: "Deployment/export", items: ["Deployment/export: preview handoff, package, destination, credentials boundary, and no deployment or export behavior."] },
        { label: "Monitoring", items: ["Monitoring: preview evaluation metrics, feedback review, incident path, and no monitoring job creation."] },
        { label: "Denied actions", items: ["Denied actions: no chatbot creation, agent creation, deployment, tool execution, connector access, knowledge ingestion, package export, monitoring job creation, output storage, or approval persistence from UI."] },
      ),
      routes: ["/adapter-backed-execution-preview-inventory", "/provider-model-adapter-preview", "/connector-adapter-preview"],
      nextRecommendedAction: "Next recommended action: keep chatbot/agent execution blocked while purpose, persona/policy, knowledge scope, tool access, test conversation, deployment/export, and monitoring previews are reviewed.",
      advancedDetails: buildAdapterBackedExecutionPreviewAdvancedDetails("chatbot adapter preview", CHATBOT_ADAPTER_PREVIEW_LANGUAGE, CHATBOT_ADAPTER_PREVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildChatbotAdapterPreviewBoundary() {
  return buildAdapterBackedExecutionPreviewBoundary();
}

export function summarizeChatbotAdapterPreview(model: { chatbotAdapterPreviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterBackedExecutionPreview("Chatbot Adapter Preview", model.chatbotAdapterPreviews, "Chatbot/agent execution requires explicit operator approval.");
}

export function buildChatbotAdapterPreviewModel() {
  const chatbotAdapterPreviews = buildChatbotAdapterPreviews();
  const model = buildAdapterBackedExecutionPreviewModel({
    phase: "Phase 695",
    title: "Chatbot Adapter Preview",
    summarySubject: "Chatbot Adapter Preview",
    approvalCopy: "Chatbot/agent execution requires explicit operator approval.",
    subtitle: "Preview the chatbot adapter packet without creating or deploying chatbots agents.",
    primaryLabel: "Review chatbot preview",
    anchor: "chatbot-adapter-preview",
    plainEnglishTitle: "Plain-English chatbot adapter preview",
    plainEnglishCopy: "This page shows the packet a future chatbot adapter would need before execution: bot purpose, persona/policy, knowledge scope, tool access, test conversation, deployment/export, monitoring, and denied actions. It does not create or deploy chatbots agents.",
    language: CHATBOT_ADAPTER_PREVIEW_LANGUAGE,
    advancedDetails: [...CHATBOT_ADAPTER_PREVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/adapter-backed-execution-preview-inventory", label: "Preview inventory" },
      { href: "/provider-model-adapter-preview", label: "Provider/model preview" },
      { href: "/connector-adapter-preview", label: "Connector preview" },
    ],
    packets: chatbotAdapterPreviews,
    advancedCopy: "advanced chatbot adapter preview details collapsed/secondary. This route is adapter-backed shape preview only and not executed; it has no live adapter implementation, no adapter execution, no adapter preview execution, no approval automation, and no approval decision persistence.",
    dataScope: "chatbot-adapter-preview buildChatbotAdapterPreviewStableKey ChatbotAdapterPreviewPanel",
  });
  return { ...model, chatbotAdapterPreviews };
}
