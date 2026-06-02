import type { ShotContinuityNote, ShotTemplate } from "./shot-library-types";
import { buildDefaultShotTemplates } from "./shot-template";

export function buildShotContinuityNote(
  templates: ShotTemplate[] = buildDefaultShotTemplates()
): ShotContinuityNote[] {
  return templates.flatMap((template) =>
    template.continuityNotes.map((note, noteIndex) => ({
      id: `shot-continuity-note-${template.id}-${noteIndex + 1}`,
      shotId: template.id,
      note,
    }))
  );
}
