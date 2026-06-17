import type {
  DailyBetaOneReleaseReviewSection,
  DailyBetaOneReleaseReviewSurfaceLink,
} from "../daily-beta-1-release-review-kit";
import type {
  UniversalExecutionReviewBoundary,
  UniversalExecutionReviewModel,
  UniversalExecutionReviewPacket,
  UniversalExecutionReviewStatus,
} from "../universal-execution-review-kit";
import {
  buildUniversalExecutionReviewBoundary,
  buildUniversalExecutionReviewStableKey,
  UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS,
} from "../universal-execution-review-kit";

export type ControlledBuilderReviewModel = UniversalExecutionReviewModel & {
  phase: string;
  subtitle: string;
  primaryLabel: string;
  anchor: string;
  plainEnglishTitle: string;
  plainEnglishCopy: string;
  markers: string[];
  links: DailyBetaOneReleaseReviewSurfaceLink[];
  advancedSummary: string;
  advancedCopy: string;
  dataScope: string;
};

export type ControlledBuilderReviewModelInput = {
  phase: string;
  title: string;
  summary: string;
  subtitle: string;
  primaryLabel: string;
  anchor: string;
  plainEnglishTitle: string;
  plainEnglishCopy: string;
  language: readonly string[];
  markers: readonly string[];
  links: readonly DailyBetaOneReleaseReviewSurfaceLink[];
  packets: readonly UniversalExecutionReviewPacket[];
  advancedSummary: string;
  advancedDetails: readonly string[];
  advancedCopy: string;
  dataScope: string;
};

export type ControlledBuilderReviewPacketInput = Omit<UniversalExecutionReviewPacket, "id"> & {
  idHint: string;
};

export function buildControlledBuilderReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return buildUniversalExecutionReviewStableKey(...parts);
}

export function buildControlledBuilderReviewPacket(slug: string, input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  const { idHint, ...packet } = input;
  return {
    id: buildControlledBuilderReviewStableKey(slug, idHint, input.status),
    ...packet,
  };
}

export function buildControlledBuilderReviewBoundary(): UniversalExecutionReviewBoundary {
  return buildUniversalExecutionReviewBoundary();
}

export function buildControlledBuilderReviewAdvancedDetails(title: string, language: readonly string[], details: readonly string[]): string {
  return [
    `Advanced ${title} details`,
    ...language,
    ...details,
    ...UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS,
  ].join("; ");
}

export function buildControlledBuilderReviewSections(...sections: DailyBetaOneReleaseReviewSection[]): DailyBetaOneReleaseReviewSection[] {
  return sections;
}

export function buildControlledBuilderReviewModel(input: ControlledBuilderReviewModelInput): ControlledBuilderReviewModel {
  return {
    phase: input.phase,
    title: input.title,
    summary: input.summary,
    subtitle: input.subtitle,
    primaryLabel: input.primaryLabel,
    anchor: input.anchor,
    plainEnglishTitle: input.plainEnglishTitle,
    plainEnglishCopy: input.plainEnglishCopy,
    reviewPackets: [...input.packets],
    boundary: buildControlledBuilderReviewBoundary(),
    language: [...input.language],
    markers: [...input.markers],
    links: [...input.links],
    advancedSummary: input.advancedSummary,
    advancedDetails: [...input.advancedDetails],
    advancedCopy: input.advancedCopy,
    dataScope: input.dataScope,
  };
}

export function summarizeControlledBuilderReview(title: string, packets: readonly UniversalExecutionReviewPacket[], approvalCopy: string): string {
  return `${title} reviews ${packets.length} controlled builder packet without executing workflows. ${approvalCopy}`;
}

export type ControlledBuilderReviewStatus = UniversalExecutionReviewStatus;
