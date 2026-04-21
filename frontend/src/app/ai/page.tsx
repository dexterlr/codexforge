"use client";

import Link from "next/link";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import {
  WorkspaceHero,
  type WorkspaceCard,
} from "@/lib/codexforge/chat/components/workspace-hero";
import WorkspaceSidebar from "@/lib/codexforge/chat/components/workspace-sidebar";
import { WorkspaceSlider } from "@/lib/codexforge/chat/components/workspace-slider";
import * as styles from "@/lib/codexforge/chat/client-styles";
import { useCodexForgeChat } from "@/lib/codexforge/chat/use-codexforge-chat";
import type { CodexForgeExecutionPhase } from "@/lib/codexforge/types";

/* ---------------- TYPES ---------------- */

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

type StatusBarProps = {
  busy: boolean;
  statusText: string;
  conversationState: string;
  isExecuting: boolean;
  executionLabel: string;
  enginePhase: CodexForgeExecutionPhase;
  enginePhaseLabel: string;
  diffCount: number;
  snapshotFileCount: number;
  activeTaskDomain?: string;
  repoLabel: string;
};

type LatestReplyCardProps = {
  snapshot: LatestReplySnapshot;
};

type TopBarProps = {
  sliderOpen: boolean;
  onOpenSlider: () => void;
  onAddSystemMessage: () => void;
  onClearChat: () => void;
};

type EngineStateCardProps = {
  enginePhase: CodexForgeExecutionPhase;
  enginePhaseLabel: string;
  diffCount: number;
  snapshotFileCount: number;
  recentLogs: string[];
  sampledPaths: string[];
  diffPaths: string[];
  testOutput?: string;
  engineError?: string;
  canApprovePlan: boolean;
  canRejectPlan: boolean;
  canApproveDiffs: boolean;
  canRejectDiffs: boolean;
  canResetEngine: boolean;
  isExecuting: boolean;
  onApprovePlan: () => void;
  onRejectPlan: () => void;
  onApproveDiffs: () => void;
  onRejectDiffs: () => void;
  onResetEngine: () => void;
};

type ExecutionPanelProps = {
  activeTaskDomainLabel: string;
  completedSteps: number;
  totalSteps: number;
  enginePhaseLabel: string;
  snapshotFileCount: number;
  diffCount: number;
  tagCount: number;
  tags: string[];
  lastRunLabel: string;
  busy: boolean;
  isExecuting: boolean;
  canApprovePlan: boolean;
  canRejectPlan: boolean;
  canApproveDiffs: boolean;
  canRejectDiffs: boolean;
  canResetEngine: boolean;
  onRunCurrentTaskStep: () => void;
  onApprovePlan: () => void;
  onRejectPlan: () => void;
  onApproveDiffs: () => void;
  onRejectDiffs: () => void;
  onResetEngine: () => void;
};

type WorkspaceStateCardProps = {
  repoLabel: string;
  backendLabel: string;
  conversationState: string;
  activeTaskLabel: string;
  memoryCount: number;
  pinnedMemoryCount: number;
  diffCount: number;
  snapshotFileCount: number;
  enginePhaseLabel: string;
  isExecuting: boolean;
};

type DirectionCardProps = {
  title: string;
  text: string;
};

/* ---------------- DATA ---------------- */

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

/* ---------------- STYLES ---------------- */

const statusRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  flexWrap: "wrap",
};

const brandTextWrapStyle: React.CSSProperties = {
  display: "grid",
  gap: 2,
};

const executionChipStyle: React.CSSProperties = {
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(99,102,241,0.22)",
  background: "rgba(99,102,241,0.12)",
  fontSize: 11,
  fontWeight: 800,
};

const executionActionsStyle: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  marginTop: 8,
};

const engineGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 10,
  marginTop: 12,
};

const engineStatCardStyle: React.CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(15,23,42,0.24)",
  borderRadius: 16,
  padding: 12,
  display: "grid",
  gap: 4,
};

const engineStatLabelStyle: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  opacity: 0.7,
};

const engineStatValueStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 800,
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

const logListStyle: React.CSSProperties = {
  marginTop: 10,
  display: "grid",
  gap: 8,
};

const logItemStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(148,163,184,0.14)",
  background: "rgba(15,23,42,0.2)",
  fontSize: 12,
  lineHeight: 1.5,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
};

