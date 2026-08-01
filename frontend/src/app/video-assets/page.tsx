import type { Metadata } from "next";
import { buildCodexForgeFilesContext } from "@/lib/codexforge/files/file-context";
import VideoAssetsPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Assets",
  description: "Review honest project asset availability and planning metadata without generation or upload claims.",
};

export default async function VideoAssetsPage() {
  const context = await buildCodexForgeFilesContext({ limit: 1 });
  return (
    <VideoAssetsPageClient
      workspace={{ root: context.summary.root, fileCount: context.summary.totalFiles }}
    />
  );
}
