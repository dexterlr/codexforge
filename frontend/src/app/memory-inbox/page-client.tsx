"use client";

import { OperatorMemoryInbox } from "@/lib/codexforge/operator-memory-inbox/components";
import type { OperatorMemoryInboxSession } from "@/lib/codexforge/operator-memory-inbox";

export default function MemoryInboxPageClient({ initialData }: { initialData: OperatorMemoryInboxSession }) {
  return (
    <div style={{ minWidth: 0, width: "100%" }}>
      <OperatorMemoryInbox session={initialData} />
    </div>
  );
}
