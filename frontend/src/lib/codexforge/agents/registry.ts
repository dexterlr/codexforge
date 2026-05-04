import type { CodexForgePlanDomain } from "@/lib/codexforge/types";
import type {
  CodexForgeAgentRole,
  CodexForgeAgentRoleId,
  CodexForgeAgentTeamSelection,
  CodexForgeAgentTeamSelectionInput,
  CodexForgeAgentToolName,
  CodexForgeAgentToolPolicy,
} from "./types";

const READ_FILE: CodexForgeAgentToolPolicy = {
  tool: "read-file",
  permission: "read-only",
  reason: "Read concrete source files before making repo-grounded claims.",
};

const LIST_FILES: CodexForgeAgentToolPolicy = {
  tool: "list-files",
  permission: "read-only",
  reason: "Discover relevant project structure before selecting edit points.",
};

const SEARCH_PROJECT: CodexForgeAgentToolPolicy = {
  tool: "search-project",
  permission: "read-only",
  reason: "Find symbols, routes, components, and existing implementation patterns.",
};

const SNAPSHOT_PROJECT: CodexForgeAgentToolPolicy = {
  tool: "snapshot-project",
  permission: "read-only",
  reason: "Capture project state before planning risky changes.",
};

const GENERATE_DIFF: CodexForgeAgentToolPolicy = {
  tool: "generate-diff",
  permission: "approval-required",
  reason: "Diff generation proposes mutations and must remain reviewable.",
};

const APPLY_DIFF: CodexForgeAgentToolPolicy = {
  tool: "apply-diff",
  permission: "approval-required",
  reason: "Applying patches mutates files and requires explicit approval.",
};

const WRITE_FILE: CodexForgeAgentToolPolicy = {
  tool: "write-file",
  permission: "approval-required",
  reason: "Direct file writes mutate the workspace and require explicit approval.",
};

const RUN_COMMAND: CodexForgeAgentToolPolicy = {
  tool: "run-command",
  permission: "approval-required",
  reason: "Shell commands can mutate system state or run expensive work.",
};

const RUN_TESTS: CodexForgeAgentToolPolicy = {
  tool: "run-tests",
  permission: "approval-required",
  reason: "Test execution is allowed after approval when it may run local commands.",
};

const BUILD_WEB_APP: CodexForgeAgentToolPolicy = {
  tool: "build-web-app",
  permission: "approval-required",
  reason: "Build execution can be expensive and should be visible.",
};

const BROWSER_CONTROL: CodexForgeAgentToolPolicy = {
  tool: "browser-control",
  permission: "approval-required",
  reason: "Browser automation requires explicit user intent and visible state.",
};

const DESKTOP_CONTROL: CodexForgeAgentToolPolicy = {
  tool: "desktop-control",
  permission: "approval-required",
  reason: "Desktop automation requires explicit user intent and visible state.",
};

const CAMERA_CONTROL: CodexForgeAgentToolPolicy = {
  tool: "camera-control",
  permission: "blocked-by-default",
  reason: "Camera access must never happen silently.",
};

const VOICE_CONTROL: CodexForgeAgentToolPolicy = {
  tool: "voice-control",
  permission: "approval-required",
  reason: "Voice workflows require explicit opt-in and visible state.",
};

const RENDER_JOB: CodexForgeAgentToolPolicy = {
  tool: "render-job",
  permission: "approval-required",
  reason: "Render jobs can be long-running, expensive, and file-mutating.",
};

const EXTERNAL_API: CodexForgeAgentToolPolicy = {
  tool: "external-api",
  permission: "approval-required",
  reason: "External calls require clarity on data, cost, and privacy.",
};

const MARKET_DATA: CodexForgeAgentToolPolicy = {
  tool: "market-data",
  permission: "read-only",
  reason: "Market-data reads support research but must not imply trading certainty.",
};

const BROKER_EXECUTION: CodexForgeAgentToolPolicy = {
  tool: "broker-execution",
  permission: "blocked-by-default",
  reason: "Real trade execution must be blocked by default and never automated silently.",
};

