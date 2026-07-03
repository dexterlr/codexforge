"use client";

import { MainPagesGodTierUxBoundaryMarker } from "@/lib/codexforge/main-pages-god-tier-ux";
import { OperatorHomeDashboard } from "@/lib/codexforge/operator-home/components";
import type { OperatorHomeSummary } from "@/lib/codexforge/operator-home";

type OperatorHomePageClientProps = {
  initialData: OperatorHomeSummary;
};

export default function OperatorHomePageClient({
  initialData,
}: OperatorHomePageClientProps) {
  return (
    <div style={{ minWidth: 0, width: "100%" }}>
      <MainPagesGodTierUxBoundaryMarker label="root home page imports shared UX marker" />
      <OperatorHomeDashboard summary={initialData} />
    </div>
  );
}
