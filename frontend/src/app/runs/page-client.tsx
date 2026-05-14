"use client";

import { OperatorRunCenter } from "@/lib/codexforge/operator-run/components/OperatorRunCenter";
import { CodexForgeGlobalNav } from "@/lib/codexforge/navigation";
import type { OperatorRunQueue } from "@/lib/codexforge/operator-run";
import type { CSSProperties } from "react";

type RunsPageClientProps = {
  initialData: OperatorRunQueue;
};

export default function RunsPageClient({ initialData }: RunsPageClientProps) {
  return (
    <>
      <div style={navBand}>
        <CodexForgeGlobalNav compact />
      </div>
      <OperatorRunCenter queue={initialData} />
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
