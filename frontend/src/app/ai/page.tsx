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
import { ComposerDock } from "@/lib/codexforge/chat/components/composer-dock";
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
import { WorkspaceInsightsPanel } from "@/lib/codexforge/chat/components/workspace-insights-panel";
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

/* ---------------- small components ---------------- */

function getRepoLabel(repoPath?: string) {
  if (!repoPath) return "No repo selected";

  const normalized = repoPath.replace(/\\/g, "/");
  const parts = normalized.split("/").filter(Boolean);
  return parts.at(-1) ?? repoPath;
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
      sourceLabel: lastAssistant ? getSourceLabel(lastAssistant) : "-",
      structured: !!lastAssistant?.structured,
      toolCount: summaryMeta.toolCount,
      domainLabel: summaryMeta.domainLabel ?? "General",
      tagCount: summaryMeta.tagCount,
      modeLabel: summaryMeta.modeLabel ?? "-",
      stepCount: summaryMeta.stepCount,
      diffCount: summaryMeta.diffCount,
      snapshotFileCount: summaryMeta.snapshotFileCount,
      executionPhaseLabel: executionMeta.phaseLabel ?? "-",
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

              <ComposerDock
                ref={inputRef}
                input={input}
                busy={busy || isExecuting}
                onChange={setInput}
                onClearDraft={handleClearDraft}
                onSend={handleSend}
              />
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

                <WorkspaceInsightsPanel />

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






























const sectionStackStyle: React.CSSProperties = {
  display: "grid",
  gap: 14,
  marginTop: 16,
};
