import type {
  CodexForgeMessage,
  CodexForgePlanDomain,
  CodexForgeStructuredReply,
  CodexForgeStructuredSection,
  CodexForgeStructuredTool,
} from "../types";
import type {
  CodexForgeToolExecutionRequest,
  CodexForgeToolExecutionResponse,
  CodexForgeToolRegistry,
} from "../tools";
import type { CodexForgeBrainGraph } from "../brain/graph";

/* ================= ENGINE INTENT ================= */

export type CodexForgeEngineIntent =
  | "planning"
  | "debugging"
  | "coding"
  | "research"
  | "product-design"
  | "architecture"
  | "general";

/* ================= ENGINE ANALYSIS ================= */

export type CodexForgeEngineAnalysis = {
  lastUserMessage: CodexForgeMessage | null;
  userText: string;
  projectName: string;
  intent: CodexForgeEngineIntent;
  domain: CodexForgePlanDomain;
  tags: string[];
};

/* ================= ENGINE PLAN ================= */

export type CodexForgeEnginePlan = {
  goal: string;

  contextNotes: string[];
  files: string[];
  commands: string[];
  risks: string[];
  nextSteps: string[];
  status: string[];

  sections: CodexForgeStructuredSection[];

  domain: CodexForgePlanDomain;
  tags: string[];
  intentLabel: CodexForgeEngineIntent;

  availableTools: string[];
  recommendedTools: CodexForgeStructuredTool[];
};

/* ================= ENGINE BRAIN GRAPH ================= */

export type CodexForgeEngineBrainGraphSnapshot = {
  graph: CodexForgeBrainGraph;
  nodeCount: number;
  edgeCount: number;
};

export type CodexForgeEngineBrainGraphAdapter = {
  load: () => CodexForgeEngineBrainGraphSnapshot;
  save: (graph: CodexForgeBrainGraph) => CodexForgeEngineBrainGraphSnapshot;
};

/* ================= ENGINE TOOL EXECUTION ================= */

export type CodexForgeEngineToolExecutionAdapter = {
  execute: (
    request: CodexForgeToolExecutionRequest
  ) => Promise<CodexForgeToolExecutionResponse>;
  canExecute: (toolName: string) => boolean;
  getExecutableToolNames: () => string[];
};

/* ================= ENGINE DEPENDENCIES ================= */

export type CodexForgeEngineDependencies = {
  tools: CodexForgeToolRegistry;
  brainGraph: CodexForgeEngineBrainGraphAdapter;
  toolExecution?: CodexForgeEngineToolExecutionAdapter;
};

/* ================= ENGINE REPLY ================= */

export type CodexForgeEngineReply = {
  text: string;
  structured: CodexForgeStructuredReply;
  intent: CodexForgeEngineIntent;
  warnings?: string[];
};