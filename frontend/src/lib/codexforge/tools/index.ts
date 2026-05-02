import type {
  CodexForgeToolDefinition,
  CodexForgeToolDomain,
  CodexForgeToolRegistry,
} from "./contracts";
import { createCodexForgeToolRegistry } from "./contracts";
import {
  CODEXFORGE_TOOL_REGISTRY_VERSION,
  createStubTool,
  dedupeStrings,
} from "./shared";

export type {
  CodexForgeToolAvailability,
  CodexForgeToolCapability,
  CodexForgeToolDefinition,
  CodexForgeToolDomain,
  CodexForgeToolExecutionContext,
  CodexForgeToolExecutionRequest,
  CodexForgeToolExecutionResponse,
  CodexForgeToolMetadata,
  CodexForgeToolRegistry,
  CodexForgeToolResult,
  CodexForgeToolSafetyLevel,
} from "./contracts";

/* ================= DOMAIN ORDER ================= */

const TOOL_DOMAIN_ORDER: Record<CodexForgeToolDomain, number> = {
  core: 0,
  repo: 1,
  web: 2,
  research: 3,
  debug: 4,
  automation: 5,
  "game-server": 6,
  movie: 7,
  video: 8,
  comfyui: 9,
  unreal: 10,
  meeting: 11,
  desktop: 12,
  system: 13,
  media: 14,
};

const TOOL_DOMAIN_VALUES: readonly CodexForgeToolDomain[] = [
  "core",
  "repo",
  "web",
  "research",
  "debug",
  "automation",
  "game-server",
  "movie",
  "video",
  "comfyui",
  "unreal",
  "meeting",
  "desktop",
  "system",
  "media",
] as const;

/* ================= TOOL NAME UNION ================= */

export type CodexForgeToolName =
  | "read-file"
  | "list-files"
  | "write-file"
  | "search-project"
  | "run-command"
  | "generate-diff"
  | "apply-diff"
  | "snapshot-project"
  | "run-tests"
  | "inspect-logs"
  | "build-web-app"
  | "scaffold-website"
  | "manage-api-route"
  | "configure-game-server"
  | "install-server-plugin"
  | "manage-server-world"
  | "generate-movie-plan"
  | "generate-storyboard"
  | "generate-shot-list"
  | "assemble-video-pipeline"
  | "manage-audio-pipeline"
  | "run-comfy-workflow"
  | "manage-comfy-assets"
  | "manage-unreal-project"
  | "generate-unreal-sequence"
  | "package-unreal-build"
  | "capture-meeting-notes"
  | "transcribe-session"
  | "research-topic"
  | "compare-options"
  | "track-memory"
  | "orchestrate-workflow"
  | "launch-app"
  | "desktop-vision"
  | "speak-response"
  | "record-session"
  | "browse-web"
  | "control-desktop";

/* ================= NORMALIZATION ================= */

function cleanText(value: string): string {
  return value.trim();
}

function cleanTag(tag: string): string {
  return tag.trim().toLowerCase();
}

function uniqueStrings(values: string[]): string[] {
  return dedupeStrings(values);
}

function normalizeTags(tags: string[]): string[] {
  return uniqueStrings(tags.map(cleanTag)).sort((a, b) => a.localeCompare(b));
}

function tokenizeSearchQuery(query: string): string[] {
  return uniqueStrings(
    query
      .toLowerCase()
      .split(/\s+/)
      .map((part) => part.trim())
      .filter(Boolean)
  );
}

function buildToolSearchText(tool: CodexForgeToolDefinition): string {
  return [
    tool.name,
    tool.label,
    tool.domain,
    tool.availability,
    tool.safety,
    tool.description,
    ...tool.tags,
    ...(tool.metadata?.tags ?? []),
  ]
    .join(" ")
    .toLowerCase();
}

/* ================= TOOL FACTORIES ================= */

function defineStubTool(args: {
  name: CodexForgeToolName;
  label: string;
  description: string;
  domain: CodexForgeToolDomain;
  tags: string[];
  capabilities: CodexForgeToolDefinition["capabilities"];
  safety?: CodexForgeToolDefinition["safety"];
  parameters?: CodexForgeToolDefinition["parameters"];
  examples?: CodexForgeToolDefinition["examples"];
  metadata?: CodexForgeToolDefinition["metadata"];
}): CodexForgeToolDefinition {
  return createStubTool({
    name: args.name,
    label: cleanText(args.label),
    description: cleanText(args.description),
    domain: args.domain,
    safety: args.safety ?? "guarded",
    capabilities: args.capabilities,
    tags: normalizeTags(args.tags),
    parameters: args.parameters ?? [],
    examples: args.examples,
    metadata: args.metadata,
  });
}

