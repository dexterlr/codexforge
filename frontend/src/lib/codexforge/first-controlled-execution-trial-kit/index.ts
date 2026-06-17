import type { DailyBetaOneReleaseReviewSection } from "../daily-beta-1-release-review-kit";
import type {
  ControlledBuilderReviewModel,
  ControlledBuilderReviewPacketInput,
} from "../controlled-builder-dry-run-review-kit";
import {
  buildControlledBuilderReviewAdvancedDetails,
  buildControlledBuilderReviewBoundary,
  buildControlledBuilderReviewModel,
  buildControlledBuilderReviewPacket,
  buildControlledBuilderReviewSections,
  summarizeControlledBuilderReview,
} from "../controlled-builder-dry-run-review-kit";
import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";

export type FirstControlledTrialModelInput = {
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

export { buildControlledBuilderReviewBoundary as buildFirstControlledExecutionTrialBoundary };
export { buildControlledBuilderReviewPacket as buildFirstControlledExecutionTrialPacket };

export function buildFirstControlledExecutionTrialAdvancedDetails(
  title: string,
  language: readonly string[],
  details: readonly string[]
): string {
  return buildControlledBuilderReviewAdvancedDetails(title, language, details);
}

export function buildFirstControlledExecutionTrialSections(
  ...sections: DailyBetaOneReleaseReviewSection[]
): DailyBetaOneReleaseReviewSection[] {
  return buildControlledBuilderReviewSections(...sections);
}

export function summarizeFirstControlledExecutionTrial(
  title: string,
  packets: readonly UniversalExecutionReviewPacket[],
  approvalCopy: string
): string {
  return summarizeControlledBuilderReview(title, packets, approvalCopy);
}

export function buildFirstControlledExecutionTrialModel(
  input: FirstControlledTrialModelInput
): ControlledBuilderReviewModel {
  return buildControlledBuilderReviewModel({
    phase: input.phase,
    title: input.title,
    summary: summarizeFirstControlledExecutionTrial(input.summarySubject, input.packets, input.approvalCopy),
    subtitle: input.subtitle,
    primaryLabel: input.primaryLabel,
    anchor: input.anchor,
    plainEnglishTitle: input.plainEnglishTitle,
    plainEnglishCopy: input.plainEnglishCopy,
    language: input.language,
    markers: input.language,
    links: input.links,
    packets: input.packets,
    advancedSummary: `Advanced ${input.title} details`,
    advancedDetails: input.advancedDetails,
    advancedCopy: input.advancedCopy,
    dataScope: input.dataScope,
  });
}

export type { ControlledBuilderReviewPacketInput };
