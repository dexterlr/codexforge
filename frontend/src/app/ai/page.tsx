"use client";

import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getDefaultCodexForgeClientContext } from "@/lib/codexforge/chat/client-context";
import {
  getDomainLabel,
  getExecutionMeta,
  getExecutionPhaseLabel,
  getSourceLabel,
  getStructuredSummaryMeta,
} from "@/lib/codexforge/chat/client-renderers";
import { ChatComposer } from "@/lib/codexforge/chat/components/chat-composer";
import { ChatMessage } from "@/lib/codexforge/chat/components/chat-message";
import { LatestReplyCard } from "@/lib/codexforge/chat/components/latest-reply-card";
import { CodexForgeProductSurface } from "@/lib/codexforge/chat/components/codexforge-product-surface";
import { WorkspaceCommandCenter } from "@/lib/codexforge/chat/components/workspace-command-center";
import { WorkspaceStateCard } from "@/lib/codexforge/chat/components/workspace-state-card";
import { ExecutionPanel } from "@/lib/codexforge/chat/components/execution-panel";
import { EngineStateCard } from "@/lib/codexforge/chat/components/engine-state-card";
import { WorkspaceOverviewCard } from "@/lib/codexforge/chat/components/workspace-overview-card";
import { TopBar } from "@/lib/codexforge/chat/components/top-bar";
import { EmptyState } from "@/lib/codexforge/chat/components/empty-state";
import type { WorkspaceCard } from "@/lib/codexforge/chat/components/workspace-hero";
import WorkspaceSidebar from "@/lib/codexforge/chat/components/workspace-sidebar";
import { WorkspaceSlider } from "@/lib/codexforge/chat/components/workspace-slider";
import { ToolbarStatus } from "@/lib/codexforge/chat/components/toolbar-status";
import * as styles from "@/lib/codexforge/chat/client-styles";
import { useCodexForgeChat } from "@/lib/codexforge/chat/use-codexforge-chat";
import type { CodexForgeExecutionPhase } from "@/lib/codexforge/types";

/* ---------------- types ---------------- */

type Suggestion = {
  id: string;
  label: string;
  prompt: string;
};

type LatestReplySnapshot = {
  textLength: number;
  sourceLabel: string;
  structured: boolean;
  toolCount: number;
  domainLabel: string;
  tagCount: number;
  modeLabel: string;
  stepCount: number;
  diffCount: number;
  snapshotFileCount: number | null;
  executionPhaseLabel: string;
  logCount: number;
};

type SurfaceLink = {
  href: string;
  label: string;
  detail: string;
};

type FocusAreaCard = {
  label: string;
  value: string;
};

type DirectionCardData = {
  title: string;
  text: string;
};









/* ---------------- constants ---------------- */

const SUGGESTIONS: Suggestion[] = [
  {
    id: "plan-feature",
    label: "Plan a feature",
    prompt:
      "Help me plan a feature. Give me a concrete goal, files to change, risks, and the first three implementation steps.",
  },
  {
    id: "debug-error",
    label: "Debug error",
    prompt:
      "I have an error. Ask me the exact error text, likely file, and what changed recently, then give me a structured debug plan.",
  },
  {
    id: "build-website",
    label: "Build site",
    prompt:
      "Break building a website into safe phases: pages, data, styling, APIs, and deployment.",
  },
  {
    id: "research-task",
    label: "Research",
    prompt:
      "Give me a structured research plan with key unknowns, evidence to gather, and an output format.",
  },
  {
    id: "design-codexforge",
    label: "Design CodexForge",
    prompt:
      "Help design CodexForge as a full AI developer workspace with memory, execution, structured plans, repo tooling, and a stable backend contract.",
  },
  {
    id: "offline-brain",
    label: "Offline brain",
    prompt:
      "Design an offline-first CodexForge brain architecture using local models, clear provider routing, fallback rules, caching, and execution-safe behavior.",
  },
  {
    id: "repo-tooling",
    label: "Repo tooling",
    prompt:
      "Design CodexForge repo tooling for search, read-file, diff previews, approval flow, snapshots, and safe apply behavior.",
  },
  {
    id: "minecraft-server",
    label: "Minecraft server",
    prompt:
      "Plan a Christmas-themed Minecraft server from scratch. Include server stack, plugins or mods, world theme, content pipeline, art assets, admin tooling, deployment, backups, and phased build steps.",
  },
  {
    id: "movie-pipeline",
    label: "Movie pipeline",
    prompt:
      "Design a script-to-movie pipeline for CodexForge. Cover scripting, storyboards, shot planning, image generation, video generation, voice, music, editing, rendering, review loops, storage, and automation steps.",
  },
  {
    id: "comfy-workflow",
    label: "ComfyUI workflow",
    prompt:
      "Design a ComfyUI-based generation workflow for CodexForge with prompt templates, reusable nodes, asset tracking, render queue ideas, and approval checkpoints.",
  },
  {
    id: "unreal-pipeline",
    label: "Unreal pipeline",
    prompt:
      "Design an Unreal Engine production workflow for CodexForge covering project setup, assets, blueprints or C++, cinematic tooling, packaging, and operator-style task execution.",
  },
];

