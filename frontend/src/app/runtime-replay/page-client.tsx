"use client";

import { RuntimeEventReplaySimulator } from "@/lib/codexforge/runtime-event-replay/components";
import type { RuntimeEventReplaySession } from "@/lib/codexforge/runtime-event-replay";

export default function RuntimeReplayPageClient({ initialData }: { initialData?: RuntimeEventReplaySession }) {
  return <RuntimeEventReplaySimulator session={initialData} />;
}