const sampledPathsListStyle: React.CSSProperties = {
  marginTop: 10,
  display: "grid",
  gap: 6,
};

const sampledPathStyle: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid rgba(148,163,184,0.12)",
  background: "rgba(15,23,42,0.16)",
  fontSize: 12,
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  overflowX: "auto",
};

const diffListStyle: React.CSSProperties = {
  marginTop: 10,
  display: "grid",
  gap: 6,
};

const diffPathStyle: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid rgba(148,163,184,0.12)",
  background: "rgba(15,23,42,0.16)",
  fontSize: 12,
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  overflowX: "auto",
};

const alertCardStyle: React.CSSProperties = {
  marginTop: 12,
  padding: "12px 14px",
  borderRadius: 14,
  border: "1px solid rgba(239,68,68,0.24)",
  background: "rgba(127,29,29,0.18)",
  color: "rgba(254,226,226,0.96)",
  display: "grid",
  gap: 6,
};

const approvalBarStyle: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  marginTop: 12,
};

const compactMetaGridStyle: React.CSSProperties = {
  marginTop: 10,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: 10,
};

const compactMetaCardStyle: React.CSSProperties = {
  border: "1px solid rgba(148,163,184,0.14)",
  background: "rgba(15,23,42,0.18)",
  borderRadius: 12,
  padding: 10,
  display: "grid",
  gap: 4,
};

const compactMetaLabelStyle: React.CSSProperties = {
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  opacity: 0.7,
};

const compactMetaValueStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 800,
};

const workspaceStateGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: 10,
  marginTop: 12,
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

/* ---------------- HELPERS ---------------- */

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

