"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { PromptPrivacyClassifierPanel } from "@/lib/codexforge/prompt-privacy-classifier/components";

export default function PromptPrivacyClassifierPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/prompt-privacy-classifier"
      workspaceLabel="Privacy Classifier"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PromptPrivacyClassifierPanel />
    </CodexForgeAppShell>
  );
}
