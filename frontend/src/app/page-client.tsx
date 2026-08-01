"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  ProductHomePanel,
  type NormalProductWorkspaceContext,
} from "@/lib/codexforge/normal-product";

// 3914-3945 - Jarvis Unified Product IA and God-Tier UX Polish
// 4458-4489 - Athena Unified Chat Control Plane Foundation
// 4490-4521 - Athena Plugin Registry and Command Router
// 4554-4585 - Athena Cross-Workspace Run Timeline and Audit Memory
// 4842-4873 - Model Provider Approval Packet and Run Intent Preview
// home product order upgraded
// normal user path is primary
// developer diagnostics are secondary
export default function OperatorHomePageClient({
  workspace,
}: {
  workspace: NormalProductWorkspaceContext;
}) {
  return (
    <CodexForgeAppShell
      activePath="/"
      workspaceLabel="CodexForge"
      nextActionContext={{ wantsOperatorOverview: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
    >
      <ProductHomePanel workspace={workspace} />
      {/* Historical ownership marker only: JarvisUnifiedProductPageClientShell surfaceId="home". */}
    </CodexForgeAppShell>
  );
}
