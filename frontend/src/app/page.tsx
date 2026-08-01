import type { Metadata } from "next";
import { buildCodexForgeFilesContext } from "@/lib/codexforge/files/file-context";
import OperatorHomePageClient from "./page-client";

// The client page owns the canonical CodexForgeAppShell for this server-rendered route.

export const metadata: Metadata = {
  title: "Home",
  description: "Start a bounded local-first task with Jarvis and reach Projects, Files, Patch Review, Validation, Audit, and Safety.",
};

export default async function OperatorHomePage() {
  const context = await buildCodexForgeFilesContext({ limit: 1 });
  return (
    <OperatorHomePageClient
      workspace={{
        root: context.summary.root,
        fileCount: context.summary.totalFiles,
        selectedFile: context.selectedFile?.path ?? null,
      }}
    />
  );
}
