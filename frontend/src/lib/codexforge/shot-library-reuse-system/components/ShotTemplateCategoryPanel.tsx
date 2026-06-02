"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ShotTemplateCategorySummary } from "../shot-library-types";

export function ShotTemplateCategoryPanel({ categories }: { categories: ShotTemplateCategorySummary[] }) {
  return (
    <PreviewFoundationCard title="Shot categories">
      <PreviewFoundationCopy>
        Categories include opening shot, establishing shot, product hero, close-up detail, reveal, orbit, dolly, push-in, pull-back, transition, ending shot, social hook, before/after, and comparison.
      </PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={categories.map((category) => `${category.category}: ${category.templateIds.length} templates`)}
      />
    </PreviewFoundationCard>
  );
}
