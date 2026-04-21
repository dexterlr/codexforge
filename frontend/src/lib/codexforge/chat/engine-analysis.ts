import type {
  CodexForgeChatContext,
  CodexForgeMessage,
  CodexForgePlanDomain,
  CodexForgePlanStatus,
  CodexForgeStructuredSection,
  CodexForgeStructuredTool,
} from "../types";
import type {
  CodexForgeEngineAnalysis,
  CodexForgeEngineDependencies,
  CodexForgeEngineIntent,
  CodexForgeEnginePlan,
} from "./contracts";
import {
  LIMITS,
  VALID_PLAN_STATUSES,
  clampList,
  clampText,
  clean,
  getExecutionDiffCount,
  getExecutionPhaseFromContext,
  getExecutionRequest,
  getExecutionSnapshotFileCount,
  includesAny,
  isExecutionMode,
  lower,
  normalizeDomain,
} from "./engine-shared";
import {
  ARCHITECTURE_TERMS,
  CODING_TERMS,
  DOMAIN_TERMS,
  PLANNING_TERMS,
  PRODUCT_DESIGN_TERMS,
  ToolCandidate,
  getDomainConfig,
} from "./engine-domain-config";

/* ================= CONSTANTS ================= */

const CLUSTER_BONUS = {
  routeWithEngine: 20,
  engineWithRender: 16,
  hookWithComponent: 16,
  contractWithCaller: 15,
  apiWithTypes: 14,
  repoInspectionCandidate: 50,
} as const;

const CLUSTER_FILE_LIMIT = 8;

/* ================= MESSAGE / INTENT ================= */

function lastUser(messages: CodexForgeMessage[]): CodexForgeMessage | null {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index].role === "user") {
      return messages[index];
    }
  }

  return null;
}

export function inferDomain(
  text: string,
  context: CodexForgeChatContext
): CodexForgePlanDomain {
  const query = lower(text);

  for (const term of DOMAIN_TERMS["game-server"]) {
    if (query.includes(term)) return "game-server";
  }

  for (const term of DOMAIN_TERMS.movie) {
    if (query.includes(term)) return "movie";
  }

  for (const term of DOMAIN_TERMS.video) {
    if (query.includes(term)) return "video";
  }

  for (const term of DOMAIN_TERMS.comfyui) {
    if (query.includes(term)) return "comfyui";
  }

  for (const term of DOMAIN_TERMS.unreal) {
    if (query.includes(term)) return "unreal";
  }

  for (const term of DOMAIN_TERMS.web) {
    if (query.includes(term)) return "web";
  }

  for (const term of DOMAIN_TERMS.research) {
    if (query.includes(term)) return "research";
  }

  for (const term of DOMAIN_TERMS.debug) {
    if (query.includes(term)) return "debug";
  }

  for (const term of DOMAIN_TERMS.automation) {
    if (query.includes(term)) return "automation";
  }

  const activePlanDomain = normalizeDomain(context.activePlan?.domain);
  if (activePlanDomain) {
    return activePlanDomain;
  }

  const capabilityDomains = context.codexforgeCapabilities?.domains ?? [];
  if (capabilityDomains.length === 1) {
    return capabilityDomains[0];
  }

  return "general";
}

function contextTagStringsFromText(text: string): string[] {
  const tags = new Set<string>();
  const query = lower(text);

  if (query.includes("workspace")) tags.add("workspace");
  if (query.includes("memory")) tags.add("memory");
  if (query.includes("execution")) tags.add("execution");
  if (query.includes("diff")) tags.add("diff");
  if (query.includes("plan")) tags.add("plan");
  if (query.includes("brain")) tags.add("brain");
  if (query.includes("provider")) tags.add("provider");
  if (query.includes("offline")) tags.add("offline");
  if (query.includes("graph")) tags.add("graph");
  if (query.includes("search")) tags.add("search");
  if (query.includes("file")) tags.add("files");
  if (query.includes("folder")) tags.add("folders");
  if (query.includes("repo")) tags.add("repo");
  if (query.includes("codebase")) tags.add("codebase");
  if (query.includes("route")) tags.add("route");
  if (query.includes("engine")) tags.add("engine");
  if (query.includes("render")) tags.add("render");
  if (query.includes("hook")) tags.add("hook");
  if (query.includes("component")) tags.add("component");
  if (query.includes("contract")) tags.add("contract");
  if (query.includes("types")) tags.add("types");

  return Array.from(tags);
}

