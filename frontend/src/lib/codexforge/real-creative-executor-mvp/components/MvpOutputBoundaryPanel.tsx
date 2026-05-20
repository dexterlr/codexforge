"use client";

import type { MvpOutputBoundary } from "../real-creative-mvp-types";
import { MvpList, MvpMetric, MvpPanel, MvpRequirementRows } from "./shared";

export function MvpOutputBoundaryPanel({ boundary }: { boundary: MvpOutputBoundary }) {
  return (
    <MvpPanel title="Output Boundary" marker="MvpOutputBoundaryPanel renders output boundary checks no parent traversal artifact root required no file writes">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", gap: 8 }}>
        <MvpMetric label="Status" value={boundary.status} />
        <MvpMetric label="Artifact root" value={String(boundary.artifactRootRequired)} />
        <MvpMetric label="Review route" value={boundary.reviewRoute} />
      </div>
      <MvpList title="Boundary summary" items={boundary.summary} />
      <MvpRequirementRows items={boundary.requirements} />
    </MvpPanel>
  );
}
