import type { ShotTemplate, ShotTemplateCategory, ShotTemplateCategorySummary } from "./shot-library-types";
import { buildDefaultShotTemplates } from "./shot-template";

const SHOT_CATEGORIES: ShotTemplateCategory[] = [
  "opening shot",
  "establishing shot",
  "product hero",
  "close-up detail",
  "reveal",
  "orbit",
  "dolly",
  "push-in",
  "pull-back",
  "transition",
  "ending shot",
  "social hook",
  "before/after",
  "comparison",
];

export function buildShotTemplateCategory(
  templates: ShotTemplate[] = buildDefaultShotTemplates()
): ShotTemplateCategorySummary[] {
  return SHOT_CATEGORIES.map((category) => ({
    id: `shot-template-category-${category.replaceAll(" ", "-").replace("/", "-")}`,
    category,
    explanation: "A category helps a beginner choose a proven shot pattern before writing a storyboard.",
    templateIds: templates.filter((template) => template.category === category).map((template) => template.id),
  }));
}
