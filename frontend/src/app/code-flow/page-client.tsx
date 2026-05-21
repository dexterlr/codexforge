"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { RealCodingFlowPanel } from "@/lib/codexforge/real-coding-flow/components";

export default function CodeFlowPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/code-flow"
      workspaceLabel="Fix code safely"
      nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-code-flow-route="Code Flow route imports/renders RealCodingFlowPanel Fix code safely Pick a file Preview patch Review before apply Run checks Review result no auto-apply no auto-run approval required preview first preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap" />
      <RealCodingFlowPanel />
    </CodexForgeAppShell>
  );
}
