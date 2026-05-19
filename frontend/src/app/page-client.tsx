"use client";

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
      <OperatorHomeDashboard summary={initialData} />
    </div>
  );
}
