"use client";

import type { MvpRequirementGroup } from "../real-creative-mvp-types";
import { MvpList, MvpMetric, MvpPanel, MvpRequirementRows } from "./shared";

export function MvpSafetyRequirementsPanel({ group }: { group: MvpRequirementGroup }) {
  return (
    <MvpPanel title="Safety Requirements" marker="MvpSafetyRequirementsPanel renders safety requirements include no arbitrary command no arbitrary endpoint preserve latest-message authority">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", gap: 8 }}>
        <MvpMetric label="Status" value={group.status} />
        <MvpMetric label="Blockers" value={String(group.blockerCount)} />
        <MvpMetric label="Warnings" value={String(group.warningCount)} />
      </div>
      <MvpList title="Safety summary" items={group.summary} />
      <MvpRequirementRows items={group.requirements} />
    </MvpPanel>
  );
}
