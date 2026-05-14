"use client";

import { CreativeProductionStudio } from "@/lib/codexforge/creative/components/CreativeProductionStudio";
import type { CreativeContext } from "@/lib/codexforge/creative";

type CreativePageClientProps = {
  initialData: CreativeContext;
};

export default function CreativePageClient({ initialData }: CreativePageClientProps) {
  return <CreativeProductionStudio context={initialData} />;
}
