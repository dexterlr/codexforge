export type CodexForgeToolAdapterKind =
  | "read-only"
  | "mutation"
  | "external"
  | "local-app"
  | "local-safe-simulated";

export type CodexForgeToolAdapterCapability =
  | "project-inspection"
  | "file-system"
  | "web-research"
  | "blender"
  | "unreal"
  | "comfyui"
  | "pc-bridge"
  | "camera"
  | "trading-research"
  | "trading-execution"
  | "deck-export"
  | "rendering"
  | "diff"
  | "command";

export type CodexForgeToolAdapterExecutionMode =
  | "read-only"
  | "approval-gated"
  | "blocked"
  | "local-safe-simulated";

export type CodexForgeToolAdapterDescriptor = {
  toolName: string;
  label: string;
  kind: CodexForgeToolAdapterKind;
  capability: CodexForgeToolAdapterCapability;
  executionMode: CodexForgeToolAdapterExecutionMode;
  requiresApproval: boolean;
  blocksByDefault: boolean;
  sideEffect: "none" | "local-file-read" | "local-file-write" | "external-network" | "local-app-control" | "broker-action";
  adapter: string;
  summary: string;
};

export const CODEXFORGE_TOOL_ADAPTER_REGISTRY_VERSION = "2026-05-08.capability-adapter-registry.v1";

export const codexForgeToolAdapterRegistry = [
  {
    toolName: "read-file",
    label: "Read file",
    kind: "read-only",
    capability: "file-system",
    executionMode: "read-only",
    requiresApproval: false,
    blocksByDefault: false,
    sideEffect: "local-file-read",
    adapter: "local-project-read-adapter",
    summary: "Read project files without mutation.",
  },
  {
    toolName: "list-files",
    label: "List files",
    kind: "read-only",
    capability: "file-system",
    executionMode: "read-only",
    requiresApproval: false,
    blocksByDefault: false,
    sideEffect: "local-file-read",
    adapter: "local-project-list-adapter",
    summary: "List project files without mutation.",
  },
  {
    toolName: "search-project",
    label: "Search project",
    kind: "read-only",
    capability: "project-inspection",
    executionMode: "read-only",
    requiresApproval: false,
    blocksByDefault: false,
    sideEffect: "local-file-read",
    adapter: "local-project-search-adapter",
    summary: "Search the local project without mutation.",
  },
  {
    toolName: "snapshot-project",
    label: "Snapshot project",
    kind: "read-only",
    capability: "project-inspection",
    executionMode: "read-only",
    requiresApproval: false,
    blocksByDefault: false,
    sideEffect: "local-file-read",
    adapter: "local-project-snapshot-adapter",
    summary: "Create a read-only project snapshot for planning and grounding.",
  },
  {
    toolName: "generate-diff",
    label: "Generate diff",
    kind: "mutation",
    capability: "diff",
    executionMode: "approval-gated",
    requiresApproval: true,
    blocksByDefault: false,
    sideEffect: "local-file-write",
    adapter: "local-diff-generation-adapter",
    summary: "Generate proposed code changes for explicit approval.",
  },
  {
    toolName: "apply-diff",
    label: "Apply diff",
    kind: "mutation",
    capability: "diff",
    executionMode: "approval-gated",
    requiresApproval: true,
    blocksByDefault: false,
    sideEffect: "local-file-write",
    adapter: "local-diff-apply-adapter",
    summary: "Apply approved code changes to local files.",
  },
  {
    toolName: "write-file",
    label: "Write file",
    kind: "mutation",
    capability: "file-system",
    executionMode: "approval-gated",
    requiresApproval: true,
    blocksByDefault: false,
    sideEffect: "local-file-write",
    adapter: "local-file-write-adapter",
    summary: "Write approved local file content.",
  },
  {
    toolName: "run-command",
    label: "Run command",
    kind: "mutation",
    capability: "command",
    executionMode: "approval-gated",
    requiresApproval: true,
    blocksByDefault: false,
    sideEffect: "local-app-control",
    adapter: "local-command-adapter",
    summary: "Run approved local shell commands.",
  },
  {
    toolName: "run-tests",
    label: "Run tests",
    kind: "mutation",
    capability: "command",
    executionMode: "approval-gated",
    requiresApproval: true,
    blocksByDefault: false,
    sideEffect: "local-app-control",
    adapter: "local-test-runner-adapter",
    summary: "Run approved test commands.",
  },
  {
    toolName: "build-web-app",
    label: "Build web app",
    kind: "mutation",
    capability: "command",
    executionMode: "approval-gated",
    requiresApproval: true,
    blocksByDefault: false,
    sideEffect: "local-app-control",
    adapter: "local-web-build-adapter",
    summary: "Run approved web app build commands.",
  },
  {
    toolName: "render-job",
    label: "Render job",
    kind: "local-safe-simulated",
    capability: "rendering",
    executionMode: "local-safe-simulated",
    requiresApproval: true,
    blocksByDefault: false,
    sideEffect: "none",
    adapter: "local-safe-render-job",
    summary: "Simulate an approval-gated render job without side effects.",
  },
  {
    toolName: "blender-python",
    label: "Blender Python",
    kind: "local-app",
    capability: "blender",
    executionMode: "approval-gated",
    requiresApproval: true,
    blocksByDefault: false,
    sideEffect: "local-app-control",
    adapter: "blender-python-adapter",
    summary: "Run approved Blender Python automation.",
  },
  {
    toolName: "video-render",
    label: "Video render",
    kind: "local-app",
    capability: "rendering",
    executionMode: "approval-gated",
    requiresApproval: true,
    blocksByDefault: false,
    sideEffect: "local-app-control",
    adapter: "video-render-adapter",
    summary: "Run approved local or external video render workflows.",
  },
  {
    toolName: "deck-export",
    label: "Deck export",
    kind: "mutation",
    capability: "deck-export",
    executionMode: "approval-gated",
    requiresApproval: true,
    blocksByDefault: false,
    sideEffect: "local-file-write",
    adapter: "deck-export-adapter",
    summary: "Export approved deck or presentation artifacts.",
  },
  {
    toolName: "web-research",
    label: "Web research",
    kind: "external",
    capability: "web-research",
    executionMode: "approval-gated",
    requiresApproval: true,
    blocksByDefault: false,
    sideEffect: "external-network",
    adapter: "web-research-adapter",
    summary: "Perform approved web research and cite sources.",
  },
  {
    toolName: "pc-bridge",
    label: "Local PC bridge",
    kind: "local-app",
    capability: "pc-bridge",
    executionMode: "approval-gated",
    requiresApproval: true,
    blocksByDefault: false,
    sideEffect: "local-app-control",
    adapter: "local-pc-bridge-adapter",
    summary: "Operate approved local PC bridge actions.",
  },
  {
    toolName: "camera-inspect",
    label: "Camera inspect",
    kind: "local-app",
    capability: "camera",
    executionMode: "approval-gated",
    requiresApproval: true,
    blocksByDefault: false,
    sideEffect: "local-app-control",
    adapter: "camera-inspection-adapter",
    summary: "Inspect camera input only after explicit approval.",
  },
  {
    toolName: "unreal-editor-command",
    label: "Unreal editor command",
    kind: "local-app",
    capability: "unreal",
    executionMode: "approval-gated",
    requiresApproval: true,
    blocksByDefault: false,
    sideEffect: "local-app-control",
    adapter: "unreal-editor-command-adapter",
    summary: "Run approved Unreal Editor automation commands.",
  },
  {
    toolName: "comfyui-workflow-run",
    label: "ComfyUI workflow run",
    kind: "local-app",
    capability: "comfyui",
    executionMode: "approval-gated",
    requiresApproval: true,
    blocksByDefault: false,
    sideEffect: "local-app-control",
    adapter: "comfyui-workflow-adapter",
    summary: "Run approved ComfyUI workflows.",
  },
  {
    toolName: "trading-research",
    label: "Trading research",
    kind: "external",
    capability: "trading-research",
    executionMode: "approval-gated",
    requiresApproval: true,
    blocksByDefault: false,
    sideEffect: "external-network",
    adapter: "trading-research-adapter",
    summary: "Perform approved market research without placing trades.",
  },
  {
    toolName: "broker-execution",
    label: "Broker execution",
    kind: "external",
    capability: "trading-execution",
    executionMode: "blocked",
    requiresApproval: true,
    blocksByDefault: true,
    sideEffect: "broker-action",
    adapter: "blocked-broker-execution-adapter",
    summary: "Live broker actions remain blocked until explicit risk controls exist.",
  },
] as const satisfies readonly CodexForgeToolAdapterDescriptor[];