const BLENDER_PYTHON: CodexForgeAgentToolPolicy = {
  tool: "blender-python",
  permission: "approval-required",
  reason: "Blender Python can create or mutate assets and render settings.",
};

const COMFYUI_QUEUE: CodexForgeAgentToolPolicy = {
  tool: "comfyui-queue",
  permission: "approval-required",
  reason: "ComfyUI queue execution can consume GPU time and create files.",
};

const UNREAL_AUTOMATION: CodexForgeAgentToolPolicy = {
  tool: "unreal-automation",
  permission: "approval-required",
  reason: "Unreal automation can mutate projects, assets, and build outputs.",
};

const DECK_EXPORT: CodexForgeAgentToolPolicy = {
  tool: "deck-export",
  permission: "approval-required",
  reason: "Deck export creates artifacts and should be user-approved.",
};

const VIDEO_RENDER: CodexForgeAgentToolPolicy = {
  tool: "video-render",
  permission: "approval-required",
  reason: "Video rendering can be expensive, file-mutating, and long-running.",
};

const SAFE_REPO_READ_TOOLS = [
  READ_FILE,
  LIST_FILES,
  SEARCH_PROJECT,
  SNAPSHOT_PROJECT,
] as const;

const SAFE_REPO_MUTATION_TOOLS = [
  GENERATE_DIFF,
  APPLY_DIFF,
  WRITE_FILE,
  RUN_COMMAND,
  RUN_TESTS,
  BUILD_WEB_APP,
] as const;

const CREATIVE_APPROVAL_TOOLS = [
  RENDER_JOB,
  BLENDER_PYTHON,
  COMFYUI_QUEUE,
  UNREAL_AUTOMATION,
  DECK_EXPORT,
  VIDEO_RENDER,
] as const;

export const CODEXFORGE_AGENT_ROLES: Record<
  CodexForgeAgentRoleId,
  CodexForgeAgentRole
