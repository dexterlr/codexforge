"use client";

import { GlobalActivityFeed } from "@/lib/codexforge/global-activity/components";
import type { GlobalActivityFeed as GlobalActivityFeedModel } from "@/lib/codexforge/global-activity";

type ActivityPageClientProps = {
  initialData: GlobalActivityFeedModel;
};

export default function ActivityPageClient({ initialData }: ActivityPageClientProps) {
  return (
    <div data-codexforge-activity-memory-promotion-gate="Memory Promotion Gate link: memory.candidateCreated events can be reviewed in /memory-inbox; no persistence, no auto-promotion, no graph mutation.">
      <GlobalActivityFeed feed={initialData} />
    </div>
  );
}
