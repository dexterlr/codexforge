import type { Metadata } from "next";
import GenerationWorkspace from "./page-client";

export const metadata: Metadata = {
  title: "Generate · Animation Studio",
  description: "Inspect a saved shot and its local generation readiness. External dispatch remains disabled.",
};

export default async function GeneratePage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  return <GenerationWorkspace projectId={projectId} />;
}