export function buildDomainTags(
  domain: CodexForgePlanDomain,
  text: string,
  context?: CodexForgeChatContext
): string[] {
  const query = lower(text);
  const tags = new Set<string>([domain]);

  if (query.includes("christmas")) tags.add("christmas");
  if (query.includes("minecraft")) tags.add("minecraft");
  if (query.includes("server")) tags.add("server");
  if (query.includes("website")) tags.add("website");
  if (query.includes("movie")) tags.add("movie");
  if (query.includes("video")) tags.add("video");
  if (query.includes("script")) tags.add("script");
  if (query.includes("unreal")) tags.add("unreal");
  if (query.includes("comfy")) tags.add("comfyui");
  if (query.includes("research")) tags.add("research");
  if (query.includes("automation")) tags.add("automation");
  if (query.includes("pipeline")) tags.add("pipeline");
  if (query.includes("meeting")) tags.add("meeting");
  if (query.includes("zoom")) tags.add("zoom");
  if (query.includes("notes")) tags.add("notes");
  if (query.includes("api")) tags.add("api");
  if (query.includes("frontend")) tags.add("frontend");
  if (query.includes("brain")) tags.add("brain");
  if (query.includes("offline")) tags.add("offline");
  if (query.includes("provider")) tags.add("provider");
  if (query.includes("graph")) tags.add("graph");
  if (query.includes("search")) tags.add("search");
  if (query.includes("read")) tags.add("read");
  if (query.includes("file")) tags.add("files");
  if (query.includes("folder")) tags.add("folders");
  if (query.includes("repo")) tags.add("repo");
  if (query.includes("codebase")) tags.add("codebase");
  if (query.includes("route")) tags.add("route");
  if (query.includes("engine")) tags.add("engine");
  if (query.includes("render")) tags.add("render");
  if (query.includes("hook")) tags.add("hook");
  if (query.includes("component")) tags.add("component");
  if (query.includes("contract")) tags.add("contract");
  if (query.includes("types")) tags.add("types");

  for (const tag of contextTagStringsFromText(text)) {
    tags.add(tag);
  }

  if (context?.activePlan?.tags?.length) {
    for (const tag of context.activePlan.tags) {
      const normalized = clean(tag);
      if (normalized) {
        tags.add(normalized);
      }
    }
  }

  return clampList(Array.from(tags), LIMITS.maxTags);
}

export function inferIntent(
  text: string,
  context: CodexForgeChatContext
): CodexForgeEngineIntent {
  if (isExecutionMode(context)) {
    const domain = inferDomain(text, context);
    if (domain === "debug") return "debugging";
    if (domain === "research") return "research";
    return "coding";
  }

  const query = lower(text);

  if (query.startsWith("/debug")) return "debugging";
  if (query.startsWith("/research")) return "research";
  if (query.startsWith("/plan")) return "planning";
  if (query.startsWith("/next")) return "planning";

  if (includesAny(query, ARCHITECTURE_TERMS)) {
    return "architecture";
  }

  if (includesAny(query, PRODUCT_DESIGN_TERMS)) {
    return "product-design";
  }

  if (includesAny(query, DOMAIN_TERMS.debug)) {
    return "debugging";
  }

  if (includesAny(query, DOMAIN_TERMS.research)) {
    return "research";
  }

  if (includesAny(query, PLANNING_TERMS)) {
    return "planning";
  }

  if (includesAny(query, CODING_TERMS)) {
    return "coding";
  }

  return "general";
}

/* ================= GOAL ================= */

function stripCommandPrefix(text: string): string {
  const trimmed = clean(text);
  if (!trimmed.startsWith("/")) return trimmed;
  const withoutPrefix = trimmed.replace(/^\/[a-zA-Z_-]+\s*/, "");
  return clean(withoutPrefix);
}

function extractExplicitGoal(text: string): string | undefined {
  const stripped = stripCommandPrefix(text);
  if (!stripped) return undefined;

  const patterns = [
    /help me (?:plan|design|build|debug|research)\s+(.+)/i,
    /plan\s+(.+)/i,
    /design\s+(.+)/i,
    /build\s+(.+)/i,
    /debug\s+(.+)/i,
    /research\s+(.+)/i,
    /implement\s+(.+)/i,
    /create\s+(.+)/i,
  ];

  for (const pattern of patterns) {
    const match = stripped.match(pattern);
    const captured = match?.[1] ? clean(match[1]) : "";
    if (captured.length > 0) {
      return clampText(captured, LIMITS.maxGoalText);
    }
  }

  return clampText(stripped, LIMITS.maxGoalText);
}

function buildGoal(text: string, projectName: string): string {
  const explicit = extractExplicitGoal(text);

  if (explicit && explicit.length >= 5) {
    return explicit.endsWith(".") ? explicit : `${explicit}.`;
  }

  return `Move ${projectName} forward with the smallest safe step.`;
}

function buildExecutionGoal(
  request: NonNullable<ReturnType<typeof getExecutionRequest>>,
  projectName: string
): string {
  if (request.taskGoal && request.stepText) {
    return `Execute step for ${projectName}: ${request.stepText}`;
  }

  if (request.stepText) {
    return `Execute the current task step: ${request.stepText}`;
  }

  return `Execute the current task step for ${projectName}.`;
}

/* ================= AUTO INSPECTION SIGNALS ================= */