function defineReadyDescriptor(args: {
  name: CodexForgeToolName;
  label: string;
  description: string;
  domain: CodexForgeToolDomain;
  safety: CodexForgeToolDefinition["safety"];
  capabilities: CodexForgeToolDefinition["capabilities"];
  tags: string[];
  parameters?: CodexForgeToolDefinition["parameters"];
  examples?: CodexForgeToolDefinition["examples"];
  metadata?: CodexForgeToolDefinition["metadata"];
}): CodexForgeToolDefinition {
  return {
    name: args.name,
    label: cleanText(args.label),
    description: cleanText(args.description),
    availability: "ready",
    domain: args.domain,
    safety: args.safety,
    capabilities: args.capabilities,
    tags: normalizeTags(args.tags),
    parameters: args.parameters ?? [],
    examples: args.examples,
    metadata: args.metadata,
  };
}

/* ================= READY DESCRIPTORS (CLIENT SAFE) ================= */

const READY_TOOL_REGISTRY: CodexForgeToolDefinition[] = [
  defineReadyDescriptor({
    name: "read-file",
    label: "Read File",
    domain: "repo",
    safety: "safe",
    capabilities: ["read", "inspect"],
    tags: ["repo", "files", "read", "source", "content", "safe"],
    description:
      "Read a text file from the active project with workspace guardrails, truncation, and metadata.",
    parameters: [
      {
        name: "path",
        type: "string",
        description: "Project-relative or absolute file path to read.",
        required: true,
      },
      {
        name: "includeLineNumbers",
        type: "boolean",
        description: "Whether to prefix returned lines with line numbers.",
        required: false,
        defaultValue: true,
      },
      {
        name: "maxChars",
        type: "number",
        description: "Optional character cap for returned file content.",
        required: false,
        defaultValue: 40000,
      },
    ],
    metadata: {
      provider: "local",
      version: "codexforge-read-file-v1",
      requiresRuntime: "server",
      supportedPlatforms: ["windows", "linux", "darwin"],
      tags: ["filesystem", "workspace-guarded", "server-only"],
    },
  }),

  defineReadyDescriptor({
    name: "list-files",
    label: "List Files",
    domain: "repo",
    safety: "safe",
    capabilities: ["read", "inspect"],
    tags: ["repo", "files", "discovery", "tree", "folders", "safe"],
    description:
      "List project files and folders with guarded workspace scope, recursion controls, and structured directory summaries.",
    parameters: [
      {
        name: "path",
        type: "string",
        description: "Optional folder path to inspect.",
        required: false,
      },
      {
        name: "recursive",
        type: "boolean",
        description: "Whether to recurse into subfolders.",
        required: false,
        defaultValue: false,
      },
      {
        name: "includeHidden",
        type: "boolean",
        description: "Whether hidden dotfiles and dotfolders should be included.",
        required: false,
        defaultValue: false,
      },
    ],
    metadata: {
      provider: "local",
      version: "codexforge-list-files-v1",
      requiresRuntime: "server",
      supportedPlatforms: ["windows", "linux", "darwin"],
      tags: ["filesystem", "workspace-guarded", "server-only"],
    },
  }),

  defineReadyDescriptor({
    name: "search-project",
    label: "Search Project",
    domain: "repo",
    safety: "safe",
    capabilities: ["search", "inspect", "read"],
    tags: ["repo", "search", "codebase", "symbols", "references", "safe"],
    description:
      "Search the active project for filenames and content matches with ranking, previews, and guarded workspace scope.",
    parameters: [
      {
        name: "query",
        type: "string",
        description: "Search query or regex pattern.",
        required: true,
      },
      {
        name: "path",
        type: "string",
        description: "Optional folder or file path to narrow the search.",
        required: false,
      },
      {
        name: "recursive",
        type: "boolean",
        description: "Whether to recurse into subfolders.",
        required: false,
        defaultValue: true,
      },
    ],
    metadata: {
      provider: "local",
      version: "codexforge-search-project-v1",
      requiresRuntime: "server",
      supportedPlatforms: ["windows", "linux", "darwin"],
      tags: ["filesystem", "workspace-guarded", "server-only"],
    },
  }),

  defineReadyDescriptor({
    name: "run-command",
    label: "Run Command",
    domain: "core",
    safety: "elevated",
    capabilities: ["execute"],
    tags: ["command", "execution", "shell", "cli", "terminal"],
    description:
      "Run a guarded shell command inside the workspace with cwd validation, timeout handling, output clamping, and dry-run support.",
    parameters: [
      {
        name: "command",
        type: "string",
        description: "Command line to execute.",
        required: true,
      },
      {
        name: "cwd",
        type: "string",
        description: "Optional working directory.",
        required: false,
      },
      {
        name: "dryRun",
        type: "boolean",
        description: "Whether to validate the command without running it.",
        required: false,
        defaultValue: false,
      },
    ],
    metadata: {
      provider: "local",
      version: "codexforge-run-command-v1",
      requiresRuntime: "server",
      supportedPlatforms: ["windows", "linux", "darwin"],
      tags: ["process", "workspace-guarded", "server-only"],
    },
  }),

  defineReadyDescriptor({
    name: "generate-diff",
    label: "Generate Diff",
    domain: "repo",
    safety: "guarded",
    capabilities: ["diff", "read", "inspect"],
    tags: ["diff", "preview", "edit", "patch", "proposal"],
    description:
      "Generate a unified diff preview for a proposed full-file replacement with workspace guardrails and structured diff metadata.",
    parameters: [
      {
        name: "path",
        type: "string",
        description: "Project-relative or absolute target file path.",
        required: true,
      },
      {
        name: "content",
        type: "string",
        description: "Proposed full replacement content.",
        required: true,
      },
    ],
    metadata: {
      provider: "local",
      version: "codexforge-generate-diff-v1",
      requiresRuntime: "server",
      supportedPlatforms: ["windows", "linux", "darwin"],
      tags: ["filesystem", "workspace-guarded", "server-only", "preview"],
    },
  }),

  defineReadyDescriptor({
    name: "apply-diff",
    label: "Apply Diff",
    domain: "repo",
    safety: "elevated",
    capabilities: ["diff", "write"],
    tags: ["diff", "apply", "mutation", "patch"],
    description:
      "Apply a unified diff to a workspace-scoped file with guarded path validation, dry-run support, backup creation, and structured apply metadata.",
    parameters: [
      {
        name: "path",
        type: "string",
        description: "Project-relative or absolute target file path.",
        required: true,
      },
      {
        name: "patch",
        type: "string",
        description: "Unified diff patch to apply.",
        required: true,
      },
      {
        name: "dryRun",
        type: "boolean",
        description: "Whether to validate and compute without writing.",
        required: false,
        defaultValue: true,
      },
    ],
    metadata: {
      provider: "local",
      version: "codexforge-apply-diff-v1",
      requiresRuntime: "server",
      supportedPlatforms: ["windows", "linux", "darwin"],
      tags: ["filesystem", "workspace-guarded", "server-only", "mutation"],
    },
  }),

  defineReadyDescriptor({
    name: "snapshot-project",
    label: "Snapshot Project",
    domain: "repo",
    safety: "safe",
    capabilities: ["snapshot", "read", "inspect"],
    tags: ["snapshot", "repo", "state", "inventory", "hash"],
    description:
      "Capture a guarded project snapshot with file metadata, hashes, optional lightweight content capture, and deterministic snapshot identity.",
    metadata: {
      provider: "local",
      version: "codexforge-snapshot-project-v1",
      requiresRuntime: "server",
      supportedPlatforms: ["windows", "linux", "darwin"],
      tags: ["filesystem", "workspace-guarded", "server-only", "state-capture"],
    },
  }),

  defineReadyDescriptor({
    name: "run-tests",
    label: "Run Tests",
    domain: "repo",
    safety: "guarded",
    capabilities: ["execute", "inspect"],
    tags: ["test", "validation", "build", "lint", "verification"],
    description:
      "Run structured validation commands such as tests, builds, and linting through the guarded command runner with aggregated results.",
    parameters: [
      {
        name: "command",
        type: "string",
        description: "Optional single validation command to run.",
        required: false,
      },
      {
        name: "commands",
        type: "string[]",
        description: "Optional ordered list of validation commands to run.",
        required: false,
      },
      {
        name: "mode",
        type: "enum",
        description: "Validation execution mode.",
        required: false,
        enumValues: ["first-success", "all", "single"],
        defaultValue: "first-success",
      },
    ],
    metadata: {
      provider: "local",
      version: "codexforge-run-tests-v1",
      requiresRuntime: "server",
      supportedPlatforms: ["windows", "linux", "darwin"],
      tags: ["validation", "command-wrapper", "server-only"],
    },
  }),

  defineReadyDescriptor({
    name: "build-web-app",
    label: "Build Web App",
    domain: "web",
    safety: "guarded",
    capabilities: ["workflow", "read", "write"],
    tags: ["web", "app", "implementation", "frontend", "planning", "routes", "state"],
    description:
      "Plan and structure implementation of websites, dashboards, and local-first web apps.",
    parameters: [
      {
        name: "goal",
        type: "string",
        description: "High-level outcome for the web app or website.",
        required: true,
      },
      {
        name: "appType",
        type: "string",
        description: "Optional app classification such as dashboard or landing page.",
        required: false,
      },
      {
        name: "routes",
        type: "string[]",
        description: "Optional explicit route list.",
        required: false,
      },
      {
        name: "features",
        type: "string[]",
        description: "Optional explicit core feature list.",
        required: false,
      },
      {
        name: "constraints",
        type: "string[]",
        description: "Optional delivery or architecture constraints.",
        required: false,
      },
      {
        name: "designStyle",
        type: "string",
        description: "Optional style direction for the experience.",
        required: false,
      },
      {
        name: "targetPath",
        type: "string",
        description: "Optional primary app path such as src/app.",
        required: false,
        defaultValue: "src/app",
      },
      {
        name: "includeApi",
        type: "boolean",
        description: "Whether API surfaces should be proposed.",
        required: false,
        defaultValue: true,
      },
      {
        name: "includeStateModel",
        type: "boolean",
        description: "Whether state ownership should be explicitly planned.",
        required: false,
        defaultValue: true,
      },
      {
        name: "includeTestingPlan",
        type: "boolean",
        description: "Whether validation steps should be included.",
        required: false,
        defaultValue: true,
      },
      {
        name: "includeRolloutPlan",
        type: "boolean",
        description: "Whether rollout steps should be included.",
        required: false,
        defaultValue: true,
      },
    ],
    metadata: {
      provider: "local",
      version: "codexforge-build-web-app-v1",
      requiresRuntime: "server",
      supportedPlatforms: ["windows", "linux", "darwin"],
      tags: ["planning", "web", "server-only"],
    },
  }),
];