function getCapabilityCards() {
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

function getDirectionCards(): DirectionCardProps[] {
  return [
    {
      title: "Workspace shell",
      text: "This surface should become the operational shell for planning, chat, repo-aware execution, and memory-driven work context.",
    },
    {
      title: "Brain and memory",
      text: "CodexForge should accumulate useful project state over time, not just answer one prompt at a time.",
    },
    {
      title: "Execution control",
      text: "Plans, diffs, approvals, snapshots, and rollback points should remain visible and understandable at all times.",
    },
    {
      title: "Local-first runtime",
      text: "The workspace should remain useful even when a backend model is unavailable, with safe degraded behavior.",
    },
  ];
}

function getRepoLabel(repoPath: string | undefined) {
  if (!repoPath) return "No repo path";
  return repoPath.split("\\").filter(Boolean).slice(-2).join("\\");
}

function ActionButton({
  visible,
  onClick,
  disabled,
  children,
  style,
}: {
  visible: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  style: React.CSSProperties;
}) {
  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function MetaCard({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div style={compactMetaCardStyle}>
      <div style={compactMetaLabelStyle}>{label}</div>
      <div style={compactMetaValueStyle}>{value}</div>
    </div>
  );
}

/* ---------------- UI ---------------- */

function TopBar({
  sliderOpen,
  onOpenSlider,
  onAddSystemMessage,
  onClearChat,
}: TopBarProps) {
  return (
    <div style={styles.topBar}>
      <div style={styles.brandWrap}>
        <div style={styles.brandOrb} />
        <div style={brandTextWrapStyle}>
          <div style={styles.brandTitle}>CodexForge</div>
          <div style={styles.brandSubtitle}>AI Workspace</div>
        </div>
      </div>

      <div style={styles.navRow}>
        <Link href="/" style={styles.pillGhost}>
          Home
        </Link>

        <Link href="/entry" style={styles.pillGhost}>
          Entry
        </Link>

        <Link href="/history" style={styles.pillGhost}>
          History
        </Link>

        <Link href="/brain" style={styles.pillGhost}>
          Brain
        </Link>

        <button
          type="button"
          onClick={onOpenSlider}
          style={styles.pillGhostButton}
          aria-label="Open workspace panel"
          aria-expanded={sliderOpen}
          aria-controls="codexforge-workspace-slider"
        >
          Workspace
        </button>

        <button
          type="button"
          onClick={onAddSystemMessage}
          style={styles.pillGhostButton}
        >
          Add note
        </button>

        <button
          type="button"
          onClick={onClearChat}
          style={styles.pillDanger}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

function StatusBar({
  busy,
  statusText,
  conversationState,
  isExecuting,
  executionLabel,
  enginePhase,
  enginePhaseLabel,
  diffCount,
  snapshotFileCount,
  activeTaskDomain,
  repoLabel,
}: StatusBarProps) {
  return (
    <div style={styles.toolbar}>
      <div style={statusRowStyle}>
        <span style={styles.badge}>
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: 999,
              marginRight: 8,
              background:
                busy || isExecuting
                  ? "rgba(245,158,11,0.95)"
                  : "rgba(16,185,129,0.95)",
              boxShadow:
                busy || isExecuting
                  ? "0 0 0 4px rgba(245,158,11,0.15)"
                  : "0 0 0 4px rgba(16,185,129,0.15)",
            }}
          />
          {statusText}
        </span>

        <span style={styles.subtleText}>{conversationState}</span>

        {isExecuting ? (
          <span style={executionChipStyle}>
            Running: {executionLabel || "task step"}
          </span>
        ) : null}

        <span style={styles.subtleText}>
          Engine: {enginePhaseLabel || enginePhase}
        </span>
        <span style={styles.subtleText}>Diffs: {diffCount}</span>
        <span style={styles.subtleText}>
          Snapshot files: {snapshotFileCount}
        </span>
        <span style={styles.subtleText}>Repo: {repoLabel}</span>

        {activeTaskDomain ? (
          <span style={styles.subtleText}>Task domain: {activeTaskDomain}</span>
        ) : null}
      </div>

      <div style={styles.subtleText}>
        Local-first workspace tuned for CodexForge product work.
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div style={styles.emptyState}>
      <div style={styles.emptyTitle}>Start your workspace</div>

      <div style={styles.emptyText}>
        Ask CodexForge to plan, debug, research, or build something real.
      </div>

      <div style={styles.emptyExamples}>
        {EMPTY_EXAMPLES.map((example) => (
          <div key={example} style={styles.exampleChip}>
            “{example}”
          </div>
        ))}
      </div>
    </div>
  );
}

function LatestReplyCard({ snapshot }: LatestReplyCardProps) {
  return (
    <div style={styles.statusCard}>
      <div style={styles.panelTitle}>Latest assistant reply</div>

      <div style={compactMetaGridStyle}>
        <MetaCard label="Length" value={snapshot.textLength} />
        <MetaCard label="Source" value={snapshot.sourceLabel} />
        <MetaCard
          label="Structured"
          value={snapshot.structured ? "On" : "Text only"}
        />
        <MetaCard label="Tools" value={snapshot.toolCount} />
        <MetaCard label="Domain" value={snapshot.domainLabel} />
        <MetaCard label="Tags" value={snapshot.tagCount} />
        <MetaCard label="Mode" value={snapshot.modeLabel} />
        <MetaCard label="Steps" value={snapshot.stepCount} />
        <MetaCard label="Diffs" value={snapshot.diffCount} />
        <MetaCard label="Snapshot" value={snapshot.snapshotFileCount ?? "—"} />
        <MetaCard
          label="Execution phase"
          value={snapshot.executionPhaseLabel}
        />
        <MetaCard label="Logs" value={snapshot.logCount} />
      </div>
    </div>
  );
}

function WorkspaceStateCard({
  repoLabel,
  backendLabel,
  conversationState,
  activeTaskLabel,
  memoryCount,
  pinnedMemoryCount,
  diffCount,
  snapshotFileCount,
  enginePhaseLabel,
  isExecuting,
}: WorkspaceStateCardProps) {
  return (
    <div style={styles.statusCard}>
      <div style={styles.panelTitle}>Current workspace</div>

      <div style={workspaceStateGridStyle}>
        <MetaCard label="Repo" value={repoLabel} />
        <MetaCard label="Backend" value={backendLabel} />
        <MetaCard label="Conversation" value={conversationState} />
        <MetaCard label="Task" value={activeTaskLabel} />
        <MetaCard label="Memory" value={memoryCount} />
        <MetaCard label="Pinned" value={pinnedMemoryCount} />
        <MetaCard label="Engine" value={enginePhaseLabel} />
        <MetaCard label="Executing" value={isExecuting ? "Yes" : "No"} />
        <MetaCard label="Diffs" value={diffCount} />
        <MetaCard label="Snapshot files" value={snapshotFileCount} />
      </div>
    </div>
  );
}

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
          This surface is now treated as the real CodexForge frontend. It should
          grow beyond chat into a serious local-first developer workspace with
          planning, memory, execution, repo operations, offline model routing,
          and approval-based change control.
        </div>
      </div>
    </div>
  );
}

