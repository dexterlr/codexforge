"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ShotReusePlan } from "../shot-library-types";

export function ShotReusePlanPanel({ plan }: { plan: ShotReusePlan }) {
  return (
    <PreviewFoundationCard title="Reuse plan">
      <PreviewFoundationCopy>Reuse plans help storyboards and future video projects stay consistent without starting a render.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[...plan.reusablePlanSteps, ...plan.reviewSteps]} />
    </PreviewFoundationCard>
  );
}