function extractQuotedSegments(text: string): string[] {
  const matches = text.match(/`([^`]+)`|"([^"]+)"|'([^']+)'/g) ?? [];
  return matches
    .map((match) => match.replace(/^["'`]|["'`]$/g, "").trim())
    .filter(Boolean);
}

function looksLikePath(value: string): boolean {
  const normalized = value.replace(/\\/g, "/");
  return (
    normalized.includes("/") ||
    normalized.includes(".") ||
    normalized.startsWith("src") ||
    normalized.startsWith("app") ||
    normalized.startsWith("lib") ||
    normalized.startsWith("components") ||
    normalized.startsWith("pages") ||
    normalized.startsWith("api")
  );
}

function extractPathCandidate(text: string): string | undefined {
  const quoted = extractQuotedSegments(text).find(looksLikePath);
  if (quoted) return quoted;

  const tokenMatch = text.match(
    /(?:[A-Za-z0-9_.-]+[\\/])+[A-Za-z0-9_.-]+|[A-Za-z0-9_.-]+\.[A-Za-z0-9_.-]+/
  );

  const token = tokenMatch?.[0]?.trim();
  return token && looksLikePath(token) ? token : undefined;
}

function shouldPreferListFiles(text: string): boolean {
  const query = lower(text);
  return (
    query.includes("list ") ||
    query.includes("tree ") ||
    query.includes("files") ||
    query.includes("folders") ||
    query.includes("directory")
  );
}

function shouldPreferReadFile(text: string): boolean {
  const query = lower(text);
  return (
    query.includes("read ") ||
    query.includes("open ") ||
    query.includes("show file") ||
    query.includes("inspect file") ||
    query.includes("view file")
  );
}

function shouldPreferSearchProject(text: string): boolean {
  const query = lower(text);
  return (
    query.includes("search ") ||
    query.includes("find ") ||
    query.includes("where is") ||
    query.includes("where are") ||
    query.includes("grep") ||
    query.includes("contains") ||
    query.includes("symbol") ||
    query.includes("reference")
  );
}

function inferAutoInspectionCandidate(
  analysis: CodexForgeEngineAnalysis,
  context: CodexForgeChatContext,
  deps: CodexForgeEngineDependencies
): string | null {
  if (!deps.toolExecution) {
    return null;
  }

  if (isExecutionMode(context)) {
    return null;
  }

  const executable = new Set(deps.toolExecution.getExecutableToolNames());
  const hasRead = executable.has("read-file");
  const hasList = executable.has("list-files");
  const hasSearch = executable.has("search-project");

  if (!hasRead && !hasList && !hasSearch) {
    return null;
  }

  const text = analysis.userText;
  const pathCandidate = extractPathCandidate(text);

  if (pathCandidate && shouldPreferReadFile(text) && hasRead) {
    return "read-file";
  }

  if (shouldPreferListFiles(text) && hasList) {
    return "list-files";
  }

  if (shouldPreferSearchProject(text) && hasSearch) {
    return "search-project";
  }

  if (pathCandidate && hasRead) {
    return "read-file";
  }

  if (hasSearch && analysis.intent !== "product-design") {
    return "search-project";
  }

  return hasList
    ? "list-files"
    : hasRead
      ? "read-file"
      : hasSearch
        ? "search-project"
        : null;
}

/* ================= FILE CLUSTER HELPERS ================= */

function normalizePath(value: string): string {
  return value.replace(/\\/g, "/").trim().toLowerCase();
}

function splitPathSegments(value: string): string[] {
  return normalizePath(value)
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean);
}

function getFileName(path: string): string {
  const segments = splitPathSegments(path);
  return segments[segments.length - 1] ?? path;
}

function getParentDirectory(path: string): string | undefined {
  const segments = splitPathSegments(path);
  if (segments.length <= 1) return undefined;
  return segments.slice(0, -1).join("/");
}

function looksLikeRoutePath(path: string): boolean {
  const normalized = normalizePath(path);
  const fileName = getFileName(path);
  return (
    normalized.includes("/api/") ||
    fileName === "route.ts" ||
    fileName === "route.tsx"
  );
}

function looksLikeEnginePath(path: string): boolean {
  const normalized = normalizePath(path);
  const fileName = getFileName(path);
  return normalized.includes("/engine") || fileName.includes("engine");
}

function looksLikeRenderPath(path: string): boolean {
  const normalized = normalizePath(path);
  const fileName = getFileName(path);
  return normalized.includes("/render") || fileName.includes("render");
}

function looksLikeHookPath(path: string): boolean {
  const normalized = normalizePath(path);
  const fileName = getFileName(path);
  return (
    normalized.includes("/hooks/") ||
    fileName.startsWith("use-") ||
    fileName.startsWith("use")
  );
}

function looksLikeComponentPath(path: string): boolean {
  const normalized = normalizePath(path);
  return normalized.includes("/components/") || normalized.endsWith(".tsx");
}

function looksLikeContractPath(path: string): boolean {
  const fileName = getFileName(path);
  return fileName.includes("contract");
}

