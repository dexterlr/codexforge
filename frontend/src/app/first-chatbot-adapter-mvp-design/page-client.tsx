"use client";

import { FirstChatbotAdapterMvpDesignPanel } from "@/lib/codexforge/first-chatbot-adapter-mvp-design/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstChatbotAdapterMvpDesignPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-chatbot-adapter-mvp-design"
      workspaceLabel="First Chatbot Adapter MVP Design"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstChatbotAdapterMvpDesignPanel />
    </CodexForgeAppShell>
  );
}
