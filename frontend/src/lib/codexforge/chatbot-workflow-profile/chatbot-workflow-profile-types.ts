import type { UniversalExecutionReviewBoundary, UniversalExecutionReviewModel, UniversalExecutionReviewPacket } from "../universal-execution-review-kit";

export type ChatbotWorkflowProfileStatus = "blocked" | "review-only";
export type ChatbotWorkflowProfile = UniversalExecutionReviewPacket & { status: ChatbotWorkflowProfileStatus };
export type ChatbotWorkflowProfileBoundary = UniversalExecutionReviewBoundary;
export type ChatbotWorkflowProfileModel = UniversalExecutionReviewModel & {
  title: "Chatbot workflow profile";
  chatbotWorkflowProfiles: ChatbotWorkflowProfile[];
};

export { buildUniversalExecutionReviewStableKey as buildChatbotWorkflowProfileStableKey } from "../universal-execution-review-kit";