> = {
  orchestrator: {
    id: "orchestrator",
    label: "Orchestrator",
    domain: "cross-domain",
    mode: "lead",
    mission:
      "Route the user goal to the right specialist team, preserve safety gates, and keep the final answer coherent.",
    strengths: [
      "domain routing",
      "handoff control",
      "risk separation",
      "visible next actions",
    ],
    defaultTools: [...SAFE_REPO_READ_TOOLS],
    outputContract: {
      kind: "plan",
      mustInclude: [
        "selected domain",
        "primary role",
        "support roles",
        "tools allowed",
        "approval gates",
        "next action",
      ],
      shouldAvoid: [
        "hidden tool use",
        "unsupported claims",
        "multi-agent complexity without user value",
      ],
    },
    handoffRules: [
      "Send concrete file work to repo-inspector before coder.",
      "Send mutation work through reviewer before apply/write tools.",
      "Send creative production work through an explicit approval checkpoint before render or asset mutation.",
    ],
    safetyRules: [
      "Do not imply that blocked tools were used.",
      "Separate read-only inspection from mutation.",
      "Prefer deterministic routing over emergent swarm behavior.",
    ],
  },

  planner: {
    id: "planner",
    label: "Planner",
    domain: "general",
    mode: "support",
    mission:
      "Turn ambiguous goals into phased, executable plans with constraints, risks, and validation steps.",
    strengths: ["scope control", "sequencing", "risk mapping", "validation planning"],
    defaultTools: [...SAFE_REPO_READ_TOOLS],
    outputContract: {
      kind: "plan",
      mustInclude: ["goal", "phases", "risks", "validation", "first action"],
      shouldAvoid: ["vague advice", "unbounded roadmaps", "missing success criteria"],
    },
    handoffRules: [
      "Hand repo-specific implementation to repo-inspector and coder.",
      "Hand quality gates to reviewer and tester.",
    ],
    safetyRules: [
      "Do not schedule background work.",
      "Do not propose mutation without approval checkpoint.",
    ],
  },

  "repo-inspector": {
    id: "repo-inspector",
    label: "Repo Inspector",
    domain: "debug",
    mode: "lead",
    mission:
      "Inspect concrete files, symbols, and repo structure before making engineering claims.",
    strengths: [
      "file grounding",
      "edit-point detection",
      "symbol search",
      "implementation traceability",
    ],
    defaultTools: [...SAFE_REPO_READ_TOOLS],
    outputContract: {
      kind: "inspection",
      mustInclude: [
        "files inspected",
        "best edit point",
        "supporting evidence",
        "uncertainty",
        "next command or patch proposal",
      ],
      shouldAvoid: [
        "guessing without reading files",
        "generic shell suggestions when tools can inspect",
      ],
    },
    handoffRules: [
      "Hand patch design to coder after identifying an edit point.",
      "Hand validation to tester.",
    ],
    safetyRules: [
      "Only use read-only tools without approval.",
      "Do not claim a file was inspected unless a tool result exists.",
    ],
  },

  coder: {
    id: "coder",
    label: "Coder",
    domain: "web",
    mode: "support",
    mission:
      "Produce precise, maintainable implementation changes that fit the existing architecture.",
    strengths: ["TypeScript", "Next.js", "contracts", "refactors", "safe diffs"],
    defaultTools: [...SAFE_REPO_READ_TOOLS, GENERATE_DIFF, WRITE_FILE],
    outputContract: {
      kind: "patch-proposal",
      mustInclude: [
        "changed files",
        "why each change exists",
        "compatibility concerns",
        "validation command",
      ],
      shouldAvoid: [
        "blind rewrites",
        "unreviewed mutation",
        "breaking shared contracts silently",
      ],
    },
    handoffRules: [
      "Use repo-inspector findings before proposing changes.",
      "Send non-trivial changes to reviewer.",
      "Send runnable checks to tester.",
    ],
    safetyRules: [
      "Generate or write changes only after approval.",
      "Keep diffs reviewable and scoped.",
    ],
  },

  reviewer: {
    id: "reviewer",
    label: "Reviewer",
    domain: "debug",
    mode: "review",
    mission:
      "Challenge assumptions, detect regressions, verify safety gates, and improve implementation quality.",
    strengths: ["risk review", "contract review", "edge cases", "regression detection"],
    defaultTools: [...SAFE_REPO_READ_TOOLS],
    outputContract: {
      kind: "review",
      mustInclude: ["what looks right", "risks", "missing checks", "recommended fix"],
      shouldAvoid: ["rubber-stamping", "style-only feedback", "uncited claims"],
    },
    handoffRules: [
      "Send required validation to tester.",
      "Send implementation corrections back to coder.",
    ],
    safetyRules: [
      "Flag mutation, shell, external, and render actions that lack approval.",
    ],
  },

  tester: {
    id: "tester",
    label: "Tester",
    domain: "debug",
    mode: "support",
    mission:
      "Define and run validation paths for build, smoke, unit, integration, and workflow checks.",
    strengths: ["smoke tests", "build validation", "regression checks", "acceptance criteria"],
    defaultTools: [...SAFE_REPO_READ_TOOLS, RUN_TESTS, BUILD_WEB_APP, RUN_COMMAND],
    outputContract: {
      kind: "test-plan",
      mustInclude: ["test target", "commands", "expected result", "failure interpretation"],
      shouldAvoid: ["untestable criteria", "commands without purpose"],
    },
    handoffRules: [
      "Send failures to debugger or repo-inspector.",
      "Send passing validation to orchestrator for final summary.",
    ],
    safetyRules: [
      "Request approval before command execution.",
      "Prefer smoke tests that prove the intended routing/behavior.",
    ],
  },

  researcher: {
    id: "researcher",
    label: "Researcher",
    domain: "research",
    mode: "lead",
    mission:
      "Gather evidence, compare options, identify uncertainty, and synthesize grounded recommendations.",
    strengths: ["source evaluation", "comparative analysis", "unknown mapping", "synthesis"],
    defaultTools: [EXTERNAL_API],
    outputContract: {
      kind: "research-brief",
      mustInclude: ["question", "evidence", "comparison", "uncertainty", "recommendation"],
      shouldAvoid: ["uncited factual claims", "overconfident conclusions"],
    },
    handoffRules: [
      "Hand architecture implications to planner.",
      "Hand implementation implications to coder.",
    ],
    safetyRules: [
      "Distinguish evidence from inference.",
      "Avoid acting on external systems without approval.",
    ],
  },

  "web-builder": {
    id: "web-builder",
    label: "Web Builder",
    domain: "web",
    mode: "lead",
    mission:
      "Design and build production-grade websites, apps, dashboards, and product surfaces.",
    strengths: ["Next.js", "React", "UX flows", "API boundaries", "deployment readiness"],
    defaultTools: [...SAFE_REPO_READ_TOOLS, ...SAFE_REPO_MUTATION_TOOLS],
    outputContract: {
      kind: "workflow",
      mustInclude: [
        "route map",
        "component map",
        "data/API plan",
        "implementation phases",
        "validation",
      ],
      shouldAvoid: ["pretty-only design", "missing accessibility", "missing state model"],
    },
    handoffRules: [
      "Use design-director for high-end UI direction.",
      "Use tester for build and smoke validation.",
    ],
    safetyRules: [
      "Require approval before writes, diffs, commands, or deployment.",
    ],
  },

  debugger: {
    id: "debugger",
    label: "Debugger",
    domain: "debug",
    mode: "lead",
    mission:
      "Find root causes, isolate failing paths, and produce minimal validated fixes.",
    strengths: ["root-cause analysis", "stack traces", "edit-point isolation", "validation"],
    defaultTools: [...SAFE_REPO_READ_TOOLS, RUN_TESTS, BUILD_WEB_APP],
    outputContract: {
      kind: "inspection",
      mustInclude: ["symptom", "likely cause", "edit point", "fix plan", "validation"],
      shouldAvoid: ["shotgun debugging", "editing without evidence"],
    },
    handoffRules: [
      "Use repo-inspector for file grounding.",
      "Use coder for patch proposal.",
      "Use tester for validation.",
    ],
    safetyRules: [
      "Read before editing.",
      "Do not run commands without approval.",
    ],
  },

  "automation-operator": {
    id: "automation-operator",
    label: "Automation Operator",
    domain: "automation",
    mode: "lead",
    mission:
      "Plan approval-safe automations across repo, browser, desktop, voice, and local operator workflows.",
    strengths: [
      "tool sequencing",
      "approval checkpoints",
      "rollback planning",
      "operator safety",
    ],
    defaultTools: [
      ...SAFE_REPO_READ_TOOLS,
      GENERATE_DIFF,
      APPLY_DIFF,
      RUN_COMMAND,
      BROWSER_CONTROL,
      DESKTOP_CONTROL,
      CAMERA_CONTROL,
      VOICE_CONTROL,
    ],
    outputContract: {
      kind: "workflow",
      mustInclude: [
        "read-only steps",
        "approval-required steps",
        "rollback/checkpoint",
        "visible state",
        "stop conditions",
      ],
      shouldAvoid: ["silent automation", "camera access", "unbounded command execution"],
    },
    handoffRules: [
      "Use reviewer before mutation.",
      "Use tester after automation changes.",
    ],
    safetyRules: [
      "No silent background surveillance.",
      "Camera is blocked by default.",
      "Desktop/browser actions require explicit opt-in.",
    ],
  },

  "trading-researcher": {
    id: "trading-researcher",
    label: "Trading Researcher",
    domain: "trading",
    mode: "lead",
    mission:
      "Support stock, share, and crypto research workflows with evidence tracking, risk controls, backtesting, and paper-trading-first discipline.",
    strengths: [
      "market research",
      "strategy decomposition",
      "risk framing",
      "backtest planning",
      "paper trading workflow design",
    ],
    defaultTools: [MARKET_DATA, EXTERNAL_API, BROKER_EXECUTION],
    outputContract: {
      kind: "research-brief",
      mustInclude: [
        "research question",
        "evidence needed",
        "risk controls",
        "backtest plan",
        "paper-trading plan",
        "no-profit-guarantee note",
      ],
      shouldAvoid: [
        "financial certainty",
        "personalized investment orders",
        "real trade execution",
      ],
    },
    handoffRules: [
      "Use researcher for source-heavy market comparisons.",
      "Use automation-operator only for alerts or paper-trading workflows.",
      "Never hand directly to broker execution without explicit user-controlled approval architecture.",
    ],
    safetyRules: [
      "No guarantees of profit.",
      "Separate research, strategy, backtesting, alerts, and execution.",
      "Real broker execution is blocked by default.",
    ],
  },

  "blender-operator": {
    id: "blender-operator",
    label: "Blender Operator",
    domain: "blender",
    mode: "lead",
    mission:
      "Plan and operate Blender scene, asset, material, animation, procedural, and render workflows with explicit user checkpoints.",
    strengths: [
      "scene planning",
      "geometry nodes",
      "materials",
      "lighting",
      "camera paths",
      "Python automation",
      "render pipeline",
    ],
    defaultTools: [BLENDER_PYTHON, RENDER_JOB, SNAPSHOT_PROJECT],
    outputContract: {
      kind: "creative-brief",
      mustInclude: [
        "scene goal",
        "asset list",
        "geometry/procedural plan",
        "materials",
        "lighting",
        "camera",
        "render settings",
        "approval checkpoints",
      ],
      shouldAvoid: [
        "running renders without approval",
        "mutating assets silently",
        "missing output naming/versioning",
      ],
    },
    handoffRules: [
      "Use design-director for visual style direction.",
      "Use video-producer for animation/video pipeline.",
      "Use reviewer before render automation.",
    ],
    safetyRules: [
      "Render jobs require approval.",
      "Asset mutations require approval.",
      "Prefer versioned outputs and reversible steps.",
    ],
  },

  "design-director": {
    id: "design-director",
    label: "Design Director",
    domain: "design",
    mode: "lead",
    mission:
      "Produce premium UI, UX, brand, layout, typography, and visual-system direction with implementation-ready specificity.",
    strengths: [
      "visual hierarchy",
      "design systems",
      "brand direction",
      "responsive layout",
      "accessibility",
      "premium polish",
    ],
    defaultTools: [...SAFE_REPO_READ_TOOLS, GENERATE_DIFF],
    outputContract: {
      kind: "creative-brief",
      mustInclude: [
        "design goal",
        "visual direction",
        "layout system",
        "typography",
        "spacing",
        "components",
        "accessibility",
        "implementation notes",
      ],
      shouldAvoid: ["generic prettiness", "unclear hierarchy", "non-implementable ideas"],
    },
    handoffRules: [
      "Use web-builder for implementation.",
      "Use reviewer for accessibility and consistency checks.",
    ],
    safetyRules: [
      "Do not mutate UI files without approval.",
      "Preserve existing product constraints unless explicitly changing them.",
    ],
  },

  "marketing-strategist": {
    id: "marketing-strategist",
    label: "Marketing Strategist",
    domain: "marketing",
    mode: "lead",
    mission:
      "Plan campaigns, promotions, offers, funnels, landing copy, creative variants, analytics, and launch loops.",
    strengths: [
      "positioning",
      "audience mapping",
      "offer design",
      "conversion flow",
      "campaign planning",
      "creative testing",
    ],
    defaultTools: [EXTERNAL_API],
    outputContract: {
      kind: "workflow",
      mustInclude: [
        "audience",
        "offer",
        "message",
        "channels",
        "funnel",
        "creative variants",
        "analytics",
        "iteration loop",
      ],
      shouldAvoid: ["generic hype", "unclear CTA", "untestable campaign ideas"],
    },
    handoffRules: [
      "Use design-director for visual assets.",
      "Use deck-strategist for sales/investor narrative.",
      "Use web-builder for landing pages.",
    ],
    safetyRules: [
      "Avoid deceptive claims.",
      "Tie recommendations to measurable outcomes.",
    ],
  },

  "deck-strategist": {
    id: "deck-strategist",
    label: "Deck Strategist",
    domain: "decks",
    mode: "lead",
    mission:
      "Plan pitch decks, sales decks, research decks, and executive presentations with clear story arcs and slide-level structure.",
    strengths: [
      "story arc",
      "executive readability",
      "slide hierarchy",
      "speaker notes",
      "visual direction",
    ],
    defaultTools: [DECK_EXPORT, EXTERNAL_API],
    outputContract: {
      kind: "creative-brief",
      mustInclude: [
        "deck goal",
        "audience",
        "story arc",
        "slide-by-slide outline",
        "visual direction",
        "speaker notes",
        "evidence needs",
      ],
      shouldAvoid: ["wall-of-text slides", "unclear takeaway", "unsupported claims"],
    },
    handoffRules: [
      "Use researcher for evidence-heavy decks.",
      "Use design-director for visual polish.",
      "Use marketing-strategist for sales narrative.",
    ],
    safetyRules: [
      "Do not fabricate evidence.",
      "Export artifacts only after approval.",
    ],
  },

  "video-producer": {
    id: "video-producer",
    label: "Video Producer",
    domain: "video",
    mode: "lead",
    mission:
      "Plan video workflows from concept through capture, edit, render, thumbnail, metadata, and publish review.",
    strengths: ["shot planning", "edit pipeline", "render planning", "publishing workflow"],
    defaultTools: [VIDEO_RENDER, RENDER_JOB, EXTERNAL_API],
    outputContract: {
      kind: "workflow",
      mustInclude: [
        "concept",
        "script/beats",
        "assets",
        "edit plan",
        "render settings",
        "thumbnail/metadata",
        "review loop",
      ],
      shouldAvoid: ["rendering without approval", "missing asset/version tracking"],
    },
    handoffRules: [
      "Use movie-producer for narrative/cinematic work.",
      "Use blender-operator or unreal-operator for 3D/cinematic assets.",
    ],
    safetyRules: [
      "Render jobs require approval.",
      "Preserve source assets and version outputs.",
    ],
  },

  "movie-producer": {
    id: "movie-producer",
    label: "Movie Producer",
    domain: "movie",
    mode: "lead",
    mission:
      "Convert movie ideas into scripts, scenes, shots, assets, voice, music, editing, review loops, and render stages.",
    strengths: ["story structure", "scene breakdown", "shot lists", "production planning"],
    defaultTools: [VIDEO_RENDER, RENDER_JOB, EXTERNAL_API],
    outputContract: {
      kind: "creative-brief",
      mustInclude: [
        "logline",
        "beats",
        "scenes",
        "shot list",
        "assets",
        "voice/music",
        "edit plan",
        "render/review loop",
      ],
      shouldAvoid: ["unbounded ideation", "missing production pipeline"],
    },
    handoffRules: [
      "Use video-producer for editing/render workflow.",
      "Use blender-operator or unreal-operator for generated/cinematic assets.",
    ],
    safetyRules: [
      "Render jobs require approval.",
      "Track source assets and output versions.",
    ],
  },

  "comfyui-operator": {
    id: "comfyui-operator",
    label: "ComfyUI Operator",
    domain: "comfyui",
    mode: "lead",
    mission:
      "Plan reusable ComfyUI workflows, node groups, prompts, seeds, model assumptions, queues, and output naming.",
    strengths: ["workflow design", "node graphs", "prompt templates", "queue discipline"],
    defaultTools: [COMFYUI_QUEUE, RENDER_JOB, SNAPSHOT_PROJECT],
    outputContract: {
      kind: "workflow",
      mustInclude: [
        "workflow goal",
        "node-group plan",
        "prompt template",
        "model assumptions",
        "seed/sampler strategy",
        "queue plan",
        "output naming",
      ],
      shouldAvoid: ["silent GPU jobs", "missing model assumptions", "untracked outputs"],
    },
    handoffRules: [
      "Use design-director for visual target.",
      "Use video-producer for animation/video outputs.",
    ],
    safetyRules: [
      "Queue execution requires approval.",
      "GPU jobs must be visible and interruptible.",
    ],
  },

  "unreal-operator": {
    id: "unreal-operator",
    label: "Unreal Operator",
    domain: "unreal",
    mode: "lead",
    mission:
      "Plan Unreal Engine project setup, content folders, assets, blueprints/C++, cinematics, packaging, profiling, and safe automation.",
    strengths: [
      "UE project structure",
      "Blueprint/C++ planning",
      "cinematic tooling",
      "packaging",
      "profiling",
    ],
    defaultTools: [UNREAL_AUTOMATION, RENDER_JOB, SNAPSHOT_PROJECT],
    outputContract: {
      kind: "workflow",
      mustInclude: [
        "project setup",
        "content structure",
        "asset plan",
        "Blueprint/C++ plan",
        "cinematic/tooling plan",
        "testing",
        "packaging",
      ],
      shouldAvoid: ["mutating projects without approval", "missing packaging/testing plan"],
    },
    handoffRules: [
      "Use video-producer for cinematic output workflows.",
      "Use reviewer before automation changes.",
    ],
    safetyRules: [
      "Unreal automation requires approval.",
      "Project mutations should be versioned or checkpointed.",
    ],
  },

  "game-server-architect": {
    id: "game-server-architect",
    label: "Game Server Architect",
    domain: "game-server",
    mode: "lead",
    mission:
      "Plan Minecraft/game-server stack, plugins/mods, world/theme design, permissions, economy, deployment, backups, and rollout.",
    strengths: [
      "server stack planning",
      "plugin/mod selection",
      "world design",
      "admin tooling",
      "deployment/backups",
    ],
    defaultTools: [EXTERNAL_API, RUN_COMMAND],
    outputContract: {
      kind: "workflow",
      mustInclude: [
        "server stack",
        "plugins/mods",
        "world/theme design",
        "permissions",
        "deployment",
        "backups",
        "rollout",
      ],
      shouldAvoid: ["missing moderation/admin plan", "unsafe public launch assumptions"],
    },
    handoffRules: [
      "Use automation-operator for deployment/checkpoint workflow.",
      "Use reviewer for security and admin controls.",
    ],
    safetyRules: [
      "Server mutations and deployments require approval.",
      "Backups/checkpoints should precede risky changes.",
    ],
  },
} as const;

