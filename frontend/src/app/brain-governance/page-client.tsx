"use client";

import { BrainMutationGovernanceConsole } from "@/lib/codexforge/brain-mutation-governance/components";
import type { BrainMutationGovernanceSession } from "@/lib/codexforge/brain-mutation-governance";

type BrainGovernancePageClientProps = {
  initialData: BrainMutationGovernanceSession;
};

export default function BrainGovernancePageClient({ initialData }: BrainGovernancePageClientProps) {
  return (
    <div data-codexforge-brain-governance-brain-continuity="Brain Continuity Dashboard readiness: review Brain continuity before mutation-governance next action; read-only.">
      <BrainMutationGovernanceConsole session={initialData} />
    </div>
  );
}
