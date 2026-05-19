import type { Metadata } from "next";
import { buildComfyUiAdapterPreviewModel } from "@/lib/codexforge/comfyui-adapter-preview";
import ComfyUiPageClient from "./page-client";

export const metadata: Metadata = {
  title: "ComfyUI Adapter Preview",
  description:
    "CodexForge ComfyUI Adapter Preview v1 for preview-only workflow manifests, prompt nodes, approval packets, and future executor handoffs.",
};

export default function ComfyUiPage() {
  return <ComfyUiPageClient initialData={buildComfyUiAdapterPreviewModel()} />;
}

