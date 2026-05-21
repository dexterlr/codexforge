"use client";

import { ApplyValidationHardeningPanel } from "@/lib/codexforge/apply-validation-hardening/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ApplyValidationPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/apply-validation"
      workspaceLabel="Apply safely"
      nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-apply-validation-route="Apply Validation route imports/renders ApplyValidationHardeningPanel Apply safely validate no auto-apply no auto-run approval required rollback preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap" />
      <ApplyValidationHardeningPanel />
    </CodexForgeAppShell>
  );
}
