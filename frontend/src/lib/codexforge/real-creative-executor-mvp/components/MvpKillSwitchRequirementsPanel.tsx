"use client";

import type { MvpKillSwitchRequirements } from "../real-creative-mvp-types";
import { MvpList, MvpMetric, MvpPanel, MvpRequirementRows } from "./shared";

export function MvpKillSwitchRequirementsPanel({ group }: { group: MvpKillSwitchRequirements }) {
  return (
    <MvpPanel title="Kill-Switch Requirements" marker="MvpKillSwitchRequirementsPanel renders kill-switch requires future executor stop boundary before real render no current process termination in Phase 72">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", gap: 8 }}>
        <MvpMetric label="Status" value={group.status} />
        <MvpMetric label="Warnings" value={String(group.warningCount)} />
        <MvpMetric label="Terminate now" value={String(!group.noCurrentProcessTerminationInPhase72)} />
      </div>
      <MvpList title="Kill-switch summary" items={group.summary} />
      <MvpRequirementRows items={group.requirements} />
    </MvpPanel>
  );
}
