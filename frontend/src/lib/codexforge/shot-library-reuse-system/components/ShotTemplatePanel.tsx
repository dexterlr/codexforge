"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ShotTemplate } from "../shot-library-types";

export function ShotTemplatePanel({ templates }: { templates: ShotTemplate[] }) {
  return (
    <PreviewFoundationCard title="Shot templates">
      <PreviewFoundationCopy>
        Template fields include shot id, label, category, visual description, camera movement, subject movement, duration hint, keyframe need, best use, avoid use, continuity notes, and local draft suitability.
      </PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={templates.map(
          (template) =>
            `${template.id}: ${template.label}; category ${template.category}; local draft suitability ${template.localDraftSuitability}`
        )}
      />
    </PreviewFoundationCard>
  );
}
