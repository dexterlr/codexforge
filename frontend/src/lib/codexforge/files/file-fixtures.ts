import {
  inferArchitectureRole,
  inferFileKind,
  inferOwnerArea,
  inferRelatedConcepts,
  summarizeFilePurpose,
} from "./file-intelligence";
import type {
  CodexForgeFileDependency,
  CodexForgeFileExecutionHistoryItem,
  CodexForgeFileInsight,
  CodexForgeFileNode,
  CodexForgeFileTimelineItem,
} from "./types";

const FIXED_TIMESTAMPS = {
  phase1: "2026-04-15T09:00:00.000Z",
  phase1b: "2026-04-22T10:30:00.000Z",
  phase2: "2026-05-04T12:00:00.000Z",
  phase2b: "2026-05-08T16:15:00.000Z",
  phase3a: "2026-05-12T12:00:00.000Z",
};

const DEPENDENCIES: CodexForgeFileDependency[] = [
  {
    id: "dep-chat-route-runtime",
    fromPath: "src/app/api/codexforge/chat/route.ts",
    toPath: "src/lib/codexforge/brain/runtime/runtime.ts",
    kind: "calls",
    strength: "strong",
    summary: "Chat route feeds execution events into the brain runtime boundary.",
  },
  {
    id: "dep-runtime-memory",
    fromPath: "src/lib/codexforge/brain/runtime/runtime.ts",
    toPath: "src/lib/codexforge/brain/runtime/memory/index.ts",
    kind: "imports",
    strength: "strong",
    summary: "Runtime exposes memory signals through the cognitive memory layer.",
  },
  {
    id: "dep-files-components",
    fromPath: "src/app/files/page.tsx",
    toPath: "src/lib/codexforge/files/components/files-command-center.tsx",
    kind: "renders",
    strength: "strong",
    summary: "Files route renders the command center as a product surface.",
  },
  {
    id: "dep-files-risk-search",
    fromPath: "src/lib/codexforge/files/components/files-command-center.tsx",
    toPath: "src/lib/codexforge/files/file-risk.ts",
    kind: "imports",
    strength: "medium",
    summary: "Command center uses deterministic risk summaries for inspection.",
  },
  {
    id: "dep-tools-files",
    fromPath: "src/lib/codexforge/tools/list-files.ts",
    toPath: "src/lib/codexforge/tools/read-file.ts",
    kind: "documents",
    strength: "weak",
    summary: "Local filesystem tools share workspace guardrail patterns.",
  },
  {
    id: "dep-smoke-files",
    fromPath: "scripts/smoke-codexforge-files-ux.ps1",
    toPath: "src/lib/codexforge/files/components/files-command-center.tsx",
    kind: "validates",
    strength: "strong",
    summary: "Files UX smoke locks route, markers, actions, and safety language.",
  },
];

type FixtureSeed = {
  path: string;
  area: string;
  lastTouchedAt: string;
  lineCount: number;
  tags: string[];
  relatedMemory: string[];
};

