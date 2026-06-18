"use client";

import { ChatbotAdapterImplementationPlanPanel } from "@/lib/codexforge/chatbot-adapter-implementation-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ChatbotAdapterImplementationPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/chatbot-adapter-implementation-plan"
      workspaceLabel="Chatbot Adapter Implementation Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ChatbotAdapterImplementationPlanPanel />
    </CodexForgeAppShell>
  );
}
