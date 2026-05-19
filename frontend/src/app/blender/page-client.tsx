"use client";

import type { CSSProperties } from "react";
import { BlenderAdapterPreviewPanel } from "@/lib/codexforge/blender-adapter-preview/components/BlenderAdapterPreviewPanel";
import type { BlenderAdapterPreviewModel } from "@/lib/codexforge/blender-adapter-preview";
import { CodexForgeGlobalNav } from "@/lib/codexforge/navigation";

type Props = {
  initialData: BlenderAdapterPreviewModel;
};

export default function BlenderPageClient({ initialData }: Props) {
  return (
    <>
      <div style={navBand}>
        <CodexForgeGlobalNav compact />
      </div>
      <BlenderAdapterPreviewPanel model={initialData} />
    </>
  );
}

const navBand: CSSProperties = {
  background: "#030712",
  padding: "18px min(4vw, 44px) 0",
  minWidth: 0,
  maxWidth: "100%",
  overflowX: "clip",
};
