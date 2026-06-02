"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { GpuWorkerAssignment } from "../dual-gpu-worker-types";

export function GpuWorkerAssignmentPanel({ assignments }: { assignments: GpuWorkerAssignment[] }) {
  return (
    <PreviewFoundationCard title="Assignment preview">
      {assignments.map((assignment) => (
        <PreviewFoundationCopy key={assignment.id}>
          {assignment.jobLabel}: {assignment.recommendedWorker}. {assignment.reason}
        </PreviewFoundationCopy>
      ))}
    </PreviewFoundationCard>
  );
}