const DOMAIN_PRIMARY_ROLE: Record<CodexForgePlanDomain, CodexForgeAgentRoleId> = {
  general: "planner",
  web: "web-builder",
  research: "researcher",
  debug: "debugger",
  "game-server": "game-server-architect",
  movie: "movie-producer",
  video: "video-producer",
  comfyui: "comfyui-operator",
  unreal: "unreal-operator",
  automation: "automation-operator",
  trading: "trading-researcher",
  blender: "blender-operator",
  design: "design-director",
  marketing: "marketing-strategist",
  decks: "deck-strategist",
};

const DOMAIN_SUPPORT_ROLES: Record<CodexForgePlanDomain, readonly CodexForgeAgentRoleId[]> = {
  general: ["orchestrator", "reviewer"],
  web: ["planner", "repo-inspector", "coder", "tester", "reviewer"],
  research: ["planner", "reviewer"],
  debug: ["repo-inspector", "coder", "tester", "reviewer"],
  "game-server": ["planner", "automation-operator", "reviewer"],
  movie: ["planner", "video-producer", "design-director", "reviewer"],
  video: ["planner", "design-director", "reviewer"],
  comfyui: ["planner", "design-director", "reviewer"],
  unreal: ["planner", "video-producer", "reviewer"],
  automation: ["planner", "repo-inspector", "reviewer", "tester"],
  trading: ["researcher", "planner", "reviewer"],
  blender: ["planner", "design-director", "video-producer", "reviewer"],
  design: ["planner", "web-builder", "reviewer"],
  marketing: ["planner", "design-director", "deck-strategist", "reviewer"],
  decks: ["planner", "researcher", "design-director", "reviewer"],
};