/* ================= STUB TOOLS ================= */

const STUB_TOOL_REGISTRY: CodexForgeToolDefinition[] = [
  defineStubTool({
    name: "write-file",
    label: "Write File",
    domain: "repo",
    safety: "elevated",
    capabilities: ["write"],
    tags: ["repo", "files", "write", "mutation", "save"],
    description:
      "Write or replace approved project files when explicit mutation is enabled.",
    parameters: [
      {
        name: "path",
        type: "string",
        description: "File path to write.",
        required: true,
      },
      {
        name: "content",
        type: "string",
        description: "Full file contents.",
        required: true,
      },
    ],
  }),

  defineStubTool({
    name: "inspect-logs",
    label: "Inspect Logs",
    domain: "debug",
    safety: "safe",
    capabilities: ["read", "inspect", "search"],
    tags: ["logs", "debug", "runtime", "trace", "errors"],
    description:
      "Inspect runtime output, build logs, or execution traces to support debugging workflows.",
  }),

  defineStubTool({
    name: "scaffold-website",
    label: "Scaffold Website",
    domain: "web",
    safety: "guarded",
    capabilities: ["workflow", "write"],
    tags: ["web", "scaffold", "pages", "routes", "ui"],
    description:
      "Scaffold website structures such as pages, sections, routes, and supporting UI surfaces.",
  }),

  defineStubTool({
    name: "manage-api-route",
    label: "Manage API Route",
    domain: "web",
    safety: "guarded",
    capabilities: ["workflow", "read", "write"],
    tags: ["web", "api", "route", "backend", "contract"],
    description:
      "Create or evolve API routes and backend contracts that support application workflows.",
  }),

  defineStubTool({
    name: "configure-game-server",
    label: "Configure Game Server",
    domain: "game-server",
    safety: "guarded",
    capabilities: ["workflow", "read", "write"],
    tags: ["minecraft", "server", "config", "hosting"],
    description:
      "Plan and configure themed game server setups such as Minecraft stacks, hosting, and server rules.",
  }),

  defineStubTool({
    name: "install-server-plugin",
    label: "Install Server Plugin",
    domain: "game-server",
    safety: "elevated",
    capabilities: ["workflow", "write", "execute"],
    tags: ["minecraft", "plugin", "mod", "compatibility"],
    description:
      "Manage plugin or mod selection, compatibility, and rollout planning for game servers.",
  }),

  defineStubTool({
    name: "manage-server-world",
    label: "Manage Server World",
    domain: "game-server",
    safety: "guarded",
    capabilities: ["workflow", "write"],
    tags: ["minecraft", "world", "content", "events", "backups"],
    description:
      "Plan world themes, gameplay loops, event content, and backup-safe rollout for servers.",
  }),

  defineStubTool({
    name: "generate-movie-plan",
    label: "Generate Movie Plan",
    domain: "movie",
    safety: "guarded",
    capabilities: ["workflow", "image", "video"],
    tags: ["movie", "script", "planning", "production"],
    description:
      "Turn a concept or script into a structured movie production plan with phases and deliverables.",
  }),

  defineStubTool({
    name: "generate-storyboard",
    label: "Generate Storyboard",
    domain: "movie",
    safety: "guarded",
    capabilities: ["workflow", "image"],
    tags: ["movie", "storyboard", "preproduction", "shots"],
    description:
      "Break scripts or scenes into storyboard-ready visual planning units.",
  }),

  defineStubTool({
    name: "generate-shot-list",
    label: "Generate Shot List",
    domain: "movie",
    safety: "guarded",
    capabilities: ["workflow", "video"],
    tags: ["movie", "shots", "sequence", "cinematic"],
    description:
      "Produce shot-by-shot planning for cinematic sequences, scenes, or short films.",
  }),

  defineStubTool({
    name: "assemble-video-pipeline",
    label: "Assemble Video Pipeline",
    domain: "video",
    safety: "guarded",
    capabilities: ["workflow", "video", "audio", "image"],
    tags: ["video", "pipeline", "text-to-video", "render"],
    description:
      "Plan text-to-video, sequence generation, render staging, and export workflows.",
  }),

  defineStubTool({
    name: "manage-audio-pipeline",
    label: "Manage Audio Pipeline",
    domain: "video",
    safety: "guarded",
    capabilities: ["workflow", "audio", "speech"],
    tags: ["audio", "voice", "music", "sync"],
    description:
      "Coordinate voice, music, sound design, and sync planning for video or film outputs.",
  }),

  defineStubTool({
    name: "run-comfy-workflow",
    label: "Run Comfy Workflow",
    domain: "comfyui",
    safety: "guarded",
    capabilities: ["workflow", "image", "video"],
    tags: ["comfyui", "workflow", "generation", "graph"],
    description:
      "Run or plan ComfyUI workflows with reusable graphs, prompts, models, and generation stages.",
  }),

  defineStubTool({
    name: "manage-comfy-assets",
    label: "Manage Comfy Assets",
    domain: "comfyui",
    safety: "guarded",
    capabilities: ["workflow", "image", "memory"],
    tags: ["comfyui", "assets", "outputs", "tracking"],
    description:
      "Track ComfyUI models, prompts, outputs, and naming conventions for repeatable workflows.",
  }),

  defineStubTool({
    name: "manage-unreal-project",
    label: "Manage Unreal Project",
    domain: "unreal",
    safety: "guarded",
    capabilities: ["workflow", "read", "write"],
    tags: ["unreal", "project", "game-dev", "structure"],
    description:
      "Guide Unreal Engine project setup, structure, implementation surfaces, and workflow planning.",
  }),

  defineStubTool({
    name: "generate-unreal-sequence",
    label: "Generate Unreal Sequence",
    domain: "unreal",
    safety: "guarded",
    capabilities: ["workflow", "video", "image"],
    tags: ["unreal", "sequencer", "cinematic", "sequence"],
    description:
      "Plan gameplay or cinematic sequences for Unreal using explicit production steps.",
  }),

  defineStubTool({
    name: "package-unreal-build",
    label: "Package Unreal Build",
    domain: "unreal",
    safety: "elevated",
    capabilities: ["workflow", "execute"],
    tags: ["unreal", "build", "packaging", "release"],
    description:
      "Prepare packaging, validation, and release workflow planning for Unreal projects.",
  }),

  defineStubTool({
    name: "capture-meeting-notes",
    label: "Capture Meeting Notes",
    domain: "meeting",
    safety: "guarded",
    capabilities: ["speech", "audio", "memory"],
    tags: ["meeting", "notes", "summary", "actions"],
    description:
      "Capture structured meeting notes, action items, and follow-ups from live or recorded sessions.",
  }),

  defineStubTool({
    name: "transcribe-session",
    label: "Transcribe Session",
    domain: "meeting",
    safety: "guarded",
    capabilities: ["speech", "audio"],
    tags: ["meeting", "transcription", "audio", "summary"],
    description:
      "Transcribe spoken sessions and transform them into structured summaries and tasks.",
  }),

  defineStubTool({
    name: "research-topic",
    label: "Research Topic",
    domain: "research",
    safety: "external",
    capabilities: ["search", "browser", "read"],
    tags: ["research", "analysis", "evidence", "findings", "web"],
    description:
      "Research a topic, gather evidence, and return a structured findings summary.",
  }),

  defineStubTool({
    name: "compare-options",
    label: "Compare Options",
    domain: "research",
    safety: "guarded",
    capabilities: ["search", "read", "workflow"],
    tags: ["research", "compare", "decision", "tradeoffs"],
    description:
      "Compare tools, stacks, or approaches using explicit criteria and trade-offs.",
  }),

  defineStubTool({
    name: "track-memory",
    label: "Track Memory",
    domain: "core",
    safety: "guarded",
    capabilities: ["memory", "read", "write"],
    tags: ["memory", "workspace", "state", "context"],
    description:
      "Track stable workspace memory, project facts, decisions, and reusable context.",
  }),

  defineStubTool({
    name: "orchestrate-workflow",
    label: "Orchestrate Workflow",
    domain: "automation",
    safety: "guarded",
    capabilities: ["workflow", "execute", "memory"],
    tags: ["automation", "workflow", "orchestration", "stages"],
    description:
      "Coordinate multi-stage workflows across planning, generation, review, and execution surfaces.",
  }),

  defineStubTool({
    name: "launch-app",
    label: "Launch App",
    domain: "desktop",
    safety: "elevated",
    capabilities: ["app-launch", "desktop-control", "execute"],
    tags: ["desktop", "apps", "launch", "windows", "programs"],
    description:
      "Launch an approved desktop application on the local machine when desktop integration is enabled.",
  }),

  defineStubTool({
    name: "desktop-vision",
    label: "Desktop Vision",
    domain: "desktop",
    safety: "guarded",
    capabilities: ["vision", "desktop-control", "inspect"],
    tags: ["desktop", "vision", "screen", "ui", "analysis"],
    description:
      "Inspect the desktop visually to understand app state, windows, and user interface context.",
  }),

  defineStubTool({
    name: "speak-response",
    label: "Speak Response",
    domain: "media",
    safety: "guarded",
    capabilities: ["speech", "audio"],
    tags: ["speech", "voice", "tts", "audio"],
    description:
      "Turn assistant output into spoken audio when voice output is enabled.",
  }),

  defineStubTool({
    name: "record-session",
    label: "Record Session",
    domain: "media",
    safety: "elevated",
    capabilities: ["audio", "video", "speech"],
    tags: ["record", "session", "audio", "video", "capture"],
    description:
      "Record screen, camera, or microphone input for workflow capture when explicitly allowed.",
  }),

  defineStubTool({
    name: "browse-web",
    label: "Browse Web",
    domain: "research",
    safety: "external",
    capabilities: ["browser", "search", "read"],
    tags: ["browser", "web", "internet", "search", "research"],
    description:
      "Browse the web, inspect pages, and gather up-to-date external information.",
  }),

  defineStubTool({
    name: "control-desktop",
    label: "Control Desktop",
    domain: "desktop",
    safety: "elevated",
    capabilities: ["desktop-control", "execute", "vision"],
    tags: ["desktop", "mouse", "keyboard", "window", "automation"],
    description:
      "Control approved desktop surfaces using guarded UI automation when explicitly enabled.",
  }),
];

