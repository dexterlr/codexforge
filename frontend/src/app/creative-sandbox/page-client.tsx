"use client";

import type { CreativeExecutionSandboxModel } from "@/lib/codexforge/creative-execution-sandbox";
import { CreativeExecutionSandboxPanel } from "@/lib/codexforge/creative-execution-sandbox/components/CreativeExecutionSandboxPanel";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

type Props = {
  initialData: CreativeExecutionSandboxModel;
};

export default function CreativeSandboxPageClient({ initialData }: Props) {
  return (
    <CodexForgeAppShell
      activePath="/creative-sandbox"
      workspaceLabel="Creative Execution Sandbox"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CreativeExecutionSandboxPanel model={initialData} />
    </CodexForgeAppShell>
  );
}
