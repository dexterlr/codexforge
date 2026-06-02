import type { ShotLibrarySummary } from "./shot-library-types";
import { buildShotContinuityNote } from "./shot-continuity-note";
import { buildShotLibraryHandoff } from "./shot-library-handoff";
import { buildShotLibrarySafety } from "./shot-library-safety";
import { buildShotReusePlan } from "./shot-reuse-plan";
import { buildDefaultShotTemplates } from "./shot-template";
import { buildShotTemplateCategory } from "./shot-template-category";

export function buildShotLibrarySummary(): ShotLibrarySummary {
  const templates = buildDefaultShotTemplates();
  const categories = buildShotTemplateCategory(templates);
  const reusePlan = buildShotReusePlan(templates);
  const continuityNotes = buildShotContinuityNote(templates);
  const safety = buildShotLibrarySafety();
  const handoff = buildShotLibraryHandoff(templates);

  return {
    templates,
    categories,
    reusePlan,
    continuityNotes,
    safety,
    handoff,
    summary: summarizeShotLibrary({ templates, categories, reusePlan, continuityNotes, safety, handoff, summary: "" }),
  };
}

export function summarizeShotLibrary(summary: ShotLibrarySummary): string {
  return `${summary.templates.length} shot templates are ready to reuse in storyboards and local video draft plans.`;
}
