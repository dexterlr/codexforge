"use client";

import { BrainContinuityDashboard } from "@/lib/codexforge/brain-continuity/components";
import type { BrainContinuitySession } from "@/lib/codexforge/brain-continuity";

type BrainContinuityPageClientProps = {
  initialData: BrainContinuitySession;
};

export default function BrainContinuityPageClient({ initialData }: BrainContinuityPageClientProps) {
  return (
    <div data-codexforge-brain-continuity-handoff="Continuity Handoff Packet link/readiness: create handoff packet can be the next safe action; /handoff is read-only, copy-only, and no persistence.">
      <BrainContinuityDashboard session={initialData} />
    </div>
  );
}
