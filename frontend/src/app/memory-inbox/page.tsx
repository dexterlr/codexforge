import type { Metadata } from "next";
import {
  buildMemoryInboxCardsFromActivity,
  buildMemoryInboxCardsFromCreative,
  buildMemoryInboxCardsFromPatchWorkflow,
  buildMemoryInboxCardsFromRegression,
  buildMemoryInboxCardsFromStabilization,
  buildMemoryInboxCardsFromVerification,
  summarizeOperatorMemoryInboxSession,
} from "@/lib/codexforge/operator-memory-inbox";
import MemoryInboxPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Operator Memory Inbox",
  description: "CodexForge Personal Operator Memory Inbox for reviewed memory candidate cards and promotion previews.",
};

export default function MemoryInboxPage() {
  const initialData = summarizeOperatorMemoryInboxSession([
    ...buildMemoryInboxCardsFromActivity(),
    ...buildMemoryInboxCardsFromVerification(),
    ...buildMemoryInboxCardsFromRegression(),
    ...buildMemoryInboxCardsFromPatchWorkflow(),
    ...buildMemoryInboxCardsFromStabilization(),
    ...buildMemoryInboxCardsFromCreative(),
  ]);
  return <MemoryInboxPageClient initialData={initialData} />;
}
