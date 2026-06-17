"use client";

import { ChatbotAdapterContractReviewPanel } from "@/lib/codexforge/chatbot-adapter-contract-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ChatbotAdapterContractReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/chatbot-adapter-contract-review"
      workspaceLabel="Chatbot Adapter Contract Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ChatbotAdapterContractReviewPanel />
    </CodexForgeAppShell>
  );
}