const SEEDS: FixtureSeed[] = [
  {
    path: "src/app/api/codexforge/chat/route.ts",
    area: "Chat route",
    lastTouchedAt: FIXED_TIMESTAMPS.phase2b,
    lineCount: 640,
    tags: ["entrypoint", "server", "runtime", "recent"],
    relatedMemory: ["Phase 1 canonical brain runtime", "Phase 2B runtime memory signals"],
  },
  {
    path: "src/app/ai/page.tsx",
    area: "AI workspace",
    lastTouchedAt: FIXED_TIMESTAMPS.phase2b,
    lineCount: 430,
    tags: ["component", "chat", "workspace", "recent"],
    relatedMemory: ["Runtime self-awareness panel", "Cognitive memory sidebar"],
  },
  {
    path: "src/lib/codexforge/brain/runtime/runtime.ts",
    area: "Brain runtime",
    lastTouchedAt: FIXED_TIMESTAMPS.phase1b,
    lineCount: 290,
    tags: ["runtime", "core", "tested"],
    relatedMemory: ["Canonical runtime orchestration", "Execution lineage"],
  },
  {
    path: "src/lib/codexforge/brain/runtime/runtime-types.ts",
    area: "Brain runtime",
    lastTouchedAt: FIXED_TIMESTAMPS.phase1,
    lineCount: 260,
    tags: ["runtime", "schema", "core"],
    relatedMemory: ["Stable brain runtime contracts"],
  },
  {
    path: "src/lib/codexforge/brain/runtime/memory/index.ts",
    area: "Cognitive memory",
    lastTouchedAt: FIXED_TIMESTAMPS.phase2,
    lineCount: 120,
    tags: ["memory", "runtime", "tested"],
    relatedMemory: ["Cognitive memory exports", "Semantic dedupe"],
  },
  {
    path: "src/lib/codexforge/brain/runtime/memory/memory-fixtures.ts",
    area: "Cognitive memory",
    lastTouchedAt: FIXED_TIMESTAMPS.phase2,
    lineCount: 210,
    tags: ["memory", "fixtures", "deterministic"],
    relatedMemory: ["Fixed-memory smoke substrate"],
  },
  {
    path: "src/lib/codexforge/tools/list-files.ts",
    area: "Local tools",
    lastTouchedAt: FIXED_TIMESTAMPS.phase2b,
    lineCount: 370,
    tags: ["tool", "filesystem", "safe", "tested"],
    relatedMemory: ["Workspace guarded list operation"],
  },
  {
    path: "src/lib/codexforge/tools/read-file.ts",
    area: "Local tools",
    lastTouchedAt: FIXED_TIMESTAMPS.phase2b,
    lineCount: 330,
    tags: ["tool", "filesystem", "safe", "tested"],
    relatedMemory: ["Text-only guarded read operation"],
  },
  {
    path: "src/lib/codexforge/tools/search-project.ts",
    area: "Local tools",
    lastTouchedAt: FIXED_TIMESTAMPS.phase2b,
    lineCount: 470,
    tags: ["tool", "search", "safe", "tested"],
    relatedMemory: ["Ranked local project search"],
  },
  {
    path: "src/app/files/page.tsx",
    area: "Files command center",
    lastTouchedAt: FIXED_TIMESTAMPS.phase3a,
    lineCount: 32,
    tags: ["entrypoint", "files", "recent"],
    relatedMemory: ["Phase 3A Files UX foundation"],
  },
  {
    path: "src/lib/codexforge/files/components/files-command-center.tsx",
    area: "Files command center",
    lastTouchedAt: FIXED_TIMESTAMPS.phase3a,
    lineCount: 420,
    tags: ["component", "files", "risk", "recent"],
    relatedMemory: ["AI-native file operating surface"],
  },
  {
    path: "scripts/smoke-codexforge-brain-runtime.ps1",
    area: "Smoke validation",
    lastTouchedAt: FIXED_TIMESTAMPS.phase1b,
    lineCount: 150,
    tags: ["smoke", "brain", "tested"],
    relatedMemory: ["Brain runtime regression protection"],
  },
  {
    path: "scripts/smoke-codexforge-cognitive-memory.ps1",
    area: "Smoke validation",
    lastTouchedAt: FIXED_TIMESTAMPS.phase2,
    lineCount: 170,
    tags: ["smoke", "memory", "tested"],
    relatedMemory: ["Cognitive memory regression protection"],
  },
  {
    path: "scripts/smoke-codexforge-all.ps1",
    area: "Smoke validation",
    lastTouchedAt: FIXED_TIMESTAMPS.phase2b,
    lineCount: 150,
    tags: ["smoke", "suite", "tested"],
    relatedMemory: ["Managed CodexForge smoke suite"],
  },
];

