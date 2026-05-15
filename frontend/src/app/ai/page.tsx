"use client";


import { SelfUpgradeConsole } from "@/lib/codexforge/chat/components/self-upgrade-console";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { getDefaultCodexForgeClientContext } from "@/lib/codexforge/chat/client-context";
import {
  getDomainLabel,
  getExecutionMeta,
  getExecutionPhaseLabel,
  getSourceLabel,
  getStructuredSummaryMeta,
} from "@/lib/codexforge/chat/client-renderers";
import {
  BACKEND_LABELS,
  EMPTY_EXAMPLES,
  SUGGESTIONS,
  SURFACE_LINKS,
  buildSystemGuide,
  formatTime,
  getRepoLabel,
  type LatestReplySnapshot,
  type SurfaceLink,
  type Suggestion,
} from "@/lib/codexforge/chat/page-config";
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
import { WorkspaceSectionStack } from "@/lib/codexforge/chat/components/workspace-section-stack";
import { CodexForgeGlobalNav } from "@/lib/codexforge/navigation";
import { codexForgeFileFixtures } from "@/lib/codexforge/files/file-fixtures";
import { buildMissionControlSummary } from "@/lib/codexforge/mission-control";
import { buildTaskAutopilotSummary } from "@/lib/codexforge/task-autopilot";
import {
  buildActivatedTaskPlan,
  buildTaskActivationHandoff,
  buildTaskActivationPolicy,
  buildTaskActivationRequest,
} from "@/lib/codexforge/task-activation";
import type { WorkspaceCard } from "@/lib/codexforge/chat/components/workspace-hero";
import WorkspaceSidebar from "@/lib/codexforge/chat/components/workspace-sidebar";
import { WorkspaceSlider } from "@/lib/codexforge/chat/components/workspace-slider";
import { ToolbarStatus } from "@/lib/codexforge/chat/components/toolbar-status";
import * as styles from "@/lib/codexforge/chat/client-styles";
import { useCodexForgeChat } from "@/lib/codexforge/chat/use-codexforge-chat";
import {
  CHAT_RECALL_CONTEXT_STORAGE_KEY,
  ChatRecallContextPanel,
  buildChatRecallContext,
  buildChatRecallGroundingPolicy,
  buildChatRecallHandoff,
  buildChatRecallSafetyBoundary,
  buildChatRecallSelection,
  type ChatRecallPreparedContext,
} from "@/lib/codexforge/chat-recall";
import { EvidenceGroundedChatPanel } from "@/lib/codexforge/evidence-grounded-chat";

/* ---------------- page ---------------- */

