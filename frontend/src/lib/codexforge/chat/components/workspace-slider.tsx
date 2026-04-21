"use client";

import React, { useEffect, useMemo, useRef } from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";
import { MemoryPanel } from "@/lib/codexforge/chat/components/memory-panel";
import {
  getDiffMeta,
  getDomainLabel,
  getExecutionMeta,
  getExecutionPhaseLabel,
  getSnapshotMeta,
  getStructuredSummaryMeta,
} from "@/lib/codexforge/chat/client-renderers";
import type {
  CodexForgeExecutionPhase,
  CodexForgeStructuredReply,
} from "@/lib/codexforge/types";
import type {
  CodexForgeActiveTask,
  CodexForgeEngineState,
  CodexForgeMemoryItem,
} from "@/lib/codexforge/chat/use-codexforge-chat";

/* ================= TYPES ================= */

type WorkspaceSliderProps = {
  open: boolean;
  onClose: () => void;

  lastAssistantTextLength?: number;
  sourceLabel?: string;
  structured?: boolean;
  toolCount?: number;
  lastAssistantStructuredReply?: CodexForgeStructuredReply | null;

  activeTask: CodexForgeActiveTask | null;
  onNextStep: () => void;
  onPrevStep: () => void;
  onClearTask: () => void;

  memory?: CodexForgeMemoryItem[];
  onPinMemory?: (memoryId: string) => void;
  onUnpinMemory?: (memoryId: string) => void;
  onDeleteMemory?: (memoryId: string) => void;
  onClearMemory?: () => void;

  onRunCurrentStep?: () => void;
  onRunStep?: (stepIndex: number) => void;

  isExecuting?: boolean;
  executionLabel?: string;

  engineState?: CodexForgeEngineState | null;

  canApprovePlan?: boolean;
  canRejectPlan?: boolean;
  canApproveDiffs?: boolean;
  canRejectDiffs?: boolean;
  canResetEngine?: boolean;
  onApprovePlan?: () => void;
  onRejectPlan?: () => void;
  onApproveDiffs?: () => void;
  onRejectDiffs?: () => void;
  onResetEngine?: () => void;
};

type StatCardProps = {
  label: string;
  value: string | number;
};

type TaskPanelProps = {
  open: boolean;
  task: CodexForgeActiveTask;
  onNextStep: () => void;
  onPrevStep: () => void;
  onClearTask: () => void;
  onRunCurrentStep?: () => void;
  onRunStep?: (stepIndex: number) => void;
  isExecuting?: boolean;
  executionLabel?: string;
};

type EnginePanelProps = {
  engineState?: CodexForgeEngineState | null;
  isExecuting?: boolean;
  canApprovePlan?: boolean;
  canRejectPlan?: boolean;
  canApproveDiffs?: boolean;
  canRejectDiffs?: boolean;
  canResetEngine?: boolean;
  onApprovePlan?: () => void;
  onRejectPlan?: () => void;
  onApproveDiffs?: () => void;
  onRejectDiffs?: () => void;
  onResetEngine?: () => void;
};

type ReplyPanelProps = {
  structuredReply?: CodexForgeStructuredReply | null;
  sourceLabel?: string;
  textLength?: number;
  toolCount?: number;
  structured?: boolean;
};

/* ================= HELPERS ================= */

function normalizeEnginePhase(value: unknown): CodexForgeExecutionPhase {
  return value === "idle" ||
    value === "planning" ||
    value === "awaiting_plan_approval" ||
    value === "diffing" ||
    value === "awaiting_diff_approval" ||
    value === "applying" ||
    value === "testing" ||
    value === "done" ||
    value === "error" ||
    value === "fallback"
    ? value
    : "idle";
}

function summarizeEnginePhase(phase: CodexForgeExecutionPhase) {
  return getExecutionPhaseLabel(phase) ?? phase;
}

