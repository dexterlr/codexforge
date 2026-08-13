import type { CodexForgeSurfaceGroup, CodexForgeSurfaceItem, CodexForgeSurfaceMap, CodexForgeSurfaceRole, ConsolidationReadinessLevel } from "./consolidation-types";
import { buildConsolidationStableKey } from "./consolidation-types";

const SURFACES: readonly Omit<CodexForgeSurfaceItem, "id">[] = [
  { route: "/", label: "Operator Home", group: "Command Deck", role: "primary", keepVisible: true, consolidationTarget: "Command Deck", readiness: "ready", safetyPosture: "local-first read-only", recommendedOperatorUse: "Start here for status, launch cards, and next safe action." },
  { route: "/jarvis", label: "Jarvis Chat", group: "Command Deck", role: "primary", keepVisible: true, consolidationTarget: "Command Deck", readiness: "ready", safetyPosture: "manual approval then separate bounded execution", recommendedOperatorUse: "Use for visible local conversations and reviewed handoffs." },
  { route: "/stabilization", label: "Stabilization", group: "Command Deck", role: "primary", keepVisible: true, consolidationTarget: "Operations hub", readiness: "needs-review", safetyPosture: "operator-safe read-only", recommendedOperatorUse: "Use as the operations hub for blockers, validation, queues, and safe next action." },
  { route: "/readiness", label: "Product Readiness Audit", group: "Command Deck", role: "primary", keepVisible: true, consolidationTarget: "Operator checkpoint", readiness: "needs-review", safetyPosture: "read-only audit", recommendedOperatorUse: "Use before new surfaces or phase transitions." },
  { route: "/handoff", label: "Continuity Handoff", group: "Command Deck", role: "primary", keepVisible: true, consolidationTarget: "Operator checkpoint", readiness: "needs-review", safetyPosture: "copy-only handoff", recommendedOperatorUse: "Create the next-session handoff after validation and risk review." },
  { route: "/brain", label: "Brain", group: "Brain Continuity", role: "secondary", keepVisible: true, consolidationTarget: "Brain Continuity", readiness: "ready", safetyPosture: "graph inspection only", recommendedOperatorUse: "Inspect graph context without mutating the current Brain behavior." },
  { route: "/brain-continuity", label: "Brain Continuity", group: "Brain Continuity", role: "secondary", keepVisible: true, consolidationTarget: "Brain Continuity", readiness: "needs-review", safetyPosture: "read-only continuity", recommendedOperatorUse: "Review memory growth, journal health, snapshots, replay, restore, and governance posture." },
  { route: "/brain-snapshots", label: "Brain Snapshots", group: "Brain Continuity", role: "secondary", keepVisible: true, consolidationTarget: "Advanced / Audit", readiness: "needs-review", safetyPosture: "snapshot inspection only", recommendedOperatorUse: "Use from Advanced / Audit when snapshot comparison is needed." },
  { route: "/brain-governance", label: "Brain Governance", group: "Brain Continuity", role: "secondary", keepVisible: true, consolidationTarget: "Advanced / Audit", readiness: "needs-review", safetyPosture: "no graph mutation", recommendedOperatorUse: "Use for mutation boundary review before any future guarded runtime action." },
  { route: "/runtime-journal", label: "Runtime Journal", group: "Brain Continuity", role: "secondary", keepVisible: true, consolidationTarget: "Advanced / Audit", readiness: "needs-review", safetyPosture: "append-only context, read-only UI", recommendedOperatorUse: "Audit runtime events without appendEvent from UI." },
  { route: "/runtime-replay", label: "Runtime Replay", group: "Brain Continuity", role: "secondary", keepVisible: true, consolidationTarget: "Advanced / Audit", readiness: "needs-review", safetyPosture: "preview-only replay", recommendedOperatorUse: "Preview reducer impact without graph mutation or persistence." },
  { route: "/snapshot-restore", label: "Snapshot Restore", group: "Brain Continuity", role: "secondary", keepVisible: true, consolidationTarget: "Advanced / Audit", readiness: "needs-review", safetyPosture: "restore blocked by default", recommendedOperatorUse: "Review restore evidence only; no restore from consolidation UI." },
  { route: "/memory", label: "Memory", group: "Memory", role: "secondary", keepVisible: true, consolidationTarget: "Memory review", readiness: "needs-review", safetyPosture: "no auto-promotion", recommendedOperatorUse: "Review memory candidates and evidence context." },
  { route: "/memory-inbox", label: "Memory Inbox", group: "Memory", role: "secondary", keepVisible: true, consolidationTarget: "Memory review", readiness: "needs-review", safetyPosture: "promotion review required", recommendedOperatorUse: "Review inbox items before promotion gate work." },
  { route: "/files", label: "Project Reader + Real Patch Preview", group: "Engineering Workflow", role: "primary", keepVisible: true, consolidationTarget: "File workflow", readiness: "ready", safetyPosture: "File Reader v1 functional/read-only and Patch Preview v1 functional/preview-only", recommendedOperatorUse: "Inspect real local project files, prepare preview-only diffs, then hand off to Phase 58 Approved Patch Apply v1." },
  { route: "/tasks", label: "Tasks", group: "Engineering Workflow", role: "secondary", keepVisible: true, consolidationTarget: "Engineering workflow", readiness: "needs-review", safetyPosture: "reviewed activation", recommendedOperatorUse: "Use after file context and readiness are visible." },
  { route: "/files#patch-preview", label: "Patch/apply/regression surfaces", group: "Engineering Workflow", role: "secondary", keepVisible: true, consolidationTarget: "Engineering workflow", readiness: "needs-review", safetyPosture: "preview and approval gates", recommendedOperatorUse: "Keep patch preview and apply gates linked, not auto-run." },
  { route: "/creative", label: "Creative", group: "Creative", role: "secondary", keepVisible: true, consolidationTarget: "Creative planning", readiness: "ready", safetyPosture: "preview-only production", recommendedOperatorUse: "Use for creative planning after operator context is clean." },
  { route: "/capabilities", label: "Capabilities", group: "Creative", role: "secondary", keepVisible: true, consolidationTarget: "Capability review", readiness: "needs-review", safetyPosture: "policy visible", recommendedOperatorUse: "Review capability and policy boundaries." },
  { route: "/activity", label: "Global Activity", group: "History/Audit", role: "secondary", keepVisible: true, consolidationTarget: "Audit history", readiness: "ready", safetyPosture: "read-only activity", recommendedOperatorUse: "Use for evidence and activity review." },
  { route: "/history", label: "History", group: "History/Audit", role: "secondary", keepVisible: true, consolidationTarget: "Audit history", readiness: "ready", safetyPosture: "local timeline", recommendedOperatorUse: "Use for local workflow continuity." },
];

