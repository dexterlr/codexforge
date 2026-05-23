"use client";

import { CodingFlowLiveTrialPanel } from "@/lib/codexforge/coding-flow-live-trial/components/CodingFlowLiveTrialPanel";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodeFlowTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/code-flow/trial"
      workspaceLabel="Coding Trial"
      nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-coding-flow-live-trial-route="Coding Trial route imports/renders CodingFlowLiveTrialPanel Try the coding flow Start trial no auto-apply no auto-run approval required preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary" />
      <CodingFlowLiveTrialPanel />
    </CodexForgeAppShell>
  );
}