function getStepBadge(status: "pending" | "running" | "done" | "error") {
  if (status === "done") return "✓";
  if (status === "running") return "…";
  if (status === "error") return "!";
  return "•";
}

function getStepTone(status: "pending" | "running" | "done" | "error") {
  if (status === "done") return "Done";
  if (status === "running") return "Running";
  if (status === "error") return "Error";
  return "Pending";
}

function ActionButton({
  visible,
  onClick,
  disabled,
  children,
  style,
}: {
  visible?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  style: React.CSSProperties;
}) {
  if (!visible || !onClick) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
}

/* ================= SMALL UI ================= */

function StatCard({ label, value }: StatCardProps) {
  return (
    <div style={statCard}>
      <div style={statLabel}>{label}</div>
      <div style={statValue}>{value}</div>
    </div>
  );
}

/* ================= TASK ================= */

function TaskPanel({
  open,
  task,
  onNextStep,
  onPrevStep,
  onClearTask,
  onRunCurrentStep,
  onRunStep,
  isExecuting = false,
  executionLabel = "",
}: TaskPanelProps) {
  const activeRef = useRef<HTMLDivElement | null>(null);

  const totalSteps = task.steps.length;
  const safeCurrentStep = Math.min(
    Math.max(task.currentStep, 0),
    Math.max(totalSteps - 1, 0)
  );
  const currentStepNumber = totalSteps > 0 ? safeCurrentStep + 1 : 0;
  const completedSteps = task.steps.filter((step) => step.status === "done").length;
  const runningSteps = task.steps.filter((step) => step.status === "running").length;
  const errorSteps = task.steps.filter((step) => step.status === "error").length;
  const progressPercent =
    totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
  const activeStepText = task.steps[safeCurrentStep]?.text ?? "";
  const domainLabel = getDomainLabel(task.domain) ?? "General";

  useEffect(() => {
    if (!open) return;
    activeRef.current?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }, [open, safeCurrentStep]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();

      if (tag === "input" || tag === "textarea" || target?.isContentEditable) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        if (!isExecuting) onNextStep();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (!isExecuting) onPrevStep();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onNextStep, onPrevStep, isExecuting]);

  return (
    <section style={sectionCard}>
      <div style={taskHeader}>
        <div style={styles.panelTitle}>Active Task</div>
        <div style={taskProgressChip}>
          {completedSteps}/{totalSteps}
        </div>
      </div>

      <div style={taskGoal}>{task.goal}</div>

      <div style={taskMetaGrid}>
        <div style={taskMetaCard}>
          <div style={taskMetaLabel}>Domain</div>
          <div style={taskMetaValue}>{domainLabel}</div>
        </div>

        <div style={taskMetaCard}>
          <div style={taskMetaLabel}>Current step</div>
          <div style={taskMetaValue}>{currentStepNumber || "—"}</div>
        </div>

        <div style={taskMetaCard}>
          <div style={taskMetaLabel}>Progress</div>
          <div style={taskMetaValue}>{progressPercent}%</div>
        </div>

        <div style={taskMetaCard}>
          <div style={taskMetaLabel}>Issues</div>
          <div style={taskMetaValue}>
            {errorSteps > 0 ? errorSteps : runningSteps > 0 ? "Running" : "None"}
          </div>
        </div>
      </div>

      {task.tags.length > 0 ? (
        <div style={tagRow}>
          {task.tags.map((tag) => (
            <span key={tag} style={tagChip}>
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      {isExecuting ? (
        <div style={executionBanner}>
          Running: {executionLabel || activeStepText || "current step"}
        </div>
      ) : null}

      <div style={premiumProgressShell} aria-hidden="true">
        <div style={progressTrack}>
          <div
            style={{
              ...progressFill,
              width: `${progressPercent}%`,
            }}
          />
        </div>
      </div>

      {activeStepText ? (
        <div style={taskCurrentStepCard}>
          <div style={taskCurrentStepLabel}>Current focus</div>
          <div style={styles.panelText}>{activeStepText}</div>
        </div>
      ) : null}

      <div style={taskStepsWrap}>
        {task.steps.map((step, index) => {
          const isActive = index === safeCurrentStep;
          const isDone = step.status === "done";
          const isRunning = step.status === "running";
          const isError = step.status === "error";

          return (
            <div
              key={step.id}
              ref={isActive ? activeRef : undefined}
              style={{
                ...taskStep,
                ...(isDone ? taskStepDone : null),
                ...(isRunning ? taskStepRunning : null),
                ...(isError ? taskStepError : null),
                ...(isActive && !isDone && !isRunning && !isError
                  ? taskStepActive
                  : null),
              }}
            >
              <span style={taskStepIndex}>{getStepBadge(step.status)}</span>

              <div style={taskStepContent}>
                <div style={taskStepHeadRow}>
                  <div style={taskStepText}>{step.text}</div>
                  <span style={taskStepToneChip}>{getStepTone(step.status)}</span>
                </div>

                {step.result ? (
                  <div style={taskStepResult}>{step.result}</div>
                ) : null}

                {onRunStep ? (
                  <div style={taskStepActions}>
                    <button
                      type="button"
                      disabled={isExecuting}
                      onClick={() => onRunStep(index)}
                      style={styles.tinyGhostButton}
                      aria-label={`Run step ${index + 1}`}
                    >
                      {isExecuting && isActive ? "Running…" : "Run"}
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <div style={taskControls}>
        <button
          type="button"
          onClick={onPrevStep}
          disabled={safeCurrentStep <= 0 || isExecuting || totalSteps === 0}
          style={styles.tinyGhostButton}
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={onNextStep}
          disabled={
            safeCurrentStep >= task.steps.length - 1 || isExecuting || totalSteps === 0
          }
          style={styles.tinyGhostButton}
        >
          Next →
        </button>

        {onRunCurrentStep ? (
          <button
            type="button"
            onClick={onRunCurrentStep}
            disabled={isExecuting || totalSteps === 0}
            style={styles.pillGhostButton}
          >
            {isExecuting ? "Running…" : "Run current step"}
          </button>
        ) : null}

        <button
          type="button"
          onClick={onClearTask}
          style={styles.pillDanger}
          disabled={isExecuting}
        >
          Clear
        </button>
      </div>
    </section>
  );
}

function EmptyTaskPanel() {
  return (
    <section style={sectionCard}>
      <div style={styles.panelTitle}>Active Task</div>
      <div style={styles.panelText}>
        No active task yet. Ask CodexForge to plan something and it will appear
        here.
      </div>
    </section>
  );
}

/* ================= REPLY PANEL ================= */

function ReplyPanel({
  structuredReply,
  sourceLabel = "—",
  textLength = 0,
  toolCount = 0,
  structured = false,
}: ReplyPanelProps) {
  const summaryMeta = getStructuredSummaryMeta(structuredReply);
  const executionMeta = getExecutionMeta(structuredReply);
  const snapshotMeta = getSnapshotMeta(structuredReply);
  const diffMeta = getDiffMeta(structuredReply);

  return (
    <section style={sectionCard}>
      <div style={styles.panelTitle}>Latest reply snapshot</div>

      <div style={statsGrid}>
        <StatCard label="Length" value={textLength} />
        <StatCard label="Source" value={sourceLabel} />
        <StatCard label="Structured" value={structured ? "Yes" : "No"} />
        <StatCard label="Tools" value={toolCount} />
        <StatCard label="Domain" value={summaryMeta.domainLabel ?? "General"} />
        <StatCard label="Mode" value={summaryMeta.modeLabel ?? "—"} />
        <StatCard label="Steps" value={summaryMeta.stepCount} />
        <StatCard label="Tags" value={summaryMeta.tagCount} />
        <StatCard label="Diffs" value={diffMeta.count} />
        <StatCard label="Snapshot" value={snapshotMeta.fileCount ?? 0} />
        <StatCard label="Exec phase" value={executionMeta.phaseLabel ?? "—"} />
        <StatCard label="Logs" value={executionMeta.logCount} />
      </div>
    </section>
  );
}

/* ================= ENGINE ================= */

function EnginePanel({
  engineState,
  isExecuting = false,
  canApprovePlan = false,
  canRejectPlan = false,
  canApproveDiffs = false,
  canRejectDiffs = false,
  canResetEngine = false,
  onApprovePlan,
  onRejectPlan,
  onApproveDiffs,
  onRejectDiffs,
  onResetEngine,
}: EnginePanelProps) {
  const phase = normalizeEnginePhase(engineState?.phase);
  const phaseLabel = summarizeEnginePhase(phase);
  const diffCount = engineState?.diffs.length ?? 0;
  const planStepCount = engineState?.plan?.steps.length ?? 0;
  const snapshotFileCount = engineState?.snapshot?.fileCount ?? 0;
  const logs = engineState?.logs.slice(0, 6) ?? [];
  const sampledPaths = engineState?.snapshot?.sampledPaths.slice(0, 8) ?? [];
  const diffs = engineState?.diffs.slice(0, 4) ?? [];
  const testOutput = engineState?.testOutput;
  const error = engineState?.error;

  return (
    <section style={sectionCard}>
      <div style={styles.panelTitle}>Execution Engine</div>

      <div style={statsGrid}>
        <StatCard label="Phase" value={phaseLabel} />
        <StatCard label="Plan Steps" value={planStepCount} />
        <StatCard label="Diffs" value={diffCount} />
        <StatCard label="Snapshot Files" value={snapshotFileCount} />
      </div>

      <div style={approvalActionsWrap}>
        <ActionButton
          visible={canApprovePlan}
          onClick={onApprovePlan}
          disabled={isExecuting}
          style={styles.pillGhostButton}
        >
          Approve plan
        </ActionButton>

        <ActionButton
          visible={canRejectPlan}
          onClick={onRejectPlan}
          disabled={isExecuting}
          style={styles.tinyGhostButton}
        >
          Reject plan
        </ActionButton>

        <ActionButton
          visible={canApproveDiffs}
          onClick={onApproveDiffs}
          disabled={isExecuting}
          style={styles.pillGhostButton}
        >
          Approve diffs
        </ActionButton>

        <ActionButton
          visible={canRejectDiffs}
          onClick={onRejectDiffs}
          disabled={isExecuting}
          style={styles.tinyGhostButton}
        >
          Reject diffs
        </ActionButton>

        <ActionButton
          visible={canResetEngine}
          onClick={onResetEngine}
          disabled={isExecuting}
          style={styles.pillDanger}
        >
          Reset engine
        </ActionButton>
      </div>

      {testOutput ? (
        <div style={engineInfoCard}>
          <div style={engineInfoLabel}>Result</div>
          <div style={styles.panelText}>{testOutput}</div>
        </div>
      ) : null}

      {error ? (
        <div style={engineErrorCard}>
          <div style={engineInfoLabel}>Engine error</div>
          <div style={styles.panelText}>{error}</div>
        </div>
      ) : null}

      <div style={engineSection}>
        <div style={engineInfoLabel}>Recent logs</div>
        {logs.length > 0 ? (
          <div style={engineList}>
            {logs.map((entry, index) => (
              <div key={`${entry}-${index}`} style={engineLogItem}>
                {entry}
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.panelText}>No engine logs yet.</div>
        )}
      </div>

      <div style={engineSection}>
        <div style={engineInfoLabel}>Diff targets</div>
        {diffs.length > 0 ? (
          <div style={engineList}>
            {diffs.map((diff) => (
              <div key={diff.filePath} style={enginePathItem}>
                {diff.filePath}
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.panelText}>No diff previews available yet.</div>
        )}
      </div>

      <div style={engineSection}>
        <div style={engineInfoLabel}>Snapshot sample</div>
        {sampledPaths.length > 0 ? (
          <div style={engineList}>
            {sampledPaths.map((path) => (
              <div key={path} style={enginePathItem}>
                {path}
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.panelText}>No snapshot sample available yet.</div>
        )}
      </div>
    </section>
  );
}

/* ================= MAIN ================= */

export function WorkspaceSlider({
  open,
  onClose,
  lastAssistantTextLength = 0,
  sourceLabel = "—",
  structured = false,
  toolCount = 0,
  lastAssistantStructuredReply = null,
  activeTask,
  onNextStep,
  onPrevStep,
  onClearTask,
  memory = [],
  onPinMemory,
  onUnpinMemory,
  onDeleteMemory,
  onClearMemory,
  onRunCurrentStep,
  onRunStep,
  isExecuting = false,
  executionLabel = "",
  engineState = null,
  canApprovePlan = false,
  canRejectPlan = false,
  canApproveDiffs = false,
  canRejectDiffs = false,
  canResetEngine = false,
  onApprovePlan,
  onRejectPlan,
  onApproveDiffs,
  onRejectDiffs,
  onResetEngine,
}: WorkspaceSliderProps) {
  const safeMemory = Array.isArray(memory) ? memory : [];

  const topStats = useMemo(
    () => [
      { label: "Length", value: lastAssistantTextLength },
      { label: "Source", value: sourceLabel },
      { label: "Structured", value: structured ? "Yes" : "No" },
      { label: "Tools", value: toolCount },
    ],
    [lastAssistantTextLength, sourceLabel, structured, toolCount]
  );

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Close workspace panel overlay"
          onClick={onClose}
          style={overlay}
        />
      ) : null}

      <aside
        id="codexforge-workspace-slider"
        role="dialog"
        aria-modal="true"
        aria-label="Workspace panel"
        aria-hidden={!open}
        style={{
          ...panel,
          transform: open ? "translateX(0)" : "translateX(100%)",
          pointerEvents: open ? "auto" : "none",
          visibility: open ? "visible" : "hidden",
        }}
      >
        <div style={header}>
          <div style={headerTextWrap}>
            <div style={headerEyebrow}>CodexForge</div>
            <div style={headerTitle}>Workspace Panel</div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={styles.tinyGhostButton}
            aria-label="Close workspace panel"
          >
            Close
          </button>
        </div>

        <div style={body}>
          <section style={heroCard}>
            <div style={heroTitle}>Control surface</div>
            <div style={heroText}>
              This panel is the premium control surface for task state, memory,
              engine visibility, logs, snapshot awareness, approvals, and
              operator-style execution feedback.
            </div>
          </section>

          <section style={sectionCard}>
            <div style={styles.panelTitle}>Snapshot</div>
            <div style={statsGrid}>
              {topStats.map((stat) => (
                <StatCard
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                />
              ))}
            </div>
          </section>

          <ReplyPanel
            structuredReply={lastAssistantStructuredReply}
            sourceLabel={sourceLabel}
            textLength={lastAssistantTextLength}
            structured={structured}
            toolCount={toolCount}
          />

          <EnginePanel
            engineState={engineState}
            isExecuting={isExecuting}
            canApprovePlan={canApprovePlan}
            canRejectPlan={canRejectPlan}
            canApproveDiffs={canApproveDiffs}
            canRejectDiffs={canRejectDiffs}
            canResetEngine={canResetEngine}
            onApprovePlan={onApprovePlan}
            onRejectPlan={onRejectPlan}
            onApproveDiffs={onApproveDiffs}
            onRejectDiffs={onRejectDiffs}
            onResetEngine={onResetEngine}
          />

          <section style={sectionCard}>
            <div style={styles.panelTitle}>Workspace Memory</div>
            <MemoryPanel
              memory={safeMemory}
              onPinMemory={onPinMemory}
              onUnpinMemory={onUnpinMemory}
              onDeleteMemory={onDeleteMemory}
              onClearMemory={onClearMemory}
              title="Workspace Memory"
              maxRecentItems={8}
              compact
            />
          </section>

          {activeTask ? (
            <TaskPanel
              open={open}
              task={activeTask}
              onNextStep={onNextStep}
              onPrevStep={onPrevStep}
              onClearTask={onClearTask}
              onRunCurrentStep={onRunCurrentStep}
              onRunStep={onRunStep}
              isExecuting={isExecuting}
              executionLabel={executionLabel}
            />
          ) : (
            <EmptyTaskPanel />
          )}
        </div>
      </aside>
    </>
  );
}

/* ================= STYLES ================= */

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  border: "none",
  padding: 0,
  margin: 0,
  background: "rgba(0,0,0,0.35)",
  zIndex: 40,
  cursor: "pointer",
};

const panel: React.CSSProperties = {
  position: "fixed",
  top: 0,
  right: 0,
  height: "100%",
  width: 440,
  maxWidth: "94vw",
  background:
    "linear-gradient(180deg, rgba(17,24,39,0.98) 0%, rgba(10,15,28,0.98) 100%)",
  borderLeft: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)",
  transition: "transform 0.25s ease, visibility 0.25s ease",
  zIndex: 50,
  display: "flex",
  flexDirection: "column",
  boxShadow: "-18px 0 40px rgba(0,0,0,0.35)",
};

const header: React.CSSProperties = {
  padding: 16,
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
};

const headerTextWrap: React.CSSProperties = {
  display: "grid",
  gap: 4,
};

const headerEyebrow: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: 1,
  opacity: 0.68,
  fontWeight: 900,
  color: "white",
};

const headerTitle: React.CSSProperties = {
  fontWeight: 900,
  letterSpacing: 0.2,
  color: "white",
};

const body: React.CSSProperties = {
  padding: 16,
  display: "grid",
  gap: 14,
  overflowY: "auto",
};

const heroCard: React.CSSProperties = {
  display: "grid",
  gap: 8,
  padding: 14,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.08)",
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
};

const heroTitle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 900,
  color: "white",
};

const heroText: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.6,
  opacity: 0.84,
  color: "white",
};

const sectionCard: React.CSSProperties = {
  display: "grid",
  gap: 10,
  padding: 14,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.03)",
};

const statsGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 10,
};

const statCard: React.CSSProperties = {
  display: "grid",
  gap: 4,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(0,0,0,0.18)",
};

const statLabel: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: 0.8,
  opacity: 0.7,
  fontWeight: 800,
  color: "white",
};

const statValue: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
  color: "white",
};

const approvalActionsWrap: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const engineSection: React.CSSProperties = {
  display: "grid",
  gap: 8,
};

const engineInfoCard: React.CSSProperties = {
  display: "grid",
  gap: 6,
  padding: 12,
  borderRadius: 12,
  border: "1px solid rgba(59,130,246,0.2)",
  background: "rgba(59,130,246,0.08)",
};

const engineErrorCard: React.CSSProperties = {
  display: "grid",
  gap: 6,
  padding: 12,
  borderRadius: 12,
  border: "1px solid rgba(239,68,68,0.24)",
  background: "rgba(127,29,29,0.2)",
};

const engineInfoLabel: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: 0.8,
  opacity: 0.78,
  fontWeight: 800,
  color: "white",
};

const engineList: React.CSSProperties = {
  display: "grid",
  gap: 8,
};

const engineLogItem: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(0,0,0,0.18)",
  color: "white",
  fontSize: 12,
  lineHeight: 1.5,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
};

const enginePathItem: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(0,0,0,0.18)",
  color: "white",
  fontSize: 12,
  lineHeight: 1.4,
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  overflowX: "auto",
};

