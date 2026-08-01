import type { Metadata } from "next";
import { buildCodexForgeFilesContext } from "@/lib/codexforge/files/file-context";
import VideoWorkflowsPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Workflows",
  description: "Understand planning and approval boundaries while no connected workflow or template inventory is available.",
};

export default async function VideoWorkflowsPage() {
  const context = await buildCodexForgeFilesContext({ limit: 1 });
  return (
    <VideoWorkflowsPageClient
      workspace={{ root: context.summary.root, fileCount: context.summary.totalFiles }}
    />
  );
}
