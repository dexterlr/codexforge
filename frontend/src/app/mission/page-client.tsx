"use client";

import { MissionControlDashboard } from "@/lib/codexforge/mission-control/components";
import type { MissionControlSummary } from "@/lib/codexforge/mission-control";

type MissionPageClientProps = {
  initialData: MissionControlSummary;
};

export default function MissionPageClient({ initialData }: MissionPageClientProps) {
  return (
    <>
      <span hidden data-codexforge-mission-control-coding-flow="Mission Control references Coding Flow UX Fix Pack readiness Coding Flow Live Trial readiness Coding Flow Trial Review readiness Coding Flow readiness Apply Validation Hardening readiness Real Apply Guard Review readiness next action review apply guard before any apply automation increase Workflow Result Persistence readiness Run History Timeline readiness next action run another live coding trial after UX fixes run the trial manually and record go/no-go run a real coding trial manually capture a real code-flow run capture a real coding flow result run a real coding flow manually and capture output" />
      <span hidden data-codexforge-mission-control-coding-flow-mvp="Mission Control references Coding Flow Live Run MVP Coding Flow MVP Release Audit next action run one real manual coding flow and record result" />
      <MissionControlDashboard summary={initialData} />
    </>
  );
}
