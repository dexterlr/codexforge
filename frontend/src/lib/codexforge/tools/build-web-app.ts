import type {
  CodexForgeToolDefinition,
  CodexForgeToolExecutionContext,
  CodexForgeToolResult,
  CodexForgeToolWarning,
} from "./contracts";
import {
  asBoolean,
  asOptionalString,
  asStringArray,
  buildStartedAt,
  clampText,
  dedupeStrings,
  finishToolError,
  finishToolSuccess,
  normalizeWindowsPath,
} from "./shared";

/* ================= CONSTANTS ================= */

const TOOL_NAME = "build-web-app";

const DEFAULT_APP_TYPE = "local-first web app";
const DEFAULT_TARGET_PATH = "src/app";

const MAX_ROUTES = 10;
const MAX_FEATURES = 12;
const MAX_CONSTRAINTS = 12;
const MAX_STACK_ITEMS = 10;
const MAX_INFO_ARCH_ITEMS = 8;
const MAX_API_SURFACES = 8;
const MAX_STATE_ITEMS = 8;
const MAX_PHASES = 6;
const MAX_PHASE_ITEMS = 6;
const MAX_FILE_TARGETS = 14;
const MAX_RISKS = 8;
const MAX_VALIDATION_ITEMS = 8;
const MAX_ROLLOUT_ITEMS = 8;
const MAX_NEXT_ACTIONS = 8;

/* ================= TYPES ================= */

type BuildWebAppInput = {
  goal?: string;
  appType?: string;
  routes?: string[];
  features?: string[];
  constraints?: string[];
  designStyle?: string;
  targetPath?: string;
  includeApi?: boolean;
  includeStateModel?: boolean;
  includeTestingPlan?: boolean;
  includeRolloutPlan?: boolean;
};

type WebPlanPhase = {
  title: string;
  items: string[];
};

type BuildWebAppOutput = {
  goal: string;
  appType: string;
  designStyle?: string;
  summary: string;
  recommendedStack: string[];
  informationArchitecture: string[];
  routes: string[];
  features: string[];
  constraints: string[];
  apiSurfaces: string[];
  stateModel: string[];
  implementationPhases: WebPlanPhase[];
  fileTargets: string[];
  risks: string[];
  validation: string[];
  rollout: string[];
  nextActions: string[];
};

/* ================= HELPERS ================= */

