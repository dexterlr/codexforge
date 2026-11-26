"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { NormalProductFrame, TradingResearchPanel } from "@/lib/codexforge/normal-product";
import { TraderBuilderChat } from "./TraderBuilderChat";

// 3914-3945 - Jarvis Unified Product IA and God-Tier UX Polish
// trading workspace has dedicated polished page
export default function JarvisTradingWorkspacePageClient({ conversationId }: { conversationId: string | null }) {
  return (
    <CodexForgeAppShell activePath="/jarvis-trading" workspaceLabel="Trading research" focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false}>
      <NormalProductFrame
        activePath="/jarvis-trading"
        primaryAction={{
          label: "Open Trader Builder chat",
          href: {
            pathname: "/jarvis-trading",
            query: conversationId ? { conversation: conversationId } : undefined,
            hash: "trader-builder",
          },
        }}
        secondaryActions={[
          { label: "Review Audit", href: "/jarvis-audit" },
          { label: "Review Safety", href: "/jarvis-safety" },
        ]}
      >
        <TraderBuilderChat key={conversationId ?? "new"} conversationId={conversationId} />
        <TradingResearchPanel />
      </NormalProductFrame>
      {/* Historical ownership marker: JarvisUnifiedProductPageClientShell surfaceId="jarvis-trading". */}
    </CodexForgeAppShell>
  );
}
