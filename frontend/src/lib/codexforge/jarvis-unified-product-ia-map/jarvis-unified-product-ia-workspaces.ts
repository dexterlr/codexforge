import type { Route } from "next";

export const JARVIS_UNIFIED_PRODUCT_PRIMARY_SURFACE_IDS = [
  "home",
  "codexforge-cockpit",
  "jarvis",
  "jarvis-video",
  "jarvis-trading",
  "jarvis-websites",
  "jarvis-avatar",
  "jarvis-workflows",
  "jarvis-audit",
  "jarvis-safety",
] as const;

export type JarvisUnifiedProductPrimarySurfaceId =
  (typeof JARVIS_UNIFIED_PRODUCT_PRIMARY_SURFACE_IDS)[number];

export const JARVIS_UNIFIED_PRODUCT_WORKSPACE_IDS = [
  "jarvis-video",
  "jarvis-websites",
  "jarvis-avatar",
  "jarvis-trading",
  "jarvis-workflows",
  "jarvis-audit",
  "jarvis-safety",
  "developer-diagnostics",
] as const;

export type JarvisUnifiedProductWorkspaceId =
  (typeof JARVIS_UNIFIED_PRODUCT_WORKSPACE_IDS)[number];

export const JARVIS_UNIFIED_PRODUCT_CARD_STATUSES = [
  "ready",
  "approval-required",
  "blocked",
  "secondary",
] as const;

export type JarvisUnifiedProductCardStatus =
  (typeof JARVIS_UNIFIED_PRODUCT_CARD_STATUSES)[number];

export const JARVIS_UNIFIED_PRODUCT_RISK_TIERS = [
  "tier-1-platform",
  "tier-2-creative",
  "tier-3-market",
] as const;

export type JarvisUnifiedProductRiskTier =
  (typeof JARVIS_UNIFIED_PRODUCT_RISK_TIERS)[number];

export type JarvisUnifiedProductReviewPanel = Readonly<{
  id: string;
  label: string;
  summary: string;
  state: JarvisUnifiedProductCardStatus;
}>;

export type JarvisUnifiedProductPlaceholderState = Readonly<{
  label: string;
  summary: string;
  steps: readonly string[];
}>;

export type JarvisUnifiedProductWorkspaceRecord = Readonly<{
  id: JarvisUnifiedProductWorkspaceId;
  routeHref: Route;
  label: string;
  shortLabel: string;
  description: string;
  status: JarvisUnifiedProductCardStatus;
  riskTier: JarvisUnifiedProductRiskTier;
  approvalPosture: string;
  executionPosture: string;
  primaryNextAction: string;
  placeholderState: JarvisUnifiedProductPlaceholderState;
  blockedActionSummary: readonly string[];
  backendRequirementSummary: string;
  reviewPanels: readonly JarvisUnifiedProductReviewPanel[];
  emphasisLabel: string;
}>;

