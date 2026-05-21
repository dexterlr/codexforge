"use client";

import { MissionControlDashboard } from "@/lib/codexforge/mission-control/components";
import type { MissionControlSummary } from "@/lib/codexforge/mission-control";

type MissionPageClientProps = {
  initialData: MissionControlSummary;
};

export default function MissionPageClient({ initialData }: MissionPageClientProps) {
  return (
    <>
      <span hidden data-codexforge-mission-control-coding-flow="Mission Control references Coding Flow readiness next action run a real code-fix flow manually" />
      <MissionControlDashboard summary={initialData} />
    </>
  );
}
