"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ShotContinuityNote } from "../shot-library-types";

export function ShotContinuityNotePanel({ notes }: { notes: ShotContinuityNote[] }) {
  return (
    <PreviewFoundationCard title="Continuity notes">
      <PreviewFoundationCopy>Continuity notes tell a beginner what should stay the same when a shot is reused.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={notes.map((note) => `${note.shotId}: ${note.note}`)} />
    </PreviewFoundationCard>
  );
}