export default function AiPage() {
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const [sliderOpen, setSliderOpen] = useState(false);
  const [chatRecallContext, setChatRecallContext] =
    useState<ChatRecallPreparedContext | null>(null);

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
    latestToolExecutionEvent,
    toolExecutionEvents,
    recordToolExecutionResult,
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

  const handleCopyChatRecallPrompt = useCallback((prompt: string) => {
    void navigator.clipboard?.writeText(prompt).catch(() => undefined);
  }, []);

  const handleUseChatRecallPrompt = useCallback(
    (prompt: string) => {
      setInput((current) => {
        const trimmed = current.trim();
        return trimmed ? `${prompt}\n\n${trimmed}` : prompt;
      });
      inputRef.current?.focus();
    },
    [setInput]
  );

  const handleCopyEvidenceGroundedPrompt = useCallback((prompt: string) => {
    void navigator.clipboard?.writeText(prompt).catch(() => undefined);
  }, []);

  const handleUseEvidenceGroundedPrompt = useCallback(
    (prompt: string) => {
      setInput((current) => {
        const trimmed = current.trim();
        return trimmed ? `${prompt}\n\n${trimmed}` : prompt;
      });
      inputRef.current?.focus();
    },
    [setInput]
  );

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
    try {
      const raw = window.localStorage.getItem(CHAT_RECALL_CONTEXT_STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw) as Partial<ChatRecallPreparedContext>;
      if (
        parsed.selection?.id !== "chat-recall-selection" ||
        parsed.context?.id !== "chat-recall-context" ||
        parsed.policy?.id !== "chat-recall-grounding-policy" ||
        parsed.safety?.id !== "chat-recall-safety-boundary" ||
        parsed.handoff?.id !== "chat-recall-handoff"
      ) {
        return;
      }

      setChatRecallContext(parsed as ChatRecallPreparedContext);
    } catch {
      setChatRecallContext(null);
    }
  }, []);

  const emptyChatRecallContext = useMemo<ChatRecallPreparedContext>(() => {
    const selection = buildChatRecallSelection({ results: [] });
    const context = buildChatRecallContext({ selection });
    const policy = buildChatRecallGroundingPolicy({ selection, context });
    const safety = buildChatRecallSafetyBoundary();
    const handoff = buildChatRecallHandoff({ context, policy, safety });

    return { selection, context, policy, safety, handoff };
  }, []);

  const visibleChatRecallContext = chatRecallContext ?? emptyChatRecallContext;
  const reviewedTaskActivationHandoff = useMemo(() => {
    const activationBundle = buildTaskAutopilotSummary({
      selectedFile: codexForgeFileFixtures[0],
      missionControl: buildMissionControlSummary(),
      artifactHints: [
        {
          sourceType: "artifact-hint",
          sourceId: "ai-reviewed-task-activation",
          title: "Copy reviewed task activation prompt into composer",
          summary: "AI workspace supports reviewed task activation handoff without silently setting activeTask.",
          tags: ["reviewed-task-activation", "latest-message-authority"],
          confidence: 0.68,
        },
      ],
    });
    const suggestion = activationBundle.suggestions[0];
    if (!suggestion) return null;
    const request = buildTaskActivationRequest({
      suggestion: {
        ...suggestion,
        reviewState: "accepted-for-planning",
      },
      approved: true,
      approvalNote: "AI workspace copy-to-composer handoff.",
    });
    const policy = buildTaskActivationPolicy({ request });
    if (!policy.allowed) return null;
    const plan = buildActivatedTaskPlan({ request, policy });
    return buildTaskActivationHandoff({ request, policy, plan });
  }, []);

  const handleCopyReviewedTaskActivationPrompt = useCallback(() => {
    const prompt = reviewedTaskActivationHandoff?.prompt;
    if (!prompt) return;
    void navigator.clipboard?.writeText(prompt).catch(() => undefined);
  }, [reviewedTaskActivationHandoff]);

  const handleUseReviewedTaskActivationPrompt = useCallback(() => {
    const prompt = reviewedTaskActivationHandoff?.prompt;
    if (!prompt) return;
    setInput((current) => {
      const trimmed = current.trim();
      return trimmed ? `${prompt}\n\n${trimmed}` : prompt;
    });
    inputRef.current?.focus();
  }, [reviewedTaskActivationHandoff, setInput]);

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
        <CodexForgeGlobalNav compact />

        <Link href="/mission" style={missionLink}>
          Mission Control: health, readiness, safe next actions, and approval gated surfaces
        </Link>
        <Link href="/tasks" style={missionLink}>
          Task Autopilot and Reviewed Task Activation: use /tasks to review suggestions, preview plans, then copy a no auto-run handoff
        </Link>
        <Link href="/tasks" style={missionLink}>
          Execution Readiness: review step preflight, tool readiness, risk, tests, and approval gates in /tasks; execution blocked until approval
        </Link>
        <Link href="/tasks" style={missionLink}>
          Step Runner Preview: prepare a selected step run preview, tool policy posture, approval packet, and dry run plan in /tasks; No step execution in Phase 25 and Future run requires approval
        </Link>
        <Link href="/tasks" style={missionLink}>
          Read-Only Step Execution: use /tasks to approve and execute only read-file, list-files, search-project, or snapshot-project; Mutation tools remain blocked and no file mutation is allowed
        </Link>

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
                        onToolExecutionResult={recordToolExecutionResult}
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
              <ChatRecallContextPanel
                selection={visibleChatRecallContext.selection}
                context={visibleChatRecallContext.context}
                policy={visibleChatRecallContext.policy}
                safety={visibleChatRecallContext.safety}
                handoff={visibleChatRecallContext.handoff}
                onCopyPrompt={handleCopyChatRecallPrompt}
                onUsePrompt={handleUseChatRecallPrompt}
              />
              <EvidenceGroundedChatPanel
                onCopyPrompt={handleCopyEvidenceGroundedPrompt}
                onUsePrompt={handleUseEvidenceGroundedPrompt}
              />
              <section
                style={reviewedActivationPanel}
                data-codexforge-ai-reviewed-task-activation="Reviewed Task Activation /tasks copy activation prompt preserve latest-message authority"
              >
                <div style={reviewedActivationTop}>
                  <div style={{ minWidth: 0 }}>
                    <span style={reviewedActivationEyebrow}>Reviewed Task Activation</span>
                    <h2 style={reviewedActivationTitle}>Copy activation prompt into composer</h2>
                    <p style={reviewedActivationBody}>
                      Use /tasks to approve suggestions and preview active plans. This helper only inserts a reviewed
                      activation handoff; it does not silently set activeTask and preserves latest-message authority.
                    </p>
                  </div>
                  <Link href="/tasks" style={reviewedActivationLink}>
                    Open /tasks
                  </Link>
                </div>
                <div style={reviewedActivationButtons}>
                  <button
                    type="button"
                    onClick={handleUseReviewedTaskActivationPrompt}
                    disabled={!reviewedTaskActivationHandoff}
                    style={reviewedActivationButton}
                  >
                    Use activation prompt
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyReviewedTaskActivationPrompt}
                    disabled={!reviewedTaskActivationHandoff}
                    style={reviewedActivationSecondaryButton}
                  >
                    Copy activation prompt
                  </button>
                </div>
              </section>
              <WorkspaceSectionStack>
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
                  latestToolExecutionEvent={latestToolExecutionEvent}
                  toolExecutionEventCount={toolExecutionEvents.length}
                />

                <SelfUpgradeConsole />


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
              </WorkspaceSectionStack>

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

