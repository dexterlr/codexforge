"use client";

import { CreativeLocalBridgePanel } from "@/lib/codexforge/creative-local-bridge/components/CreativeLocalBridgePanel";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import type { CreativeLocalBridgeModel } from "@/lib/codexforge/creative-local-bridge";

type Props = {
  initialData: CreativeLocalBridgeModel;
};

export default function CreativeBridgePageClient({ initialData }: Props) {
  return (
    <CodexForgeAppShell activePath="/creative-bridge" workspaceLabel="Creative Bridge" nextActionContext={{ hasCreativeWork: true }}>
      <CreativeLocalBridgePanel model={initialData} />
    </CodexForgeAppShell>
  );
}
