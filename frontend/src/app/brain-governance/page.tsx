import type { Metadata } from "next";
import { buildBrainMutationGovernanceSession } from "@/lib/codexforge/brain-mutation-governance";
import BrainGovernancePageClient from "./page-client";

export const metadata: Metadata = {
  title: "Brain Mutation Governance",
  description:
    "CodexForge read-only Brain Mutation Governance Console for mutation boundaries, direct mutation detection, reducer impact, integrity posture, risk review, and next safe action.",
};

export default function BrainGovernancePage() {
  const initialData = buildBrainMutationGovernanceSession();
  return <BrainGovernancePageClient initialData={initialData} />;
}
