"use client";

import { ChatbotAdapterPreviewPanel } from "@/lib/codexforge/chatbot-adapter-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ChatbotAdapterPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/chatbot-adapter-preview"
      workspaceLabel="Chatbot Adapter Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ChatbotAdapterPreviewPanel />
    </CodexForgeAppShell>
  );
}
