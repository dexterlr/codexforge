import type { Metadata } from "next";
import { buildCodexForgeFilesContext } from "@/lib/codexforge/files/file-context";
import PatchPreviewWorkbenchPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Patch Review",
  description: "Review proposed changes before a separate explicit application approval; no patch is silently applied.",
};

export default async function PatchPreviewWorkbenchPage() {
  const context = await buildCodexForgeFilesContext({ limit: 1 });
  return (
    <PatchPreviewWorkbenchPageClient
      workspace={{ root: context.summary.root, fileCount: context.summary.totalFiles }}
    />
  );
}
