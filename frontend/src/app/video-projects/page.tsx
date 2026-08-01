import type { Metadata } from "next";
import { buildCodexForgeFilesContext } from "@/lib/codexforge/files/file-context";
import VideoProjectsPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Projects",
  description: "Review the repository-configured CodexForge workspace and continue safely in Jarvis.",
};

export default async function VideoProjectsPage() {
  const context = await buildCodexForgeFilesContext({ limit: 1 });
  return (
    <VideoProjectsPageClient
      workspace={{
        root: context.summary.root,
        fileCount: context.summary.totalFiles,
        selectedFile: context.selectedFile?.path ?? null,
      }}
    />
  );
}