const EMPTY_EXAMPLES = [
  "Plan my next CodexForge feature",
  "Design an offline-first AI workspace",
  "Build repo diff approvals with safe apply",
] as const;

const BACKEND_LABELS = {
  api: "API",
  "local-fallback": "Fallback",
} as const;

const SURFACE_LINKS: readonly SurfaceLink[] = [
  {
    href: "/clawd",
    label: "Operator surface",
    detail:
      "Use approval-driven snapshot, diff, apply, test, and checkpoint controls.",
  },
  {
    href: "/history",
    label: "Activity history",
    detail:
      "Review launches, notes, tasks, execution history, and migrated local activity.",
  },
  {
    href: "/brain",
    label: "Brain graph",
    detail:
      "Inspect local graph memory, saved context, relationships, and connected nodes.",
  },
  {
    href: "/entry",
    label: "Quick launch",
    detail:
      "Prepare a structured task and send it directly into the workspace.",
  },
] as const;

/* ---------------- helpers ---------------- */

function buildSystemGuide() {
  return [
    "You are CodexForge, an AI developer assistant and research copilot.",
    "CodexForge is the real product and the primary AI workspace frontend.",
    "Treat CodexForge as the main application, not as a test harness.",
    "Be structured, practical, and beginner-safe.",
    "Prefer the smallest correct next step.",
    "When useful, organize responses as: goal, files, commands, risks, and next action.",
    "Keep local-first behavior working even when the backend is unavailable.",
    "CodexForge should evolve into a full AI developer workspace with planning, execution, memory, research, media workflows, operator-style repo tooling, content pipelines, game-server automation, website creation, Unreal Engine workflows, and ComfyUI-based generation systems.",
  ].join(" ");
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getCapabilityCards(): FocusAreaCard[] {
  return [
    {
      label: "Websites",
      value: "Plan, scaffold, wire, iterate, and deploy site work.",
    },
    {
      label: "Game servers",
      value: "Design themed servers, content, infra, admin, and rollout flows.",
    },
    {
      label: "Movies",
      value: "Turn scripts into shot plans, asset plans, and production stages.",
    },
    {
      label: "ComfyUI",
      value: "Build reusable generation workflows and render pipelines.",
    },
    {
      label: "Unreal",
      value: "Structure project setup, content, tools, and execution passes.",
    },
    {
      label: "Operator loop",
      value: "Use approval-driven plan and diff checkpoints before mutation.",
    },
  ];
}

function getDirectionCards(): DirectionCardData[] {
  return [
    {
      title: "Workspace shell",
      text: "This page should be the operational shell for planning, conversation, repo-aware context, memory, and guided execution.",
    },
    {
      title: "Brain and memory",
      text: "CodexForge should accumulate useful project state over time instead of acting like a stateless chat box.",
    },
    {
      title: "Execution clarity",
      text: "Plans, diffs, approvals, snapshots, and run state should stay visible without turning the main workspace into a raw operator console.",
    },
    {
      title: "Local-first runtime",
      text: "The workspace should remain useful when providers are missing, slow, or intentionally disabled.",
    },
  ];
}

function getRepoLabel(repoPath: string | undefined) {
  if (!repoPath) return "No repo path";
  return repoPath.split("\\").filter(Boolean).slice(-2).join("\\");
}



/* ---------------- small components ---------------- */

function CapabilityCard() {
  const capabilityCards = getCapabilityCards();

  return (
    <div style={styles.statusCard}>
      <div style={styles.panelTitle}>CodexForge direction</div>

      <div style={capabilityGridStyle}>
        {capabilityCards.map((card) => (
          <div key={card.label} style={capabilityCardStyle}>
            <div style={capabilityLabelStyle}>{card.label}</div>
            <div style={capabilityValueStyle}>{card.value}</div>
          </div>
        ))}
      </div>

      <div style={productCardStyle}>
        <div style={productCardTitleStyle}>Product posture</div>
        <div style={productCardTextStyle}>
          This is the main CodexForge workspace. Operator mechanics belong in
          the dedicated operator surface, while this page stays focused on
          planning, memory, conversation, context, and safe execution guidance.
        </div>
      </div>
    </div>
  );
}

function DirectionCard({ title, text }: DirectionCardData) {
  return (
    <div style={directionCardStyle}>
      <div style={directionCardTitleStyle}>{title}</div>
      <div style={directionCardTextStyle}>{text}</div>
    </div>
  );
}

function ProductDirectionPanel() {
  const cards = getDirectionCards();

  return (
    <div style={styles.statusCard}>
      <div style={styles.panelTitle}>What this page should become</div>

      <div style={directionGridStyle}>
        {cards.map((card) => (
          <DirectionCard key={card.title} title={card.title} text={card.text} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- page ---------------- */

export default function AiPage() {
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const [sliderOpen, setSliderOpen] = useState(false);

  const systemGuide = useMemo(() => buildSystemGuide(), []);
  const defaultContext = useMemo(
    () => getDefaultCodexForgeClientContext(systemGuide),
    [systemGuide]
  );

  const {
    input,
    setInput,
    busy,
    messages,
    copiedId,
    statusText,
    backendMode,
    conversationState,
    lastAssistant,
    activeTask,
    memory,
    executionState,
    engineState,
    enginePhase,
    isExecuting,
    canApprovePlan,
    canRejectPlan,
    canApproveDiffs,
    canRejectDiffs,
    canResetEngine,
    send,
    runTaskStep,
    runCurrentTaskStep,
    approvePlan,
    rejectPlan,
    approveDiffs,
    rejectDiffs,
    resetEngine,
    clearChat,
    copyMessage,
    useMessageAsDraft,
    addSystemMessage,
    goToNextTaskStep,
    goToPreviousTaskStep,
    clearActiveTask,
    pinMemory,
    unpinMemory,
    deleteMemory,
    clearMemory,
  } = useCodexForgeChat({
    systemGuide,
    defaultContext,
    inputRef,
  });

  const safeMemory = useMemo(
    () => (Array.isArray(memory) ? memory : []),
    [memory]
  );

  const diffCount = engineState?.diffs.length ?? 0;
  const snapshotFileCount = engineState?.snapshot?.fileCount ?? 0;
  const sampledPaths = engineState?.snapshot?.sampledPaths ?? [];
  const diffPaths =
    engineState?.diffs.slice(0, 6).map((diff) => diff.filePath) ?? [];
  const recentEngineLogs = engineState?.logs.slice(0, 5) ?? [];
  const engineError = engineState?.error;
  const testOutput = engineState?.testOutput;
  const enginePhaseLabel = getExecutionPhaseLabel(enginePhase) ?? enginePhase;
  const repoLabel = getRepoLabel(defaultContext.repoPath);
  const pinnedMemoryCount = safeMemory.filter((item) => item.pinned).length;

  const completedSteps =
    activeTask?.steps.filter((step) => step.status === "done").length ?? 0;

  const activeTaskDomainLabel = activeTask
    ? getDomainLabel(activeTask.domain) ?? "General"
    : undefined;

  const hasMessages = messages.length > 0;

  const workspaceCards = useMemo<WorkspaceCard[]>(
    () => [
      {
        label: "Mode",
        value: isExecuting ? "Executing" : busy ? "Thinking" : "Ready",
      },
      { label: "Storage", value: "Local-first" },
      {
        label: "Backend",
        value: BACKEND_LABELS[backendMode],
      },
      { label: "Memory", value: `${safeMemory.length} items` },
      {
        label: "Task",
        value: activeTask
          ? `${completedSteps}/${activeTask.steps.length}`
          : "None",
      },
      {
        label: "Execution",
        value: isExecuting
          ? "Running"
          : executionState.lastCompletedAt
            ? "Ready"
            : "Idle",
      },
      {
        label: "Engine",
        value: enginePhaseLabel,
      },
      {
        label: "Diffs",
        value: `${diffCount}`,
      },
    ],
    [
      activeTask,
      backendMode,
      busy,
      completedSteps,
      diffCount,
      enginePhaseLabel,
      executionState.lastCompletedAt,
      isExecuting,
      safeMemory.length,
    ]
  );

  const lastReplySnapshot = useMemo<LatestReplySnapshot>(() => {
    const structured = lastAssistant?.structured ?? null;
    const summaryMeta = getStructuredSummaryMeta(structured);
    const executionMeta = getExecutionMeta(structured);

    return {
      textLength: lastAssistant?.text.length ?? 0,
      sourceLabel: lastAssistant ? getSourceLabel(lastAssistant) : "ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â",
      structured: !!lastAssistant?.structured,
      toolCount: summaryMeta.toolCount,
      domainLabel: summaryMeta.domainLabel ?? "General",
      tagCount: summaryMeta.tagCount,
      modeLabel: summaryMeta.modeLabel ?? "ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â",
      stepCount: summaryMeta.stepCount,
      diffCount: summaryMeta.diffCount,
      snapshotFileCount: summaryMeta.snapshotFileCount,
      executionPhaseLabel: executionMeta.phaseLabel ?? "ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â",
      logCount: executionMeta.logCount,
    };
  }, [lastAssistant]);

  const openSlider = useCallback(() => {
    setSliderOpen(true);
  }, []);

  const closeSlider = useCallback(() => {
    setSliderOpen(false);
  }, []);

  const handleSuggestionClick = useCallback(
    (prompt: string) => {
      void send(prompt);
    },
    [send]
  );

  const handleSend = useCallback(() => {
    void send();
  }, [send]);

  const handleClearDraft = useCallback(() => {
    setInput("");
  }, [setInput]);

  const handleRunCurrentTaskStep = useCallback(() => {
    void runCurrentTaskStep();
  }, [runCurrentTaskStep]);

  const handleRunTaskStep = useCallback(
    (stepIndex: number) => {
      void runTaskStep(stepIndex);
    },
    [runTaskStep]
  );

  useEffect(() => {
    const element = listRef.current;
    if (!element) return;

    element.scrollTo({
      top: element.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSliderOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!sliderOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [sliderOpen]);

  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <TopBar
          sliderOpen={sliderOpen}
          onOpenSlider={openSlider}
          onAddSystemMessage={addSystemMessage}
          onClearChat={clearChat}
        />

        <CodexForgeProductSurface />


        <div id="workspace" />

        <WorkspaceCommandCenter
          workspaceCards={workspaceCards}
          repoLabel={repoLabel}
          diffCount={diffCount}
          snapshotFileCount={snapshotFileCount}
          enginePhaseLabel={enginePhaseLabel}
          memoryCount={safeMemory.length}
          activeTaskLabel={activeTask?.goal ?? "No active task"}
          backendLabel={BACKEND_LABELS[backendMode]}
        />
        <section style={styles.mainCard}>
          <ToolbarStatus
            busy={busy}
            statusText={statusText}
            conversationState={conversationState}
            isExecuting={isExecuting}
            executionLabel={executionState.lastRunLabel || ""}
            enginePhase={enginePhase}
            enginePhaseLabel={enginePhaseLabel}
            diffCount={diffCount}
            snapshotFileCount={snapshotFileCount}
            activeTaskDomain={activeTaskDomainLabel}
            repoLabel={repoLabel}
          />

          <div style={styles.workspaceLayout}>
            <WorkspaceSidebar
              busy={busy || isExecuting}
              suggestions={SUGGESTIONS}
              onSuggestionClick={handleSuggestionClick}
              activeTask={activeTask}
              onNextStep={goToNextTaskStep}
              onPrevStep={goToPreviousTaskStep}
              onClearTask={clearActiveTask}
              memory={safeMemory}
              onPinMemory={pinMemory}
              onUnpinMemory={unpinMemory}
              onDeleteMemory={deleteMemory}
              onClearMemory={clearMemory}
            />

            <div style={styles.chatPanel}>
              <div ref={listRef} style={styles.messagesBox}>
                {!hasMessages ? (
                  <EmptyState />
                ) : (
                  <div style={styles.messageStack}>
                    {messages.map((message) => (
                      <ChatMessage
                        key={message.id}
                        message={message}
                        copiedId={copiedId}
                        formatTime={formatTime}
                        onCopy={copyMessage}
                        onUseAsDraft={useMessageAsDraft}
                        enginePhase={enginePhase}
                        diffCount={diffCount}
                        snapshotFileCount={snapshotFileCount}
                        isExecuting={isExecuting}
                        canApprovePlan={canApprovePlan}
                        canRejectPlan={canRejectPlan}
                        canApproveDiffs={canApproveDiffs}
                        canRejectDiffs={canRejectDiffs}
                        canResetEngine={canResetEngine}
                        onApprovePlan={approvePlan}
                        onRejectPlan={rejectPlan}
                        onApproveDiffs={approveDiffs}
                        onRejectDiffs={rejectDiffs}
                        onResetEngine={resetEngine}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div style={composerDockStyle}>
                <ChatComposer
                  ref={inputRef}
                  input={input}
                  busy={busy || isExecuting}
                  onChange={setInput}
                  onClearDraft={handleClearDraft}
                  onSend={handleSend}
                />
              </div>
              <div style={sectionStackStyle}>
                <WorkspaceOverviewCard
                  hasMessages={hasMessages}
                  messageCount={messages.length}
                  activeTaskGoal={activeTask?.goal}
                  completedSteps={completedSteps}
                  totalSteps={activeTask?.steps.length ?? 0}
                  enginePhaseLabel={enginePhaseLabel}
                  diffCount={diffCount}
                  snapshotFileCount={snapshotFileCount}
                  tags={activeTask?.tags ?? []}
                  isExecuting={isExecuting}
                />

                <WorkspaceStateCard
                  repoLabel={repoLabel}
                  backendLabel={BACKEND_LABELS[backendMode]}
                  conversationState={conversationState}
                  activeTaskLabel={
                    activeTask ? activeTask.goal : "No active task"
                  }
                  memoryCount={safeMemory.length}
                  pinnedMemoryCount={pinnedMemoryCount}
                  diffCount={diffCount}
                  snapshotFileCount={snapshotFileCount}
                  enginePhaseLabel={enginePhaseLabel}
                  isExecuting={isExecuting}
                />

                {lastAssistant ? (
                  <LatestReplyCard snapshot={lastReplySnapshot} />
                ) : null}

                <div style={insightsRowStyle}>
                  <CapabilityCard />
                  <ProductDirectionPanel />
                </div>

                <EngineStateCard
                  enginePhase={enginePhase}
                  enginePhaseLabel={enginePhaseLabel}
                  diffCount={diffCount}
                  snapshotFileCount={snapshotFileCount}
                  recentLogs={recentEngineLogs}
                  sampledPaths={sampledPaths}
                  diffPaths={diffPaths}
                  testOutput={testOutput}
                  engineError={engineError}
                  canApprovePlan={canApprovePlan}
                  canRejectPlan={canRejectPlan}
                  canApproveDiffs={canApproveDiffs}
                  canRejectDiffs={canRejectDiffs}
                  canResetEngine={canResetEngine}
                  isExecuting={isExecuting}
                  onApprovePlan={approvePlan}
                  onRejectPlan={rejectPlan}
                  onApproveDiffs={approveDiffs}
                  onRejectDiffs={rejectDiffs}
                  onResetEngine={resetEngine}
                />

                {activeTask ? (
                  <ExecutionPanel
                    activeTaskDomainLabel={activeTaskDomainLabel ?? "General"}
                    completedSteps={completedSteps}
                    totalSteps={activeTask.steps.length}
                    enginePhaseLabel={enginePhaseLabel}
                    snapshotFileCount={snapshotFileCount}
                    diffCount={diffCount}
                    tagCount={activeTask.tags.length}
                    tags={activeTask.tags}
                    lastRunLabel={executionState.lastRunLabel || ""}
                    busy={busy}
                    isExecuting={isExecuting}
                    canApprovePlan={canApprovePlan}
                    canRejectPlan={canRejectPlan}
                    canApproveDiffs={canApproveDiffs}
                    canRejectDiffs={canRejectDiffs}
                    canResetEngine={canResetEngine}
                    onRunCurrentTaskStep={handleRunCurrentTaskStep}
                    onApprovePlan={approvePlan}
                    onRejectPlan={rejectPlan}
                    onApproveDiffs={approveDiffs}
                    onRejectDiffs={rejectDiffs}
                    onResetEngine={resetEngine}
                  />
                ) : null}
              </div>

              <div style={styles.footerNote}>
                Main CodexForge workspace. Use the operator page for explicit
                snapshot, diff, apply, test, and checkpoint control.
              </div>
            </div>
          </div>
        </section>
      </div>

      <WorkspaceSlider
        open={sliderOpen}
        onClose={closeSlider}
        lastAssistantTextLength={lastReplySnapshot.textLength}
        sourceLabel={lastReplySnapshot.sourceLabel}
        structured={lastReplySnapshot.structured}
        toolCount={lastReplySnapshot.toolCount}
        lastAssistantStructuredReply={lastAssistant?.structured ?? null}
        activeTask={activeTask}
        onNextStep={goToNextTaskStep}
        onPrevStep={goToPreviousTaskStep}
        onClearTask={clearActiveTask}
        onRunCurrentStep={handleRunCurrentTaskStep}
        onRunStep={handleRunTaskStep}
        memory={safeMemory}
        onPinMemory={pinMemory}
        onUnpinMemory={unpinMemory}
        onDeleteMemory={deleteMemory}
        onClearMemory={clearMemory}
        isExecuting={isExecuting}
        executionLabel={executionState.lastRunLabel || ""}
        engineState={engineState}
        canApprovePlan={canApprovePlan}
        canRejectPlan={canRejectPlan}
        canApproveDiffs={canApproveDiffs}
        canRejectDiffs={canRejectDiffs}
        canResetEngine={canResetEngine}
        onApprovePlan={approvePlan}
        onRejectPlan={rejectPlan}
        onApproveDiffs={approveDiffs}
        onRejectDiffs={rejectDiffs}
        onResetEngine={resetEngine}
      />
    </main>
  );
}

/* ---------------- local styles ---------------- */



const heroShellStyle: React.CSSProperties = {
  display: "grid",
  gap: 16,
  marginBottom: 16,
};

const heroCardStyle: React.CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background:
    "linear-gradient(180deg, rgba(99,102,241,0.10), rgba(15,23,42,0.26))",
  borderRadius: 20,
  padding: 18,
  display: "grid",
  gap: 16,
};

const heroTopRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  alignItems: "center",
};

const heroBadgeStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid rgba(99,102,241,0.22)",
  background: "rgba(99,102,241,0.12)",
  fontSize: 12,
  fontWeight: 800,
};

const heroDotStyle: React.CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: 999,
  background: "rgba(16,185,129,0.95)",
  boxShadow: "0 0 0 4px rgba(16,185,129,0.14)",
};

const heroMetaTextStyle: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.72,
};

const heroGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.3fr) minmax(300px, 0.9fr)",
  gap: 16,
};

const heroMainStyle: React.CSSProperties = {
  display: "grid",
  gap: 14,
};

const heroEyebrowStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  opacity: 0.74,
};

const heroTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(28px, 4vw, 46px)",
  lineHeight: 1.02,
  letterSpacing: -0.9,
};

const heroGradientStyle: React.CSSProperties = {
  background:
    "linear-gradient(135deg, rgba(99,102,241,1), rgba(16,185,129,1))",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

const heroBodyStyle: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.7,
  opacity: 0.9,
  maxWidth: 860,
};

const heroActionRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
};

const heroPrimaryActionStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  padding: "12px 14px",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: 900,
  background:
    "linear-gradient(135deg, rgba(99,102,241,1), rgba(16,185,129,1))",
  color: "white",
  border: "1px solid rgba(255,255,255,0.18)",
};

const heroSecondaryActionStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  padding: "12px 14px",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: 800,
  background: "rgba(255,255,255,0.05)",
  color: "white",
  border: "1px solid rgba(255,255,255,0.16)",
};

const heroSupportTextStyle: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.6,
  opacity: 0.76,
};

