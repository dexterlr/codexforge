"use client";

import { UniversalExecutionReviewSurface } from "@/lib/codexforge/universal-execution-review-kit";
import { buildChatbotWorkflowProfileModel } from "@/lib/codexforge/chatbot-workflow-profile";

const CHATBOT_WORKFLOW_PROFILE_MARKERS = [
  "Chatbot workflow profile",
  "Chatbot workflow profile does not create or deploy chatbots agents",
  "Chatbot/agent execution requires explicit operator approval",
  "Unsafe chatbot workflows stay blocked",
  "Chatbot agent groups",
  "Test conversation lane",
] as const;

export function ChatbotWorkflowProfilePanel() {
  const model = buildChatbotWorkflowProfileModel();

  return (
    <UniversalExecutionReviewSurface
      phase="Phase 632"
      title="Chatbot workflow profile"
      subtitle="Chatbot workflow profile reviews bot and agent creation readiness without creating or deploying them. Chatbot/agent execution requires explicit operator approval, and unsafe chatbot workflows stay blocked."
      primaryLabel="Review chatbot profile"
      anchor="chatbot-workflow-profile"
      plainEnglishTitle="Plain-English chatbot workflow profile"
      plainEnglishCopy="This page prepares future chatbot and agent workflows, including persona, policy, knowledge, tool access, test conversation, deployment, export, evidence, result, and recovery review. It does not create agents, deploy bots, ingest knowledge, call tools/providers/connectors, create MCP runtime, or store credentials from UI."
      language={model.language}
      markers={[...CHATBOT_WORKFLOW_PROFILE_MARKERS]}
      links={[
        { href: "/workflow-profile-registry", label: "Workflow registry" },
        { href: "/provider-model-call-approval-boundary", label: "Provider/model boundary" },
        { href: "/connector-access-approval-boundary", label: "Connector boundary" },
      ]}
      packets={model.chatbotWorkflowProfiles}
      advancedSummary="Advanced chatbot workflow profile details"
      advancedDetails={model.advancedDetails}
      advancedCopy="advanced chatbot workflow profile details collapsed/secondary. This route does not create agents, deploy bots, ingest knowledge, execute tools, call providers, call connectors, or create an MCP runtime."
      dataScope="chatbot-workflow-profile buildChatbotWorkflowProfileStableKey ChatbotWorkflowProfilePanel"
    />
  );
}
