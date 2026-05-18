"use client";

import { RuntimeEventJournal } from "@/lib/codexforge/runtime-event-journal/components";
import type { RuntimeEventJournalFeed } from "@/lib/codexforge/runtime-event-journal";

export default function RuntimeJournalPageClient({ initialData }: { initialData: RuntimeEventJournalFeed }) {
  return <RuntimeEventJournal feed={initialData} />;
}