const ALWAYS_REVIEW_ROLES: readonly CodexForgeAgentRoleId[] = ["reviewer"];

function uniquePolicies(
  policies: readonly CodexForgeAgentToolPolicy[]
): CodexForgeAgentToolPolicy[] {
  const seen = new Set<CodexForgeAgentToolName>();
  const result: CodexForgeAgentToolPolicy[] = [];

  for (const policy of policies) {
    if (seen.has(policy.tool)) continue;
    seen.add(policy.tool);
    result.push(policy);
  }

  return result;
}

function getRole(id: CodexForgeAgentRoleId): CodexForgeAgentRole {
  return CODEXFORGE_AGENT_ROLES[id];
}

function rolesFromIds(ids: readonly CodexForgeAgentRoleId[]): CodexForgeAgentRole[] {
  return ids.map(getRole);
}

function splitPoliciesByPermission(policies: readonly CodexForgeAgentToolPolicy[]): {
  allowedTools: CodexForgeAgentToolPolicy[];
  approvalRequiredTools: CodexForgeAgentToolPolicy[];
  blockedTools: CodexForgeAgentToolPolicy[];
} {
  const unique = uniquePolicies(policies);

  return {
    allowedTools: unique.filter((policy) => policy.permission === "read-only"),
    approvalRequiredTools: unique.filter(
      (policy) => policy.permission === "approval-required"
    ),
    blockedTools: unique.filter((policy) => policy.permission === "blocked-by-default"),
  };
}

