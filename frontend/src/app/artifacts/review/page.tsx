import type { Metadata } from "next";
import ArtifactsReviewPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Artifact Review",
  description: "CodexForge preview-only creative artifact review board.",
};

export default function ArtifactsReviewPage() {
  return <ArtifactsReviewPageClient />;
}