function buildTimeline(seed: FixtureSeed): CodexForgeFileTimelineItem[] {
  return [
    {
      id: `${seed.path}-planned`,
      timestamp: FIXED_TIMESTAMPS.phase1,
      label: "Architecture intent captured",
      detail: `${seed.area} joined the CodexForge operating model.`,
      kind: "planned",
    },
    {
      id: `${seed.path}-validated`,
      timestamp: seed.lastTouchedAt,
      label: "Latest deterministic touchpoint",
      detail: "Tracked by local fixtures for Phase 3A file intelligence.",
      kind: seed.tags.includes("tested") ? "validated" : "changed",
    },
  ];
}

function buildExecutionHistory(seed: FixtureSeed): CodexForgeFileExecutionHistoryItem[] {
  const command = seed.path.includes("scripts/")
    ? `powershell -ExecutionPolicy Bypass -File ./${seed.path.replaceAll("/", "\\")}`
    : "npm run build";

  return [
    {
      id: `${seed.path}-execution-build`,
      timestamp: FIXED_TIMESTAMPS.phase2b,
      command,
      status: seed.tags.includes("tested") ? "passed" : "skipped",
      summary: seed.tags.includes("tested")
        ? "Covered by managed smoke or build validation."
        : "No direct execution result attached yet.",
    },
  ];
}

function buildInsights(seed: FixtureSeed): CodexForgeFileInsight[] {
  return [
    {
      id: `${seed.path}-role`,
      label: "Architecture role",
      value: inferOwnerArea(seed.path),
      detail: inferArchitectureRole(seed.path),
    },
    {
      id: `${seed.path}-concepts`,
      label: "Related concepts",
      value: inferRelatedConcepts(seed.path).join(", "),
      detail: "Derived from deterministic path and ownership heuristics.",
    },
  ];
}

function dependencyIdsFor(path: string): string[] {
  return DEPENDENCIES
    .filter((dependency) => dependency.fromPath === path || dependency.toPath === path)
    .map((dependency) => dependency.id)
    .sort();
}

function buildFileNode(seed: FixtureSeed): CodexForgeFileNode {
  const name = seed.path.split("/").pop() ?? seed.path;
  const kind = inferFileKind(seed.path);

  return {
    id: seed.path,
    path: seed.path,
    name,
    kind,
    area: seed.area,
    ownerArea: inferOwnerArea(seed.path),
    architectureRole: inferArchitectureRole(seed.path),
    summary: summarizeFilePurpose(seed.path),
    extension: name.includes(".") ? `.${name.split(".").pop() ?? ""}` : "",
    tags: [...seed.tags].sort(),
    concepts: inferRelatedConcepts(seed.path),
    relatedMemory: [...seed.relatedMemory].sort(),
    lastTouchedAt: seed.lastTouchedAt,
    lineCount: seed.lineCount,
    dependencyIds: dependencyIdsFor(seed.path),
    timeline: buildTimeline(seed),
    executionHistory: buildExecutionHistory(seed),
    insights: buildInsights(seed),
    safeEditPreview: {
      id: `${seed.path}-safe-preview`,
      filePath: seed.path,
      title: "Safe edit preview",
      previewOnly: true,
      summary: "Preview-only patch planning. No overwrite happens without explicit approval.",
      proposedSteps: [
        "Inspect dependencies and current behavior.",
        "Prepare the smallest typed change.",
        "Run targeted smoke and build validation before any apply step.",
      ],
      riskHints: [
        "Check runtime and route boundaries first.",
        "Watch high-coupling files for downstream blast radius.",
      ],
      rollbackHints: [
        "Keep changes isolated by file.",
        "Prefer reviewable diffs and preserve existing contracts.",
      ],
      testHints: [
        "Run npm run build.",
        "Run the nearest CodexForge smoke script.",
      ],
    },
  };
}

export const codexForgeFileDependencies: CodexForgeFileDependency[] = DEPENDENCIES;
export const codexForgeFileFixtures: CodexForgeFileNode[] = SEEDS.map(buildFileNode);
export const codexForgeFileFixtureTimestamps = FIXED_TIMESTAMPS;
