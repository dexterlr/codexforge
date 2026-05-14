"use client";

import type { CSSProperties } from "react";
import { CodexForgeGlobalNav } from "@/lib/codexforge/navigation";
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
