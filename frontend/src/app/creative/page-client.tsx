"use client";

import { CreativeProductionStudio } from "@/lib/codexforge/creative/components/CreativeProductionStudio";
import { CodexForgeGlobalNav } from "@/lib/codexforge/navigation";
import type { CreativeContext } from "@/lib/codexforge/creative";
import type { CSSProperties } from "react";

type CreativePageClientProps = {
  initialData: CreativeContext;
};

export default function CreativePageClient({ initialData }: CreativePageClientProps) {
  return (
    <>
      <div style={navBand}>
        <CodexForgeGlobalNav compact />
      </div>
      <CreativeProductionStudio context={initialData} />
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
