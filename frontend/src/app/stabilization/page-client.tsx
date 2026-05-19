"use client";

import { StabilizationCommandCenter } from "@/lib/codexforge/stabilization-command-center/components";
import type { StabilizationCommandCenterSummary } from "@/lib/codexforge/stabilization-command-center";

type StabilizationPageClientProps = {
  initialData: StabilizationCommandCenterSummary;
};

export default function StabilizationPageClient({ initialData }: StabilizationPageClientProps) {
  return (
    <div data-codexforge-stabilization-brain-continuity="Brain Continuity Dashboard readiness: review Brain continuity can be the next safe action; /brain-continuity is read-only. Continuity Handoff readiness: create continuity handoff at /handoff; copy-only, no auto-persistence.">
      <StabilizationCommandCenter summary={initialData} />
    </div>
  );
}