/* ================= REGISTRY BUILD ================= */

const RAW_TOOL_REGISTRY: CodexForgeToolDefinition[] = [
  ...READY_TOOL_REGISTRY,
  ...STUB_TOOL_REGISTRY,
];

function getAvailabilityRank(
  availability: CodexForgeToolDefinition["availability"]
): number {
  switch (availability) {
    case "ready":
      return 2;
    case "stub":
      return 1;
    case "unavailable":
    default:
      return 0;
  }
}

function sortTools(a: CodexForgeToolDefinition, b: CodexForgeToolDefinition): number {
  const availabilityDelta =
    getAvailabilityRank(b.availability) - getAvailabilityRank(a.availability);

  if (availabilityDelta !== 0) {
    return availabilityDelta;
  }

  const domainDelta = TOOL_DOMAIN_ORDER[a.domain] - TOOL_DOMAIN_ORDER[b.domain];
  if (domainDelta !== 0) {
    return domainDelta;
  }

  return a.name.localeCompare(b.name);
}

function validateRegistry(
  tools: CodexForgeToolDefinition[]
): CodexForgeToolDefinition[] {
  const seenNames = new Set<string>();

  for (const tool of tools) {
    if (seenNames.has(tool.name)) {
      throw new Error(`Duplicate CodexForge tool name detected: ${tool.name}`);
    }

    seenNames.add(tool.name);
  }

  return [...tools].sort(sortTools);
}