export function buildCodexForgeSurfaceItem(input: {
  route: string;
  label: string;
  group: CodexForgeSurfaceGroup;
  role: CodexForgeSurfaceRole;
  keepVisible: boolean;
  consolidationTarget?: string;
  readiness: ConsolidationReadinessLevel;
  safetyPosture: string;
  recommendedOperatorUse: string;
}): CodexForgeSurfaceItem {
  return { id: buildConsolidationStableKey("surface", input.group, input.route), ...input };
}

export function buildCodexForgeSurfaceMap(): CodexForgeSurfaceMap {
  const items = SURFACES.map(buildCodexForgeSurfaceItem);
  const groups = new Set(items.map((item) => item.group));
  const primaryCount = items.filter((item) => item.role === "primary").length;
  const secondaryCount = items.length - primaryCount;
  return {
    id: "codexforge-surface-map",
    items,
    groupCount: groups.size,
    primaryCount,
    secondaryCount,
    summary: summarizeCodexForgeSurfaceMap({ items, groupCount: groups.size, primaryCount, secondaryCount }),
  };
}

export function summarizeCodexForgeSurfaceMap(map: Pick<CodexForgeSurfaceMap, "items" | "groupCount" | "primaryCount" | "secondaryCount">): string[] {
  return [
    `${map.items.length} surfaces mapped across ${map.groupCount} groups including Command Deck, Brain Continuity, Memory, Engineering Workflow, Creative, and History/Audit.`,
    `${map.primaryCount} primary routes remain prominent and ${map.secondaryCount} secondary routes remain accessible.`,
    "No routes are deleted; consolidation targets define where operators should start.",
  ];
}
