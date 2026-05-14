"use client";

import { JarvisBridgeCenter } from "@/lib/codexforge/local-bridge/components/JarvisBridgeCenter";
import type { BridgeCenterModel } from "@/lib/codexforge/local-bridge";

type BridgePageClientProps = {
  initialData: BridgeCenterModel;
};

export default function BridgePageClient({ initialData }: BridgePageClientProps) {
  return <JarvisBridgeCenter model={initialData} />;
}
