"use client";

import {
  DailyBetaOneReleaseReviewSurface,
  type DailyBetaOneReleaseReviewCard,
  type DailyBetaOneReleaseReviewSurfaceLink,
} from "../daily-beta-1-release-review-kit";
import type { UniversalExecutionReviewPacket } from "./universal-execution-review-types";
import { buildUniversalExecutionReviewStableKey } from "./universal-execution-review-types";
import { UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS } from "./universal-execution-review-safety-markers";

export type UniversalExecutionReviewSurfaceProps = {
  phase: string;
  title: string;
  subtitle: string;
  primaryLabel: string;
  anchor: string;
  plainEnglishTitle: string;
  plainEnglishCopy: string;
  language: string[];
  markers: string[];
  links: DailyBetaOneReleaseReviewSurfaceLink[];
  packets: UniversalExecutionReviewPacket[];
  advancedSummary: string;
  advancedDetails: string[];
  advancedCopy: string;
  dataScope: string;
};

export function UniversalExecutionReviewSurface({
  phase,
  title,
  subtitle,
  primaryLabel,
  anchor,
  plainEnglishTitle,
  plainEnglishCopy,
  language,
  markers,
  links,
  packets,
  advancedSummary,
  advancedDetails,
  advancedCopy,
  dataScope,
}: UniversalExecutionReviewSurfaceProps) {
  const cards: DailyBetaOneReleaseReviewCard[] = packets.map((packet) => ({
    id: buildUniversalExecutionReviewStableKey(dataScope, "card", packet.id),
    title: packet.identity,
    status: packet.status,
    sections: packet.sections,
    routes: packet.routes,
    nextRecommendedAction: packet.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase={phase}
      title={title}
      subtitle={subtitle}
      primaryLabel={primaryLabel}
      anchor={anchor}
      plainEnglishTitle={plainEnglishTitle}
      plainEnglishCopy={plainEnglishCopy}
      language={language}
      markers={[...markers, ...UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS]}
      links={links}
      cards={cards}
      advancedSummary={advancedSummary}
      advancedDetails={[...advancedDetails, ...UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS]}
      advancedCopies={packets.map((packet) => packet.advancedDetails)}
      advancedCopy={advancedCopy}
      dataScope={`${dataScope} UniversalExecutionReviewSurface review-only approval required not executable yet`}
    />
  );
}
