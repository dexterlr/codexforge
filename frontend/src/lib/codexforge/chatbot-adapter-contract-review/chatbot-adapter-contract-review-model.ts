import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildChatbotAdapterContractReviewStableKey } from "../universal-execution-review-kit";
import {
  buildExecutionAdapterContractReview,
  buildExecutionAdapterContractReviewAdvancedDetails,
  buildExecutionAdapterContractReviewBoundary,
  buildExecutionAdapterContractReviewModel,
  buildExecutionAdapterContractReviewSections,
  summarizeExecutionAdapterContractReview,
  type ExecutionAdapterContractReviewPacketInput,
} from "../execution-adapter-contract-review-kit";

export { buildChatbotAdapterContractReviewStableKey };

export const CHATBOT_ADAPTER_CONTRACT_REVIEW_LANGUAGE = [
  "Chatbot adapter contract review",
  "Chatbot adapter contract review does not create or deploy chatbots agents",
  "Chatbot/agent adapters require explicit operator approval",
  "Adapter not executable from UI",
  "Persona/policy",
  "Knowledge",
  "Tool access",
  "Test conversation",
  "Deployment/export",
  "Monitoring",
  "Denied chatbot adapter actions",
] as const;

const CHATBOT_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS = [
  "Chatbot adapter contract review identity",
  "Persona/policy",
  "Knowledge",
  "Tool access",
  "Test conversation",
  "Deployment/export",
  "Monitoring",
  "Denied chatbot adapter actions",
  "Unresolved chatbot adapter blockers",
  "What this unlocks later",
  "Next recommended action",
  "advanced chatbot adapter contract review details collapsed/secondary",
] as const;

export function buildChatbotAdapterContractReview(input: ExecutionAdapterContractReviewPacketInput): UniversalExecutionReviewPacket {
  return buildExecutionAdapterContractReview("chatbot-adapter-contract-review", input);
}

export function buildChatbotAdapterContractReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildChatbotAdapterContractReview({
      idHint: "chatbot-adapter-contract-review",
      status: "blocked",
      identity: "Chatbot adapter contract review identity: Chatbot adapter contract review does not create or deploy chatbots agents. Chatbot/agent adapters require explicit operator approval before any future persona, knowledge, tool, deployment, or monitoring action.",
      sections: buildExecutionAdapterContractReviewSections(
        { label: "Persona/policy", items: ["Persona/policy: role, allowed behavior, forbidden behavior, escalation, refusal policy, and operator review state must be defined."] },
        { label: "Knowledge", items: ["Knowledge: approved documents, source scope, privacy class, refresh rule, memory boundary, and no automatic memory/RAG ingestion are required."] },
        { label: "Tool access", items: ["Tool access: allowed tools, denied tools, connector permissions, MCP boundary, provider/model boundary, and no automatic tool execution must be visible."] },
        { label: "Test conversation", items: ["Test conversation: seed prompts, expected behavior, failure cases, safety checks, transcript review, and no live deployment are part of the contract."] },
        { label: "Deployment/export", items: ["Deployment/export: deployment target, package/export plan, credentials boundary, rollback, and handoff require explicit approval."] },
        { label: "Monitoring", items: ["Monitoring: logs, alerts, feedback review, drift checks, pause/stop rule, and no background monitoring job creation from UI."] },
        { label: "Denied chatbot adapter actions", items: ["Denied chatbot adapter actions: create agents, deploy chatbots, ingest knowledge, execute tools, call providers, call connectors, create MCP runtime, store credentials, export files, or monitor conversations from UI."] },
      ),
      routes: ["/execution-adapter-contract-inventory", "/provider-model-adapter-contract-review", "/packaging-adapter-contract-review"],
      nextRecommendedAction: "Next recommended action: keep chatbot/agent creation blocked while persona/policy, knowledge, tool access, test conversation, deployment/export, and monitoring contracts are reviewed.",
      advancedDetails: buildExecutionAdapterContractReviewAdvancedDetails("chatbot adapter contract review", CHATBOT_ADAPTER_CONTRACT_REVIEW_LANGUAGE, CHATBOT_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildChatbotAdapterContractReviewBoundary() {
  return buildExecutionAdapterContractReviewBoundary();
}

export function summarizeChatbotAdapterContractReview(model: { chatbotAdapterContractReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeExecutionAdapterContractReview("Chatbot adapter contract review", model.chatbotAdapterContractReviews, "Chatbot/agent adapters require explicit operator approval.");
}

export function buildChatbotAdapterContractReviewModel() {
  const chatbotAdapterContractReviews = buildChatbotAdapterContractReviews();
  const model = buildExecutionAdapterContractReviewModel({
    phase: "Phase 679",
    title: "Chatbot adapter contract review",
    summarySubject: "Chatbot adapter contract review",
    approvalCopy: "Chatbot/agent adapters require explicit operator approval.",
    subtitle: "Review the chatbot adapter contract without creating or deploying chatbots agents.",
    primaryLabel: "Review chatbot adapter",
    anchor: "chatbot-adapter-contract-review",
    plainEnglishTitle: "Plain-English chatbot adapter contract review",
    plainEnglishCopy: "This page defines what a real chatbot or agent adapter must show before it can ever be created or deployed: persona, policy, knowledge, tools, test conversation, deployment/export, monitoring, and denied actions. It is not implemented yet.",
    language: CHATBOT_ADAPTER_CONTRACT_REVIEW_LANGUAGE,
    advancedDetails: [...CHATBOT_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/execution-adapter-contract-inventory", label: "Adapter inventory" },
      { href: "/provider-model-adapter-contract-review", label: "Provider/model adapter" },
      { href: "/packaging-adapter-contract-review", label: "Packaging adapter" },
    ],
    packets: chatbotAdapterContractReviews,
    advancedCopy: "advanced chatbot adapter contract review details collapsed/secondary. This route does not create agents, deploy chatbots, ingest knowledge, execute tools, call providers, call connectors, create MCP runtime, store credentials, export files, or monitor conversations.",
    dataScope: "chatbot-adapter-contract-review buildChatbotAdapterContractReviewStableKey ChatbotAdapterContractReviewPanel",
  });
  return { ...model, chatbotAdapterContractReviews };
}
