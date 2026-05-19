"use client";

import { RuntimeEventJournal } from "@/lib/codexforge/runtime-event-journal/components";
import type { RuntimeEventJournalFeed } from "@/lib/codexforge/runtime-event-journal";

export default function RuntimeJournalPageClient({ initialData }: { initialData: RuntimeEventJournalFeed }) {
  return (
    <div data-codexforge-runtime-journal-brain-continuity="Brain Continuity Dashboard link/readiness: /brain-continuity; no persistence and no appendEvent.">
      <RuntimeEventJournal feed={initialData} />
    </div>
  );
}