function looksLikeTypesPath(path: string): boolean {
  const fileName = getFileName(path);
  return fileName.includes("types") || fileName.endsWith(".d.ts");
}

function scoreFilePathForPlan(path: string): number {
  const normalized = normalizePath(path);
  const fileName = getFileName(path);
  let score = 0;

  if (looksLikeRoutePath(path)) score += 10;
  if (looksLikeEnginePath(path)) score += 10;
  if (looksLikeRenderPath(path)) score += 8;
  if (looksLikeHookPath(path)) score += 8;
  if (looksLikeComponentPath(path)) score += 6;
  if (looksLikeContractPath(path)) score += 7;
  if (looksLikeTypesPath(path)) score += 7;

  if (normalized.includes("/src/")) score += 3;
  if (normalized.includes("/lib/")) score += 3;
  if (normalized.includes("/app/")) score += 3;
  if (normalized.includes("/chat/")) score += 3;
  if (normalized.includes("/brain/")) score += 3;
  if (normalized.includes("/tools/")) score += 3;

  if (fileName === "index.ts" || fileName === "index.tsx") {
    score -= 2;
  }

  return score;
}

function sortPlannedFiles(files: string[]): string[] {
  return [...files].sort((a, b) => {
    const scoreDelta = scoreFilePathForPlan(b) - scoreFilePathForPlan(a);
    if (scoreDelta !== 0) return scoreDelta;
    return a.localeCompare(b);
  });
}

function hasClusterPair(
  files: string[],
  predicateA: (path: string) => boolean,
  predicateB: (path: string) => boolean
): boolean {
  const aMatches = files.filter(predicateA);
  const bMatches = files.filter(predicateB);

  if (aMatches.length === 0 || bMatches.length === 0) {
    return false;
  }

  for (const aPath of aMatches) {
    const aParent = getParentDirectory(aPath);
    for (const bPath of bMatches) {
      if (aPath === bPath) continue;

      const bParent = getParentDirectory(bPath);
      if (aParent && bParent && aParent === bParent) {
        return true;
      }
    }
  }

  return true;
}

function buildFileClusterNotes(files: string[]): string[] {
  const normalized = clampList(files, CLUSTER_FILE_LIMIT);
  if (normalized.length === 0) return [];

  const notes: string[] = [];

  if (hasClusterPair(normalized, looksLikeRoutePath, looksLikeEnginePath)) {
    notes.push("Cluster detected: route + engine");
  }

  if (hasClusterPair(normalized, looksLikeEnginePath, looksLikeRenderPath)) {
    notes.push("Cluster detected: engine + render");
  }

  if (hasClusterPair(normalized, looksLikeHookPath, looksLikeComponentPath)) {
    notes.push("Cluster detected: hook + component");
  }

  if (
    hasClusterPair(
      normalized,
      looksLikeContractPath,
      (path) => !looksLikeContractPath(path)
    )
  ) {
    notes.push("Cluster detected: contract + caller");
  }

  if (hasClusterPair(normalized, looksLikeTypesPath, looksLikeRoutePath)) {
    notes.push("Cluster detected: api + types");
  }

  return clampList(notes, LIMITS.maxSectionItems);
}

/* ================= PLAN HELPERS ================= */

export function buildContextNotes(
  context: CodexForgeChatContext,
  domain: CodexForgePlanDomain
): string[] {
  const notes: string[] = [];

  if (context.projectName) {
    notes.push(`Project: ${context.projectName}`);
  }

  if (context.repoPath) {
    notes.push(`Repo: ${context.repoPath}`);
  }

  if (context.workspaceRoot) {
    notes.push(`Workspace: ${context.workspaceRoot}`);
  }

  if (context.mode) {
    notes.push(`Requested mode: ${context.mode}`);
  }

  notes.push(`Domain: ${domain}`);

  const executionRequest = getExecutionRequest(context);
  if (executionRequest?.mode === "execute-task-step") {
    if (typeof executionRequest.stepIndex === "number") {
      notes.push(`Execution step index: ${executionRequest.stepIndex + 1}`);
    }

    if (executionRequest.stepText) {
      notes.push(`Execution step text: ${executionRequest.stepText}`);
    }

    if (executionRequest.taskGoal) {
      notes.push(`Execution task goal: ${executionRequest.taskGoal}`);
    }
  }

  if (context.activePlan?.goal) {
    notes.push(`Active plan goal: ${context.activePlan.goal}`);
  }

  if (context.activePlan?.nextAction) {
    notes.push(`Active plan next action: ${context.activePlan.nextAction}`);
  }

  if (context.execution?.enginePhase) {
    notes.push(`Engine phase: ${context.execution.enginePhase}`);
  }

  if (
    typeof context.execution?.diffCount === "number" &&
    context.execution.diffCount > 0
  ) {
    notes.push(`Known diff count: ${context.execution.diffCount}`);
  }

  if (
    typeof context.execution?.snapshotFileCount === "number" &&
    context.execution.snapshotFileCount > 0
  ) {
    notes.push(
      `Known snapshot file count: ${context.execution.snapshotFileCount}`
    );
  }

  if (context.memory?.length) {
    const topMemory = context.memory
      .slice(0, 3)
      .map((item) => item.content)
      .filter(Boolean);

    if (topMemory.length > 0) {
      notes.push(`Relevant memory: ${topMemory.join(" | ")}`);
    }
  }

  return clampList(notes, LIMITS.maxContextItems);
}