export const JARVIS_UNIFIED_PRODUCT_WORKSPACE_CARDS = [
  {
    id: "jarvis-video",
    routeHref: "/jarvis-video",
    label: "Video Studio",
    shortLabel: "Video",
    description:
      "Jarvis Video Studio Release Candidate is the premium video studio release candidate workspace. It leads with mission brief, video production timeline, video readiness score, script storyboard lane, asset audio caption lane, approval packet lane, dry-run lane, backend readiness lane, controlled trial lane, backend runner lane, result review recovery lane, blocked action command deck, next action card, and release summary review only before developer diagnostics grouped lower.",
    status: "approval-required",
    riskTier: "tier-2-creative",
    approvalPosture: "Operator approval required",
    executionPosture: "Backend-owned execution required",
    primaryNextAction:
      "Plan, review, approve, then hand off to backend. Generation remains locked. No provider call from frontend.",
    placeholderState: {
      label: "Video Studio workflow",
      summary:
        "Review the studio workflow from brief to backend handoff in one place, with diagnostics kept secondary.",
      steps: [
        "mission brief",
        "video production timeline",
        "video readiness score",
        "script storyboard lane",
        "asset audio caption lane",
        "approval packet lane",
        "dry-run lane",
        "backend readiness lane",
        "controlled trial lane",
        "backend runner lane",
        "result review recovery lane",
        "next action card",
      ],
    },
    blockedActionSummary: [
      "no direct frontend execution",
      "no provider execution",
      "no live provider execution",
      "no video provider execution",
      "no real video generation",
      "no live video generation",
      "no render execution",
      "no export execution",
      "no publish execution",
      "no worker dispatch",
    ],
    backendRequirementSummary:
      "Backend-owned execution required. The release candidate keeps the workflow coherent while backend runner creation, runtime isolation, audit persistence, credential isolation, lock and idempotency stores, result capture, artifact handoff, and execution services remain future backend work only.",
    reviewPanels: [
      {
        id: "mission-brief",
        label: "Mission brief",
        summary:
          "Audience, objective, and approval posture stay visible at the top of the studio.",
        state: "ready",
      },
      {
        id: "video-timeline",
        label: "Video production timeline",
        summary:
          "The studio answers the operator workflow from brief to backend handoff before any diagnostics.",
        state: "ready",
      },
      {
        id: "readiness-score",
        label: "Video readiness score",
        summary:
          "A compact readiness score keeps the backend-only execution posture obvious.",
        state: "approval-required",
      },
      {
        id: "script-storyboard",
        label: "Script storyboard lane",
        summary:
          "Script and storyboard planning remain premium review-only cards with no generation lane.",
        state: "ready",
      },
      {
        id: "asset-audio-caption",
        label: "Asset audio caption lane",
        summary:
          "Prerequisites stay visible without upload, media mutation, or audio generation.",
        state: "approval-required",
      },
      {
        id: "approval-packet",
        label: "Approval packet lane",
        summary:
          "Operator packet and approval evidence remain the gate before backend handoff.",
        state: "approval-required",
      },
      {
        id: "backend-readiness",
        label: "Backend readiness lane",
        summary:
          "Runtime, adapter, audit, credential, token, and redaction requirements stay visible and backend-only.",
        state: "approval-required",
      },
      {
        id: "controlled-trial-console",
        label: "Controlled trial lane",
        summary:
          "Controlled trial posture stays visible as a locked backend-owned lane with no launch affordance.",
        state: "approval-required",
      },
      {
        id: "backend-trial-runner-contract",
        label: "Backend runner lane",
        summary:
          "Runner interface, envelopes, queue and worker boundaries, kill switch, idempotency, and recovery remain drafted as review-only backend contract data.",
        state: "approval-required",
      },
      {
        id: "result-review-recovery",
        label: "Result review recovery lane",
        summary:
          "Result review and recovery remain staged, backend-owned, and review-only with no persistence path.",
        state: "blocked",
      },
      {
        id: "next-action",
        label: "Next action card",
        summary:
          "A single next action closes the workspace instead of a diagnostic wall.",
        state: "ready",
      },
    ],
    emphasisLabel: "Release candidate workspace",
  },
  {
    id: "jarvis-websites",
    routeHref: "/jarvis-websites",
    label: "Website Builder",
    shortLabel: "Websites",
    description:
      "A server-owned static Website/Browser App v0 with exact local-model planning, separate approval and execution, strict validation, atomic isolated files, sandbox preview, one repair, and deterministic export.",
    status: "approval-required",
    riskTier: "tier-2-creative",
    approvalPosture: "Operator approval required",
    executionPosture: "One exact local attempt after separate approval",
    primaryNextAction:
      "Describe one bounded static project, review the exact plan and destination, then approve and execute separately.",
    placeholderState: {
      label: "Static creator lifecycle",
      summary:
        "The operational v0 lifecycle is request to plan to approval to execution to validation to isolated preview and export.",
      steps: [
        "describe",
        "review exact plan",
        "approve",
        "execute once",
        "validate and materialize",
        "preview or export",
      ],
    },
    blockedActionSummary: [
      "no backend or database generation",
      "no package installation",
      "no remote assets or network requests",
      "no arbitrary framework generation",
      "no deployment or publishing",
      "no automatic approval, execution, repair, retry, or fallback",
    ],
    backendRequirementSummary:
      "All v0 mutations are server-owned and reuse Private Alpha. Full-stack services, package workflows, archives, deployment, and publishing remain unsupported.",
    reviewPanels: [
      {
        id: "project-brief",
        label: "Exact creation plan",
        summary:
          "The exact model, data boundary, output limits, file limits, destination, and ordered steps are reviewable before approval.",
        state: "approval-required",
      },
      {
        id: "artifact-contract",
        label: "Artifact contract",
        summary:
          "Only bounded HTML, CSS, client JavaScript, JSON, safe SVG, Markdown, and text are accepted.",
        state: "ready",
      },
      {
        id: "validation-policy",
        label: "Validation policy",
        summary:
          "Ten deterministic stages reject unsafe paths, content, references, structure, accessibility, and digest mismatches.",
        state: "ready",
      },
      {
        id: "atomic-workspace",
        label: "Atomic creator workspace",
        summary:
          "Validated files publish only into a creator-owned immutable artifact revision.",
        state: "ready",
      },
      {
        id: "sandbox-preview",
        label: "Sandbox preview",
        summary:
          "An explicit loopback preview uses a sandboxed iframe without same-origin access, forms, popups, downloads, or external network.",
        state: "approval-required",
      },
      {
        id: "bounded-export",
        label: "Bounded export",
        summary:
          "A versioned manifest and individual static files are available; ZIP, deployment, and publishing are not.",
        state: "ready",
      },
    ],
    emphasisLabel: "Operational local static v0",
  },
  {
    id: "jarvis-avatar",
    routeHref: "/jarvis-avatar",
    label: "Avatar Studio",
    shortLabel: "Avatar",
    description:
      "A review-first avatar studio built around persona, consent, style, safety, and preview planning.",
    status: "blocked",
    riskTier: "tier-2-creative",
    approvalPosture: "Operator approval required",
    executionPosture: "Preview blocked",
    primaryNextAction:
      "Review persona, consent, and safety posture while voice, likeness, and generation remain blocked.",
    placeholderState: {
      label: "Planned avatar workflow",
      summary:
        "The future flow is persona to consent to voice and visual style to safety to preview to approval without identity execution.",
      steps: [
        "persona",
        "consent",
        "voice and visual style",
        "safety",
        "preview",
        "approval",
      ],
    },
    blockedActionSummary: [
      "no avatar generation execution",
      "no image provider execution",
      "no audio provider execution",
      "no identity or likeness execution",
      "no media upload",
      "no publish execution",
    ],
    backendRequirementSummary:
      "Consent tracking, voice planning, likeness policy review, preview rendering, and approval capture would need backend ownership later.",
    reviewPanels: [
      {
        id: "persona-card",
        label: "Persona card",
        summary:
          "Character framing, operator intent, and identity scope stay visible in a controlled review card.",
        state: "ready",
      },
      {
        id: "consent-gate",
        label: "Consent and likeness gate",
        summary:
          "Consent posture stays first-class before any future style or preview system could exist.",
        state: "approval-required",
      },
      {
        id: "style-placeholder",
        label: "Voice and visual style",
        summary:
          "Style exploration remains a placeholder without generation, upload, or preview output.",
        state: "blocked",
      },
      {
        id: "safety-review",
        label: "Safety review",
        summary:
          "Identity, likeness, and misuse boundaries remain visible in compact guard cards.",
        state: "ready",
      },
      {
        id: "preview-placeholder",
        label: "Preview placeholder",
        summary:
          "Preview remains intentional and blocked instead of pretending a generator exists.",
        state: "blocked",
      },
      {
        id: "approval",
        label: "Approval hold",
        summary:
          "Operator approval remains required before any future backend-owned avatar path.",
        state: "approval-required",
      },
    ],
    emphasisLabel: "Review-only workspace",
  },
  {
    id: "jarvis-trading",
    routeHref: "/jarvis-trading",
    label: "Trading Desk",
    shortLabel: "Trading",
    description:
      "A dedicated trading workspace shell for paper-review-only strategy review, risk posture, and operator approvals with strong market safety language.",
    status: "approval-required",
    riskTier: "tier-3-market",
    approvalPosture: "Explicit operator approval required",
    executionPosture: "Paper-review-only",
    primaryNextAction:
      "Review risk governor posture, strategy notes, and paper ledger while live trading, live market data, and broker execution remain blocked.",
    placeholderState: {
      label: "Trading review workflow",
      summary:
        "This desk is elegant and compact: paper-review-only, no financial advice, no personalised recommendations, no buy sell instructions, and no live execution.",
      steps: [
        "risk governor",
        "strategy review",
        "paper ledger",
        "approval and risk rail",
        "blocked action review",
        "operator sign-off",
      ],
    },
    blockedActionSummary: [
      "no financial advice",
      "no personalised recommendations",
      "no buy sell instructions",
      "no trading execution",
      "no paper trading execution",
      "no real-money trading",
      "no broker execution",
      "no live market data calls",
    ],
    backendRequirementSummary:
      "A separate research, simulation, approvals, and audit service layer would be required before any future paper workflow. Nothing executes here.",
    reviewPanels: [
      {
        id: "risk-governor",
        label: "Risk governor",
        summary:
          "Position, exposure, and risk posture stay front-and-center with compact guard language.",
        state: "approval-required",
      },
      {
        id: "strategy-review",
        label: "Strategy review",
        summary:
          "Signals, rationale, and invalidation notes remain paper-review-only and operator-owned.",
        state: "ready",
      },
      {
        id: "paper-ledger",
        label: "Paper ledger",
        summary:
          "Paper results stay placeholder-only with no fills, no broker execution, and no live market data calls.",
        state: "blocked",
      },
      {
        id: "approval-rail",
        label: "Approval and risk rail",
        summary:
          "Approval posture, blocked actions, and audit relevance stay visible without becoming a disclaimer wall.",
        state: "approval-required",
      },
      {
        id: "operator-review",
        label: "Operator review",
        summary:
          "Explicit operator approval required remains a concise badge, not a noisy warning stack.",
        state: "approval-required",
      },
      {
        id: "paper-scope",
        label: "Paper-review-only scope",
        summary:
          "No financial advice, no personalised recommendations, and no buy sell instructions are summarized as hard boundaries.",
        state: "blocked",
      },
    ],
    emphasisLabel: "Paper-review-only workspace",
  },
  {
    id: "jarvis-workflows",
    routeHref: "/jarvis-workflows",
    label: "Workflows",
    shortLabel: "Workflows",
    description:
      "A review-first workflow planning workspace that makes triggers, planner, permissions, dry run, approval, and audit visible without dispatching anything.",
    status: "blocked",
    riskTier: "tier-1-platform",
    approvalPosture: "Operator approval required",
    executionPosture: "Dispatch blocked",
    primaryNextAction:
      "Review the trigger to plan to permission to dry run to approval to audit path while scheduling and worker dispatch remain blocked.",
    placeholderState: {
      label: "Planned workflow path",
      summary:
        "The future flow is trigger to plan to permission to dry run to approval to audit with no automation, no scheduling, and no worker dispatch.",
      steps: [
        "trigger",
        "plan",
        "permission",
        "dry run",
        "approval",
        "audit",
      ],
    },
    blockedActionSummary: [
      "no schedule execution",
      "no worker dispatch",
      "no autonomous tool execution",
      "no tool execution",
      "no network execution",
      "no API route execution",
      "no service creation",
    ],
    backendRequirementSummary:
      "A backend planner, policy engine, dry-run simulator, approval router, and audit pipeline would be required before any future automation.",
    reviewPanels: [
      {
        id: "trigger",
        label: "Triggers",
        summary:
          "Trigger ideas remain visible without creating schedules, webhooks, or live automations.",
        state: "ready",
      },
      {
        id: "planner",
        label: "Planner",
        summary:
          "Plan structure, dependencies, and blocked actions stay visible in a compact shell.",
        state: "ready",
      },
      {
        id: "permissions",
        label: "Permissions",
        summary:
          "Permission boundaries stay ahead of every future tool, runtime, or connector path.",
        state: "approval-required",
      },
      {
        id: "dry-run",
        label: "Dry run",
        summary:
          "Dry run remains a placeholder lane with no dispatch and no live automation.",
        state: "blocked",
      },
      {
        id: "approval",
        label: "Approval",
        summary:
          "Operator approval remains a distinct gate before any future backend workflow service.",
        state: "approval-required",
      },
      {
        id: "audit",
        label: "Audit",
        summary:
          "Audit posture remains visible and non-persistent in the placeholder shell.",
        state: "ready",
      },
    ],
    emphasisLabel: "Review-only workspace",
  },
  {
    id: "jarvis-audit",
    routeHref: "/jarvis-audit",
    label: "Audit and Runs",
    shortLabel: "Audit",
    description:
      "A polished audit workspace for run history, approvals, evidence, blocked actions, and result review with no persistence.",
    status: "ready",
    riskTier: "tier-1-platform",
    approvalPosture: "Review only",
    executionPosture: "Review-only workspace",
    primaryNextAction:
      "Review approvals ledger, blocked action log, evidence packets, and result ledger placeholders before moving toward any execution batch.",
    placeholderState: {
      label: "Audit and run review",
      summary:
        "This workspace is intentionally clean and product-facing: it shows runs, approvals, evidence, blocked actions, and results without persistence.",
      steps: [
        "run timeline",
        "approvals ledger",
        "blocked action log",
        "result ledger",
        "evidence packets",
        "operator review",
      ],
    },
    blockedActionSummary: [
      "no database writes",
      "no file writes from the app",
      "no API route execution",
      "no download generation",
      "no export execution",
    ],
    backendRequirementSummary:
      "Persistent audit storage, evidence capture, run correlation, and approval joins remain backend requirements only.",
    reviewPanels: [
      {
        id: "run-timeline",
        label: "Run timeline",
        summary:
          "Run stages remain visible in a timeline placeholder instead of a raw status dump.",
        state: "ready",
      },
      {
        id: "approvals-ledger",
        label: "Approvals ledger",
        summary:
          "Approval history remains a premium ledger placeholder with no persistence.",
        state: "ready",
      },
      {
        id: "blocked-action-log",
        label: "Blocked action log",
        summary:
          "Blocked actions stay simplified and grouped so the user can see why execution is stopped.",
        state: "ready",
      },
      {
        id: "result-ledger",
        label: "Result ledger",
        summary:
          "Result capture remains placeholder-only and explicitly non-persistent.",
        state: "blocked",
      },
      {
        id: "evidence-packets",
        label: "Evidence packets",
        summary:
          "Evidence stays preview-only, grouped, and ready for later backend ownership.",
        state: "ready",
      },
      {
        id: "operator-review",
        label: "Operator review",
        summary:
          "Operator review stays visible as the bridge between product UX and future execution.",
        state: "approval-required",
      },
    ],
    emphasisLabel: "Review-only workspace",
  },
  {
    id: "jarvis-safety",
    routeHref: "/jarvis-safety",
    label: "Safety and Settings",
    shortLabel: "Safety",
    description:
      "A polished safety dashboard for approval mode, kill switch, credential boundaries, and storage boundaries.",
    status: "ready",
    riskTier: "tier-1-platform",
    approvalPosture: "Review only",
    executionPosture: "Safety control plane",
    primaryNextAction:
      "Review kill switch state, approval mode, credential boundary, and browser storage boundary before any backend trial is proposed.",
    placeholderState: {
      label: "Safety dashboard",
      summary:
        "Safety is compact and explicit: permission tiers, kill switch, approval mode, credential boundary, storage boundary, and blocked execution state.",
      steps: [
        "kill switch",
        "permission tiers",
        "approval mode",
        "credential boundary",
        "browser storage boundary",
        "risk tiers",
      ],
    },
    blockedActionSummary: [
      "no frontend provider key reads",
      "no plaintext secrets",
      "no localStorage",
      "no sessionStorage",
      "no IndexedDB",
      "no cookies",
      "no browser storage for secrets",
    ],
    backendRequirementSummary:
      "Credential vaulting, permission enforcement, audit persistence, and runtime switches remain backend-owned only.",
    reviewPanels: [
      {
        id: "kill-switch",
        label: "Global kill switch",
        summary:
          "The global kill switch stays engaged by default and clearly visible.",
        state: "ready",
      },
      {
        id: "permission-tiers",
        label: "Permission tiers",
        summary:
          "Tiered permission posture stays grouped so users can read it quickly.",
        state: "ready",
      },
      {
        id: "approval-mode",
        label: "Approval mode",
        summary:
          "Approval required remains explicit across creative, trading, workflow, and provider-adjacent paths.",
        state: "approval-required",
      },
      {
        id: "credential-boundary",
        label: "Credential boundary",
        summary:
          "Frontend credential reads remain blocked and backend-only boundaries stay visible.",
        state: "blocked",
      },
      {
        id: "storage-boundary",
        label: "Browser storage boundary",
        summary:
          "Secret storage in browser surfaces remains hard blocked across localStorage, sessionStorage, IndexedDB, and cookies.",
        state: "blocked",
      },
      {
        id: "risk-tiers",
        label: "Risk tiers",
        summary:
          "Risk language stays concise and visible without drowning the page in warnings.",
        state: "ready",
      },
    ],
    emphasisLabel: "Review-only workspace",
  },
  {
    id: "developer-diagnostics",
    routeHref: "/jarvis-unified-product-ia-developer-diagnostics-secondary-wiring",
    label: "Developer Diagnostics",
    shortLabel: "Diagnostics",
    description:
      "A secondary drawer for phase pages, smoke checkpoints, and product IA wiring routes. Normal user path is primary.",
    status: "secondary",
    riskTier: "tier-1-platform",
    approvalPosture: "Review only",
    executionPosture: "Phase pages remain diagnostics only",
    primaryNextAction:
      "Open diagnostics only when the product-facing routes do not answer the review question.",
    placeholderState: {
      label: "Diagnostics and traceability",
      summary:
        "Developer diagnostics are secondary. Placeholders are intentional. Normal user path is primary.",
      steps: [
        "primary route review",
        "secondary diagnostics drawer",
        "phase page traceability",
        "smoke coverage",
        "checkpoint alignment",
        "operator review",
      ],
    },
    blockedActionSummary: [
      "developer diagnostics are secondary",
      "phase pages remain diagnostics only",
      "no direct frontend execution",
    ],
    backendRequirementSummary:
      "Diagnostics remain reference material and do not create routes, services, executions, or persistence paths beyond static frontend files.",
    reviewPanels: [
      {
        id: "phase-pages",
        label: "Phase pages",
        summary:
          "All 3914-3945 pages stay reachable without overtaking the primary product routes.",
        state: "secondary",
      },
      {
        id: "legacy-batches",
        label: "Legacy diagnostics",
        summary:
          "Previous Jarvis video UX and readiness batches remain grouped under secondary diagnostics.",
        state: "secondary",
      },
      {
        id: "smoke-checkpoints",
        label: "Smoke checkpoints",
        summary:
          "Smoke scripts remain reachable for operator verification, not for normal product flow.",
        state: "secondary",
      },
      {
        id: "route-order",
        label: "Route order",
        summary:
          "Normal user path is primary and developer diagnostics are secondary.",
        state: "secondary",
      },
      {
        id: "checkpoint-alignment",
        label: "Checkpoint alignment",
        summary:
          "Checkpoint references stay explicit while the product shell stays polished.",
        state: "secondary",
      },
      {
        id: "no-execution",
        label: "No execution guard",
        summary:
          "Diagnostics remain strictly review-only and execution-blocked.",
        state: "blocked",
      },
    ],
    emphasisLabel: "Secondary only",
  },
] as const satisfies readonly JarvisUnifiedProductWorkspaceRecord[];

