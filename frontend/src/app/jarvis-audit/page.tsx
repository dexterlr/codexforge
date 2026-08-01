import type { Metadata } from "next";
import JarvisAuditWorkspacePageClient from "./page-client";

export const metadata: Metadata = {
  title: "Audit and Runs",
  description: "Review readable local run states, model and data boundaries, approvals, execution history, and recovery paths.",
};

export default function JarvisAuditWorkspacePage() {
  return <JarvisAuditWorkspacePageClient />;
}