export function buildUnderstandingItems(
  analysis: CodexForgeEngineAnalysis,
  context: CodexForgeChatContext,
  plan: CodexForgeEnginePlan
): string[] {
  const items: string[] = [];

  items.push(`The request is being handled as ${analysis.intent}.`);
  items.push(`The likely domain is ${analysis.domain}.`);
  items.push(`The working goal is: ${plan.goal}`);

  if (context.repoPath) {
    items.push("The repo path is available for grounded implementation planning.");
  } else {
    items.push("The repo path is missing, so file-level guidance is approximate.");
  }

  if (isExecutionMode(context)) {
    items.push(
      "This is an execution-style request, so the response should focus on the current step and immediate outcome."
    );
  } else if (analysis.intent === "architecture") {
    items.push(
      "This is architecture-oriented, so the answer should prioritize boundaries, state ownership, and contracts."
    );
  } else if (analysis.intent === "product-design") {
    items.push(
      "This is product-oriented, so the answer should prioritize user-facing value and workspace coherence."
    );
  } else if (analysis.intent === "debugging") {
    items.push(
      "This is debugging-oriented, so the answer should emphasize reproduction, root cause, and safe verification."
    );
  }

  const clusterNotes = buildFileClusterNotes(plan.files);
  if (clusterNotes.length > 0) {
    items.push(...clusterNotes.map((note) => `Planning signal: ${note}.`));
  }

  return clampList(items, LIMITS.maxUnderstandingItems);
}

function buildFiles(
  intent: CodexForgeEngineIntent,
  context: CodexForgeChatContext,
  domain: CodexForgePlanDomain
): string[] {
  if (isExecutionMode(context)) {
    return sortPlannedFiles(
      clampList(
        [
          "Primary implementation file",
          "Related API route or helper",
          "Shared types used by the step",
          "Any execution state surface that reflects the step result",
        ],
        LIMITS.maxFiles
      )
    );
  }

  if (intent === "architecture") {
    return sortPlannedFiles(
      clampList(
        [
          "State orchestration layer",
          "API contract or route wrapper",
          "Shared types and execution model",
          "Brain or memory sync surface",
        ],
        LIMITS.maxFiles
      )
    );
  }

  if (intent === "product-design") {
    return sortPlannedFiles(
      clampList(
        [
          "Primary user-facing surface",
          "Supporting UI component",
          "State or memory touchpoint",
        ],
        LIMITS.maxFiles
      )
    );
  }

  return sortPlannedFiles(
    clampList(getDomainConfig(domain).files, LIMITS.maxFiles)
  );
}

function buildCommands(
  intent: CodexForgeEngineIntent,
  context: CodexForgeChatContext,
  domain: CodexForgePlanDomain
): string[] {
  if (isExecutionMode(context)) {
    return clampList(
      [
        "Inspect the exact step target first",
        "Apply the smallest safe change",
        "Verify the result through the closest available check",
      ],
      LIMITS.maxCommands
    );
  }

  if (intent === "architecture") {
    return clampList(["npm run build"], LIMITS.maxCommands);
  }

  if (intent === "product-design") {
    return clampList(
      ["Review current UX and map the smallest safe UI change"],
      LIMITS.maxCommands
    );
  }

  return clampList(getDomainConfig(domain).commands, LIMITS.maxCommands);
}

function buildRisks(
  intent: CodexForgeEngineIntent,
  context: CodexForgeChatContext,
  domain: CodexForgePlanDomain
): string[] {
  const common = [
    "Do not change too many moving parts at once.",
    "Keep local-first behavior working.",
    "Preserve the response contract while evolving the system.",
  ];

  if (isExecutionMode(context)) {
    return clampList(
      [
        ...common,
        "Do not mark a step complete unless the output actually supports it.",
        "Do not assume external side effects succeeded without evidence.",
      ],
      LIMITS.maxRisks
    );
  }

  if (intent === "architecture") {
    return clampList(
      [
        ...common,
        "A split state model creates UI drift and execution inconsistency.",
      ],
      LIMITS.maxRisks
    );
  }

  if (intent === "product-design") {
    return clampList(
      [
        ...common,
        "A polished UI without coherent state underneath becomes misleading.",
      ],
      LIMITS.maxRisks
    );
  }

  return clampList(
    [...common, ...getDomainConfig(domain).risks],
    LIMITS.maxRisks
  );
}

