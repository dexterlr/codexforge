"use client";

import { CreativeProductionStudio } from "@/lib/codexforge/creative/components/CreativeProductionStudio";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import type { CreativeContext } from "@/lib/codexforge/creative";

type CreativePageClientProps = {
  initialData: CreativeContext;
};

export default function CreativePageClient({ initialData }: CreativePageClientProps) {
  return (
    <CodexForgeAppShell activePath="/creative" workspaceLabel="Creative Production Studio" nextActionContext={{ hasCreativeWork: true }}>
      <CreativeProductionStudio context={initialData} />
    </CodexForgeAppShell>
  );
}
