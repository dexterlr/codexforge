import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey } from "../universal-execution-review-kit";
import {
  buildFirstControlledExecutionTrialAdvancedDetails,
  buildFirstControlledExecutionTrialBoundary,
  buildFirstControlledExecutionTrialModel,
  buildFirstControlledExecutionTrialPacket,
  buildFirstControlledExecutionTrialSections,
  summarizeFirstControlledExecutionTrial,
  type ControlledBuilderReviewPacketInput,
} from "../first-controlled-execution-trial-kit";
import type { DailyBetaOneReleaseReviewSection } from "../daily-beta-1-release-review-kit";

export type ExecutionAdapterContractReviewModelConfig = {
  phase: string;
  title: string;
  summarySubject: string;
  approvalCopy: string;
  subtitle: string;
  primaryLabel: string;
  anchor: string;
  plainEnglishTitle: string;
  plainEnglishCopy: string;
  language: readonly string[];
  advancedDetails: readonly string[];
  links: readonly { href: string; label: string }[];
  packets: readonly UniversalExecutionReviewPacket[];
  advancedCopy: string;
  dataScope: string;
};

export type ExecutionAdapterContractReviewPacketInput = ControlledBuilderReviewPacketInput;

export { buildUniversalExecutionReviewStableKey as buildExecutionAdapterContractReviewStableKey };

export function buildExecutionAdapterContractReview(
  slug: string,
  input: ExecutionAdapterContractReviewPacketInput
): UniversalExecutionReviewPacket {
  return buildFirstControlledExecutionTrialPacket(slug, input);
}

export function buildExecutionAdapterContractReviewAdvancedDetails(
  title: string,
  language: readonly string[],
  details: readonly string[]
): string {
  return buildFirstControlledExecutionTrialAdvancedDetails(title, language, details);
}

export function buildExecutionAdapterContractReviewSections(
  ...sections: DailyBetaOneReleaseReviewSection[]
): DailyBetaOneReleaseReviewSection[] {
  return buildFirstControlledExecutionTrialSections(...sections);
}

export function buildExecutionAdapterContractReviewBoundary() {
  return buildFirstControlledExecutionTrialBoundary();
}

export function summarizeExecutionAdapterContractReview(
  title: string,
  packets: readonly UniversalExecutionReviewPacket[],
  approvalCopy: string
): string {
  return summarizeFirstControlledExecutionTrial(title, packets, approvalCopy);
}

export function buildExecutionAdapterContractReviewModel(input: ExecutionAdapterContractReviewModelConfig) {
  return buildFirstControlledExecutionTrialModel(input);
}
