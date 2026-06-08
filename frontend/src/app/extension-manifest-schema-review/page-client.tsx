"use client";

import { ExtensionManifestSchemaReviewPanel } from "@/lib/codexforge/extension-manifest-schema-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ExtensionManifestSchemaReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/extension-manifest-schema-review"
      workspaceLabel="Extension Manifest Schema Review"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ExtensionManifestSchemaReviewPanel />
    </CodexForgeAppShell>
  );
}
