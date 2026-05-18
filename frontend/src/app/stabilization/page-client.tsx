"use client";

import { StabilizationCommandCenter } from "@/lib/codexforge/stabilization-command-center/components";
import type { StabilizationCommandCenterSummary } from "@/lib/codexforge/stabilization-command-center";

type StabilizationPageClientProps = {
  initialData: StabilizationCommandCenterSummary;
};

export default function StabilizationPageClient({ initialData }: StabilizationPageClientProps) {
  return <StabilizationCommandCenter summary={initialData} />;
}