function buildNextSteps(
  intent: CodexForgeEngineIntent,
  context: CodexForgeChatContext,
  domain: CodexForgePlanDomain,
  files: string[]
): string[] {
  const executionRequest = getExecutionRequest(context);

  if (executionRequest?.mode === "execute-task-step") {
    return clampList(
      [
        "Review the execution result carefully.",
        "Update the task if the step changed scope.",
        "Run the next step if this result is satisfactory.",
      ],
      LIMITS.maxNextSteps
    );
  }

  const clusterNotes = buildFileClusterNotes(files);

  if (intent === "architecture") {
    return clampList(
      [
        "Choose the single source of truth.",
        "Align route, hook, and UI around one state shape.",
        "Remove duplicate flow logic.",
        ...(clusterNotes.includes("Cluster detected: route + engine")
          ? ["Verify the route and engine boundaries together."]
          : []),
        ...(clusterNotes.includes("Cluster detected: contract + caller")
          ? ["Confirm the contract and caller stay aligned."]
          : []),
      ],
      LIMITS.maxNextSteps
    );
  }

  if (intent === "product-design") {
    return clampList(
      [
        "Clarify the user outcome.",
        "Choose the highest-value surface improvement.",
        "Preserve state clarity while improving UX.",
        ...(clusterNotes.includes("Cluster detected: hook + component")
          ? ["Review the hook and component together before changing behavior."]
          : []),
      ],
      LIMITS.maxNextSteps
    );
  }

  return clampList(
    [
      ...getDomainConfig(domain).nextSteps,
      ...(clusterNotes.includes("Cluster detected: engine + render")
        ? ["Inspect the engine and rendering layers together before editing."]
        : []),
      ...(clusterNotes.includes("Cluster detected: api + types")
        ? ["Check API and type surfaces together before changing the contract."]
        : []),
    ],
    LIMITS.maxNextSteps
  );
}

function buildStatusNotes(
  intent: CodexForgeEngineIntent,
  context: CodexForgeChatContext,
  domain: CodexForgePlanDomain,
  files: string[]
): string[] {
  const base = [
    "Local engine",
    "Structured output",
    "Stable contract",
    `Domain: ${domain}`,
  ];

  const clusterNotes = buildFileClusterNotes(files);

  if (isExecutionMode(context)) {
    return clampList(
      [
        ...base,
        "Execution-aware response",
        "Task step processed through local engine",
        "Automatic repo inspection skipped during execution mode",
      ],
      LIMITS.maxStatusItems
    );
  }

  return clampList(
    [
      ...base,
      ...(intent === "architecture" ? ["Architecture-oriented guidance"] : []),
      ...(intent === "product-design" ? ["Product-oriented guidance"] : []),
      ...clusterNotes,
    ],
    LIMITS.maxStatusItems
  );
}

function scoreToolForAnalysis(
  tool: ToolCandidate,
  analysis: CodexForgeEngineAnalysis,
  context: CodexForgeChatContext,
  deps: CodexForgeEngineDependencies
): number {
  let score = 0;

  if (tool.domain === analysis.domain) {
    score += 10;
  }

  if (tool.domain === "core" || tool.domain === "repo") {
    score += 2;
  }

  if (
    analysis.domain === "movie" &&
    (tool.domain === "video" || tool.domain === "meeting")
  ) {
    score += 2;
  }

  if (
    analysis.domain === "video" &&
    (tool.domain === "movie" || tool.domain === "comfyui")
  ) {
    score += 2;
  }

  if (
    analysis.domain === "automation" &&
    (tool.domain === "research" || tool.domain === "repo")
  ) {
    score += 2;
  }

  if (tool.availability === "ready") {
    score += 3;
  } else if (tool.availability === "stub") {
    score += 1;
  } else {
    score -= 2;
  }

  for (const tag of analysis.tags) {
    if (tool.tags.includes(tag)) {
      score += 3;
    }
  }

  const combinedText =
    `${tool.name} ${tool.description} ${tool.tags.join(" ")}`.toLowerCase();

  if (
    analysis.intent === "research" &&
    includesAny(combinedText, ["research", "compare", "inspect", "evidence"])
  ) {
    score += 4;
  }

  if (
    analysis.intent === "debugging" &&
    includesAny(combinedText, ["inspect", "read", "search", "test", "logs"])
  ) {
    score += 4;
  }

  if (
    analysis.intent === "coding" &&
    includesAny(combinedText, ["build", "scaffold", "manage", "generate", "write"])
  ) {
    score += 3;
  }

  if (
    analysis.intent === "architecture" &&
    includesAny(combinedText, ["orchestrate", "manage", "track", "workflow"])
  ) {
    score += 4;
  }

  if (
    analysis.intent === "product-design" &&
    includesAny(combinedText, ["web", "website", "memory", "workspace", "build"])
  ) {
    score += 4;
  }

  const executionRequest = getExecutionRequest(context);
  if (
    executionRequest?.mode === "execute-task-step" &&
    includesAny(combinedText, [
      "read",
      "search",
      "generate-diff",
      "snapshot",
      "run-tests",
      "inspect",
    ])
  ) {
    score += 3;
  }

  const autoInspectionCandidate = inferAutoInspectionCandidate(
    analysis,
    context,
    deps
  );

  if (autoInspectionCandidate && tool.name === autoInspectionCandidate) {
    score += CLUSTER_BONUS.repoInspectionCandidate;
  }

  if (tool.name === "manage-api-route" && analysis.tags.includes("route")) {
    score += CLUSTER_BONUS.routeWithEngine;
  }

  if (tool.name === "build-web-app" && analysis.tags.includes("engine")) {
    score += CLUSTER_BONUS.engineWithRender;
  }

  if (tool.name === "track-memory" && analysis.tags.includes("contract")) {
    score += CLUSTER_BONUS.contractWithCaller;
  }

  if (tool.name === "scaffold-website" && analysis.tags.includes("component")) {
    score += CLUSTER_BONUS.hookWithComponent;
  }

  if (tool.name === "manage-api-route" && analysis.tags.includes("types")) {
    score += CLUSTER_BONUS.apiWithTypes;
  }

  return score;
}

