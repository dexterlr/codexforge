import type { Metadata } from "next";
import { FilesCommandCenter } from "@/lib/codexforge/files/components/files-command-center";

export const metadata: Metadata = {
  title: "Files Command Center",
  description:
    "CodexForge AI-native files command center for risk, dependencies, lineage, and preview-only edit planning.",
};

export default function FilesPage() {
  return <FilesCommandCenter />;
}
