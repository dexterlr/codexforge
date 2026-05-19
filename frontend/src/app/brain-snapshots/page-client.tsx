"use client";

import { BrainSnapshotManager } from "@/lib/codexforge/brain-snapshot-manager/components";

export default function BrainSnapshotsPageClient() {
  return (
    <div data-codexforge-brain-snapshots-brain-continuity="Brain Continuity Dashboard link/readiness: /brain-continuity; no snapshot persistence.">
      <BrainSnapshotManager />
    </div>
  );
}
