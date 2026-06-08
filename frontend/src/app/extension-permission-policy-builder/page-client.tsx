"use client";

import { ExtensionPermissionPolicyBuilderPanel } from "@/lib/codexforge/extension-permission-policy-builder/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ExtensionPermissionPolicyBuilderPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/extension-permission-policy-builder"
      workspaceLabel="Extension Permission Policy Builder"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ExtensionPermissionPolicyBuilderPanel />
    </CodexForgeAppShell>
  );
}
