"use client";

import { SnapshotRestoreGatePanel } from "@/lib/codexforge/snapshot-restore-gate/components";
import type { SnapshotRestoreGateSession } from "@/lib/codexforge/snapshot-restore-gate";

type SnapshotRestorePageClientProps = {
  initialData: SnapshotRestoreGateSession;
};

export default function SnapshotRestorePageClient({ initialData }: SnapshotRestorePageClientProps) {
  return (
    <div data-codexforge-snapshot-restore-brain-continuity="Brain Continuity Dashboard link/readiness: /brain-continuity; continuity posture is review-only and no restore execution.">
      <SnapshotRestoreGatePanel session={initialData} />
    </div>
  );
}
