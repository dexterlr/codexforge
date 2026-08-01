import type { Metadata } from "next";
import JarvisSafetyWorkspacePageClient from "./page-client";

export const metadata: Metadata = {
  title: "Safety and Settings",
  description: "Review the current kill-switch, local-first, approval, cloud, paid-disabled, and server-only credential posture.",
};

export default function JarvisSafetyWorkspacePage() {
  return <JarvisSafetyWorkspacePageClient />;
}
