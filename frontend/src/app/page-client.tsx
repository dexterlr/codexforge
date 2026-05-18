"use client";

import { OperatorHomeDashboard } from "@/lib/codexforge/operator-home/components";
import type { OperatorHomeSummary } from "@/lib/codexforge/operator-home";

type OperatorHomePageClientProps = {
  initialData: OperatorHomeSummary;
};

export default function OperatorHomePageClient({
  initialData,
}: OperatorHomePageClientProps) {
  return <OperatorHomeDashboard summary={initialData} />;
}