function DirectionCard({ title, text }: DirectionCardProps) {
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

function EngineStateCard({
  enginePhase,
  enginePhaseLabel,
  diffCount,
  snapshotFileCount,
  recentLogs,
  sampledPaths,
  diffPaths,
  testOutput,
  engineError,
  canApprovePlan,
  canRejectPlan,
  canApproveDiffs,
  canRejectDiffs,
  canResetEngine,
  isExecuting,
  onApprovePlan,
  onRejectPlan,
  onApproveDiffs,
  onRejectDiffs,
  onResetEngine,
}: EngineStateCardProps) {
  return (
    <div style={styles.statusCard}>
      <div style={styles.panelTitle}>Execution engine</div>

      <div style={engineGridStyle}>
        <div style={engineStatCardStyle}>
          <div style={engineStatLabelStyle}>Phase</div>
          <div style={engineStatValueStyle}>
            {enginePhaseLabel || enginePhase}
          </div>
        </div>

        <div style={engineStatCardStyle}>
          <div style={engineStatLabelStyle}>Diff count</div>
          <div style={engineStatValueStyle}>{diffCount}</div>
        </div>

        <div style={engineStatCardStyle}>
          <div style={engineStatLabelStyle}>Snapshot files</div>
          <div style={engineStatValueStyle}>{snapshotFileCount}</div>
        </div>

        <div style={engineStatCardStyle}>
          <div style={engineStatLabelStyle}>Recent logs</div>
          <div style={engineStatValueStyle}>{recentLogs.length}</div>
        </div>
      </div>

      <div style={approvalBarStyle}>
        <ActionButton
          visible={canApprovePlan}
          onClick={onApprovePlan}
          style={styles.pillGhostButton}
          disabled={isExecuting}
        >
          Approve plan
        </ActionButton>

        <ActionButton
          visible={canRejectPlan}
          onClick={onRejectPlan}
          style={styles.tinyGhostButton}
          disabled={isExecuting}
        >
          Reject plan
        </ActionButton>

        <ActionButton
          visible={canApproveDiffs}
          onClick={onApproveDiffs}
          style={styles.pillGhostButton}
          disabled={isExecuting}
        >
          Approve diffs
        </ActionButton>

        <ActionButton
          visible={canRejectDiffs}
          onClick={onRejectDiffs}
          style={styles.tinyGhostButton}
          disabled={isExecuting}
        >
          Reject diffs
        </ActionButton>

        <ActionButton
          visible={canResetEngine}
          onClick={onResetEngine}
          style={styles.pillDanger}
          disabled={isExecuting}
        >
          Reset engine
        </ActionButton>
      </div>

      {testOutput ? (
        <div style={{ marginTop: 12 }}>
          <div style={styles.panelText}>
            Result: <b>{testOutput}</b>
          </div>
        </div>
      ) : null}

      {engineError ? (
        <div style={alertCardStyle}>
          <div style={styles.panelTitle}>Engine error</div>
          <div style={styles.panelText}>{engineError}</div>
        </div>
      ) : null}

      {recentLogs.length > 0 ? (
        <div style={logListStyle}>
          {recentLogs.map((entry, index) => (
            <div key={`${entry}-${index}`} style={logItemStyle}>
              {entry}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ marginTop: 12 }}>
          <div style={styles.panelText}>No engine logs yet.</div>
        </div>
      )}

      {diffPaths.length > 0 ? (
        <div style={{ marginTop: 14 }}>
          <div style={styles.panelTitle}>Diff targets</div>

          <div style={diffListStyle}>
            {diffPaths.map((path) => (
              <div key={path} style={diffPathStyle}>
                {path}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {sampledPaths.length > 0 ? (
        <div style={{ marginTop: 14 }}>
          <div style={styles.panelTitle}>Snapshot sample</div>

          <div style={sampledPathsListStyle}>
            {sampledPaths.map((path) => (
              <div key={path} style={sampledPathStyle}>
                {path}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ExecutionPanel({
  activeTaskDomainLabel,
  completedSteps,
  totalSteps,
  enginePhaseLabel,
  snapshotFileCount,
  diffCount,
  tagCount,
  tags,
  lastRunLabel,
  busy,
  isExecuting,
  canApprovePlan,
  canRejectPlan,
  canApproveDiffs,
  canRejectDiffs,
  canResetEngine,
  onRunCurrentTaskStep,
  onApprovePlan,
  onRejectPlan,
  onApproveDiffs,
  onRejectDiffs,
  onResetEngine,
}: ExecutionPanelProps) {
  return (
    <div style={styles.statusCard}>
      <div style={styles.panelTitle}>Execution</div>

      <div style={compactMetaGridStyle}>
        <MetaCard label="Domain" value={activeTaskDomainLabel} />
        <MetaCard label="Completed" value={`${completedSteps}/${totalSteps}`} />
        <MetaCard label="Engine phase" value={enginePhaseLabel} />
        <MetaCard label="Snapshot" value={snapshotFileCount} />
        <MetaCard label="Diff previews" value={diffCount} />
        <MetaCard label="Tags" value={tagCount} />
      </div>

      <div style={styles.panelText}>
        Last run: <b>{lastRunLabel || "Nothing run yet"}</b>
      </div>

      {tags.length > 0 ? (
        <div style={styles.panelText}>
          Tags: <b>{tags.join(", ")}</b>
        </div>
      ) : null}

      <div style={executionActionsStyle}>
        <button
          type="button"
          onClick={onRunCurrentTaskStep}
          style={styles.pillGhostButton}
          disabled={busy || isExecuting || totalSteps === 0}
        >
          {isExecuting ? "Running…" : "Run current step"}
        </button>

        <ActionButton
          visible={canApprovePlan}
          onClick={onApprovePlan}
          style={styles.pillGhostButton}
          disabled={busy || isExecuting}
        >
          Approve plan
        </ActionButton>

        <ActionButton
          visible={canRejectPlan}
          onClick={onRejectPlan}
          style={styles.tinyGhostButton}
          disabled={busy || isExecuting}
        >
          Reject plan
        </ActionButton>

        <ActionButton
          visible={canApproveDiffs}
          onClick={onApproveDiffs}
          style={styles.pillGhostButton}
          disabled={busy || isExecuting}
        >
          Approve diffs
        </ActionButton>

        <ActionButton
          visible={canRejectDiffs}
          onClick={onRejectDiffs}
          style={styles.tinyGhostButton}
          disabled={busy || isExecuting}
        >
          Reject diffs
        </ActionButton>

        <ActionButton
          visible={canResetEngine}
          onClick={onResetEngine}
          style={styles.pillDanger}
          disabled={busy || isExecuting}
        >
          Reset engine
        </ActionButton>
      </div>
    </div>
  );
}

/* ---------------- MAIN ---------------- */

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

  const safeMemory = Array.isArray(memory) ? memory : [];
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
      busy,
      isExecuting,
      backendMode,
      safeMemory.length,
      activeTask,
      completedSteps,
      executionState.lastCompletedAt,
      enginePhaseLabel,
      diffCount,
    ]
  );

  const lastReplySnapshot = useMemo<LatestReplySnapshot>(() => {
    const structured = lastAssistant?.structured ?? null;
    const summaryMeta = getStructuredSummaryMeta(structured);
    const executionMeta = getExecutionMeta(structured);

    return {
      textLength: lastAssistant?.text.length ?? 0,
      sourceLabel: lastAssistant ? getSourceLabel(lastAssistant) : "—",
      structured: !!lastAssistant?.structured,
      toolCount: summaryMeta.toolCount,
      domainLabel: summaryMeta.domainLabel ?? "General",
      tagCount: summaryMeta.tagCount,
      modeLabel: summaryMeta.modeLabel ?? "—",
      stepCount: summaryMeta.stepCount,
      diffCount: summaryMeta.diffCount,
      snapshotFileCount: summaryMeta.snapshotFileCount,
      executionPhaseLabel: executionMeta.phaseLabel ?? "—",
      logCount: executionMeta.logCount,
    };
  }, [lastAssistant]);

  const hasMessages = messages.length > 0;

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

        <WorkspaceHero workspaceCards={workspaceCards} />

        <section style={styles.mainCard}>
          <StatusBar
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

              <CapabilityCard />
              <ProductDirectionPanel />

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

              <ChatComposer
                ref={inputRef}
                input={input}
                busy={busy || isExecuting}
                onChange={setInput}
                onClearDraft={handleClearDraft}
                onSend={handleSend}
              />

              <div style={styles.footerNote}>
                Local-first workspace. Uses backend when available, falls back
                safely when needed, and is now aimed at the real CodexForge
                product path.
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