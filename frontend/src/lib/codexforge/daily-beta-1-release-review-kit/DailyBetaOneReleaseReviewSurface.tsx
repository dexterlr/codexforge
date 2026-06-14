"use client";

import {
  PreviewFoundationCard,
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  PreviewFoundationPillList,
  PreviewFoundationSafetyStrip,
  previewStyles,
} from "../video-foundation-ui";
import { DAILY_BETA_ONE_RELEASE_REVIEW_SAFETY_MARKERS } from "./daily-beta-1-release-review-safety-markers";

export type DailyBetaOneReleaseReviewSection = { label: string; items: string[] };
export type DailyBetaOneReleaseReviewCard = { id: string; title: string; status: string; sections: DailyBetaOneReleaseReviewSection[]; routes: string[]; nextRecommendedAction: string };
export type DailyBetaOneReleaseReviewSurfaceLink = { href: string; label: string };
export type DailyBetaOneReleaseReviewSurfaceProps = { phase: string; title: string; subtitle: string; primaryLabel: string; anchor: string; plainEnglishTitle: string; plainEnglishCopy: string; language: string[]; markers: string[]; links: DailyBetaOneReleaseReviewSurfaceLink[]; cards: DailyBetaOneReleaseReviewCard[]; advancedSummary: string; advancedDetails: string[]; advancedCopies: string[]; advancedCopy: string; dataScope: string };

export function buildDailyBetaOneReleaseReviewSurfaceKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}

function buildCardItems(card: DailyBetaOneReleaseReviewCard): string[] {
  return [
    `Status: ${card.status}`,
    ...card.sections.flatMap((section) => section.items.map((sectionItem) => `${section.label}: ${sectionItem}`)),
    ...card.routes,
    card.nextRecommendedAction,
  ];
}

export function DailyBetaOneReleaseReviewSurface({ phase, title, subtitle, primaryLabel, anchor, plainEnglishTitle, plainEnglishCopy, language, markers, links, cards, advancedSummary, advancedDetails, advancedCopies, advancedCopy, dataScope }: DailyBetaOneReleaseReviewSurfaceProps) {
  const markerText = [...markers, ...DAILY_BETA_ONE_RELEASE_REVIEW_SAFETY_MARKERS].join(" ");
  return (
    <div style={previewStyles.shell} data-codexforge-daily-beta-one-release-review={`${markerText} ${dataScope} route imports/renders main panel`}>
      <PreviewFoundationHero phase={phase} title={title} subtitle={subtitle} primary={{ href: `#${anchor}`, label: primaryLabel }} links={links} />
      <PreviewFoundationSafetyStrip items={language} />
      <PreviewFoundationCard title={plainEnglishTitle}>
        <PreviewFoundationCopy>{subtitle}</PreviewFoundationCopy>
        <PreviewFoundationCopy>{plainEnglishCopy}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id={anchor} style={previewStyles.grid}>
        {cards.map((card) => (
          <PreviewFoundationCard key={buildDailyBetaOneReleaseReviewSurfaceKey(dataScope, "card", card.id)} title={card.title}>
            <PreviewFoundationPillList items={buildCardItems(card)} />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary={advancedSummary}>
        <PreviewFoundationPillList items={advancedDetails} />
        <PreviewFoundationPillList items={advancedCopies} />
        <PreviewFoundationCopy>{advancedCopy}</PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