const taskHeader: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
  flexWrap: "wrap",
};

const taskProgressChip: React.CSSProperties = {
  padding: "4px 8px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.05)",
  fontSize: 11,
  fontWeight: 800,
  color: "white",
};

const taskGoal: React.CSSProperties = {
  fontWeight: 800,
  fontSize: 14,
  color: "white",
  lineHeight: 1.5,
};

const taskMetaGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 10,
};

const taskMetaCard: React.CSSProperties = {
  display: "grid",
  gap: 4,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(0,0,0,0.18)",
};

const taskMetaLabel: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: 0.8,
  opacity: 0.7,
  fontWeight: 800,
  color: "white",
};

const taskMetaValue: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
  color: "white",
};

const premiumProgressShell: React.CSSProperties = {
  padding: 6,
  borderRadius: 999,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.06)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.04), 0 6px 18px rgba(0,0,0,0.18)",
};

const progressTrack: React.CSSProperties = {
  width: "100%",
  height: 10,
  borderRadius: 999,
  background: "rgba(255,255,255,0.12)",
  overflow: "hidden",
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
};

const progressFill: React.CSSProperties = {
  height: "100%",
  borderRadius: 999,
  background:
    "linear-gradient(90deg, rgba(99,102,241,1), rgba(16,185,129,1))",
  boxShadow: "0 0 12px rgba(16,185,129,0.35)",
};

