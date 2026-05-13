import type { Metadata } from "next";
import { buildCodexForgeFilesContext } from "@/lib/codexforge/files/file-context";
import FilesPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Files Command Center",
  description:
    "CodexForge AI-native files command center for risk, dependencies, lineage, and preview-only edit planning.",
};

export default async function FilesPage() {
  const initialData = await buildCodexForgeFilesContext({ limit: 80 });
  return <FilesPageClient initialData={initialData} />;
}
