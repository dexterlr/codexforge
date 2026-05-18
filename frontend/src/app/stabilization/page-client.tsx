"use client";

import { CodexForgeGlobalNav } from "@/lib/codexforge/navigation";
import { StabilizationCommandCenter } from "@/lib/codexforge/stabilization-command-center/components";
import type { StabilizationCommandCenterSummary } from "@/lib/codexforge/stabilization-command-center";

type StabilizationPageClientProps = {
  initialData: StabilizationCommandCenterSummary;
};

export default function StabilizationPageClient({ initialData }: StabilizationPageClientProps) {
  return (
    <>
      <div style={{ background: "#02040a", padding: "18px min(4vw, 44px) 0" }}>
        <CodexForgeGlobalNav compact />
      </div>
      <StabilizationCommandCenter summary={initialData} />
    </>
  );
}