const taskCurrentStepCard: React.CSSProperties = {
  display: "grid",
  gap: 6,
  padding: 12,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(99,102,241,0.08)",
};

const taskCurrentStepLabel: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: 0.8,
  opacity: 0.72,
  fontWeight: 800,
  color: "white",
};

const taskStepsWrap: React.CSSProperties = {
  display: "grid",
  gap: 6,
};

const taskStep: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "24px minmax(0, 1fr)",
  gap: 8,
  padding: 8,
  borderRadius: 10,
  opacity: 0.82,
  border: "1px solid rgba(255,255,255,0.06)",
  background: "rgba(255,255,255,0.02)",
};

const taskStepActive: React.CSSProperties = {
  background: "rgba(16,185,129,0.15)",
  border: "1px solid rgba(16,185,129,0.22)",
  opacity: 1,
};

const taskStepDone: React.CSSProperties = {
  opacity: 0.5,
};

const taskStepRunning: React.CSSProperties = {
  background: "rgba(245,158,11,0.14)",
  border: "1px solid rgba(245,158,11,0.25)",
  opacity: 1,
};

const taskStepError: React.CSSProperties = {
  background: "rgba(239,68,68,0.14)",
  border: "1px solid rgba(239,68,68,0.25)",
  opacity: 1,
};

