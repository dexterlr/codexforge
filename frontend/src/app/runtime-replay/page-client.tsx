"use client";

import { RuntimeEventReplaySimulator } from "@/lib/codexforge/runtime-event-replay/components";
import type { RuntimeEventReplaySession } from "@/lib/codexforge/runtime-event-replay";

export default function RuntimeReplayPageClient({ initialData }: { initialData?: RuntimeEventReplaySession }) {
  return (
    <div data-codexforge-runtime-replay-brain-continuity="Brain Continuity Dashboard link/readiness: /brain-continuity; no replay persistence.">
      <RuntimeEventReplaySimulator session={initialData} />
    </div>
  );
}