const heroAsideStyle: React.CSSProperties = {
  display: "grid",
  gap: 12,
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(15,23,42,0.22)",
  borderRadius: 18,
  padding: 14,
};

const heroAsideTitleStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 900,
  opacity: 0.84,
};

const heroAsideGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 10,
};

const heroAsideCardStyle: React.CSSProperties = {
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(148,163,184,0.12)",
  background: "rgba(0,0,0,0.18)",
  display: "grid",
  gap: 4,
};

const heroAsideLabelStyle: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  opacity: 0.68,
  fontWeight: 900,
};

const heroAsideValueStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
};

const heroAsideCopyStyle: React.CSSProperties = {
  fontSize: 12,
  lineHeight: 1.6,
  opacity: 0.82,
};

const surfaceGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 10,
};

const surfaceLinkStyle: React.CSSProperties = {
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(148,163,184,0.14)",
  background: "rgba(15,23,42,0.18)",
  color: "white",
  textDecoration: "none",
  display: "grid",
  gap: 6,
};

const surfaceLinkTitleStyle: React.CSSProperties = {
  fontWeight: 800,
  fontSize: 14,
};

const surfaceLinkTextStyle: React.CSSProperties = {
  fontSize: 12,
  lineHeight: 1.55,
  opacity: 0.82,
};