export type CodexForgeRegisteredToolName =
  (typeof codexForgeToolAdapterRegistry)[number]["toolName"];

const registryByToolName = new Map<string, CodexForgeToolAdapterDescriptor>(
  codexForgeToolAdapterRegistry.map((entry) => [entry.toolName, entry])
);

export function listCodexForgeToolAdapters(): CodexForgeToolAdapterDescriptor[] {
  return [...codexForgeToolAdapterRegistry];
}

export function getCodexForgeToolAdapter(
  toolName: string
): CodexForgeToolAdapterDescriptor | null {
  return registryByToolName.get(toolName) ?? null;
}

export function hasCodexForgeToolAdapter(toolName: string): boolean {
  return registryByToolName.has(toolName);
}

export function requireCodexForgeToolAdapter(
  toolName: string
): CodexForgeToolAdapterDescriptor {
  const adapter = getCodexForgeToolAdapter(toolName);
  if (!adapter) {
    throw new Error(`Unknown CodexForge tool adapter: ${toolName}`);
  }

  return adapter;
}

export function getCodexForgeToolAdapterNames(): string[] {
  return listCodexForgeToolAdapters().map((entry) => entry.toolName);
}

export function getCodexForgeApprovalRequiredToolAdapters(): CodexForgeToolAdapterDescriptor[] {
  return listCodexForgeToolAdapters().filter((entry) => entry.requiresApproval);
}

export function getCodexForgeBlockedToolAdapters(): CodexForgeToolAdapterDescriptor[] {
  return listCodexForgeToolAdapters().filter((entry) => entry.blocksByDefault);
}

export function getCodexForgeReadOnlyToolAdapters(): CodexForgeToolAdapterDescriptor[] {
  return listCodexForgeToolAdapters().filter(
    (entry) => entry.executionMode === "read-only"
  );
}