const SORTED_TOOL_REGISTRY = validateRegistry(RAW_TOOL_REGISTRY);

const DEFAULT_TOOL_REGISTRY: CodexForgeToolRegistry = createCodexForgeToolRegistry(
  SORTED_TOOL_REGISTRY,
  CODEXFORGE_TOOL_REGISTRY_VERSION
);

const TOOL_MAP = new Map<string, CodexForgeToolDefinition>(
  DEFAULT_TOOL_REGISTRY.tools.map((tool) => [tool.name, tool])
);

/* ================= SEARCH ================= */

function matchesQuery(tool: CodexForgeToolDefinition, query: string): boolean {
  const tokens = tokenizeSearchQuery(query);
  if (tokens.length === 0) return true;

  const haystack = buildToolSearchText(tool);
  return tokens.every((token) => haystack.includes(token));
}

/* ================= EXPORTS ================= */

export function getCodexForgeToolRegistry(): CodexForgeToolRegistry {
  return {
    version: DEFAULT_TOOL_REGISTRY.version,
    tools: [...DEFAULT_TOOL_REGISTRY.tools],
    toolMap: { ...DEFAULT_TOOL_REGISTRY.toolMap },
  };
}

export function getCodexForgeToolByName(
  name: CodexForgeToolName
): CodexForgeToolDefinition | undefined {
  return TOOL_MAP.get(name);
}

