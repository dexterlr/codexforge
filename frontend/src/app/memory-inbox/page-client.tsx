"use client";

import { OperatorMemoryInbox } from "@/lib/codexforge/operator-memory-inbox/components";
import type { OperatorMemoryInboxSession } from "@/lib/codexforge/operator-memory-inbox";

export default function MemoryInboxPageClient({ initialData }: { initialData: OperatorMemoryInboxSession }) {
  return <OperatorMemoryInbox session={initialData} />;
}