function clean(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

function lower(value: string): string {
  return value.toLowerCase();
}

function clampList(values: string[], max: number): string[] {
  return dedupeStrings(values.map(clean).filter(Boolean)).slice(0, max);
}

function normalizeRoute(value: string): string {
  const cleaned = clean(value).replace(/\\/g, "/");
  if (!cleaned) return "";

  const withSlash = cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
  return withSlash.replace(/\/+/g, "/");
}

function normalizeRoutes(values: string[]): string[] {
  return clampList(values.map(normalizeRoute).filter(Boolean), MAX_ROUTES);
}

function normalizeTargetPath(value?: string): string {
  const normalized = normalizeWindowsPath(value ?? "").replace(/\\/g, "/");
  return normalized || DEFAULT_TARGET_PATH;
}

function inferAppType(goal: string, explicit?: string): string {
  const direct = asOptionalString(explicit);
  if (direct) return direct;

  const query = lower(goal);

  if (query.includes("dashboard")) return "dashboard web app";
  if (query.includes("landing page")) return "landing page";
  if (query.includes("marketing")) return "marketing website";
  if (query.includes("portal")) return "portal web app";
  if (query.includes("admin")) return "admin web app";
  if (query.includes("editor")) return "editor-style web app";
  if (query.includes("chat")) return "assistant-style web app";
  if (query.includes("website")) return "website";

  return DEFAULT_APP_TYPE;
}

function inferRoutes(goal: string, provided: string[]): string[] {
  const explicit = normalizeRoutes(provided);
  if (explicit.length > 0) return explicit;

  const query = lower(goal);

  return normalizeRoutes([
    "/",
    query.includes("dashboard") ? "/dashboard" : "",
    query.includes("settings") ? "/settings" : "",
    query.includes("admin") ? "/admin" : "",
    query.includes("login") || query.includes("auth") ? "/login" : "",
    query.includes("project") ? "/projects/[id]" : "",
    query.includes("task") ? "/tasks/[id]" : "",
  ]);
}

function inferFeatures(goal: string, provided: string[]): string[] {
  const explicit = clampList(provided, MAX_FEATURES);
  if (explicit.length > 0) return explicit;

  const query = lower(goal);

  return clampList(
    [
      "Clear primary user journey",
      "Responsive page shell",
      "Local-first state persistence",
      query.includes("dashboard") ? "Dashboard summary surface" : "",
      query.includes("chat") ? "Chat or assistant interaction flow" : "",
      query.includes("task") ? "Task management flow" : "",
      query.includes("memory") ? "Memory or continuity surface" : "",
      query.includes("settings") ? "Settings surface" : "",
      query.includes("search") ? "Search interaction flow" : "",
      query.includes("auth") || query.includes("login")
        ? "Authentication entry flow"
        : "",
      "Loading, empty, and error states",
    ],
    MAX_FEATURES
  );
}

function inferConstraints(
  provided: string[],
  context: CodexForgeToolExecutionContext
): string[] {
  return clampList(
    [
      ...provided,
      "Prefer safe incremental implementation over broad rewrites.",
      "Preserve local-first behavior where relevant.",
      context.repoPath ? `Repo context: ${context.repoPath}` : "",
      context.workspaceRoot ? `Workspace context: ${context.workspaceRoot}` : "",
    ],
    MAX_CONSTRAINTS
  );
}

function buildRecommendedStack(goal: string): string[] {
  const query = lower(goal);

  return clampList(
    [
      "Next.js App Router",
      "TypeScript",
      "Composable React UI",
      "Shared UI and API contracts",
      "Local-first persisted client state",
      "Route handlers for backend surfaces",
      query.includes("dashboard") ? "Dashboard layout composition" : "",
      query.includes("form") ? "Typed form state and validation" : "",
      query.includes("search") ? "Search query and result state model" : "",
      query.includes("chat") ? "Streaming-safe interaction boundaries" : "",
    ],
    MAX_STACK_ITEMS
  );
}

function buildInformationArchitecture(
  appType: string,
  routes: string[],
  features: string[]
): string[] {
  return clampList(
    [
      `Primary app type: ${appType}`,
      routes.length > 0 ? `Primary route: ${routes[0]}` : "",
      routes.length > 1 ? `Secondary routes: ${routes.length - 1}` : "",
      features.length > 0 ? `Primary feature: ${features[0]}` : "",
      "Keep layout shell, feature surfaces, and shared primitives separate.",
      "Keep route ownership, data ownership, and state ownership explicit.",
    ],
    MAX_INFO_ARCH_ITEMS
  );
}

function buildApiSurfaces(
  goal: string,
  includeApi: boolean,
  routes: string[],
  features: string[]
): string[] {
  if (!includeApi) return [];

  const query = lower(goal);

  return clampList(
    [
      "Bootstrap data route for primary screen hydration",
      "Primary mutation route for create or update actions",
      query.includes("search") || features.some((item) => lower(item).includes("search"))
        ? "Search route with explicit query validation"
        : "",
      query.includes("task")
        ? "Task mutation route with stable payload contract"
        : "",
      query.includes("chat")
        ? "Chat action route with explicit request and response shapes"
        : "",
      routes.some((route) => route.includes("[id]"))
        ? "Detail route loader for entity-specific surfaces"
        : "",
    ],
    MAX_API_SURFACES
  );
}

function buildStateModel(
  includeStateModel: boolean,
  features: string[]
): string[] {
  if (!includeStateModel) return [];

  return clampList(
    [
      "One primary source of truth for canonical UI state",
      "Persisted local state for drafts and continuity",
      "Derived UI state computed from canonical state",
      features.some((item) => lower(item).includes("task"))
        ? "Task progress state isolated from view-only state"
        : "",
      features.some((item) => lower(item).includes("memory"))
        ? "Memory state separated from transient interaction state"
        : "",
      "Explicit loading, success, and error substates",
    ],
    MAX_STATE_ITEMS
  );
}

function buildFileTargets(
  targetPath: string,
  routes: string[],
  includeApi: boolean
): string[] {
  const routeTargets = routes.map((route) => {
    if (route === "/") {
      return `${targetPath}/page.tsx`;
    }

    return `${targetPath}/${route.replace(/^\//, "")}/page.tsx`;
  });

  return clampList(
    [
      `${targetPath}/layout.tsx`,
      `${targetPath}/page.tsx`,
      "src/components/",
      "src/lib/",
      "src/lib/types.ts",
      ...(includeApi ? ["src/app/api/"] : []),
      ...routeTargets,
    ],
    MAX_FILE_TARGETS
  );
}

function buildImplementationPhases(args: {
  appType: string;
  routes: string[];
  features: string[];
  apiSurfaces: string[];
  stateModel: string[];
  includeTestingPlan: boolean;
}): WebPlanPhase[] {
  const phases: WebPlanPhase[] = [
    {
      title: "Foundation",
      items: clampList(
        [
          `Define the ${args.appType} shell and primary user journey.`,
          "Lock route ownership and layout hierarchy.",
          "Define shared contracts before wiring callers.",
        ],
        MAX_PHASE_ITEMS
      ),
    },
    {
      title: "Primary flow",
      items: clampList(
        [
          args.routes[0] ? `Implement primary route: ${args.routes[0]}.` : "",
          args.features[0] ? `Implement primary feature: ${args.features[0]}.` : "",
          args.features[1]
            ? `Implement secondary feature: ${args.features[1]}.`
            : "",
          "Wire loading, empty, and error states.",
        ],
        MAX_PHASE_ITEMS
      ),
    },
  ];

  if (args.apiSurfaces.length > 0) {
    phases.push({
      title: "Backend contract",
      items: clampList(
        [
          ...args.apiSurfaces,
          "Validate request and response shapes against the UI caller.",
        ],
        MAX_PHASE_ITEMS
      ),
    });
  }

  if (args.stateModel.length > 0) {
    phases.push({
      title: "State model",
      items: clampList(args.stateModel, MAX_PHASE_ITEMS),
    });
  }

  if (args.includeTestingPlan) {
    phases.push({
      title: "Validation",
      items: clampList(
        [
          "Verify the primary route renders cleanly.",
          "Verify the main mutation or interaction path.",
          "Verify one success path and one failure path.",
          "Run build and targeted validation.",
        ],
        MAX_PHASE_ITEMS
      ),
    });
  }

  return phases.slice(0, MAX_PHASES);
}

function buildRisks(
  appType: string,
  includeApi: boolean,
  features: string[]
): string[] {
  return clampList(
    [
      `A polished ${appType} can still hide weak state ownership underneath.`,
      includeApi
        ? "UI and route contract drift can break the main flow."
        : "",
      features.some((item) => lower(item).includes("memory"))
        ? "Memory continuity can drift if persisted and transient state mix together."
        : "",
      features.some((item) => lower(item).includes("task"))
        ? "Task state can drift if optimistic UI and canonical state diverge."
        : "",
      "Too many route and state changes at once slow safe verification.",
    ],
    MAX_RISKS
  );
}

function buildValidation(includeTestingPlan: boolean): string[] {
  if (!includeTestingPlan) return [];

  return clampList(
    [
      "Run a build after the core flow is wired.",
      "Verify the primary route and one deeper route.",
      "Verify the primary interaction path.",
      "Confirm shared contracts match actual UI expectations.",
    ],
    MAX_VALIDATION_ITEMS
  );
}

function buildRollout(includeRolloutPlan: boolean): string[] {
  if (!includeRolloutPlan) return [];

  return clampList(
    [
      "Ship the narrowest usable slice first.",
      "Stabilize the primary route before expanding surface area.",
      "Add secondary routes after the main task flow is stable.",
      "Keep visual polish separate from functional stabilization.",
    ],
    MAX_ROLLOUT_ITEMS
  );
}

function buildNextActions(
  routes: string[],
  fileTargets: string[],
  apiSurfaces: string[]
): string[] {
  return clampList(
    [
      routes[0] ? `Start with route ${routes[0]}.` : "",
      fileTargets[0]
        ? `Ground the first implementation in ${fileTargets[0]}.`
        : "",
      apiSurfaces[0] ? `Define the first backend surface: ${apiSurfaces[0]}.` : "",
      "Implement the main user flow before adding secondary polish.",
      "Verify state ownership before expanding route count.",
    ],
    MAX_NEXT_ACTIONS
  );
}

function buildSummary(args: {
  appType: string;
  routes: string[];
  features: string[];
  designStyle?: string;
  constraints: string[];
}): string {
  return clampText(
    [
      `Planned ${args.appType}`,
      `${args.routes.length} route${args.routes.length === 1 ? "" : "s"}`,
      `${args.features.length} core feature${args.features.length === 1 ? "" : "s"}`,
      args.designStyle ? `style: ${args.designStyle}` : "",
      `${args.constraints.length} constraints considered`,
    ]
      .filter(Boolean)
      .join(" • "),
    220
  );
}

function normalizeInput(input: Record<string, unknown>): BuildWebAppInput {
  return {
    goal: asOptionalString(input.goal),
    appType: asOptionalString(input.appType),
    routes: asStringArray(input.routes),
    features: asStringArray(input.features),
    constraints: asStringArray(input.constraints),
    designStyle: asOptionalString(input.designStyle),
    targetPath: asOptionalString(input.targetPath),
    includeApi: asBoolean(input.includeApi, true),
    includeStateModel: asBoolean(input.includeStateModel, true),
    includeTestingPlan: asBoolean(input.includeTestingPlan, true),
    includeRolloutPlan: asBoolean(input.includeRolloutPlan, true),
  };
}

function buildPlan(
  input: BuildWebAppInput,
  context: CodexForgeToolExecutionContext
): BuildWebAppOutput {
  const goal = clean(input.goal ?? "");
  const appType = inferAppType(goal, input.appType);
  const routes = inferRoutes(goal, input.routes ?? []);
  const features = inferFeatures(goal, input.features ?? []);
  const constraints = inferConstraints(input.constraints ?? [], context);
  const recommendedStack = buildRecommendedStack(goal);
  const informationArchitecture = buildInformationArchitecture(
    appType,
    routes,
    features
  );
  const apiSurfaces = buildApiSurfaces(
    goal,
    input.includeApi !== false,
    routes,
    features
  );
  const stateModel = buildStateModel(input.includeStateModel !== false, features);
  const fileTargets = buildFileTargets(
    normalizeTargetPath(input.targetPath),
    routes,
    input.includeApi !== false
  );
  const implementationPhases = buildImplementationPhases({
    appType,
    routes,
    features,
    apiSurfaces,
    stateModel,
    includeTestingPlan: input.includeTestingPlan !== false,
  });
  const risks = buildRisks(appType, input.includeApi !== false, features);
  const validation = buildValidation(input.includeTestingPlan !== false);
  const rollout = buildRollout(input.includeRolloutPlan !== false);
  const nextActions = buildNextActions(routes, fileTargets, apiSurfaces);

  return {
    goal,
    appType,
    ...(input.designStyle ? { designStyle: input.designStyle } : {}),
    summary: buildSummary({
      appType,
      routes,
      features,
      designStyle: input.designStyle,
      constraints,
    }),
    recommendedStack,
    informationArchitecture,
    routes,
    features,
    constraints,
    apiSurfaces,
    stateModel,
    implementationPhases,
    fileTargets,
    risks,
    validation,
    rollout,
    nextActions,
  };
}

/* ================= TOOL ================= */

export const buildWebAppTool: CodexForgeToolDefinition = {
  name: TOOL_NAME,
  label: "Build Web App",
  description:
    "Plan and structure implementation of websites, dashboards, and local-first web apps.",
  availability: "ready",
  domain: "web",
  safety: "guarded",
  capabilities: ["workflow", "read", "write"],
  tags: ["web", "app", "implementation", "frontend", "planning", "routes", "state"],
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
      description: "Optional architecture or delivery constraints.",
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
      defaultValue: DEFAULT_TARGET_PATH,
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
  examples: [
    {
      title: "Plan a dashboard app",
      input: {
        goal: "Build a local-first dashboard for tasks and memory",
      },
    },
    {
      title: "Plan a landing page",
      input: {
        goal: "Build a marketing landing page for CodexForge",
        appType: "landing page",
        routes: ["/", "/pricing"],
        features: ["Hero section", "Feature grid", "Pricing section"],
      },
    },
  ],
  metadata: {
    provider: "local",
    version: "codexforge-build-web-app-v1",
    supportedPlatforms: ["windows", "linux", "darwin"],
    tags: ["planning", "web", "server-only"],
    requiresRuntime: "server",
  },
  handler: async (
    rawInput: Record<string, unknown>,
    context: CodexForgeToolExecutionContext
  ): Promise<CodexForgeToolResult> => {
    const startedAt = buildStartedAt();

    try {
      const input = normalizeInput(rawInput);

      if (!input.goal) {
        return finishToolError({
          toolName: TOOL_NAME,
          summary: "Missing web app goal.",
          code: "MISSING_GOAL",
          message: "The build-web-app tool requires a goal.",
          startedAt,
          retryable: false,
        });
      }

      const plan = buildPlan(input, context);
      const warnings: CodexForgeToolWarning[] = [];

      if (!context.repoPath && !context.workspaceRoot) {
        warnings.push({
          code: "MISSING_WORKSPACE_CONTEXT",
          message:
            "Workspace or repo context was not supplied, so file targets are generic.",
        });
      }

      return finishToolSuccess({
        toolName: TOOL_NAME,
        summary: plan.summary,
        startedAt,
        warnings: warnings.length > 0 ? warnings : undefined,
        content: {
          type: "json",
          json: {
            goal: plan.goal,
            appType: plan.appType,
            designStyle: plan.designStyle ?? null,
            summary: plan.summary,
            recommendedStack: plan.recommendedStack,
            informationArchitecture: plan.informationArchitecture,
            routes: plan.routes,
            features: plan.features,
            constraints: plan.constraints,
            apiSurfaces: plan.apiSurfaces,
            stateModel: plan.stateModel,
            implementationPhases: plan.implementationPhases,
            fileTargets: plan.fileTargets,
            risks: plan.risks,
            validation: plan.validation,
            rollout: plan.rollout,
            nextActions: plan.nextActions,
          },
        },
        raw: {
          goal: plan.goal,
          appType: plan.appType,
          routeCount: plan.routes.length,
          featureCount: plan.features.length,
        },
      });
    } catch (error) {
      return finishToolError({
        toolName: TOOL_NAME,
        summary: "Failed to build web app plan.",
        code: "BUILD_WEB_APP_FAILED",
        message:
          error instanceof Error && error.message.trim().length > 0
            ? clampText(error.message, 400)
            : "An unexpected error occurred while building the web app plan.",
        startedAt,
        retryable: false,
      });
    }
  },
};