"use client";

import type { CSSProperties } from "react";
import { CodexForgeGlobalNav } from "@/lib/codexforge/navigation";
import { ArtifactExportFlowPanel } from "@/lib/codexforge/artifact-export-flow/components";
import { ProductionPackBuilder } from "@/lib/codexforge/production-pack/components";
import type { ProductionPack } from "@/lib/codexforge/production-pack";

type ProductionPageClientProps = {
  initialData: ProductionPack;
};

export default function ProductionPageClient({ initialData }: ProductionPageClientProps) {
  return (
    <>
      <div style={navBand}>
        <CodexForgeGlobalNav compact />
      </div>
      <ProductionPackBuilder pack={initialData} />
      <section style={exportFlowBand}>
        <ArtifactExportFlowPanel pack={initialData} />
      </section>
    </>
  );
}

const navBand: CSSProperties = {
  background: "#02040a",
  padding: "18px min(4vw, 44px) 0",
  minWidth: 0,
  maxWidth: "100%",
  overflowX: "clip",
};

const exportFlowBand: CSSProperties = {
  background: "#02040a",
  padding: "0 min(4vw, 44px) 32px",
  minWidth: 0,
  maxWidth: "100%",
  overflowX: "clip",
};
