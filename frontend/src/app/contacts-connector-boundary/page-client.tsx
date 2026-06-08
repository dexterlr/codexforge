"use client";

import { ContactsConnectorBoundaryReviewPanel } from "@/lib/codexforge/contacts-connector-boundary-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ContactsConnectorBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/contacts-connector-boundary"
      workspaceLabel="Contacts Connector Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ContactsConnectorBoundaryReviewPanel />
    </CodexForgeAppShell>
  );
}