function buildRecommendedTools(
  analysis: CodexForgeEngineAnalysis,
  deps: CodexForgeEngineDependencies,
  context: CodexForgeChatContext
): CodexForgeStructuredTool[] {
  return deps.tools.tools
    .map((tool) => ({
      tool,
      score: scoreToolForAnalysis(tool, analysis, context, deps),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score;
      }

      if (a.tool.availability !== b.tool.availability) {
        if (a.tool.availability === "ready") return -1;
        if (b.tool.availability === "ready") return 1;
        if (a.tool.availability === "stub") return -1;
        if (b.tool.availability === "stub") return 1;
      }

      return a.tool.name.localeCompare(b.tool.name);
    })
    .slice(0, LIMITS.maxTools)
    .map(({ tool }) => ({
      name: tool.name,
      availability: tool.availability,
      description: tool.description,
    }));
}

function buildDomainSection(
  domain: CodexForgePlanDomain
): CodexForgeStructuredSection | null {
  const config = getDomainConfig(domain);
  if (!config.sectionTitle || !config.sectionItems?.length) {
    return null;
  }

  return {
    title: config.sectionTitle,
    items: config.sectionItems,
  };
}

function buildSections(
  analysis: CodexForgeEngineAnalysis,
  plan: CodexForgeEnginePlan,
  context: CodexForgeChatContext,
  deps: CodexForgeEngineDependencies
): CodexForgeStructuredSection[] {
  const sections: CodexForgeStructuredSection[] = [];

  sections.push({
    title: "What I understood",
    items: clampList(
      [
        `Project: ${analysis.projectName}`,
        `Intent: ${analysis.intent}`,
        `Domain: ${analysis.domain}`,
        `Goal: ${plan.goal}`,
      ],
      LIMITS.maxSectionItems
    ),
  });

  const understanding = buildUnderstandingItems(analysis, context, plan);
  if (understanding.length > 0) {
    sections.push({
      title: "Interpretation",
      items: understanding,
    });
  }

  if (analysis.tags.length > 0) {
    sections.push({
      title: "Tags",
      items: clampList(analysis.tags, LIMITS.maxSectionItems),
    });
  }

  const autoInspectionCandidate = inferAutoInspectionCandidate(
    analysis,
    context,
    deps
  );

  if (autoInspectionCandidate) {
    sections.push({
      title: "Automatic repo inspection",
      items: clampList(
        [
          `Primary candidate: ${autoInspectionCandidate}`,
          "This pass is limited to one safe read/search-style tool.",
          "Mutation tools are intentionally excluded from auto inspection.",
        ],
        LIMITS.maxSectionItems
      ),
    });
  } else if (isExecutionMode(context)) {
    sections.push({
      title: "Automatic repo inspection",
      items: clampList(
        [
          "Skipped for this pass because execution mode is active.",
          "Execution-focused responses should stay centered on the current step.",
        ],
        LIMITS.maxSectionItems
      ),
    });
  }

  const clusterNotes = buildFileClusterNotes(plan.files);
  if (clusterNotes.length > 0) {
    sections.push({
      title: "File clusters",
      items: clampList(clusterNotes, LIMITS.maxSectionItems),
    });
  }

  const executionRequest = getExecutionRequest(context);
  if (executionRequest?.mode === "execute-task-step") {
    sections.push({
      title: "Execution",
      items: clampList(
        [
          executionRequest.taskGoal ? `Task goal: ${executionRequest.taskGoal}` : "",
          typeof executionRequest.stepIndex === "number"
            ? `Step number: ${executionRequest.stepIndex + 1}`
            : "",
          executionRequest.stepText ? `Step text: ${executionRequest.stepText}` : "",
        ],
        LIMITS.maxSectionItems
      ),
    });

    const executionOutcomeItems = [
      "The current step has been interpreted and turned into a structured execution response.",
      "Use the result to decide whether to continue, adjust, or retry the plan.",
    ];

    const phase = getExecutionPhaseFromContext(context);
    const diffCount = getExecutionDiffCount(context);
    const snapshotFileCount = getExecutionSnapshotFileCount(context);

    if (phase) {
      executionOutcomeItems.push(`Engine phase: ${phase}`);
    }

    if (typeof diffCount === "number") {
      executionOutcomeItems.push(`Diff count: ${diffCount}`);
    }

    if (typeof snapshotFileCount === "number") {
      executionOutcomeItems.push(`Snapshot files: ${snapshotFileCount}`);
    }

    sections.push({
      title: "Execution outcome",
      items: clampList(executionOutcomeItems, LIMITS.maxSectionItems),
    });
  }

  if (plan.contextNotes.length > 0) {
    sections.push({
      title: "Context",
      items: clampList(plan.contextNotes, LIMITS.maxSectionItems),
    });
  }

  const domainSection = buildDomainSection(analysis.domain);
  if (domainSection) {
    sections.push({
      title: domainSection.title,
      items: clampList(domainSection.items, LIMITS.maxSectionItems),
    });
  }

  if (plan.files.length > 0) {
    sections.push({
      title: "Files to check",
      items: clampList(plan.files, LIMITS.maxSectionItems),
    });
  }

  if (plan.availableTools.length > 0) {
    sections.push({
      title: "Recommended tool names",
      items: clampList(plan.availableTools, LIMITS.maxSectionItems),
    });
  }

  return sections;
}