function inferPrimaryRoleId(
  input: CodexForgeAgentTeamSelectionInput
): CodexForgeAgentRoleId {
  if (input.explicitFileRequest) {
    return "repo-inspector";
  }

  if (input.tags?.includes("debugging")) {
    return "debugger";
  }

  return DOMAIN_PRIMARY_ROLE[input.domain] ?? "planner";
}

function buildSelectionReasons(args: {
  input: CodexForgeAgentTeamSelectionInput;
  primaryRole: CodexForgeAgentRole;
  supportRoles: readonly CodexForgeAgentRole[];
}): string[] {
  const reasons: string[] = [
    `Selected ${args.primaryRole.id} as primary role for ${args.input.domain} domain.`,
  ];

  if (args.input.explicitFileRequest) {
    reasons.push("Explicit file request detected, so repo inspection takes priority.");
  }

  if ((args.input.requestedPaths?.length ?? 0) > 0) {
    reasons.push(
      `Requested path context available: ${args.input.requestedPaths?.join(", ")}.`
    );
  }

  if ((args.input.tags?.length ?? 0) > 0) {
    reasons.push(`Capability tags: ${args.input.tags?.join(", ")}.`);
  }

  if (args.supportRoles.length > 0) {
    reasons.push(
      `Support roles: ${args.supportRoles.map((role) => role.id).join(", ")}.`
    );
  }

  return reasons;
}

