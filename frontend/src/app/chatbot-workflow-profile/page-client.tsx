"use client";

import { ChatbotWorkflowProfilePanel } from "@/lib/codexforge/chatbot-workflow-profile/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ChatbotWorkflowProfilePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/chatbot-workflow-profile"
      workspaceLabel="Chatbot Workflow Profile"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ChatbotWorkflowProfilePanel />
    </CodexForgeAppShell>
  );
}
