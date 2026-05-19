import type { Metadata } from "next";
import { buildSnapshotRestoreGateSession } from "@/lib/codexforge/snapshot-restore-gate";
import SnapshotRestorePageClient from "./page-client";

export const metadata: Metadata = {
  title: "Snapshot Restore Approval Gate",
  description:
    "CodexForge preview-only Snapshot Restore Approval Gate for restore candidate modeling, comparison and replay evidence, governance review, approval packet, and request preview.",
};

export default function SnapshotRestorePage() {
  const initialData = buildSnapshotRestoreGateSession();
  return <SnapshotRestorePageClient initialData={initialData} />;
}