export const JARVIS_UNIFIED_PRODUCT_WORKSPACE_CARD_BY_ID =
  {
    "jarvis-video": getWorkspaceCardById("jarvis-video"),
    "jarvis-trading": getWorkspaceCardById("jarvis-trading"),
    "jarvis-websites": getWorkspaceCardById("jarvis-websites"),
    "jarvis-avatar": getWorkspaceCardById("jarvis-avatar"),
    "jarvis-workflows": getWorkspaceCardById("jarvis-workflows"),
    "jarvis-audit": getWorkspaceCardById("jarvis-audit"),
    "jarvis-safety": getWorkspaceCardById("jarvis-safety"),
    "developer-diagnostics": getWorkspaceCardById("developer-diagnostics"),
  } as const satisfies Readonly<
    Record<JarvisUnifiedProductWorkspaceId, JarvisUnifiedProductWorkspaceRecord>
  >;

export function getJarvisUnifiedProductWorkspaceCard(
  workspaceId: JarvisUnifiedProductWorkspaceId
): JarvisUnifiedProductWorkspaceRecord {
  return JARVIS_UNIFIED_PRODUCT_WORKSPACE_CARD_BY_ID[workspaceId];
}

function getWorkspaceCardById(
  workspaceId: JarvisUnifiedProductWorkspaceId
): JarvisUnifiedProductWorkspaceRecord {
  const workspace = JARVIS_UNIFIED_PRODUCT_WORKSPACE_CARDS.find(
    (candidate) => candidate.id === workspaceId
  );

  if (!workspace) {
    throw new Error(`Missing Jarvis unified product workspace: ${workspaceId}`);
  }

  return workspace;
}
