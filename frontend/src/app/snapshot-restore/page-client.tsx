"use client";

import { SnapshotRestoreGatePanel } from "@/lib/codexforge/snapshot-restore-gate/components";
import type { SnapshotRestoreGateSession } from "@/lib/codexforge/snapshot-restore-gate";

type SnapshotRestorePageClientProps = {
  initialData: SnapshotRestoreGateSession;
};

export default function SnapshotRestorePageClient({ initialData }: SnapshotRestorePageClientProps) {
  return <SnapshotRestoreGatePanel session={initialData} />;
}
