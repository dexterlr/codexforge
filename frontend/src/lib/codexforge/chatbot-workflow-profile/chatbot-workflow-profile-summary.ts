import type { ChatbotWorkflowProfile, ChatbotWorkflowProfileBoundary, ChatbotWorkflowProfileModel } from "./chatbot-workflow-profile-types";
import { buildChatbotWorkflowProfileStableKey } from "./chatbot-workflow-profile-types";
import { buildUniversalExecutionReviewBoundary, UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS } from "../universal-execution-review-kit";

export const CHATBOT_WORKFLOW_PROFILE_LANGUAGE = [
  "Chatbot workflow profile",
  "Chatbot workflow profile does not create or deploy chatbots agents",
  "Chatbot/agent execution requires explicit operator approval",
  "Unsafe chatbot workflows stay blocked",
  "Chatbot agent groups",
  "Test conversation lane",
] as const;

export function buildChatbotWorkflowProfile(input: Omit<ChatbotWorkflowProfile, "id"> & { idHint: string }): ChatbotWorkflowProfile {
  const { idHint, ...profile } = input;
  return { id: buildChatbotWorkflowProfileStableKey("chatbot-workflow-profile", idHint, input.status), ...profile };
}

export function buildChatbotWorkflowProfiles(): ChatbotWorkflowProfile[] {
  return [
    buildChatbotWorkflowProfile({
      idHint: "chatbot-workflow-profile",
      status: "blocked",
      identity: "Chatbot workflow profile identity: chatbot-workflow-profile reviews bot/agent persona, policy, knowledge, tool access, test conversation, deployment, and export readiness without creating or deploying chatbots/agents.",
      sections: [
        { label: "Chatbot agent groups", items: ["Chatbot agent groups: persona, policy, knowledge, retrieval, tool access, connector access, test conversation, evaluation, deployment, export, and handoff stay review-only."] },
        { label: "Persona/policy lane", items: ["Persona/policy lane: role, tone, safety policy, refusal behavior, escalation, privacy, and approval rules must be reviewed before future bot creation."] },
        { label: "Knowledge lane", items: ["Knowledge lane: knowledge sources, file boundaries, connector sources, memory/RAG ingestion policy, redaction, and retention stay blocked until approved."] },
        { label: "Tool access lane", items: ["Tool access lane: tool permissions, connector scope, command boundary, provider/model boundary, MCP boundary, and no tool execution from UI."] },
        { label: "Test conversation lane", items: ["Test conversation lane: sample conversations, evaluation criteria, blocked actions, result review, evidence capture, and no provider/model calls without approval."] },
        { label: "Deployment/export lane", items: ["Deployment/export lane: export package, hosting/runtime, connector credentials, result review, packaging/export boundary, and no deployment from UI."] },
        { label: "Denied chatbot actions", items: ["Denied chatbot actions: create agents, deploy bots, ingest knowledge, call tools, call providers, call connectors, create MCP runtime, store credentials, or export files from UI."] },
        { label: "Unresolved chatbot blockers", items: ["Unresolved chatbot blockers: missing provider/model boundary, missing connector boundary, missing knowledge approval, missing tool policy, missing result review, and missing export route keep unsafe chatbot workflows blocked."] },
      ],
      routes: ["/workflow-profile-registry", "/provider-model-call-approval-boundary", "/connector-access-approval-boundary"],
      nextRecommendedAction: "Next recommended action: keep chatbot/agent creation blocked, review persona, knowledge, and tool lanes, then route provider/model and connector boundaries before approval.",
      advancedDetails: `Advanced chatbot workflow profile details: Chatbot workflow profile does not create or deploy chatbots agents. Chatbot/agent execution requires explicit operator approval. Unsafe chatbot workflows stay blocked. ${UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS.join("; ")}.`,
    }),
  ];
}

export function buildChatbotWorkflowProfileBoundary(): ChatbotWorkflowProfileBoundary {
  return buildUniversalExecutionReviewBoundary();
}

export function summarizeChatbotWorkflowProfile(model: Pick<ChatbotWorkflowProfileModel, "chatbotWorkflowProfiles">): string {
  return "Chatbot workflow profile reviews " + model.chatbotWorkflowProfiles.length + " chatbot profile packet without creating or deploying chatbots agents. Chatbot/agent execution requires explicit operator approval, and unsafe chatbot workflows stay blocked.";
}

export function buildChatbotWorkflowProfileModel(): ChatbotWorkflowProfileModel {
  const chatbotWorkflowProfiles = buildChatbotWorkflowProfiles();
  const model: ChatbotWorkflowProfileModel = {
    title: "Chatbot workflow profile",
    summary: "",
    reviewPackets: chatbotWorkflowProfiles,
    chatbotWorkflowProfiles,
    boundary: buildChatbotWorkflowProfileBoundary(),
    language: [...CHATBOT_WORKFLOW_PROFILE_LANGUAGE],
    advancedDetails: [
      "Chatbot workflow profile identity",
      "Chatbot agent groups",
      "Persona/policy lane",
      "Knowledge lane",
      "Tool access lane",
      "Test conversation lane",
      "Deployment/export lane",
      "Denied chatbot actions",
      "Unresolved chatbot blockers",
      "Workflow profile registry route",
      "Provider/model boundary route",
      "Connector boundary route",
      "Next recommended action",
      "advanced chatbot workflow profile details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeChatbotWorkflowProfile(model) };
}