export function getCodexForgeAgentRole(
  id: CodexForgeAgentRoleId
): CodexForgeAgentRole {
  return getRole(id);
}

export function listCodexForgeAgentRoles(): CodexForgeAgentRole[] {
  return Object.values(CODEXFORGE_AGENT_ROLES);
}

export function selectCodexForgeAgentTeam(
  input: CodexForgeAgentTeamSelectionInput
): CodexForgeAgentTeamSelection {
  const primaryRole = getRole(inferPrimaryRoleId(input));

  const supportRoleIds = DOMAIN_SUPPORT_ROLES[input.domain] ?? DOMAIN_SUPPORT_ROLES.general;
  const supportRoles = rolesFromIds(supportRoleIds).filter(
    (role) => role.id !== primaryRole.id
  );

  const reviewRoles = rolesFromIds(ALWAYS_REVIEW_ROLES).filter(
    (role) => role.id !== primaryRole.id
  );

  const policies = uniquePolicies([
    ...primaryRole.defaultTools,
    ...supportRoles.flatMap((role) => role.defaultTools),
    ...reviewRoles.flatMap((role) => role.defaultTools),
  ]);

  const splitPolicies = splitPoliciesByPermission(policies);

  return {
    domain: input.domain,
    primaryRole,
    supportRoles,
    reviewRoles,
    ...splitPolicies,
    reasons: buildSelectionReasons({ input, primaryRole, supportRoles }),
  };
}
