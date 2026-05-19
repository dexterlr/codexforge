import type { Metadata } from "next";
import { buildCodexForgeFilesContext } from "@/lib/codexforge/files/file-context";
import FilesPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Project Reader",
  description:
    "CodexForge read-only local project reader with file tree, preview, metadata, purpose, risk, and Safe Patch Preview handoff.",
};

export default async function FilesPage() {
  const initialData = await buildCodexForgeFilesContext({ limit: 80 });
  return <FilesPageClient initialData={initialData} />;
}
