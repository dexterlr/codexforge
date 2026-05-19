"use client";

import { BrainContinuityDashboard } from "@/lib/codexforge/brain-continuity/components";
import type { BrainContinuitySession } from "@/lib/codexforge/brain-continuity";

type BrainContinuityPageClientProps = {
  initialData: BrainContinuitySession;
};

export default function BrainContinuityPageClient({ initialData }: BrainContinuityPageClientProps) {
  return <BrainContinuityDashboard session={initialData} />;
}