const missionLink: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.22)",
  background: "rgba(20,184,166,0.08)",
  borderRadius: 8,
  color: "#ccfbf1",
  display: "block",
  fontSize: 12,
  fontWeight: 900,
  lineHeight: 1.4,
  padding: "10px 12px",
  textDecoration: "none",
  overflowWrap: "anywhere",
};
const reviewedActivationPanel: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.18)",
  background: "linear-gradient(145deg, rgba(15,23,42,0.82), rgba(2,6,23,0.68))",
  borderRadius: 8,
  padding: 14,
  display: "grid",
  gap: 12,
  minWidth: 0,
};
const reviewedActivationTop: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "flex-start",
  flexWrap: "wrap",
  minWidth: 0,
};
const reviewedActivationEyebrow: CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  color: "#93c5fd",
  fontWeight: 900,
  overflowWrap: "anywhere",
};
const reviewedActivationTitle: CSSProperties = {
  margin: "4px 0",
  fontSize: 18,
  letterSpacing: 0,
  overflowWrap: "anywhere",
};
const reviewedActivationBody: CSSProperties = {
  margin: 0,
  fontSize: 12,
  lineHeight: 1.5,
  opacity: 0.76,
  overflowWrap: "anywhere",
};
const reviewedActivationButtons: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  minWidth: 0,
};
const reviewedActivationButton: CSSProperties = {
  color: "#021014",
  border: "1px solid rgba(94,234,212,0.42)",
  background: "#5eead4",
  borderRadius: 8,
  padding: "9px 11px",
  fontSize: 12,
  fontWeight: 900,
  cursor: "pointer",
};
const reviewedActivationSecondaryButton: CSSProperties = {
  color: "#f8fafc",
  border: "1px solid rgba(45,212,191,0.26)",
  background: "rgba(20,184,166,0.12)",
  borderRadius: 8,
  padding: "9px 11px",
  fontSize: 12,
  fontWeight: 850,
  cursor: "pointer",
};
const reviewedActivationLink: CSSProperties = {
  color: "#dbeafe",
  border: "1px solid rgba(125,211,252,0.18)",
  background: "rgba(14,165,233,0.08)",
  borderRadius: 8,
  padding: "8px 10px",
  textDecoration: "none",
  fontSize: 12,
  fontWeight: 850,
};
