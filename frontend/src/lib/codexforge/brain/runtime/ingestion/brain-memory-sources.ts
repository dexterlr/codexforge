import {
  CODEXFORGE_BRAIN_GRAPH_VERSION,
  type CodexForgeBrainEdge,
  type CodexForgeBrainGraph,
  type CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph/types";
import {
  CODEXFORGE_BRAIN_MEMORY_INGESTION_FIXED_TS,
  createStableBrainMemoryEdgeId,
  createStableBrainMemoryId,
} from "./brain-memory-ids";
import type {
  CodexForgeBrainMemoryActivityEntry,
  CodexForgeBrainMemoryIngestionInput,
  CodexForgeBrainMemorySourceEdge,
  CodexForgeBrainMemorySourceNode,
} from "./brain-memory-ingestion-types";

const SOURCE_LABEL = "Brain memory ingestion phase 1";
const WORKSPACE_ID = createStableBrainMemoryId("workspace", "codexforge");
const PROJECT_ID = createStableBrainMemoryId("project", "codexforge-foundation");
const REPO_ID = createStableBrainMemoryId("repo", "codexforge-foundation");
const HISTORY_ROUTE_ID = createStableBrainMemoryId("route", "/history");
const HISTORY_SUBSYSTEM_ID = createStableBrainMemoryId(
  "subsystem",
  "history-activity-intelligence"
);
const ACTIVITY_CONCEPT_ID = createStableBrainMemoryId(
  "concept",
  "activity-intelligence"
);

function resolveTimestamp(now?: number): number {
  return typeof now === "number" && Number.isFinite(now)
    ? now
    : CODEXFORGE_BRAIN_MEMORY_INGESTION_FIXED_TS;
}

function tags(...values: Array<string | undefined>): string[] {
  return Array.from(
    new Set(values.filter((value): value is string => Boolean(value?.trim())))
  ).sort();
}

function sourceNode(
  input: Omit<
    CodexForgeBrainMemorySourceNode,
    "sourceLabel" | "sourceId" | "sourceRefType" | "sourceRefId"
  > & {
    sourceId?: string;
    sourceLabel?: string;
    sourceRefType?: CodexForgeBrainMemorySourceNode["sourceRefType"];
    sourceRefId?: string;
  }
): CodexForgeBrainMemorySourceNode {
  return {
    sourceLabel: input.sourceLabel ?? SOURCE_LABEL,
    sourceId: input.sourceId ?? input.id,
    sourceRefType: "derived",
    sourceRefId: input.sourceRefId ?? `brain-memory-ingestion:${input.id}`,
    ...input,
  };
}

function sourceEdge(
  input: Omit<
    CodexForgeBrainMemorySourceEdge,
    "sourceLabel" | "sourceRefType" | "sourceRefId"
  > & {
    sourceLabel?: string;
    sourceRefType?: CodexForgeBrainMemorySourceEdge["sourceRefType"];
    sourceRefId?: string;
  }
): CodexForgeBrainMemorySourceEdge {
  return {
    sourceLabel: input.sourceLabel ?? SOURCE_LABEL,
    sourceRefType: "derived",
    sourceRefId:
      input.sourceRefId ??
      `brain-memory-ingestion:${input.from}:${input.edgeKind}:${input.to}`,
    ...input,
  };
}

function routeNode(path: string, label: string, summary: string, filePath: string) {
  return sourceNode({
    id: createStableBrainMemoryId("route", path),
    category: "app route",
    nodeKind: "artifact",
    label,
    description: `CodexForge app route ${path}.`,
    summary,
    whyItMatters: "Routes are operator entry points that turn graph memory into usable workflows.",
    path,
    filePath,
    tags: tags("route", "app", path.slice(1)),
    status: "active",
    importance: path === "/brain" ? "critical" : "high",
    data: {
      artifactType: "app-route",
      path,
    },
  });
}

function subsystemNode(
  slug: string,
  label: string,
  summary: string,
  importance: CodexForgeBrainMemorySourceNode["importance"] = "high"
) {
  return sourceNode({
    id: createStableBrainMemoryId("subsystem", slug),
    category: "subsystem",
    nodeKind: "workflow",
    label,
    description: summary,
    summary,
    whyItMatters: "Subsystem nodes make the Brain graph navigable by product capability instead of isolated files.",
    tags: tags("subsystem", slug),
    status: "active",
    importance,
    data: {
      workflowType: "subsystem",
      currentStage: "phase-1-memory-ingestion",
    },
  });
}

function featureNode(slug: string, label: string, summary: string) {
  return sourceNode({
    id: createStableBrainMemoryId("feature", slug),
    category: "feature",
    nodeKind: "workflow",
    label,
    description: summary,
    summary,
    whyItMatters: "Feature nodes connect product surfaces to the local runtime systems that support them.",
    tags: tags("feature", slug),
    status: "active",
    importance: "medium",
    data: {
      workflowType: "feature",
    },
  });
}

function fileNode(path: string, label: string, summary: string, importance = "medium") {
  return sourceNode({
    id: createStableBrainMemoryId("file", path),
    category: "file",
    nodeKind: "artifact",
    label,
    description: summary,
    summary,
    whyItMatters: "File nodes anchor abstract memory to concrete implementation paths.",
    repoPath: ".",
    filePath: path,
    path,
    tags: tags("file", path.includes("smoke") ? "smoke" : undefined),
    status: "active",
    importance: importance as CodexForgeBrainMemorySourceNode["importance"],
    data: {
      artifactType: "source-file",
      path,
    },
  });
}

function smokeNode(name: string, path: string, summary: string) {
  return sourceNode({
    id: createStableBrainMemoryId("smoke", name),
    category: "smoke",
    nodeKind: "run",
    label: name,
    description: summary,
    summary,
    whyItMatters: "Smoke nodes show which local checks protect each Brain subsystem.",
    filePath: path,
    path,
    tags: tags("smoke", "validation"),
    status: "active",
    importance: "high",
    data: {
      phase: "validation",
      resultSummary: summary,
      fileCount: 1,
    },
  });
}

function conceptNode(slug: string, label: string, summary: string, importance = "high") {
  return sourceNode({
    id: createStableBrainMemoryId("concept", slug),
    category: "concept",
    nodeKind: "memory",
    label,
    description: summary,
    summary,
    whyItMatters: "Concept memory helps the Brain explain why project structures exist.",
    tags: tags("concept", slug),
    status: "active",
    importance: importance as CodexForgeBrainMemorySourceNode["importance"],
    data: {
      memoryType: "fact",
      content: summary,
    },
  });
}

function decisionNode(slug: string, label: string, summary: string, rationale: string) {
  return sourceNode({
    id: createStableBrainMemoryId("decision", slug),
    category: "decision",
    nodeKind: "decision",
    label,
    description: summary,
    summary,
    whyItMatters: rationale,
    tags: tags("decision", slug),
    status: "active",
    importance: "critical",
    data: {
      rationale,
      nextAction: "Keep ingestion deterministic, local, and repeat-safe.",
    },
  });
}

function docNode(path: string, label: string, summary: string) {
  return sourceNode({
    id: createStableBrainMemoryId("doc", path.replace(/\.md$/i, "")),
    category: "doc",
    nodeKind: "artifact",
    label,
    description: summary,
    summary,
    whyItMatters: "Project docs preserve canonical direction and architectural intent.",
    filePath: path,
    path,
    tags: tags("doc", "architecture"),
    status: "active",
    importance: "high",
    data: {
      artifactType: "project-doc",
      path,
    },
  });
}

function buildStaticSourceNodeFacts(): CodexForgeBrainMemorySourceNode[] {
  return [
    sourceNode({
      id: WORKSPACE_ID,
      category: "workspace/root",
      nodeKind: "workspace",
      label: "CodexForge workspace",
      description: "Local-first CodexForge operator workspace for Brain, Files, History, Entry, and chat.",
      summary: "Root memory anchor for the CodexForge project surface.",
      whyItMatters: "The workspace root keeps seeded memory connected to the operator's actual product context.",
      repoPath: "repos/codexforge/foundation",
      workspaceRoot: "openclaw-workspace",
      tags: tags("workspace", "codexforge", "local-first"),
      status: "active",
      importance: "critical",
      pinned: true,
      graph: { coordinates: { x: 0, y: 0 } },
    }),
    sourceNode({
      id: PROJECT_ID,
      category: "workspace/root",
      nodeKind: "project",
      label: "codexforge-foundation",
      description: "Foundation branch carrying CodexForge Brain graph, Files, History, and runtime work.",
      summary: "Project node for the current CodexForge foundation branch.",
      whyItMatters: "Project identity lets graph memory attach to the branch-level implementation effort.",
      repoPath: "repos/codexforge/foundation",
      workspaceRoot: "openclaw-workspace",
      tags: tags("project", "foundation"),
      status: "active",
      importance: "critical",
      pinned: true,
      graph: { coordinates: { x: 220, y: 0 } },
    }),
    sourceNode({
      id: REPO_ID,
      category: "workspace/root",
      nodeKind: "repo",
      label: "codexforge/foundation",
      description: "Frontend repo hosting the CodexForge application surfaces and runtime modules.",
      summary: "Repository node for local CodexForge implementation.",
      whyItMatters: "Repo identity ties file, smoke, and route memory to the implementation boundary.",
      repoPath: ".",
      tags: tags("repo", "frontend"),
      status: "active",
      importance: "high",
      data: {
        branch: "codexforge-foundation",
      },
    }),

    routeNode("/brain", "Brain", "Visual graph, runtime panels, memory inspection, and local graph persistence.", "src/app/brain/page-client.tsx"),
    routeNode("/files", "Files", "File command center for read-only project file intelligence and safe planning.", "src/app/files/page.tsx"),
    routeNode("/history", "History", "Local activity intelligence for entries, decisions, plans, executions, and memory.", "src/app/history/page.tsx"),
    routeNode("/entry", "Entry", "Operator entry point for launching structured work into CodexForge.", "src/app/entry/page.tsx"),
    routeNode("/clawd", "Clawd", "Present CodexForge route surface for alternate workspace interaction.", "src/app/clawd/page.tsx"),

    subsystemNode("brain-runtime", "Brain runtime", "Typed runtime events, graph reduction, context assembly, memory ranking, concepts, lineage, and semantic links.", "critical"),
    subsystemNode("visual-graph", "Visual graph", "Readable Brain graph rendering that preserves real node and edge contracts.", "critical"),
    subsystemNode("files-command-center", "Files command center", "Preview-only file intelligence for risk, dependencies, lineage, and related memory.", "high"),
    subsystemNode("chat-engine", "Chat engine", "Workspace chat, task, execution, memory, and graph-context synchronization.", "high"),
    subsystemNode("operator-safety", "Operator safety", "Explicit approval, read-only source boundaries, safe edit plans, and no silent mutation.", "critical"),
    subsystemNode("history-activity-intelligence", "History activity intelligence", "Local activity entries categorized as notes, plans, tasks, research, decisions, executions, and memory.", "high"),
    subsystemNode("storage-local-persistence", "Storage and local persistence", "LocalStorage-backed graph, chat, activity, memory, task, and execution continuity.", "high"),
    subsystemNode("smoke-suite", "Smoke suite", "PowerShell validation scripts protecting CodexForge Brain, memory, Files, and runtime surfaces.", "critical"),
    subsystemNode("predictive-context", "Predictive context", "Local ranking and routing of relevant files, memory, risks, and next task focus.", "high"),
    subsystemNode("runtime-recommendations", "Runtime recommendations", "Local recommendation and insight queues for next safe Brain actions.", "medium"),
    subsystemNode("semantic-topology", "Semantic topology", "Deterministic knowledge topology, heatmaps, hotspots, and cluster layout.", "medium"),

    featureNode("first-run-onboarding", "First-run onboarding", "Explicit empty-graph onboarding and starter graph preview for new Brain users."),
    featureNode("memory-clusters", "Memory clusters", "Cognitive memory grouping, dedupe signals, contradictions, and promotable concepts."),
    featureNode("replay-lineage", "Replay lineage", "Replay frames and lineage views for execution, agents, and memory."),
    featureNode("health-dashboard", "Runtime health dashboard", "Runtime readiness, smoke coverage, safety posture, and diagnostics."),

    fileNode("src/app/brain/page-client.tsx", "Brain page client", "Operator UI for loading, saving, inspecting, exporting, resetting, and now ingesting Brain memory.", "critical"),
    fileNode("src/lib/codexforge/brain/components/brain-graph-view.tsx", "Brain graph view", "Deterministic visual graph renderer for real nodes and edges.", "critical"),
    fileNode("src/app/history/page.tsx", "History page", "Local activity intelligence UI and import/export surface.", "high"),
    fileNode("src/lib/storage.ts", "Local activity storage", "Local activity entry normalization, load, save, and clearing helpers.", "high"),
    fileNode("src/lib/codexforge/chat/use-codexforge-chat.ts", "CodexForge chat hook", "Client chat state, task execution, memory, runtime, and Brain graph sync.", "high"),
    fileNode("src/lib/codexforge/files/components/files-command-center.tsx", "Files command center component", "Read-only Files UX for project intelligence and safe edit planning.", "high"),
    fileNode("src/lib/codexforge/files/server/project-files.ts", "Project files scanner", "Bounded server-side file scan for local read-only Files intelligence.", "high"),
    fileNode("src/lib/codexforge/brain/runtime/graph-reducer.ts", "Brain graph reducer", "Reduces typed runtime events into graph nodes and edges.", "high"),
    fileNode("src/lib/codexforge/brain/runtime/runtime.ts", "Brain runtime facade", "Runs event storage, graph reduction, context assembly, memory, concepts, lineage, and semantic links.", "high"),
    fileNode("src/lib/codexforge/brain/runtime/runtime-types.ts", "Brain runtime types", "Canonical runtime event, context, memory, episode, lineage, and semantic link types.", "high"),
    fileNode("src/lib/codexforge/brain/sync.ts", "Brain sync", "Persists chat, task, memory, execution, diff, snapshot, and repo context into the Brain graph.", "high"),
    fileNode("scripts/smoke-codexforge-all.ps1", "All CodexForge smokes", "Managed smoke suite for CodexForge product and Brain validation.", "critical"),

    smokeNode("smoke-codexforge-brain-runtime", "scripts/smoke-codexforge-brain-runtime.ps1", "Checks runtime APIs, canonical graph types, deterministic behavior, and no external force simulation."),
    smokeNode("smoke-codexforge-brain-graph-ui", "scripts/smoke-codexforge-brain-graph-ui.ps1", "Checks Brain graph UI markers, stable keys, graph rendering, and no random layout."),
    smokeNode("smoke-codexforge-cognitive-memory", "scripts/smoke-codexforge-cognitive-memory.ps1", "Checks cognitive memory APIs, deterministic fixtures, local-only behavior, and dedupe concepts."),
    smokeNode("smoke-codexforge-cognitive-memory-runtime-integration", "scripts/smoke-codexforge-cognitive-memory-runtime-integration.ps1", "Checks cognitive memory integration into context, diagnostics, timeline, health, and runtime exports."),
    smokeNode("smoke-codexforge-files-command-center", "scripts/smoke-codexforge-files-command-center.ps1", "Checks Files command center UX and local preview-only workflow."),

    docNode("CODEXFORGE_PHASE_1_CANONICAL_BRAIN_RUNTIME.md", "Canonical Brain runtime doc", "Phase 1 Brain runtime contract and memory direction."),
    docNode("CODEXFORGE_GOD_TIER_ALL_PHASES.md", "CodexForge all phases doc", "All-phase product direction for CodexForge capabilities."),

    conceptNode("operator-safety", "Operator safety", "CodexForge memory ingestion must be explicitly triggered, local-first, repeat-safe, and non-destructive.", "critical"),
    conceptNode("deterministic-ingestion", "Deterministic ingestion", "Brain memory seed data uses stable source IDs, stable ordering, and no random or network calls.", "critical"),
    conceptNode("graph-contracts", "Graph contracts", "Seeded Brain memory uses only canonical CodexForgeBrainNodeKind and CodexForgeBrainEdgeKind values.", "critical"),
    conceptNode("read-only-source-boundary", "Read-only source boundary", "Project facts and activity entries are read as sources; only the existing graph save path persists the merged graph.", "high"),
    conceptNode("activity-intelligence", "Activity intelligence", "History entries can become memory, decisions, tasks, plans, research, and execution graph nodes when safely available.", "high"),
    conceptNode("local-first-memory", "Local-first memory", "The Brain should gain useful density from project-local facts before any AI or external source is involved.", "critical"),

    decisionNode("explicit-user-triggered-ingestion", "Explicit memory ingestion action", "Real project memory should be seeded by an operator button, not hidden background mutation.", "The operator controls when source facts enter graph persistence."),
    decisionNode("stable-id-dedupe", "Stable ID dedupe", "Seeded nodes and edges use source/category/path/name IDs so repeated ingestion skips existing memories.", "Repeat-safe IDs prevent duplicate graph density."),
    decisionNode("no-ai-network-ingestion", "No AI or network ingestion", "Phase 1 ingestion is deterministic and does not call AI, fetch remote data, or add dependencies.", "Local deterministic sources keep the memory layer auditable."),

    sourceNode({
      id: createStableBrainMemoryId("plan", "brain-memory-ingestion-phase-1"),
      category: "plan",
      nodeKind: "plan",
      label: "Brain Memory Ingestion Phase 1",
      description: "Seed real CodexForge project memory into the Brain graph from deterministic local sources.",
      summary: "Build ingestion, source facts, merge, dedupe, UI action, sparse guidance, and smoke validation.",
      whyItMatters: "This plan turns the Brain graph from a sparse visual into useful project memory.",
      tags: tags("plan", "brain", "memory-ingestion"),
      status: "active",
      importance: "critical",
      data: {
        goal: "Build Brain Memory Ingestion Phase 1",
        stepCount: 5,
        nextAction: "Use Seed real memory to merge deterministic source facts into the graph.",
        risks: ["duplicate graph records", "non-deterministic IDs", "unsafe source mutation"],
        files: [
          "src/lib/codexforge/brain/runtime/ingestion",
          "src/app/brain/page-client.tsx",
          "scripts/smoke-codexforge-brain-memory-ingestion.ps1",
        ],
      },
    }),
    sourceNode({
      id: createStableBrainMemoryId("task", "increase-brain-density"),
      category: "task",
      nodeKind: "task",
      label: "Increase Brain graph density",
      description: "Add useful real nodes and relationships for routes, files, subsystems, decisions, plans, and activity.",
      summary: "Make the Brain useful and alive with local project facts.",
      whyItMatters: "Dense graph context improves navigation, recall, and future runtime recommendations.",
      tags: tags("task", "graph-density"),
      status: "active",
      importance: "high",
      data: {
        goal: "Increase Brain graph density from deterministic project memory sources.",
        currentStep: 1,
        totalSteps: 3,
        nextAction: "Run ingestion and inspect the new workspace root.",
      },
    }),
  ];
}

function buildStaticSourceEdgeFacts(): CodexForgeBrainMemorySourceEdge[] {
  const routeBrain = createStableBrainMemoryId("route", "/brain");
  const routeFiles = createStableBrainMemoryId("route", "/files");
  const routeHistory = createStableBrainMemoryId("route", "/history");
  const routeEntry = createStableBrainMemoryId("route", "/entry");
  const routeClawd = createStableBrainMemoryId("route", "/clawd");
  const brainRuntime = createStableBrainMemoryId("subsystem", "brain-runtime");
  const visualGraph = createStableBrainMemoryId("subsystem", "visual-graph");
  const filesCenter = createStableBrainMemoryId("subsystem", "files-command-center");
  const chatEngine = createStableBrainMemoryId("subsystem", "chat-engine");
  const safety = createStableBrainMemoryId("subsystem", "operator-safety");
  const storage = createStableBrainMemoryId("subsystem", "storage-local-persistence");
  const smokeSuite = createStableBrainMemoryId("subsystem", "smoke-suite");
  const predictive = createStableBrainMemoryId("subsystem", "predictive-context");
  const recommendations = createStableBrainMemoryId("subsystem", "runtime-recommendations");
  const topology = createStableBrainMemoryId("subsystem", "semantic-topology");
  const memoryClusters = createStableBrainMemoryId("feature", "memory-clusters");
  const replayLineage = createStableBrainMemoryId("feature", "replay-lineage");
  const healthDashboard = createStableBrainMemoryId("feature", "health-dashboard");
  const firstRun = createStableBrainMemoryId("feature", "first-run-onboarding");
  const plan = createStableBrainMemoryId("plan", "brain-memory-ingestion-phase-1");
  const task = createStableBrainMemoryId("task", "increase-brain-density");

  const pageClient = createStableBrainMemoryId("file", "src/app/brain/page-client.tsx");
  const graphView = createStableBrainMemoryId("file", "src/lib/codexforge/brain/components/brain-graph-view.tsx");
  const historyPage = createStableBrainMemoryId("file", "src/app/history/page.tsx");
  const storageFile = createStableBrainMemoryId("file", "src/lib/storage.ts");
  const chatHook = createStableBrainMemoryId("file", "src/lib/codexforge/chat/use-codexforge-chat.ts");
  const filesCommand = createStableBrainMemoryId("file", "src/lib/codexforge/files/components/files-command-center.tsx");
  const projectFiles = createStableBrainMemoryId("file", "src/lib/codexforge/files/server/project-files.ts");
  const reducer = createStableBrainMemoryId("file", "src/lib/codexforge/brain/runtime/graph-reducer.ts");
  const runtime = createStableBrainMemoryId("file", "src/lib/codexforge/brain/runtime/runtime.ts");
  const runtimeTypes = createStableBrainMemoryId("file", "src/lib/codexforge/brain/runtime/runtime-types.ts");
  const sync = createStableBrainMemoryId("file", "src/lib/codexforge/brain/sync.ts");
  const allSmokeFile = createStableBrainMemoryId("file", "scripts/smoke-codexforge-all.ps1");

  const canonicalDoc = createStableBrainMemoryId("doc", "CODEXFORGE_PHASE_1_CANONICAL_BRAIN_RUNTIME");
  const phasesDoc = createStableBrainMemoryId("doc", "CODEXFORGE_GOD_TIER_ALL_PHASES");
  const operatorSafety = createStableBrainMemoryId("concept", "operator-safety");
  const deterministic = createStableBrainMemoryId("concept", "deterministic-ingestion");
  const graphContracts = createStableBrainMemoryId("concept", "graph-contracts");
  const readOnly = createStableBrainMemoryId("concept", "read-only-source-boundary");
  const localFirst = createStableBrainMemoryId("concept", "local-first-memory");
  const explicitDecision = createStableBrainMemoryId("decision", "explicit-user-triggered-ingestion");
  const dedupeDecision = createStableBrainMemoryId("decision", "stable-id-dedupe");
  const noNetworkDecision = createStableBrainMemoryId("decision", "no-ai-network-ingestion");

  const edges: CodexForgeBrainMemorySourceEdge[] = [
    sourceEdge({ category: "workspace/root", from: WORKSPACE_ID, to: PROJECT_ID, edgeKind: "contains", label: "contains project", weight: 0.94 }),
    sourceEdge({ category: "workspace/root", from: PROJECT_ID, to: REPO_ID, edgeKind: "contains", label: "contains repo", weight: 0.9 }),
    sourceEdge({ category: "workspace/root", from: WORKSPACE_ID, to: routeBrain, edgeKind: "contains", label: "owns route", weight: 0.86 }),
    sourceEdge({ category: "workspace/root", from: WORKSPACE_ID, to: routeFiles, edgeKind: "contains", label: "owns route", weight: 0.82 }),
    sourceEdge({ category: "workspace/root", from: WORKSPACE_ID, to: routeHistory, edgeKind: "contains", label: "owns route", weight: 0.82 }),
    sourceEdge({ category: "workspace/root", from: WORKSPACE_ID, to: routeEntry, edgeKind: "contains", label: "owns route", weight: 0.76 }),
    sourceEdge({ category: "workspace/root", from: WORKSPACE_ID, to: routeClawd, edgeKind: "contains", label: "owns route", weight: 0.68 }),

    sourceEdge({ category: "subsystem", from: PROJECT_ID, to: brainRuntime, edgeKind: "contains", label: "contains subsystem", weight: 0.92 }),
    sourceEdge({ category: "subsystem", from: PROJECT_ID, to: visualGraph, edgeKind: "contains", label: "contains subsystem", weight: 0.88 }),
    sourceEdge({ category: "subsystem", from: PROJECT_ID, to: filesCenter, edgeKind: "contains", label: "contains subsystem", weight: 0.82 }),
    sourceEdge({ category: "subsystem", from: PROJECT_ID, to: chatEngine, edgeKind: "contains", label: "contains subsystem", weight: 0.84 }),
    sourceEdge({ category: "subsystem", from: PROJECT_ID, to: safety, edgeKind: "contains", label: "contains subsystem", weight: 0.92 }),
    sourceEdge({ category: "subsystem", from: PROJECT_ID, to: HISTORY_SUBSYSTEM_ID, edgeKind: "contains", label: "contains subsystem", weight: 0.78 }),
    sourceEdge({ category: "subsystem", from: PROJECT_ID, to: storage, edgeKind: "contains", label: "contains subsystem", weight: 0.76 }),
    sourceEdge({ category: "subsystem", from: PROJECT_ID, to: smokeSuite, edgeKind: "contains", label: "contains validation", weight: 0.92 }),

    sourceEdge({ category: "app route", from: routeBrain, to: pageClient, edgeKind: "references", label: "implemented by", weight: 0.94 }),
    sourceEdge({ category: "app route", from: routeBrain, to: visualGraph, edgeKind: "uses", label: "uses graph view", weight: 0.9 }),
    sourceEdge({ category: "app route", from: routeBrain, to: brainRuntime, edgeKind: "uses", label: "uses runtime panels", weight: 0.86 }),
    sourceEdge({ category: "app route", from: routeFiles, to: filesCommand, edgeKind: "references", label: "implemented by", weight: 0.9 }),
    sourceEdge({ category: "app route", from: routeFiles, to: projectFiles, edgeKind: "uses", label: "uses read-only scan", weight: 0.82 }),
    sourceEdge({ category: "app route", from: routeHistory, to: historyPage, edgeKind: "references", label: "implemented by", weight: 0.9 }),
    sourceEdge({ category: "app route", from: routeHistory, to: storageFile, edgeKind: "uses", label: "uses activity storage", weight: 0.82 }),
    sourceEdge({ category: "app route", from: routeEntry, to: chatEngine, edgeKind: "feeds", label: "feeds workspace work", weight: 0.7 }),
    sourceEdge({ category: "app route", from: routeClawd, to: chatEngine, edgeKind: "relates_to", label: "alternate workspace route", weight: 0.58 }),

    sourceEdge({ category: "file", from: pageClient, to: visualGraph, edgeKind: "uses", label: "renders", weight: 0.86 }),
    sourceEdge({ category: "file", from: pageClient, to: brainRuntime, edgeKind: "uses", label: "builds runtime panels", weight: 0.86 }),
    sourceEdge({ category: "file", from: pageClient, to: storage, edgeKind: "uses", label: "saves graph locally", weight: 0.82 }),
    sourceEdge({ category: "file", from: graphView, to: visualGraph, edgeKind: "part_of", label: "part of visual graph", weight: 0.92 }),
    sourceEdge({ category: "file", from: reducer, to: brainRuntime, edgeKind: "part_of", label: "reduces runtime events", weight: 0.88 }),
    sourceEdge({ category: "file", from: runtime, to: brainRuntime, edgeKind: "part_of", label: "runtime facade", weight: 0.88 }),
    sourceEdge({ category: "file", from: runtimeTypes, to: brainRuntime, edgeKind: "part_of", label: "runtime schema", weight: 0.84 }),
    sourceEdge({ category: "file", from: sync, to: chatEngine, edgeKind: "part_of", label: "chat graph sync", weight: 0.82 }),
    sourceEdge({ category: "file", from: chatHook, to: chatEngine, edgeKind: "part_of", label: "chat state engine", weight: 0.9 }),
    sourceEdge({ category: "file", from: filesCommand, to: filesCenter, edgeKind: "part_of", label: "files command UI", weight: 0.9 }),
    sourceEdge({ category: "file", from: projectFiles, to: filesCenter, edgeKind: "feeds", label: "bounded scan source", weight: 0.82 }),
    sourceEdge({ category: "file", from: historyPage, to: HISTORY_SUBSYSTEM_ID, edgeKind: "part_of", label: "activity UI", weight: 0.9 }),
    sourceEdge({ category: "file", from: storageFile, to: storage, edgeKind: "part_of", label: "activity persistence", weight: 0.9 }),

    sourceEdge({ category: "subsystem", from: brainRuntime, to: memoryClusters, edgeKind: "contains", label: "contains memory intelligence", weight: 0.78 }),
    sourceEdge({ category: "subsystem", from: brainRuntime, to: replayLineage, edgeKind: "contains", label: "contains replay lineage", weight: 0.72 }),
    sourceEdge({ category: "subsystem", from: brainRuntime, to: healthDashboard, edgeKind: "contains", label: "contains health dashboard", weight: 0.76 }),
    sourceEdge({ category: "subsystem", from: brainRuntime, to: predictive, edgeKind: "feeds", label: "feeds predictive context", weight: 0.82 }),
    sourceEdge({ category: "subsystem", from: brainRuntime, to: recommendations, edgeKind: "feeds", label: "feeds recommendations", weight: 0.72 }),
    sourceEdge({ category: "subsystem", from: brainRuntime, to: topology, edgeKind: "feeds", label: "feeds semantic topology", weight: 0.72 }),
    sourceEdge({ category: "feature", from: routeBrain, to: firstRun, edgeKind: "contains", label: "contains onboarding", weight: 0.72 }),
    sourceEdge({ category: "subsystem", from: safety, to: readOnly, edgeKind: "references", label: "enforces boundary", weight: 0.9 }),
    sourceEdge({ category: "subsystem", from: safety, to: operatorSafety, edgeKind: "references", label: "operator policy", weight: 0.94 }),
    sourceEdge({ category: "subsystem", from: storage, to: readOnly, edgeKind: "depends_on", label: "controlled persistence", weight: 0.78 }),
    sourceEdge({ category: "subsystem", from: HISTORY_SUBSYSTEM_ID, to: ACTIVITY_CONCEPT_ID, edgeKind: "about", label: "activity memory", weight: 0.78 }),

    sourceEdge({ category: "smoke", from: smokeSuite, to: allSmokeFile, edgeKind: "references", label: "managed by", weight: 0.9 }),
    sourceEdge({ category: "smoke", from: createStableBrainMemoryId("smoke", "smoke-codexforge-brain-runtime"), to: brainRuntime, edgeKind: "about", label: "validates runtime", weight: 0.88 }),
    sourceEdge({ category: "smoke", from: createStableBrainMemoryId("smoke", "smoke-codexforge-brain-graph-ui"), to: visualGraph, edgeKind: "about", label: "validates graph UI", weight: 0.88 }),
    sourceEdge({ category: "smoke", from: createStableBrainMemoryId("smoke", "smoke-codexforge-cognitive-memory"), to: memoryClusters, edgeKind: "about", label: "validates memory", weight: 0.84 }),
    sourceEdge({ category: "smoke", from: createStableBrainMemoryId("smoke", "smoke-codexforge-cognitive-memory-runtime-integration"), to: brainRuntime, edgeKind: "about", label: "validates integration", weight: 0.86 }),
    sourceEdge({ category: "smoke", from: createStableBrainMemoryId("smoke", "smoke-codexforge-files-command-center"), to: filesCenter, edgeKind: "about", label: "validates files UI", weight: 0.82 }),

    sourceEdge({ category: "doc", from: canonicalDoc, to: brainRuntime, edgeKind: "about", label: "documents runtime", weight: 0.82 }),
    sourceEdge({ category: "doc", from: phasesDoc, to: PROJECT_ID, edgeKind: "about", label: "documents product phases", weight: 0.72 }),
    sourceEdge({ category: "doc", from: canonicalDoc, to: graphContracts, edgeKind: "references", label: "defines graph contracts", weight: 0.78 }),
    sourceEdge({ category: "doc", from: canonicalDoc, to: localFirst, edgeKind: "references", label: "local-first memory", weight: 0.78 }),

    sourceEdge({ category: "decision", from: explicitDecision, to: plan, edgeKind: "references", label: "guides plan", weight: 0.9 }),
    sourceEdge({ category: "decision", from: dedupeDecision, to: deterministic, edgeKind: "depends_on", label: "requires deterministic IDs", weight: 0.9 }),
    sourceEdge({ category: "decision", from: noNetworkDecision, to: localFirst, edgeKind: "depends_on", label: "keeps memory local", weight: 0.9 }),
    sourceEdge({ category: "decision", from: noNetworkDecision, to: safety, edgeKind: "references", label: "operator-safe ingestion", weight: 0.82 }),
    sourceEdge({ category: "plan", from: plan, to: task, edgeKind: "contains", label: "contains density task", weight: 0.86 }),
    sourceEdge({ category: "plan", from: plan, to: brainRuntime, edgeKind: "references", label: "extends runtime", weight: 0.86 }),
    sourceEdge({ category: "plan", from: plan, to: pageClient, edgeKind: "references", label: "adds UI action", weight: 0.82 }),
    sourceEdge({ category: "task", from: task, to: routeBrain, edgeKind: "about", label: "improves Brain route", weight: 0.84 }),
    sourceEdge({ category: "concept", from: deterministic, to: graphContracts, edgeKind: "depends_on", label: "uses canonical kinds", weight: 0.86 }),
    sourceEdge({ category: "concept", from: readOnly, to: explicitDecision, edgeKind: "references", label: "requires operator trigger", weight: 0.82 }),
  ];

  return edges;
}

function parseActivityTimestamp(date: string): number {
  const parsed = Date.parse(`${date}T00:00:00.000Z`);
  return Number.isFinite(parsed)
    ? parsed
    : CODEXFORGE_BRAIN_MEMORY_INGESTION_FIXED_TS;
}

function normalizeActivityStatus(
  status: CodexForgeBrainMemoryActivityEntry["status"]
): CodexForgeBrainMemorySourceNode["status"] {
  if (status === "done") return "done";
  if (status === "blocked") return "blocked";
  if (status === "active") return "active";
  return "idle";
}

function activityNodeKind(
  category: CodexForgeBrainMemoryActivityEntry["category"]
): CodexForgeBrainMemorySourceNode["nodeKind"] {
  if (category === "decision") return "decision";
  if (category === "plan") return "plan";
  if (category === "task") return "task";
  if (category === "research") return "research";
  if (category === "execution") return "run";
  if (category === "memory") return "memory";
  return "note";
}

function activityImportance(
  entry: CodexForgeBrainMemoryActivityEntry
): CodexForgeBrainMemorySourceNode["importance"] {
  if (entry.status === "blocked") return "critical";
  if (entry.category === "decision" || entry.category === "execution") return "high";
  if (entry.category === "memory" || entry.category === "plan" || entry.category === "task") return "medium";
  return "low";
}

function activityData(entry: CodexForgeBrainMemoryActivityEntry): Record<string, unknown> {
  const summary = entry.summary ?? entry.notes ?? entry.title;

  switch (entry.category) {
    case "decision":
      return {
        summary,
        rationale: entry.notes,
        nextAction: entry.status === "blocked" ? "Resolve the blocked decision." : undefined,
      };
    case "plan":
      return {
        goal: entry.title,
        nextAction: entry.notes,
        stepCount: 1,
      };
    case "task":
      return {
        goal: entry.title,
        nextAction: entry.notes,
      };
    case "research":
      return {
        findings: [summary],
        nextAction: entry.notes,
      };
    case "execution":
      return {
        phase: entry.status ?? "recorded",
        resultSummary: summary,
        logSummary: entry.notes ? [entry.notes] : undefined,
      };
    case "memory":
      return {
        memoryType: "fact",
        content: summary,
      };
    case "note":
    default:
      return {
        text: summary,
      };
  }
}

function buildActivitySourceNodeFacts(
  activityEntries: CodexForgeBrainMemoryActivityEntry[] = []
): CodexForgeBrainMemorySourceNode[] {
  return activityEntries
    .filter((entry) => entry.id?.trim() && entry.date?.trim() && entry.title?.trim())
    .slice()
    .sort((a, b) => {
      const dateDiff = parseActivityTimestamp(b.date) - parseActivityTimestamp(a.date);
      if (dateDiff !== 0) return dateDiff;
      return a.id.localeCompare(b.id);
    })
    .slice(0, 24)
    .map((entry) => {
      const ts = parseActivityTimestamp(entry.date);
      const id = createStableBrainMemoryId("activity", entry.category, entry.id);
      const entryTags = tags("activity", entry.category, ...(entry.tags ?? []));
      const summary = entry.summary ?? entry.notes ?? entry.title;

      return sourceNode({
        id,
        category: "activity",
        nodeKind: activityNodeKind(entry.category),
        label: entry.title,
        description: summary,
        summary,
        whyItMatters: "Local activity entries turn operator history into reusable Brain memory.",
        tags: entryTags,
        status: normalizeActivityStatus(entry.status),
        importance: activityImportance(entry),
        createdAt: ts,
        updatedAt: ts,
        sourceId: entry.id,
        sourceLabel: "Local activity history",
        sourceRefType: "history-entry",
        sourceRefId: entry.id,
        data: {
          ...activityData(entry),
          source: "local-activity-history",
          sourceId: entry.id,
          ts,
          lastRunAt: entry.category === "execution" ? ts : undefined,
        },
      });
    });
}

function buildActivitySourceEdgeFacts(
  activityEntries: CodexForgeBrainMemoryActivityEntry[] = []
): CodexForgeBrainMemorySourceEdge[] {
  return buildActivitySourceNodeFacts(activityEntries).flatMap((node) => [
    sourceEdge({
      category: "activity",
      from: HISTORY_ROUTE_ID,
      to: node.id,
      edgeKind: "contains",
      label: "contains activity entry",
      weight: 0.66,
      sourceLabel: "Local activity history",
      sourceRefType: "history-entry",
      sourceRefId: node.sourceRefId,
    }),
    sourceEdge({
      category: "activity",
      from: HISTORY_SUBSYSTEM_ID,
      to: node.id,
      edgeKind: "references",
      label: "indexes activity",
      weight: 0.62,
      sourceLabel: "Local activity history",
      sourceRefType: "history-entry",
      sourceRefId: node.sourceRefId,
    }),
    sourceEdge({
      category: "activity",
      from: node.id,
      to: ACTIVITY_CONCEPT_ID,
      edgeKind: "about",
      label: "activity memory",
      weight: 0.58,
      sourceLabel: "Local activity history",
      sourceRefType: "history-entry",
      sourceRefId: node.sourceRefId,
    }),
  ]);
}

export function buildBrainMemorySourceNodeFacts(
  input: CodexForgeBrainMemoryIngestionInput = {}
): CodexForgeBrainMemorySourceNode[] {
  return input.sourceNodes ?? [
    ...buildStaticSourceNodeFacts(),
    ...buildActivitySourceNodeFacts(input.activityEntries),
  ];
}

export function buildBrainMemorySourceEdgeFacts(
  input: CodexForgeBrainMemoryIngestionInput = {}
): CodexForgeBrainMemorySourceEdge[] {
  return input.sourceEdges ?? [
    ...buildStaticSourceEdgeFacts(),
    ...buildActivitySourceEdgeFacts(input.activityEntries),
  ];
}

function toGraphNode(
  node: CodexForgeBrainMemorySourceNode,
  fallbackTimestamp: number
): CodexForgeBrainNode {
  const createdAt = node.createdAt ?? fallbackTimestamp;
  const updatedAt = node.updatedAt ?? fallbackTimestamp;
  const baseTags = tags("brain-memory-ingestion", node.category, ...(node.tags ?? []));

  return {
    id: node.id,
    kind: node.nodeKind,
    data: {
      label: node.label,
      description: node.description,
      summary: node.summary,
      whyItMatters: node.whyItMatters,
      repoPath: node.repoPath,
      workspaceRoot: node.workspaceRoot,
      filePath: node.filePath,
      path: node.path,
      source: "brain-memory-ingestion",
      sourceId: node.sourceId ?? node.id,
      sourceLabel: node.sourceLabel ?? SOURCE_LABEL,
      tags: baseTags,
      domain: node.domain,
      ...(node.data ?? {}),
    } as CodexForgeBrainNode["data"],
    meta: {
      createdAt,
      updatedAt,
      status: node.status ?? "active",
      importance: node.importance ?? "medium",
      pinned: node.pinned,
      sourceRefs: [
        {
          type: node.sourceRefType ?? "derived",
          id: node.sourceRefId ?? `brain-memory-ingestion:${node.id}`,
        },
      ],
      version: 1,
    },
    ...(node.graph ? { graph: node.graph } : {}),
  } as CodexForgeBrainNode;
}

function toGraphEdge(
  edge: CodexForgeBrainMemorySourceEdge,
  fallbackTimestamp: number
): CodexForgeBrainEdge {
  return {
    id:
      edge.id ??
      createStableBrainMemoryEdgeId(edge.from, edge.to, edge.edgeKind, edge.label),
    kind: edge.edgeKind,
    from: edge.from,
    to: edge.to,
    label: edge.label,
    weight: edge.weight ?? 0.66,
    meta: {
      createdAt: fallbackTimestamp,
      updatedAt: fallbackTimestamp,
      status: "active",
      importance: "medium",
      sourceRefs: [
        {
          type: edge.sourceRefType ?? "derived",
          id:
            edge.sourceRefId ??
            `brain-memory-ingestion:${edge.from}:${edge.edgeKind}:${edge.to}`,
        },
      ],
      version: 1,
    },
  };
}

export function buildBrainMemorySourceNodes(
  input: CodexForgeBrainMemoryIngestionInput = {}
): CodexForgeBrainNode[] {
  const now = resolveTimestamp(input.now);
  return buildBrainMemorySourceNodeFacts(input).map((node) => toGraphNode(node, now));
}

export function buildBrainMemorySourceEdges(
  input: CodexForgeBrainMemoryIngestionInput = {}
): CodexForgeBrainEdge[] {
  const now = resolveTimestamp(input.now);
  const nodeIds = new Set(buildBrainMemorySourceNodes(input).map((node) => node.id));

  return buildBrainMemorySourceEdgeFacts(input)
    .filter((edge) => nodeIds.has(edge.from) && nodeIds.has(edge.to))
    .map((edge) => toGraphEdge(edge, now));
}

export function buildBrainMemorySourceGraph(
  input: CodexForgeBrainMemoryIngestionInput = {}
): CodexForgeBrainGraph {
  const now = resolveTimestamp(input.now);

  return {
    version: CODEXFORGE_BRAIN_GRAPH_VERSION,
    nodes: buildBrainMemorySourceNodes({ ...input, now }),
    edges: buildBrainMemorySourceEdges({ ...input, now }),
    meta: {
      createdAt: now,
      updatedAt: now,
      workspaceId: "codexforge",
      projectId: "codexforge-foundation",
      repoPath: "repos/codexforge/foundation",
    },
  };
}
