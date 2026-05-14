"use client";

import { MissionControlDashboard } from "@/lib/codexforge/mission-control/components";
import type { MissionControlSummary } from "@/lib/codexforge/mission-control";

type MissionPageClientProps = {
  initialData: MissionControlSummary;
};

export default function MissionPageClient({ initialData }: MissionPageClientProps) {
  return <MissionControlDashboard summary={initialData} />;
}
