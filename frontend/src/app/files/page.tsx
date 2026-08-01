import type { Metadata } from "next";
import { buildCodexForgeFilesContext } from "@/lib/codexforge/files/file-context";
import FilesPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Project Files",
  description:
    "Browse and preview files inside the bounded project root, then continue to explicit Patch Review and allowlisted Validation.",
};

export default async function FilesPage() {
  const initialData = await buildCodexForgeFilesContext({ limit: 80 });
  return <FilesPageClient initialData={initialData} />;
}
