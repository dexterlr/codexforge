"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { GpuWorkerRole } from "../dual-gpu-worker-types";

export function GpuWorkerRolePanel({ roles }: { roles: GpuWorkerRole[] }) {
  return (
    <PreviewFoundationCard title="Worker roles">
      {roles.map((role) => (
        <div key={role.id}>
          <PreviewFoundationCopy>{role.label}: {role.role}</PreviewFoundationCopy>
          <PreviewFoundationPillList items={[role.workerId, role.whenUseful]} />
        </div>
      ))}
    </PreviewFoundationCard>
  );
}
