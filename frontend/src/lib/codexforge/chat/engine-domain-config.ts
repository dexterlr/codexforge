import type { CodexForgePlanDomain } from "../types";

export type ToolCandidate = {
  name: string;
  availability: "unavailable" | "stub" | "ready";
  description: string;
  domain: string;
  tags: string[];
};

export type DomainConfig = {
  files: string[];
  commands: string[];
  risks: string[];
  nextSteps: string[];
  sectionTitle?: string;
  sectionItems?: string[];
};

export const DOMAIN_TERMS = {
  "game-server": [
    "minecraft",
    "paper",
    "paper server",
    "spigot",
    "fabric server",
    "forge server",
    "modpack",
    "plugin",
    "bukkit",
    "whitelist",
    "game server",
    "christmas server",
    "themed server",
    "survival server",
    "lobby server",
    "server world",
  ],
  movie: [
    "movie",
    "film",
    "screenplay",
    "script to movie",
    "storyboard",
    "shot list",
    "cinematic pipeline",
    "short film",
    "scene breakdown",
    "voice cast",
    "feature film",
    "pre production",
    "pre-production",
  ],
  video: [
    "video",
    "text to video",
    "video pipeline",
    "render video",
    "motion graphics",
    "trailer",
    "edit timeline",
    "voiceover",
    "promo video",
    "edit pass",
    "sequence render",
  ],
  comfyui: [
    "comfy",
    "comfyui",
    "workflow nodes",
    "node graph",
    "latent workflow",
    "checkpoint loader",
    "ksampler",
    "lora stack",
    "sampler",
    "prompt graph",
  ],
  unreal: [
    "unreal",
    "ue5",
    "ue 5",
    "blueprint",
    "blueprints",
    "sequencer",
    "gameplay ability",
    "uasset",
    "packaged build",
    "metahuman",
    "packaging",
  ],
  web: [
    "website",
    "landing page",
    "frontend",
    "ui",
    "next.js",
    "nextjs",
    "react app",
    "web app",
    "marketing site",
    "dashboard",
    "api route",
    "route handler",
  ],
  research: [
    "research",
    "compare",
    "investigate",
    "evaluate",
    "tradeoff",
    "trade-off",
    "options",
    "benchmark",
  ],
  debug: [
    "error",
    "bug",
    "broken",
    "fix",
    "stack trace",
    "failing",
    "crash",
    "regression",
  ],
  automation: [
    "automation",
    "pipeline",
    "workflow",
    "orchestrate",
    "agent loop",
    "task system",
    "background process",
    "queue",
    "job runner",
  ],
} as const;

export const ARCHITECTURE_TERMS = [
  "architecture",
  "system design",
  "backend contract",
  "contract",
  "data flow",
  "execution model",
  "state machine",
  "orchestration",
  "single source of truth",
] as const;

export const PRODUCT_DESIGN_TERMS = [
  "design codexforge",
  "product design",
  "ux",
  "user flow",
  "workspace panel",
  "copilot",
  "assistant surface",
  "product direction",
] as const;

export const PLANNING_TERMS = [
  "plan",
  "steps",
  "roadmap",
  "phase",
  "next step",
  "smallest step",
] as const;

export const CODING_TERMS = [
  "build",
  "implement",
  "create",
  "feature",
  "refactor",
  "wire up",
  "integrate",
  "website",
  "app",
  "server",
  "movie",
  "video",
  "unreal",
  "comfy",
] as const;

