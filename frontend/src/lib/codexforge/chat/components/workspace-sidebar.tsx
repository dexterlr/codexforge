"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";
import { MemoryPanel } from "@/lib/codexforge/chat/components/memory-panel";
import { getDomainLabel } from "@/lib/codexforge/chat/client-renderers";
import type {
  CodexForgeActiveTask,
  CodexForgeMemoryItem,
} from "@/lib/codexforge/chat/use-codexforge-chat";

export type Suggestion = {
  id: string;
  label: string;
  prompt: string;
};

type WorkspaceSidebarProps = {
  busy: boolean;
  suggestions: Suggestion[];
  onSuggestionClick: (prompt: string) => void;
  activeTask: CodexForgeActiveTask | null;
  onNextStep: () => void;
  onPrevStep: () => void;
  onClearTask: () => void;
  memory?: CodexForgeMemoryItem[];
  onPinMemory?: (memoryId: string) => void;
  onUnpinMemory?: (memoryId: string) => void;
  onDeleteMemory?: (memoryId: string) => void;
  onClearMemory?: () => void;
};

type SidebarSection = {
  title: string;
  body?: string;
  bullets?: string[];
  defaultOpen?: boolean;
};

type DomainCard = {
  label: string;
  value: string;
};

const PRODUCT_SECTIONS: SidebarSection[] = [
  {
    title: "What this page should become",
    bullets: [
      "A real AI workspace for planning, execution, research, and repo operations.",
      "A domain-aware launcher for websites, servers, movie pipelines, Unreal, and ComfyUI workflows.",
      "A safe operator surface with checkpoints, approvals, logs, diffs, and reset paths.",
      "A persistent memory-and-task environment that survives backend failure.",
    ],
    defaultOpen: false,
  },
  {
    title: "Backend status",
    body: "The UI should prefer the real CodexForge backend contract, but remain fully useful through local-first structured fallback when routes are unavailable.",
    defaultOpen: false,
  },
  {
    title: "Near-term upgrades",
    bullets: [
      "Saved flows and reusable launch templates by domain.",
      "Inline execution controls per task step and richer approval checkpoints.",
      "More explicit tool availability, task domains, and product capability status.",
      "Stronger repo-aware execution with diff previews and apply safety.",
    ],
    defaultOpen: false,
  },
  {
    title: "Design rules",
    bullets: [
      "Prefer the smallest correct next step.",
      "Keep structured output first-class.",
      "Keep local-first behavior alive when backend services fail.",
      "Make the UI feel like a serious workspace, not generic chat.",
    ],
    defaultOpen: false,
  },
];

const DOMAIN_CARDS: DomainCard[] = [
  {
    label: "Web",
    value: "Sites, dashboards, routes, UI, APIs, and local-first app flows.",
  },
  {
    label: "Game Server",
    value: "Minecraft stacks, plugins, themed worlds, admin tooling, and rollout.",
  },
  {
    label: "Movie",
    value: "Script breakdown, storyboard, shot planning, asset and review loops.",
  },
  {
    label: "Video",
    value: "Prompt pipelines, sequence generation, voice, edit, and export.",
  },
  {
    label: "ComfyUI",
    value: "Reusable graph workflows, model management, asset tracking, and runs.",
  },
  {
    label: "Unreal",
    value: "Project structure, gameplay, cinematics, packaging, and execution flow.",
  },
];

const topStatusWrap: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const topStatusChip: React.CSSProperties = {
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  fontSize: 11,
  fontWeight: 800,
  opacity: 0.92,
};

const collapsibleHeaderButton: React.CSSProperties = {
  all: "unset",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  cursor: "pointer",
  width: "100%",
};

const collapsedMark: React.CSSProperties = {
  opacity: 0.6,
  fontWeight: 900,
};

const disabledSuggestionButtonStyle: React.CSSProperties = {
  opacity: 0.6,
  cursor: "not-allowed",
};

const taskShell: React.CSSProperties = {
  display: "grid",
  gap: 12,
};

const taskGoal: React.CSSProperties = {
  fontWeight: 900,
  fontSize: 14,
  lineHeight: 1.45,
};

const taskMetaRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
};

const taskMetaChip: React.CSSProperties = {
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  fontSize: 11,
  fontWeight: 800,
  opacity: 0.9,
};

const tagWrap: React.CSSProperties = {
  display: "flex",
  gap: 6,
  flexWrap: "wrap",
};

const tagChip: React.CSSProperties = {
  padding: "4px 8px",
  borderRadius: 999,
  border: "1px solid rgba(99,102,241,0.22)",
  background: "rgba(99,102,241,0.12)",
  fontSize: 11,
  fontWeight: 700,
};

const progressWrap: React.CSSProperties = {
  height: 8,
  background: "rgba(255,255,255,0.08)",
  borderRadius: 999,
  overflow: "hidden",
};

const progressBarBase: React.CSSProperties = {
  height: "100%",
  background:
    "linear-gradient(90deg, rgba(16,185,129,0.95), rgba(59,130,246,0.95))",
  borderRadius: 999,
};

const currentStepCard: React.CSSProperties = {
  padding: 12,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.03)",
  display: "grid",
  gap: 6,
};

const currentStepLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: 0.3,
  textTransform: "uppercase",
  opacity: 0.65,
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
  opacity: 0.84,
  border: "1px solid rgba(255,255,255,0.06)",
  background: "rgba(255,255,255,0.02)",
  alignItems: "start",
};

const taskStepActive: React.CSSProperties = {
  background: "rgba(16,185,129,0.15)",
  border: "1px solid rgba(16,185,129,0.22)",
  opacity: 1,
};

const taskStepDone: React.CSSProperties = {
  opacity: 0.55,
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
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 20,
  height: 20,
  borderRadius: 999,
  background: "rgba(255,255,255,0.08)",
  fontSize: 11,
};

const taskStepBody: React.CSSProperties = {
  display: "grid",
  gap: 4,
};

const taskStepHeader: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  flexWrap: "wrap",
};

const taskStepText: React.CSSProperties = {
  lineHeight: 1.45,
  flex: 1,
  minWidth: 0,
};

const stepStatusChipBase: React.CSSProperties = {
  padding: "3px 6px",
  borderRadius: 999,
  fontSize: 10,
  fontWeight: 800,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.05)",
  whiteSpace: "nowrap",
};

const taskStepResult: React.CSSProperties = {
  fontSize: 11,
  opacity: 0.72,
  lineHeight: 1.5,
};

const taskControls: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const quickGrid: React.CSSProperties = {
  display: "grid",
  gap: 10,
};

const domainGrid: React.CSSProperties = {
  display: "grid",
  gap: 8,
};

const domainCardStyle: React.CSSProperties = {
  borderRadius: 12,
  padding: 12,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.03)",
  display: "grid",
  gap: 4,
};

const domainLabelStyle: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: 0.08,
  opacity: 0.72,
  fontWeight: 900,
};

const domainValueStyle: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.45,
};

const brainPanelWrap: React.CSSProperties = {
  display: "grid",
  gap: 12,
};

const brainButtonRow: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const brainLinkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 40,
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(99,102,241,0.28)",
  background: "rgba(99,102,241,0.14)",
  color: "inherit",
  fontSize: 13,
  fontWeight: 800,
  textDecoration: "none",
};

const brainSecondaryLinkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 40,
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  color: "inherit",
  fontSize: 13,
  fontWeight: 700,
  textDecoration: "none",
};

function getStepBadge(status: "pending" | "running" | "done" | "error") {
  if (status === "done") return "✓";
  if (status === "running") return "…";
  if (status === "error") return "!";
  return "•";
}

function getStepStatusLabel(status: "pending" | "running" | "done" | "error") {
  if (status === "done") return "Done";
  if (status === "running") return "Running";
  if (status === "error") return "Error";
  return "Pending";
}