export function getCodexForgeToolsByDomain(
  domain: CodexForgeToolDomain
): CodexForgeToolDefinition[] {
  return DEFAULT_TOOL_REGISTRY.tools.filter((tool) => tool.domain === domain);
}

export function getAvailableCodexForgeTools(): CodexForgeToolDefinition[] {
  return DEFAULT_TOOL_REGISTRY.tools.filter(
    (tool) => tool.availability !== "unavailable"
  );
}

export function getReadyCodexForgeTools(): CodexForgeToolDefinition[] {
  return DEFAULT_TOOL_REGISTRY.tools.filter(
    (tool) => tool.availability === "ready"
  );
}

export function getStubCodexForgeTools(): CodexForgeToolDefinition[] {
  return DEFAULT_TOOL_REGISTRY.tools.filter(
    (tool) => tool.availability === "stub"
  );
}

export function searchCodexForgeTools(query: string): CodexForgeToolDefinition[] {
  return DEFAULT_TOOL_REGISTRY.tools.filter((tool) => matchesQuery(tool, query));
}

export function getCodexForgeToolsByTag(tag: string): CodexForgeToolDefinition[] {
  const normalizedTag = cleanTag(tag);
  if (!normalizedTag) return [];

  return DEFAULT_TOOL_REGISTRY.tools.filter((tool) =>
    tool.tags.includes(normalizedTag)
  );
}

export function getCodexForgeToolNames(): CodexForgeToolName[] {
  return DEFAULT_TOOL_REGISTRY.tools.map(
    (tool) => tool.name as CodexForgeToolName
  );
}

export function getCodexForgeToolDomains(): CodexForgeToolDomain[] {
  return [...TOOL_DOMAIN_VALUES];
}