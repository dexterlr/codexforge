"use client";

import { GlobalActivityFeed } from "@/lib/codexforge/global-activity/components";
import type { GlobalActivityFeed as GlobalActivityFeedModel } from "@/lib/codexforge/global-activity";

type ActivityPageClientProps = {
  initialData: GlobalActivityFeedModel;
};

export default function ActivityPageClient({ initialData }: ActivityPageClientProps) {
  return <GlobalActivityFeed feed={initialData} />;
}
