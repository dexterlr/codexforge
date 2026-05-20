"use client";

import type { MvpRequirementGroup } from "../real-creative-mvp-types";
import { MvpList, MvpMetric, MvpPanel, MvpRequirementRows } from "./shared";

export function MvpApprovalRequirementsPanel({ group }: { group: MvpRequirementGroup }) {
  return (
    <MvpPanel title="Approval Requirements" marker="MvpApprovalRequirementsPanel renders no approval means no future execution approval packet complete">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", gap: 8 }}>
        <MvpMetric label="Status" value={group.status} />
        <MvpMetric label="Requirements" value={String(group.requirements.length)} />
      </div>
      <MvpList title="Approval summary" items={group.summary} />
      <MvpRequirementRows items={group.requirements} />
    </MvpPanel>
  );
}