const taskStepIndex: React.CSSProperties = {
  fontWeight: 900,
  color: "white",
};

const taskStepContent: React.CSSProperties = {
  display: "grid",
  gap: 6,
  minWidth: 0,
};

const taskStepHeadRow: React.CSSProperties = {
  display: "flex",
  gap: 8,
  alignItems: "flex-start",
  justifyContent: "space-between",
};

const taskStepText: React.CSSProperties = {
  color: "white",
  lineHeight: 1.5,
  flex: 1,
};

const taskStepToneChip: React.CSSProperties = {
  padding: "3px 6px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.06)",
  fontSize: 10,
  fontWeight: 800,
  whiteSpace: "nowrap",
  color: "white",
};

const taskStepResult: React.CSSProperties = {
  fontSize: 11,
  lineHeight: 1.45,
  opacity: 0.72,
  color: "white",
};

const taskStepActions: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const taskControls: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const executionBanner: React.CSSProperties = {
  padding: 10,
  borderRadius: 10,
  border: "1px solid rgba(245,158,11,0.22)",
  background: "rgba(245,158,11,0.15)",
  color: "white",
  fontSize: 12,
  fontWeight: 700,
};

const tagRow: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const tagChip: React.CSSProperties = {
  padding: "4px 8px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.06)",
  fontSize: 11,
  fontWeight: 700,
  color: "white",
};