/* ================= PUBLIC ================= */

export function buildPlanStatus(
  intent: CodexForgeEngineIntent,
  context: CodexForgeChatContext
): CodexForgePlanStatus {
  const status: CodexForgePlanStatus = isExecutionMode(context)
    ? "executed"
    : intent === "planning"
      ? "draft"
      : "active";

  return VALID_PLAN_STATUSES.includes(status) ? status : "active";
}

export function buildWarnings(
  analysis: CodexForgeEngineAnalysis,
  context: CodexForgeChatContext,
  plan: CodexForgeEnginePlan
): string[] {
  const warnings: string[] = [];

  if (!analysis.lastUserMessage) {
    warnings.push("No user message found.");
  }

  if (!context.systemGuide) {
    warnings.push("System guide missing.");
  }

  if (!context.repoPath) {
    warnings.push("Repo path missing.");
  }

  if ((context.memory?.length ?? 0) === 0) {
    warnings.push("No memory injected.");
  }

  if (!context.activePlan && analysis.intent === "planning") {
    warnings.push("No active plan available.");
  }

  if (isExecutionMode(context) && !getExecutionRequest(context)?.stepText) {
    warnings.push("Execution mode is active but step text is missing.");
  }

  if (plan.recommendedTools.length === 0) {
    warnings.push("No recommended tools matched the request.");
  }

  return clampList(warnings, LIMITS.maxWarnings);
}

export function analyze(
  messages: CodexForgeMessage[],
  context: CodexForgeChatContext
): CodexForgeEngineAnalysis {
  const userMessage = lastUser(messages);
  const userText = userMessage?.text ?? "";
  const projectName = context.projectName || "CodexForge";
  const intent = inferIntent(userText, context);
  const domain = inferDomain(userText, context);
  const tags = buildDomainTags(domain, userText, context);

  return {
    lastUserMessage: userMessage,
    userText,
    projectName,
    intent,
    domain,
    tags,
  };
}

export function buildPlan(
  analysis: CodexForgeEngineAnalysis,
  deps: CodexForgeEngineDependencies,
  context: CodexForgeChatContext
): CodexForgeEnginePlan {
  const executionRequest = getExecutionRequest(context);

  const goal =
    executionRequest?.mode === "execute-task-step"
      ? buildExecutionGoal(executionRequest, analysis.projectName)
      : buildGoal(analysis.userText, analysis.projectName);

  const domain = analysis.domain;
  const tags = analysis.tags;
  const contextNotes = buildContextNotes(context, domain);
  const files = buildFiles(analysis.intent, context, domain);
  const commands = buildCommands(analysis.intent, context, domain);
  const risks = buildRisks(analysis.intent, context, domain);
  const nextSteps = buildNextSteps(analysis.intent, context, domain, files);
  const status = buildStatusNotes(analysis.intent, context, domain, files);
  const recommendedTools = buildRecommendedTools(analysis, deps, context);

  const basePlan: CodexForgeEnginePlan = {
    goal,
    contextNotes,
    files,
    commands,
    risks,
    nextSteps,
    status,
    sections: [],
    availableTools: clampList(
      recommendedTools.map((tool) => tool.name),
      LIMITS.maxTools
    ),
    recommendedTools,
    domain,
    tags,
    intentLabel: analysis.intent,
  };

  basePlan.sections = buildSections(analysis, basePlan, context, deps);

  return basePlan;
}