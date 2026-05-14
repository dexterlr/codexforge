"use client";

import type { CSSProperties } from "react";
import { ArtifactExecutorCenter } from "@/lib/codexforge/artifact-executor/components/ArtifactExecutorCenter";
import { CodexForgeGlobalNav } from "@/lib/codexforge/navigation";
import type { ArtifactExecutorModel } from "@/lib/codexforge/artifact-executor";

type ArtifactsPageClientProps = {
  initialData: ArtifactExecutorModel;
};

export default function ArtifactsPageClient({ initialData }: ArtifactsPageClientProps) {
  return (
    <>
      <div style={navBand}>
        <CodexForgeGlobalNav compact />
      </div>
      <ArtifactExecutorCenter model={initialData} />
    </>
  );
}

const navBand: CSSProperties = {
  background: "#050814",
  padding: "18px min(4vw, 44px) 0",
  minWidth: 0,
  maxWidth: "100%",
  overflowX: "clip",
};
