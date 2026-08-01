import type { Metadata } from "next";
import { buildCodexForgeFilesContext } from "@/lib/codexforge/files/file-context";
import ValidationPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Validation",
  description: "Prepare allowlisted checks, explicitly approve their exact commands, and review supplied output without arbitrary shell execution.",
};

export default async function ValidationPage() {
  const context = await buildCodexForgeFilesContext({ limit: 1 });
  return (
    <ValidationPageClient
      workspace={{ root: context.summary.root, fileCount: context.summary.totalFiles }}
    />
  );
}