function getStepStatusStyle(
  status: "pending" | "running" | "done" | "error"
): React.CSSProperties {
  if (status === "done") {
    return {
      border: "1px solid rgba(16,185,129,0.24)",
      background: "rgba(16,185,129,0.12)",
    };
  }

  if (status === "running") {
    return {
      border: "1px solid rgba(245,158,11,0.24)",
      background: "rgba(245,158,11,0.12)",
    };
  }

  if (status === "error") {
    return {
      border: "1px solid rgba(239,68,68,0.24)",
      background: "rgba(239,68,68,0.12)",
    };
  }

  return {
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.05)",
  };
}

function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section style={styles.panelBlock}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        style={collapsibleHeaderButton}
        aria-expanded={open}
      >
        <span style={styles.panelTitle}>{title}</span>
        <span style={collapsedMark}>{open ? "−" : "+"}</span>
      </button>

      {open ? children : null}
    </section>
  );
}

function SidebarInfoSection({ section }: { section: SidebarSection }) {
  return (
    <CollapsibleSection
      title={section.title}
      defaultOpen={section.defaultOpen}
    >
      {section.body ? <div style={styles.panelText}>{section.body}</div> : null}

      {section.bullets?.length ? (
        <ul style={styles.bulletList}>
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </CollapsibleSection>
  );
}

function TaskPanel({
  task,
  onNextStep,
  onPrevStep,
  onClearTask,
  busy,
}: {
  task: CodexForgeActiveTask;
  onNextStep: () => void;
  onPrevStep: () => void;
  onClearTask: () => void;
  busy: boolean;
}) {
  const totalSteps = task.steps.length;
  const currentStepNumber = Math.min(
    task.currentStep + 1,
    Math.max(totalSteps, 1)
  );
  const completedSteps = task.steps.filter((step) => step.status === "done").length;
  const runningSteps = task.steps.filter((step) => step.status === "running").length;
  const errorSteps = task.steps.filter((step) => step.status === "error").length;
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
  const currentStepText =
    task.steps[task.currentStep]?.text ??
    task.steps.find((step) => step.status !== "done")?.text ??
    "No current step.";

  const progressLabel = useMemo(
    () => `${completedSteps}/${totalSteps} complete`,
    [completedSteps, totalSteps]
  );

  const domainLabel = getDomainLabel(task.domain) ?? "General";

  return (
    <div style={taskShell}>
      <div style={taskGoal}>{task.goal}</div>

      <div style={taskMetaRow}>
        <div style={taskMetaChip}>{domainLabel}</div>
        <div style={taskMetaChip}>Step {currentStepNumber}</div>
        <div style={taskMetaChip}>{progressLabel}</div>
        {runningSteps > 0 ? <div style={taskMetaChip}>Running</div> : null}
        {errorSteps > 0 ? <div style={taskMetaChip}>Errors: {errorSteps}</div> : null}
      </div>

      {task.tags.length > 0 ? (
        <div style={tagWrap}>
          {task.tags.map((tag) => (
            <span key={tag} style={tagChip}>
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <div style={progressWrap} aria-hidden="true">
        <div
          style={{
            ...progressBarBase,
            width: `${progress}%`,
          }}
        />
      </div>

      <div style={currentStepCard}>
        <div style={currentStepLabel}>Current step</div>
        <div style={styles.panelText}>{currentStepText}</div>
      </div>

      <div style={taskStepsWrap}>
        {task.steps.map((step, index) => {
          const isActive = index === task.currentStep;
          const isDone = step.status === "done";
          const isRunning = step.status === "running";
          const isError = step.status === "error";

          return (
            <div
              key={step.id}
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

              <div style={taskStepBody}>
                <div style={taskStepHeader}>
                  <span style={taskStepText}>{step.text}</span>
                  <span
                    style={{
                      ...stepStatusChipBase,
                      ...getStepStatusStyle(step.status),
                    }}
                  >
                    {getStepStatusLabel(step.status)}
                  </span>
                </div>

                {step.result ? (
                  <span style={taskStepResult}>{step.result}</span>
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
          style={styles.tinyGhostButton}
          disabled={busy || task.currentStep === 0}
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={onNextStep}
          style={styles.tinyGhostButton}
          disabled={busy || task.currentStep >= task.steps.length - 1}
        >
          Next →
        </button>

        <button
          type="button"
          onClick={onClearTask}
          style={styles.pillDanger}
          disabled={busy}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

function SuggestionsPanel({
  suggestions,
  busy,
  onSuggestionClick,
}: {
  suggestions: Suggestion[];
  busy: boolean;
  onSuggestionClick: (prompt: string) => void;
}) {
  return (
    <div style={quickGrid}>
      <div style={styles.panelText}>
        These prompts should push CodexForge toward real product behavior, not
        generic assistant behavior.
      </div>

      <div style={topStatusWrap}>
        <div style={topStatusChip}>Structured-first</div>
        <div style={topStatusChip}>Local-first</div>
        <div style={topStatusChip}>Backend-optional</div>
        <div style={topStatusChip}>Operator-ready</div>
      </div>

      <div style={styles.suggestionGrid}>
        {suggestions.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSuggestionClick(item.prompt)}
            disabled={busy}
            style={{
              ...styles.suggestionButton,
              ...(busy ? disabledSuggestionButtonStyle : null),
            }}
            title={item.prompt}
            aria-label={item.label}
          >
            <div style={styles.suggestionLabel}>{item.label}</div>
            <div style={styles.suggestionText}>{item.prompt}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function CapabilityPanel() {
  return (
    <div style={domainGrid}>
      {DOMAIN_CARDS.map((card) => (
        <div key={card.label} style={domainCardStyle}>
          <div style={domainLabelStyle}>{card.label}</div>
          <div style={domainValueStyle}>{card.value}</div>
        </div>
      ))}
    </div>
  );
}

function BrainPanel() {
  return (
    <div style={brainPanelWrap}>
      <div style={styles.panelText}>
        Open the local brain inspector to review graph memory, connected nodes,
        edges, and saved workspace context.
      </div>

      <div style={topStatusWrap}>
        <div style={topStatusChip}>Graph memory</div>
        <div style={topStatusChip}>Inspector</div>
        <div style={topStatusChip}>Local storage</div>
      </div>

      <div style={brainButtonRow}>
        <Link href="/brain" style={brainLinkStyle}>
          Open Brain Inspector
        </Link>

        <Link href="/ai" style={brainSecondaryLinkStyle}>
          Open AI Workspace
        </Link>
      </div>
    </div>
  );
}

export default function WorkspaceSidebar({
  busy,
  suggestions,
  onSuggestionClick,
  activeTask,
  onNextStep,
  onPrevStep,
  onClearTask,
  memory = [],
  onPinMemory,
  onUnpinMemory,
  onDeleteMemory,
  onClearMemory,
}: WorkspaceSidebarProps) {
  const safeMemory = Array.isArray(memory) ? memory : [];

  return (
    <aside style={styles.leftPanel}>
      <CollapsibleSection title="Active Task" defaultOpen>
        {activeTask ? (
          <TaskPanel
            task={activeTask}
            onNextStep={onNextStep}
            onPrevStep={onPrevStep}
            onClearTask={onClearTask}
            busy={busy}
          />
        ) : (
          <div style={styles.panelText}>
            No active task yet. Ask CodexForge to plan something and it will
            appear here.
          </div>
        )}
      </CollapsibleSection>

      <CollapsibleSection title="Brain" defaultOpen>
        <BrainPanel />
      </CollapsibleSection>

      <CollapsibleSection title="Workspace Memory" defaultOpen>
        <MemoryPanel
          memory={safeMemory}
          onPinMemory={onPinMemory}
          onUnpinMemory={onUnpinMemory}
          onDeleteMemory={onDeleteMemory}
          onClearMemory={onClearMemory}
          title="Workspace Memory"
        />
      </CollapsibleSection>

      <CollapsibleSection title="Quick Starts" defaultOpen>
        <SuggestionsPanel
          suggestions={suggestions}
          busy={busy}
          onSuggestionClick={onSuggestionClick}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Capability Map" defaultOpen={false}>
        <CapabilityPanel />
      </CollapsibleSection>

      {PRODUCT_SECTIONS.map((section) => (
        <SidebarInfoSection key={section.title} section={section} />
      ))}
    </aside>
  );
}