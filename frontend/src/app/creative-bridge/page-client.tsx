"use client";

import { CreativeLocalBridgePanel } from "@/lib/codexforge/creative-local-bridge/components/CreativeLocalBridgePanel";
import { CodexForgeGlobalNav } from "@/lib/codexforge/navigation";
import type { CreativeLocalBridgeModel } from "@/lib/codexforge/creative-local-bridge";
import type { CSSProperties } from "react";

type Props = {
  initialData: CreativeLocalBridgeModel;
};

export default function CreativeBridgePageClient({ initialData }: Props) {
  return (
    <>
      <div style={navBand}>
        <CodexForgeGlobalNav compact />
      </div>
      <CreativeLocalBridgePanel model={initialData} />
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
