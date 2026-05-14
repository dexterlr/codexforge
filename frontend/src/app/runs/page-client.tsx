"use client";

import { OperatorRunCenter } from "@/lib/codexforge/operator-run/components/OperatorRunCenter";
import type { OperatorRunQueue } from "@/lib/codexforge/operator-run";

type RunsPageClientProps = {
  initialData: OperatorRunQueue;
};

export default function RunsPageClient({ initialData }: RunsPageClientProps) {
  return <OperatorRunCenter queue={initialData} />;
}