export const DOMAIN_CONFIG: Record<CodexForgePlanDomain, DomainConfig> = {
  general: {
    files: [
      "Primary implementation file",
      "Supporting helper or route",
      "Shared types",
    ],
    commands: ["Make one safe change, then verify it"],
    risks: [
      "Do not change too many moving parts at once.",
      "Keep local-first behavior working.",
      "Preserve the response contract while evolving the system.",
    ],
    nextSteps: [
      "Clarify the goal.",
      "Choose the next smallest safe step.",
      "Execute carefully.",
    ],
  },
  web: {
    files: [
      "Primary page or route component",
      "Supporting UI component",
      "API route or data helper",
      "Shared types or schema",
    ],
    commands: ["npm run build", "npm run dev"],
    risks: [
      "UI polish can hide broken state underneath.",
      "Frontend and backend drift can break the contract.",
      "Routing and state changes can regress existing flows.",
    ],
    nextSteps: [
      "Define the smallest useful page or flow.",
      "Choose the first route or component to implement.",
      "Verify state, data, and UX together.",
    ],
    sectionTitle: "Web build focus",
    sectionItems: [
      "Define the primary user journey first.",
      "Keep routing, data, and UI state aligned.",
      "Preserve local-first behavior while wiring backend support.",
    ],
  },
  research: {
    files: [
      "Question framing doc",
      "Evidence source list",
      "Comparison criteria",
      "Decision summary output",
    ],
    commands: ["Review sources and collect evidence before concluding"],
    risks: [
      "Do not confuse assumptions with evidence.",
      "Premature conclusions reduce decision quality.",
    ],
    nextSteps: [
      "Define the exact question.",
      "List the unknowns.",
      "Collect evidence before concluding.",
    ],
  },
  debug: {
    files: [
      "Error source file",
      "Last changed file",
      "Any directly related helper",
      "Verification or reproduction surface",
    ],
    commands: ["npm run dev", "npm run build"],
    risks: [
      "Fixing symptoms instead of root cause can create repeat failures.",
      "Mixing multiple fixes into one pass makes debugging slower.",
    ],
    nextSteps: [
      "Capture the exact error.",
      "Locate the failing file.",
      "Reproduce before fixing.",
    ],
  },
  "game-server": {
    files: [
      "Server configuration files",
      "Plugin or mod list",
      "World setup or content plan",
      "Deployment and backup scripts",
    ],
    commands: [
      "Validate server stack and hosting plan",
      "Define plugins or mods before world rollout",
      "Dry-run deployment and backup flow",
    ],
    risks: [
      "Plugin or mod conflicts can destabilize the server.",
      "Theme work can distract from admin, backups, and moderation basics.",
      "Deployment without rollback or backup planning is risky.",
    ],
    nextSteps: [
      "Define the server stack and hosting baseline.",
      "Plan the theme, content loop, and moderation basics.",
      "Stage deployment, backups, and launch verification.",
    ],
    sectionTitle: "Game server focus",
    sectionItems: [
      "Start with server stack, hosting, backups, and moderation.",
      "Theme the world and progression loop after the operational baseline is clear.",
      "Keep plugin or mod choices explicit and reviewable.",
    ],
  },
  movie: {
    files: [
      "Script or scene breakdown",
      "Storyboard or shot plan",
      "Asset pipeline definition",
      "Render, edit, and review workflow",
    ],
    commands: [
      "Lock script and scene structure",
      "Generate storyboard and shot plan before rendering",
      "Review edit flow before final export",
    ],
    risks: [
      "A weak pre-production plan causes costly downstream rework.",
      "Asset naming and review flow drift can break continuity.",
      "Rendering too early before shot lock wastes time.",
    ],
    nextSteps: [
      "Lock the script and scene goals.",
      "Create the storyboard and shot breakdown.",
      "Plan assets, generation, edit flow, and review checkpoints.",
    ],
    sectionTitle: "Movie pipeline focus",
    sectionItems: [
      "Lock script and scene intent before expensive generation.",
      "Use storyboards and shot breakdowns as the bridge to production.",
      "Keep asset, audio, edit, and review flows explicit.",
    ],
  },
  video: {
    files: [
      "Prompt or script source",
      "Shot generation workflow",
      "Audio or voice pipeline",
      "Edit and export workflow",
    ],
    commands: [
      "Validate prompt and shot sequence",
      "Render test clips before full run",
      "Check final assembly and export targets",
    ],
    risks: [
      "Inconsistent shot prompts create visual drift.",
      "Audio and visual pipelines can diverge without a shared review loop.",
      "Export settings can invalidate otherwise good work.",
    ],
    nextSteps: [
      "Define the sequence and visual style.",
      "Create prompts, shot list, and audio plan.",
      "Run a small render test before scaling up.",
    ],
    sectionTitle: "Video pipeline focus",
    sectionItems: [
      "Define shot sequence and style consistency early.",
      "Use short render tests before committing to longer runs.",
      "Track voice, music, edit, and export as separate checkpoints.",
    ],
  },
  comfyui: {
    files: [
      "Workflow graph definition",
      "Prompt template set",
      "Model and node dependency list",
      "Output naming and asset tracking rules",
    ],
    commands: [
      "Validate workflow graph and dependencies",
      "Run a small batch test",
      "Confirm output naming and storage rules",
    ],
    risks: [
      "Workflow graphs become fragile if dependencies are implicit.",
      "Prompt, model, and sampler changes can make output non-repeatable.",
      "Asset tracking is easy to lose without explicit naming rules.",
    ],
    nextSteps: [
      "Define the workflow graph and reusable node groups.",
      "Choose models, prompts, and test outputs.",
      "Add asset naming, storage, and review rules.",
    ],
    sectionTitle: "ComfyUI workflow focus",
    sectionItems: [
      "Make workflow graphs reusable and explicit.",
      "Keep model, prompt, and sampler choices traceable.",
      "Track outputs and naming conventions from the start.",
    ],
  },
  unreal: {
    files: [
      "Project setup and content structure",
      "Blueprint or C++ implementation area",
      "Sequencer or cinematic surface",
      "Packaging or build configuration",
    ],
    commands: [
      "Validate project structure",
      "Run editor or build verification",
      "Check packaging path before shipping",
    ],
    risks: [
      "Mixing content, gameplay, and cinematic work without boundaries increases churn.",
      "Blueprint and C++ ownership can become unclear.",
      "Packaging issues often appear late if not verified early.",
    ],
    nextSteps: [
      "Define the project slice to build first.",
      "Choose the first gameplay or cinematic surface.",
      "Verify editor, content, and packaging assumptions early.",
    ],
    sectionTitle: "Unreal workflow focus",
    sectionItems: [
      "Separate gameplay, cinematic, and packaging concerns clearly.",
      "Decide blueprint versus C++ ownership early.",
      "Validate project structure and packaging assumptions before scaling.",
    ],
  },
  automation: {
    files: [
      "Workflow orchestration layer",
      "Task definition or queue logic",
      "Execution adapter or tool wrapper",
      "Observability or status surface",
    ],
    commands: [
      "Validate workflow contract",
      "Test one step at a time",
      "Verify status reporting and error paths",
    ],
    risks: [
      "A hidden state transition can make automation unreliable.",
      "Observability gaps make failures expensive to diagnose.",
      "Over-coupled workflow stages become hard to evolve safely.",
    ],
    nextSteps: [
      "Define the workflow boundaries.",
      "Implement one safe stage first.",
      "Add status visibility before scaling complexity.",
    ],
    sectionTitle: "Automation focus",
    sectionItems: [
      "Keep stages explicit and observable.",
      "Avoid hidden mutations or unclear transitions.",
      "Build one safe workflow stage before expanding scope.",
    ],
  },
  trading: {
    files: [
      "Strategy research files",
      "Market data adapters",
      "Backtest or paper-trading modules",
      "Risk configuration",
    ],
    commands: [
      "Run static checks",
      "Run strategy tests",
      "Run backtest or paper-trading validation",
    ],
    risks: [
      "No profit guarantees",
      "Live execution requires explicit approval and broker/exchange safeguards",
      "Market data quality and latency can invalidate results",
      "Strategy overfitting must be checked before use",
    ],
    nextSteps: [
      "Separate research, signal design, backtesting, alerts, and execution",
      "Define risk limits before any execution path",
      "Prefer paper trading before live trading",
    ],
    sectionTitle: "Trading safety rails",
    sectionItems: [
      "Treat outputs as research and tooling support, not financial advice",
      "Keep execution gated behind explicit approval",
      "Track assumptions, data source, timeframe, fees, slippage, and position sizing",
    ],
  },
  blender: {
    files: [
      "Blender Python scripts",
      "Scene assets",
      "Materials and geometry node assets",
      "Render/export settings",
    ],
    commands: [
      "Validate script syntax",
      "Run Blender automation in dry-run or preview mode when possible",
      "Render a low-resolution preview before final output",
    ],
    risks: [
      "Large render jobs can be slow or resource-heavy",
      "Asset paths and external textures may break portability",
      "Scene mutations should be checkpointed before automation",
    ],
    nextSteps: [
      "Define scene goal, asset list, lighting, materials, animation, and render target",
      "Create reusable procedural steps where possible",
      "Checkpoint assets before destructive edits or render batches",
    ],
    sectionTitle: "Blender production pipeline",
    sectionItems: [
      "Plan scene, assets, materials, lighting, camera, animation, render, and export",
      "Prefer repeatable Python/procedural workflows",
      "Keep asset versions and output folders explicit",
    ],
  },
  design: {
    files: [
      "Design system files",
      "UI component files",
      "Brand and copy assets",
      "Responsive layout specs",
    ],
    commands: [
      "Run build",
      "Run lint/type checks",
      "Capture visual QA notes",
    ],
    risks: [
      "Visual polish can regress without component-level consistency",
      "Accessibility and responsive layout must be checked explicitly",
      "Brand direction needs clear constraints and target audience",
    ],
    nextSteps: [
      "Define audience, brand feel, layout hierarchy, components, and interaction states",
      "Produce implementation-ready specs",
      "Validate responsive, accessible, premium UI polish",
    ],
    sectionTitle: "Design excellence checklist",
    sectionItems: [
      "Prioritize hierarchy, spacing, typography, contrast, motion, and responsiveness",
      "Tie visual choices to user intent and conversion goal",
      "Keep reusable components and design tokens aligned",
    ],
  },
  marketing: {
    files: [
      "Landing page files",
      "Campaign copy",
      "Creative variants",
      "Analytics or funnel configuration",
    ],
    commands: [
      "Run build",
      "Validate links and forms",
      "Check tracking and conversion events",
    ],
    risks: [
      "Claims need evidence and compliance review",
      "Audience/channel mismatch can weaken conversion",
      "Tracking gaps make iteration unreliable",
    ],
    nextSteps: [
      "Define audience, offer, channel, funnel, creative variants, and conversion metric",
      "Build launch assets and measurement plan",
      "Iterate from analytics and qualitative feedback",
    ],
    sectionTitle: "Marketing launch structure",
    sectionItems: [
      "Clarify audience, pain, offer, proof, CTA, channel, and metric",
      "Prepare variants for copy, visuals, landing page, and promotion",
      "Connect analytics before launch",
    ],
  },
  decks: {
    files: [
      "Deck outline",
      "Slide content",
      "Visual direction assets",
      "Speaker notes",
    ],
    commands: [
      "Validate narrative flow",
      "Review slide count and executive readability",
      "Export or package deck assets",
    ],
    risks: [
      "Weak narrative arc can make good content feel scattered",
      "Dense slides reduce executive readability",
      "Evidence and claims need source tracking",
    ],
    nextSteps: [
      "Define audience, objective, story arc, slide sequence, proof points, and visual style",
      "Create slide-by-slide structure before production polish",
      "Add speaker notes and evidence references where useful",
    ],
    sectionTitle: "Deck production standard",
    sectionItems: [
      "Optimize for narrative clarity, strong hierarchy, and fast executive scanning",
      "Separate headline, evidence, visual, and speaker-note intent per slide",
      "Use consistent layout rhythm and visual system",
    ],
  },};

export function getDomainConfig(domain: CodexForgePlanDomain): DomainConfig {
  return DOMAIN_CONFIG[domain] ?? DOMAIN_CONFIG.general;
}