const sectionStackStyle: React.CSSProperties = {
  display: "grid",
  gap: 14,
  marginTop: 16,
};







const capabilityGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
  gap: 10,
  marginTop: 12,
};

const capabilityCardStyle: React.CSSProperties = {
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(148,163,184,0.14)",
  background: "rgba(15,23,42,0.18)",
  display: "grid",
  gap: 6,
};

const capabilityLabelStyle: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  opacity: 0.7,
};

const capabilityValueStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  lineHeight: 1.45,
};

const productCardStyle: React.CSSProperties = {
  marginTop: 12,
  padding: 14,
  borderRadius: 16,
  border: "1px solid rgba(99,102,241,0.18)",
  background:
    "linear-gradient(180deg, rgba(99,102,241,0.10), rgba(15,23,42,0.20))",
  display: "grid",
  gap: 8,
};

const productCardTitleStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 800,
};

const productCardTextStyle: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.6,
  opacity: 0.92,
};














const directionGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 10,
  marginTop: 12,
};

const directionCardStyle: React.CSSProperties = {
  padding: 14,
  borderRadius: 14,
  border: "1px solid rgba(148,163,184,0.14)",
  background: "rgba(15,23,42,0.18)",
  display: "grid",
  gap: 8,
};

const directionCardTitleStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 800,
};

const directionCardTextStyle: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.55,
  opacity: 0.9,
};

const insightsRowStyle: React.CSSProperties = {
  display: "grid",
  gap: 14,
};






const composerDockStyle: React.CSSProperties = {
  position: "sticky",
  bottom: 14,
  zIndex: 40,
  marginTop: 14,
  padding: 12,
  borderRadius: 24,
  border: "1px solid rgba(148,163,184,0.22)",
  background:
    "linear-gradient(180deg, rgba(15,23,42,0.96), rgba(15,23,42,0.86))",
  boxShadow:
    "0 24px 70px rgba(0,0,0,0.42), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",
  backdropFilter: "blur(22px)",
};





