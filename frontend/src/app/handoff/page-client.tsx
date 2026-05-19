"use client";

import { ContinuityHandoffPacket } from "@/lib/codexforge/continuity-handoff/components";
import type { ContinuityHandoffSession } from "@/lib/codexforge/continuity-handoff";

type HandoffPageClientProps = {
  initialData: ContinuityHandoffSession;
};

export default function HandoffPageClient({ initialData }: HandoffPageClientProps) {
  return <ContinuityHandoffPacket session={initialData} />;
}
