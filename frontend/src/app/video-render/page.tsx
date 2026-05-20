import type { Metadata } from "next";
import { buildVideoRenderJobPreviewModel } from "@/lib/codexforge/video-render-job-preview";
import VideoRenderPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Video Render Job Preview",
  description:
    "CodexForge Video Render Job Preview v1 for preview-only render inputs, timelines, shot plans, provider plans, queue previews, artifact expectations, approval packets, policy, and future executor handoff.",
};

export default function VideoRenderPage() {
  return <VideoRenderPageClient initialData={buildVideoRenderJobPreviewModel()} />;
}
