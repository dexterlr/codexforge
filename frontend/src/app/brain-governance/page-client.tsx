"use client";

import { BrainMutationGovernanceConsole } from "@/lib/codexforge/brain-mutation-governance/components";
import type { BrainMutationGovernanceSession } from "@/lib/codexforge/brain-mutation-governance";

type BrainGovernancePageClientProps = {
  initialData: BrainMutationGovernanceSession;
};

export default function BrainGovernancePageClient({ initialData }: BrainGovernancePageClientProps) {
  return <BrainMutationGovernanceConsole session={initialData} />;
}
