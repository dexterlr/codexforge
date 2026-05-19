"use client";

import { ContinuityHandoffPacket } from "@/lib/codexforge/continuity-handoff/components";
import type { ContinuityHandoffSession } from "@/lib/codexforge/continuity-handoff";

type HandoffPageClientProps = {
  initialData: ContinuityHandoffSession;
};

export default function HandoffPageClient({ initialData }: HandoffPageClientProps) {
  return (
    <div data-codexforge-handoff-product-readiness="Product Readiness Audit posture: include product readiness posture in next-session packet if safe; review /readiness before Phase 55 Consolidation Pass; read-only, no auto-persistence, preserve latest-message authority.">
      <ContinuityHandoffPacket session={initialData} />
    </div>
  );
}
