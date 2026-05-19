import type { Metadata } from "next";
import BrainSnapshotsPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Brain Snapshot Manager",
  description: "Read-only Brain graph snapshot summary, comparison, replay source selection, rollback planning, and governance review.",
};

export default function BrainSnapshotsPage() {
  return <BrainSnapshotsPageClient />;
}
