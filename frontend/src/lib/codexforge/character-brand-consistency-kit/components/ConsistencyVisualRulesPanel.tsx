"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ConsistencyVisualRules } from "../consistency-kit-types";

export function ConsistencyVisualRulesPanel({ rules }: { rules: ConsistencyVisualRules[] }) {
  return (
    <PreviewFoundationCard title="Visual rules">
      <PreviewFoundationCopy>Visual rules tell a beginner what must keep recurring across images, keyframes, and drafts.</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={rules.map(
          (rule) =>
            `${rule.subjectId}: must keep ${rule.mustKeep.join(", ")}; colors ${rule.colors.join(", ")}; materials ${rule.materials.join(", ")}; silhouette ${rule.silhouette}`
        )}
      />
    </PreviewFoundationCard>
  );
}
