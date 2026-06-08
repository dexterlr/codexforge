"use client";

import { ExtensionRegistryReleaseCandidatePanel } from "@/lib/codexforge/extension-registry-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ExtensionRegistryReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/extension-registry-release-candidate"
      workspaceLabel="Extension Registry Release Candidate"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ExtensionRegistryReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
