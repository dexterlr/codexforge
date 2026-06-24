export type ModelRouterV2RouteSlug =
  | "codexforge-cockpit"
  | "model-router-v2-boundary"
  | "model-capability-registry-preview"
  | "local-private-model-preference-preview"
  | "cheapest-capable-model-policy-preview"
  | "paid-pro-model-justification-preview"
  | "specialist-model-domain-fit-preview"
  | "model-privacy-class-preview"
  | "model-cost-class-preview"
  | "prompt-payload-preview"
  | "model-approval-gate-preview"
  | "model-fallback-route-preview"
  | "model-denial-route-preview"
  | "model-evidence-result-audit-preview"
  | "cockpit-model-router-summary"
  | "first-model-router-v2-candidate"
  | "controlled-model-router-v2-release-candidate";

export type ModelRouterV2Kind =
  | "model-router-v2-preview"
  | "model-router-v2-boundary"
  | "model-capability-registry-preview"
  | "local-private-model-preference-preview"
  | "cheapest-capable-model-policy-preview"
  | "paid-pro-model-justification-preview"
  | "specialist-model-domain-fit-preview"
  | "model-privacy-class-preview"
  | "model-cost-class-preview"
  | "prompt-payload-preview"
  | "model-approval-gate-preview"
  | "model-fallback-route-preview"
  | "model-denial-route-preview"
  | "model-evidence-result-audit-preview"
  | "first-model-router-v2-candidate"
  | "controlled-model-router-v2-release-candidate";

export type ModelRouterV2State =
  | "preview-only"
  | "review-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "denied"
  | "manual-review"
  | "candidate"
  | "release-candidate";

export type ModelRouterV2Item = {
  id: string;
  label: string;
  detail: string;
  state: ModelRouterV2State;
};

export type ModelRouterV2Record = {
  id: string;
  label: string;
  title: string;
  summary: string;
  state: ModelRouterV2State;
  items: readonly ModelRouterV2Item[];
};

export type ModelRouterV2Model = {
  modelRouterId: string;
  modelRouterKind: ModelRouterV2Kind;
  goalRef: ModelRouterV2Record;
  projectContextRef: ModelRouterV2Record;
  workProposalRef: ModelRouterV2Record;
  capabilityRegistry: ModelRouterV2Record;
  localPrivatePreference: ModelRouterV2Record;
  cheapestCapablePolicy: ModelRouterV2Record;
  paidProJustification: ModelRouterV2Record;
  specialistDomainFit: ModelRouterV2Record;
  privacyClass: ModelRouterV2Record;
  costClass: ModelRouterV2Record;
  promptPayloadPreview: ModelRouterV2Record;
  approvalGate: ModelRouterV2Record;
  fallbackRoute: ModelRouterV2Record;
  denialRoute: ModelRouterV2Record;
  evidenceResultAuditPreview: ModelRouterV2Record;
  deniedModelBoundaries: ModelRouterV2Record;
  cockpitSummary: readonly ModelRouterV2Item[];
  explicitSafetyLimits: readonly string[];
};

export type ModelRouterV2RouteDefinition = {
  slug: ModelRouterV2RouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  recordIds: readonly string[];
  devOnly: boolean;
};

export type ModelRouterV2RouteModel = {
  route: ModelRouterV2RouteDefinition;
  modelRouter: ModelRouterV2Model;
  records: readonly ModelRouterV2Record[];
  diagnosticRoutes: readonly ModelRouterV2RouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const MODEL_ROUTER_V2_COCKPIT_MARKERS = [
  "Model Router v2",
  "Capability",
  "Local Private",
  "Cheapest Capable",
  "Paid Pro",
  "Specialist",
  "Privacy",
  "Cost",
  "Prompt Preview",
  "Approval",
  "Fallback",
  "Denied",
  "Evidence",
  "Result",
  "Audit",
  "No model calls from the cockpit",
  "No provider calls from the cockpit",
  "No connector calls from the cockpit",
  "No prompt sending from the cockpit",
  "No credential storage from the cockpit",
  "Backend-owned model routing remains required",
  "backend-owned provider-gated model routing remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Model Router v2 is preview-only from the frontend.",
  "It does not call models from the UI.",
  "It does not call providers from the UI.",
  "It does not call connectors from the UI.",
  "It does not send prompts from the UI.",
  "It does not read secrets or API keys.",
  "It does not store credentials in browser storage.",
  "It does not persist provider credentials.",
  "It does not hide model choice.",
  "It does not hide cost class.",
  "It does not hide privacy class.",
  "It does not persist routing decisions from the UI.",
  "It does not release execution from the frontend.",
  "It prepares a future backend-owned provider-gated model routing path.",
  "backend-owned provider-gated model routing remains required",
  "Explicit operator approval remains required.",
] as const;

const GOAL_REF: ModelRouterV2Record = {
  id: "goalRef",
  label: "Goal",
  title: "goalRef",
  summary:
    "Goal reference preview shows the operator goal as a routing input only; the cockpit does not send the goal to any model or provider.",
  state: "preview-only",
  items: [
    {
      id: "goal-routing-input",
      label: "Routing input",
      detail: "Future backend routing can reference a reviewed goal without allowing the cockpit to send prompts.",
      state: "backend-owned",
    },
    {
      id: "goal-sensitive-context",
      label: "Sensitivity hint",
      detail: "Goal sensitivity is treated as a privacy input before any provider class can be considered.",
      state: "review-only",
    },
    {
      id: "goal-no-prompt-send",
      label: "No prompt send",
      detail: "The frontend keeps the goal as static review copy and does not transmit prompt payloads.",
      state: "blocked",
    },
  ],
};

const PROJECT_CONTEXT_REF: ModelRouterV2Record = {
  id: "projectContextRef",
  label: "Project Context",
  title: "projectContextRef",
  summary:
    "Project context reference preview shows context class, file sensitivity, and denied context boundaries without crawling files or sending project content.",
  state: "review-only",
  items: [
    {
      id: "context-class",
      label: "Context class",
      detail: "Project-sensitive work prefers local/private classes until a backend-owned approval path allows otherwise.",
      state: "review-only",
    },
    {
      id: "context-file-boundary",
      label: "File boundary",
      detail: "File and command context stays descriptive; arbitrary file reads and secret reads are outside the router preview.",
      state: "denied",
    },
    {
      id: "context-provider-hold",
      label: "Provider hold",
      detail: "Provider-allowed context must be visible before use and still needs explicit operator approval.",
      state: "needs-approval",
    },
  ],
};

const WORK_PROPOSAL_REF: ModelRouterV2Record = {
  id: "workProposalRef",
  label: "Work Proposal",
  title: "workProposalRef",
  summary:
    "Work proposal reference preview ties model choice to capability, privacy, cost, evidence, result, and audit expectations before any model call can exist.",
  state: "review-only",
  items: [
    {
      id: "proposal-capability-fit",
      label: "Capability fit",
      detail: "The route explains which model class would be considered and why that class fits the work proposal.",
      state: "review-only",
    },
    {
      id: "proposal-evidence-requirement",
      label: "Evidence requirement",
      detail: "Evidence, result, and audit requirements are shown before use so output capture is not hidden.",
      state: "backend-owned",
    },
    {
      id: "proposal-no-decision-persist",
      label: "No UI persistence",
      detail: "Routing decisions are previewed only and are not persisted from the cockpit.",
      state: "blocked",
    },
  ],
};

const CAPABILITY_REGISTRY: ModelRouterV2Record = {
  id: "capabilityRegistry",
  label: "Capability",
  title: "capabilityRegistry",
  summary:
    "Capability registry preview maps coding reasoning research creative image video local private paid pro specialist and domain-fit capabilities without querying providers.",
  state: "preview-only",
  items: [
    {
      id: "capability-general",
      label: "Coding reasoning research",
      detail: "Coding, reasoning, and research capability classes are visible as deterministic routing inputs.",
      state: "review-only",
    },
    {
      id: "capability-creative",
      label: "Creative image video",
      detail: "Creative, image, and video classes require domain-fit justification and cannot be called from the UI.",
      state: "needs-approval",
    },
    {
      id: "capability-provider-classes",
      label: "Local private paid pro specialist",
      detail: "Local, private, paid pro, specialist, and domain-fit classes are previewed without provider discovery.",
      state: "blocked",
    },
  ],
};

const LOCAL_PRIVATE_PREFERENCE: ModelRouterV2Record = {
  id: "localPrivatePreference",
  label: "Local Private",
  title: "localPrivatePreference",
  summary:
    "Local private model preference prioritizes private local execution when capability fit and context sensitivity require it.",
  state: "backend-owned",
  items: [
    {
      id: "local-first",
      label: "Local first",
      detail: "Local/private is considered first for private, project-sensitive, or context-heavy work.",
      state: "backend-owned",
    },
    {
      id: "local-fit",
      label: "Capability fit",
      detail: "Local/private only wins when capability fit is good enough for the evidence and result requirements.",
      state: "review-only",
    },
    {
      id: "local-no-ui-call",
      label: "No local UI call",
      detail: "The cockpit does not call local models, local bridges, or provider adapters.",
      state: "blocked",
    },
  ],
};

const CHEAPEST_CAPABLE_POLICY: ModelRouterV2Record = {
  id: "cheapestCapablePolicy",
  label: "Cheapest Capable",
  title: "cheapestCapablePolicy",
  summary:
    "Cheapest capable model policy chooses the lowest-cost model that satisfies capability privacy context and evidence requirements.",
  state: "review-only",
  items: [
    {
      id: "cheapest-default",
      label: "Default winner",
      detail: "The lowest-cost capable class wins by default after privacy and capability constraints are satisfied.",
      state: "review-only",
    },
    {
      id: "cheapest-not-cheapest-only",
      label: "Not cheapest only",
      detail: "A cheaper class is denied when it fails capability, privacy, context, evidence, or audit requirements.",
      state: "manual-review",
    },
    {
      id: "cheapest-no-spend",
      label: "No token spend",
      detail: "Cost class is preview text only; the frontend does not spend tokens or call paid models.",
      state: "blocked",
    },
  ],
};

const PAID_PRO_JUSTIFICATION: ModelRouterV2Record = {
  id: "paidProJustification",
  label: "Paid Pro",
  title: "paidProJustification",
  summary:
    "Paid pro model justification explains capability gap privacy tradeoff cost class expected benefit and denied cheaper alternatives.",
  state: "needs-approval",
  items: [
    {
      id: "paid-gap",
      label: "Capability gap",
      detail: "Paid/pro can only be considered when local or lower-cost capable classes cannot meet the requirement.",
      state: "needs-approval",
    },
    {
      id: "paid-tradeoff",
      label: "Privacy cost benefit",
      detail: "The justification must show privacy tradeoff, cost class, expected benefit, and denied cheaper alternatives.",
      state: "manual-review",
    },
    {
      id: "paid-no-call",
      label: "No paid call",
      detail: "Paid/pro classes remain preview-only until backend-owned approval and provider gating exist.",
      state: "blocked",
    },
  ],
};

const SPECIALIST_DOMAIN_FIT: ModelRouterV2Record = {
  id: "specialistDomainFit",
  label: "Specialist",
  title: "specialistDomainFit",
  summary:
    "Specialist model domain fit explains coding research creative image video trading data game server and domain-specific routing justification.",
  state: "needs-approval",
  items: [
    {
      id: "specialist-domains",
      label: "Domain fit",
      detail: "Coding, research, creative, image, video, trading, data, game server, and domain-specific classes need explicit fit.",
      state: "review-only",
    },
    {
      id: "specialist-not-general",
      label: "Specialist reason",
      detail: "A specialist class is justified only when general and cheaper classes do not satisfy the domain requirements.",
      state: "needs-approval",
    },
    {
      id: "specialist-no-call",
      label: "No specialist call",
      detail: "The cockpit does not call specialist models and does not hide specialist routing.",
      state: "blocked",
    },
  ],
};

const PRIVACY_CLASS: ModelRouterV2Record = {
  id: "privacyClass",
  label: "Privacy",
  title: "privacyClass",
  summary:
    "Model privacy class preview shows local-only private project-sensitive provider-allowed and blocked privacy classes.",
  state: "review-only",
  items: [
    {
      id: "privacy-local-private",
      label: "Local-only private",
      detail: "Local-only and private classes keep sensitive project context away from providers.",
      state: "backend-owned",
    },
    {
      id: "privacy-provider-allowed",
      label: "Provider-allowed",
      detail: "Provider-allowed class means reviewed payload and approval can permit future backend provider use.",
      state: "needs-approval",
    },
    {
      id: "privacy-blocked",
      label: "Blocked",
      detail: "Blocked class denies secret payloads, private context leakage, and unapproved provider routing.",
      state: "denied",
    },
  ],
};

const COST_CLASS: ModelRouterV2Record = {
  id: "costClass",
  label: "Cost",
  title: "costClass",
  summary:
    "Model cost class preview shows free local low cost paid pro specialist unknown and blocked cost classes.",
  state: "review-only",
  items: [
    {
      id: "cost-low",
      label: "Free local low cost",
      detail: "Free, local, and low-cost classes are preferred when capability and privacy requirements are met.",
      state: "review-only",
    },
    {
      id: "cost-paid-specialist",
      label: "Paid pro specialist",
      detail: "Paid, pro, and specialist classes require visible justification before backend-owned approval.",
      state: "needs-approval",
    },
    {
      id: "cost-unknown-blocked",
      label: "Unknown blocked",
      detail: "Unknown or blocked cost classes cannot proceed without operator review and provider gating.",
      state: "denied",
    },
  ],
};

const PROMPT_PAYLOAD_PREVIEW: ModelRouterV2Record = {
  id: "promptPayloadPreview",
  label: "Prompt Preview",
  title: "promptPayloadPreview",
  summary:
    "Prompt payload preview shows goal context files commands evidence privacy redaction and denied payload sections before any provider use.",
  state: "review-only",
  items: [
    {
      id: "payload-visible",
      label: "Visible payload",
      detail: "Goal, context, files, commands, evidence, privacy, and redaction sections must be reviewed before use.",
      state: "review-only",
    },
    {
      id: "payload-denied",
      label: "Denied sections",
      detail: "Secrets, credentials, unreviewed private context, and connector leakage stay in denied payload sections.",
      state: "denied",
    },
    {
      id: "payload-no-send",
      label: "No prompt sending",
      detail: "The cockpit previews payload shape and does not send prompts from the UI.",
      state: "blocked",
    },
  ],
};

const APPROVAL_GATE: ModelRouterV2Record = {
  id: "approvalGate",
  label: "Approval",
  title: "approvalGate",
  summary:
    "Model approval gate preview shows model choice provider class privacy class cost class prompt payload evidence result audit and expiry scope.",
  state: "needs-approval",
  items: [
    {
      id: "approval-visible-choice",
      label: "Visible choice",
      detail: "Model choice, provider class, privacy class, cost class, and prompt payload are shown before use.",
      state: "needs-approval",
    },
    {
      id: "approval-evidence-scope",
      label: "Evidence result audit",
      detail: "Evidence, result, audit, expiry, and scope define what future backend-owned approval can cover.",
      state: "backend-owned",
    },
    {
      id: "approval-no-ui-persist",
      label: "No UI approval persistence",
      detail: "The frontend does not persist approvals or convert preview choice into execution permission.",
      state: "blocked",
    },
  ],
};

const FALLBACK_ROUTE: ModelRouterV2Record = {
  id: "fallbackRoute",
  label: "Fallback",
  title: "fallbackRoute",
  summary:
    "Model fallback route preview shows local fallback cheaper fallback safer fallback manual review and blocked fallback states.",
  state: "manual-review",
  items: [
    {
      id: "fallback-local",
      label: "Local fallback",
      detail: "Local fallback is preferred when privacy is high or provider use is not approved.",
      state: "backend-owned",
    },
    {
      id: "fallback-cheaper-safer",
      label: "Cheaper safer fallback",
      detail: "Cheaper and safer fallback classes are considered before paid/pro or specialist escalation.",
      state: "review-only",
    },
    {
      id: "fallback-blocked",
      label: "Manual review blocked",
      detail: "Blocked fallback states stop routing and require manual review instead of silent failover.",
      state: "denied",
    },
  ],
};

const DENIAL_ROUTE: ModelRouterV2Record = {
  id: "denialRoute",
  label: "Denied",
  title: "denialRoute",
  summary:
    "Model denial route preview blocks secret payloads private context provider disallowed high-cost unapproved specialist connector leakage and unsupported capability routes.",
  state: "denied",
  items: [
    {
      id: "denial-secret-private",
      label: "Secret private",
      detail: "Secret payloads, private context leakage, and provider-disallowed classes are denied before use.",
      state: "denied",
    },
    {
      id: "denial-cost-specialist",
      label: "High-cost specialist",
      detail: "High-cost and unapproved specialist routes are blocked without explicit justification and approval.",
      state: "denied",
    },
    {
      id: "denial-connector-capability",
      label: "Connector unsupported",
      detail: "Connector leakage and unsupported capability routes remain blocked and visible.",
      state: "denied",
    },
  ],
};

const EVIDENCE_RESULT_AUDIT_PREVIEW: ModelRouterV2Record = {
  id: "evidenceResultAuditPreview",
  label: "Evidence Result Audit",
  title: "evidenceResultAuditPreview",
  summary:
    "Model evidence result audit preview shows prompt payload approval provider model output result redaction evidence and audit references.",
  state: "backend-owned",
  items: [
    {
      id: "evidence-prompt-approval",
      label: "Prompt approval provider",
      detail: "Prompt payload, approval, provider, and model references require backend-owned capture.",
      state: "backend-owned",
    },
    {
      id: "evidence-output-result",
      label: "Output result redaction",
      detail: "Output, result, redaction, evidence, and audit references must be connected before result use.",
      state: "backend-owned",
    },
    {
      id: "evidence-no-ui-persist",
      label: "No UI persistence",
      detail: "The frontend does not persist evidence, results, audit, or model outputs.",
      state: "blocked",
    },
  ],
};

const DENIED_MODEL_BOUNDARIES: ModelRouterV2Record = {
  id: "deniedModelBoundaries",
  label: "Denied Model Boundaries",
  title: "deniedModelBoundaries",
  summary:
    "Denied model boundaries keep hidden routing, hidden approvals, prompt sending, credential storage, provider calls, connector calls, and frontend persistence blocked.",
  state: "denied",
  items: [
    {
      id: "denied-no-hidden",
      label: "No hidden routing",
      detail: "Model choice, privacy class, cost class, capability fit, fallback, and denial states must stay visible.",
      state: "denied",
    },
    {
      id: "denied-no-credentials",
      label: "No credential storage",
      detail: "The cockpit does not read secrets, read API keys, or store credentials in browser storage.",
      state: "denied",
    },
    {
      id: "denied-no-execution",
      label: "No frontend execution",
      detail: "Provider calls, connector calls, prompt sending, queue creation, transactions, audit persistence, and execution release stay blocked.",
      state: "denied",
    },
  ],
};

const COCKPIT_SUMMARY: readonly ModelRouterV2Item[] = [
  {
    id: "cockpit-capability",
    label: "Capability",
    detail: "Shows which model class would be considered and why capability fit matters before use.",
    state: "review-only",
  },
  {
    id: "cockpit-local-private",
    label: "Local Private",
    detail: "Explains why local/private is preferred for sensitive project context when capable.",
    state: "backend-owned",
  },
  {
    id: "cockpit-cheapest-capable",
    label: "Cheapest Capable",
    detail: "Explains why the cheapest capable class wins by default after privacy and evidence constraints.",
    state: "review-only",
  },
  {
    id: "cockpit-paid-pro",
    label: "Paid Pro",
    detail: "Shows when paid/pro classes need capability gap, privacy tradeoff, cost, and expected benefit justification.",
    state: "needs-approval",
  },
  {
    id: "cockpit-specialist",
    label: "Specialist",
    detail: "Shows when specialist models need domain-fit justification before any future backend provider use.",
    state: "needs-approval",
  },
  {
    id: "cockpit-privacy",
    label: "Privacy",
    detail: "Shows privacy class before use so private, provider-allowed, and blocked content are clear.",
    state: "review-only",
  },
  {
    id: "cockpit-cost",
    label: "Cost",
    detail: "Shows cost class before use so paid, pro, specialist, unknown, and blocked routes are visible.",
    state: "review-only",
  },
  {
    id: "cockpit-prompt-preview",
    label: "Prompt Preview",
    detail: "Shows the prompt payload that would be reviewed while the cockpit sends no prompts.",
    state: "blocked",
  },
  {
    id: "cockpit-approval",
    label: "Approval",
    detail: "Explains why explicit operator approval is required before any model or provider call.",
    state: "needs-approval",
  },
  {
    id: "cockpit-fallback-denied",
    label: "Fallback Denied",
    detail: "Shows fallback and denial states before use so routing cannot silently change.",
    state: "denied",
  },
  {
    id: "cockpit-evidence-result-audit",
    label: "Evidence Result Audit",
    detail: "Shows evidence, result, and audit requirements before any backend-owned model routing path can run.",
    state: "backend-owned",
  },
];

const MODEL_ROUTER_V2_MODEL: ModelRouterV2Model = {
  modelRouterId: "codexforge-model-router-v2-1530-1545",
  modelRouterKind: "model-router-v2-preview",
  goalRef: GOAL_REF,
  projectContextRef: PROJECT_CONTEXT_REF,
  workProposalRef: WORK_PROPOSAL_REF,
  capabilityRegistry: CAPABILITY_REGISTRY,
  localPrivatePreference: LOCAL_PRIVATE_PREFERENCE,
  cheapestCapablePolicy: CHEAPEST_CAPABLE_POLICY,
  paidProJustification: PAID_PRO_JUSTIFICATION,
  specialistDomainFit: SPECIALIST_DOMAIN_FIT,
  privacyClass: PRIVACY_CLASS,
  costClass: COST_CLASS,
  promptPayloadPreview: PROMPT_PAYLOAD_PREVIEW,
  approvalGate: APPROVAL_GATE,
  fallbackRoute: FALLBACK_ROUTE,
  denialRoute: DENIAL_ROUTE,
  evidenceResultAuditPreview: EVIDENCE_RESULT_AUDIT_PREVIEW,
  deniedModelBoundaries: DENIED_MODEL_BOUNDARIES,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const RECORD_LOOKUP: Record<string, ModelRouterV2Record> = {
  goalRef: GOAL_REF,
  projectContextRef: PROJECT_CONTEXT_REF,
  workProposalRef: WORK_PROPOSAL_REF,
  capabilityRegistry: CAPABILITY_REGISTRY,
  localPrivatePreference: LOCAL_PRIVATE_PREFERENCE,
  cheapestCapablePolicy: CHEAPEST_CAPABLE_POLICY,
  paidProJustification: PAID_PRO_JUSTIFICATION,
  specialistDomainFit: SPECIALIST_DOMAIN_FIT,
  privacyClass: PRIVACY_CLASS,
  costClass: COST_CLASS,
  promptPayloadPreview: PROMPT_PAYLOAD_PREVIEW,
  approvalGate: APPROVAL_GATE,
  fallbackRoute: FALLBACK_ROUTE,
  denialRoute: DENIAL_ROUTE,
  evidenceResultAuditPreview: EVIDENCE_RESULT_AUDIT_PREVIEW,
  deniedModelBoundaries: DENIED_MODEL_BOUNDARIES,
};

const ALL_RECORD_IDS = [
  "goalRef",
  "projectContextRef",
  "workProposalRef",
  "capabilityRegistry",
  "localPrivatePreference",
  "cheapestCapablePolicy",
  "paidProJustification",
  "specialistDomainFit",
  "privacyClass",
  "costClass",
  "promptPayloadPreview",
  "approvalGate",
  "fallbackRoute",
  "denialRoute",
  "evidenceResultAuditPreview",
  "deniedModelBoundaries",
] as const;

const ROUTES: readonly ModelRouterV2RouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Cockpit",
    title: "Model Router v2",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary:
      "Cockpit model router summary keeps model routing review in the normal user cockpit while phase pages remain dev test diagnostics only.",
    markerPhrases: MODEL_ROUTER_V2_COCKPIT_MARKERS,
    recordIds: ALL_RECORD_IDS,
    devOnly: false,
  },
  {
    slug: "model-router-v2-boundary",
    href: "/model-router-v2-boundary",
    phase: "Phase 1530",
    title: "Model Router v2 Boundary",
    commandLabel: "Go to Model Router v2 Boundary",
    summary:
      "Defines the preview-only model router v2 boundary for future backend-owned provider-gated model selection.",
    markerPhrases: [
      "Model router v2 boundary",
      "Model router v2 boundary does not call models from the UI",
      "Model router v2 requires explicit operator approval before provider use",
      "Model router v2 prepares backend-owned provider-gated model selection without hidden routing",
      "Denied model router paths remain blocked",
      "Model router v2 checklist",
    ],
    recordIds: ALL_RECORD_IDS,
    devOnly: true,
  },
  {
    slug: "model-capability-registry-preview",
    href: "/model-capability-registry-preview",
    phase: "Phase 1531",
    title: "Model Capability Registry Preview",
    commandLabel: "Go to Model Capability Registry Preview",
    summary: "Previews model capabilities without provider queries.",
    markerPhrases: [
      "Model capability registry preview",
      "Model capability registry preview does not query providers",
      "Model capability registry preview requires explicit operator approval before provider use",
      "Model capability registry previews coding reasoning research creative image video local private paid pro specialist and domain-fit capabilities",
      "Denied model capability registry paths remain blocked",
      "Model capability registry checklist",
    ],
    recordIds: ["capabilityRegistry", "privacyClass", "costClass", "deniedModelBoundaries"],
    devOnly: true,
  },
  {
    slug: "local-private-model-preference-preview",
    href: "/local-private-model-preference-preview",
    phase: "Phase 1532",
    title: "Local Private Model Preference Preview",
    commandLabel: "Go to Local Private Model Preference Preview",
    summary: "Previews local/private first routing without calling local models.",
    markerPhrases: [
      "Local private model preference preview",
      "Local private model preference preview does not call local models from the UI",
      "Local private model preference preview requires explicit operator approval",
      "Local private model preference prioritizes private local execution when capability fit and context sensitivity require it",
      "Denied local private model paths remain blocked",
      "Local private model preference checklist",
    ],
    recordIds: ["localPrivatePreference", "projectContextRef", "privacyClass", "deniedModelBoundaries"],
    devOnly: true,
  },
  {
    slug: "cheapest-capable-model-policy-preview",
    href: "/cheapest-capable-model-policy-preview",
    phase: "Phase 1533",
    title: "Cheapest Capable Model Policy Preview",
    commandLabel: "Go to Cheapest Capable Model Policy Preview",
    summary: "Previews cheapest capable policy without calling paid models.",
    markerPhrases: [
      "Cheapest capable model policy preview",
      "Cheapest capable model policy preview does not call paid models",
      "Cheapest capable model policy preview requires explicit operator approval",
      "Cheapest capable model policy chooses the lowest-cost model that satisfies capability privacy context and evidence requirements",
      "Denied cheapest capable model paths remain blocked",
      "Cheapest capable model policy checklist",
    ],
    recordIds: ["cheapestCapablePolicy", "capabilityRegistry", "privacyClass", "costClass", "deniedModelBoundaries"],
    devOnly: true,
  },
  {
    slug: "paid-pro-model-justification-preview",
    href: "/paid-pro-model-justification-preview",
    phase: "Phase 1534",
    title: "Paid Pro Model Justification Preview",
    commandLabel: "Go to Paid Pro Model Justification Preview",
    summary: "Previews paid/pro justification without calling paid or pro models.",
    markerPhrases: [
      "Paid pro model justification preview",
      "Paid pro model justification preview does not call paid or pro models",
      "Paid pro model justification preview requires explicit operator approval",
      "Paid pro model justification explains capability gap privacy tradeoff cost class expected benefit and denied cheaper alternatives",
      "Denied paid pro model paths remain blocked",
      "Paid pro model justification checklist",
    ],
    recordIds: ["paidProJustification", "cheapestCapablePolicy", "privacyClass", "costClass", "deniedModelBoundaries"],
    devOnly: true,
  },
  {
    slug: "specialist-model-domain-fit-preview",
    href: "/specialist-model-domain-fit-preview",
    phase: "Phase 1535",
    title: "Specialist Model Domain Fit Preview",
    commandLabel: "Go to Specialist Model Domain Fit Preview",
    summary: "Previews specialist domain fit without calling specialist models.",
    markerPhrases: [
      "Specialist model domain fit preview",
      "Specialist model domain fit preview does not call specialist models",
      "Specialist model domain fit preview requires explicit operator approval",
      "Specialist model domain fit explains coding research creative image video trading data game server and domain-specific routing justification",
      "Denied specialist model paths remain blocked",
      "Specialist model domain fit checklist",
    ],
    recordIds: ["specialistDomainFit", "capabilityRegistry", "paidProJustification", "denialRoute"],
    devOnly: true,
  },
  {
    slug: "model-privacy-class-preview",
    href: "/model-privacy-class-preview",
    phase: "Phase 1536",
    title: "Model Privacy Class Preview",
    commandLabel: "Go to Model Privacy Class Preview",
    summary: "Previews model privacy classes without sending private content to providers.",
    markerPhrases: [
      "Model privacy class preview",
      "Model privacy class preview does not send private content to providers",
      "Model privacy class preview requires explicit operator approval",
      "Model privacy class preview shows local-only private project-sensitive provider-allowed and blocked privacy classes",
      "Denied model privacy paths remain blocked",
      "Model privacy class checklist",
    ],
    recordIds: ["privacyClass", "projectContextRef", "promptPayloadPreview", "denialRoute"],
    devOnly: true,
  },
  {
    slug: "model-cost-class-preview",
    href: "/model-cost-class-preview",
    phase: "Phase 1537",
    title: "Model Cost Class Preview",
    commandLabel: "Go to Model Cost Class Preview",
    summary: "Previews cost classes without token spending or provider calls.",
    markerPhrases: [
      "Model cost class preview",
      "Model cost class preview does not spend tokens or call providers",
      "Model cost class preview requires explicit operator approval",
      "Model cost class preview shows free local low cost paid pro specialist unknown and blocked cost classes",
      "Denied model cost paths remain blocked",
      "Model cost class checklist",
    ],
    recordIds: ["costClass", "cheapestCapablePolicy", "paidProJustification", "denialRoute"],
    devOnly: true,
  },
  {
    slug: "prompt-payload-preview",
    href: "/prompt-payload-preview",
    phase: "Phase 1538",
    title: "Prompt Payload Preview",
    commandLabel: "Go to Prompt Payload Preview",
    summary: "Previews prompt payload shape without sending prompts.",
    markerPhrases: [
      "Prompt payload preview",
      "Prompt payload preview does not send prompts",
      "Prompt payload preview requires explicit operator approval",
      "Prompt payload preview shows goal context files commands evidence privacy redaction and denied payload sections before any provider use",
      "Denied prompt payload paths remain blocked",
      "Prompt payload checklist",
    ],
    recordIds: ["promptPayloadPreview", "goalRef", "projectContextRef", "workProposalRef", "denialRoute"],
    devOnly: true,
  },
  {
    slug: "model-approval-gate-preview",
    href: "/model-approval-gate-preview",
    phase: "Phase 1539",
    title: "Model Approval Gate Preview",
    commandLabel: "Go to Model Approval Gate Preview",
    summary: "Previews model approval gate without persisting approvals from the UI.",
    markerPhrases: [
      "Model approval gate preview",
      "Model approval gate preview does not persist approvals from the UI",
      "Model approval gate preview requires explicit human approval",
      "Model approval gate preview shows model choice provider class privacy class cost class prompt payload evidence result audit and expiry scope",
      "Denied model approval paths remain blocked",
      "Model approval gate checklist",
    ],
    recordIds: ["approvalGate", "promptPayloadPreview", "privacyClass", "costClass", "evidenceResultAuditPreview"],
    devOnly: true,
  },
  {
    slug: "model-fallback-route-preview",
    href: "/model-fallback-route-preview",
    phase: "Phase 1540",
    title: "Model Fallback Route Preview",
    commandLabel: "Go to Model Fallback Route Preview",
    summary: "Previews fallback route states without calling fallback models.",
    markerPhrases: [
      "Model fallback route preview",
      "Model fallback route preview does not call fallback models",
      "Model fallback route preview requires explicit operator approval",
      "Model fallback route preview shows local fallback cheaper fallback safer fallback manual review and blocked fallback states",
      "Denied model fallback paths remain blocked",
      "Model fallback route checklist",
    ],
    recordIds: ["fallbackRoute", "localPrivatePreference", "cheapestCapablePolicy", "denialRoute"],
    devOnly: true,
  },
  {
    slug: "model-denial-route-preview",
    href: "/model-denial-route-preview",
    phase: "Phase 1541",
    title: "Model Denial Route Preview",
    commandLabel: "Go to Model Denial Route Preview",
    summary: "Previews denied model routes without mutating workflow state.",
    markerPhrases: [
      "Model denial route preview",
      "Model denial route preview does not mutate workflow state",
      "Model denial route preview requires explicit operator approval",
      "Model denial route preview blocks secret payloads private context provider disallowed high-cost unapproved specialist connector leakage and unsupported capability routes",
      "Denied model route paths remain blocked",
      "Model denial route checklist",
    ],
    recordIds: ["denialRoute", "deniedModelBoundaries", "privacyClass", "costClass"],
    devOnly: true,
  },
  {
    slug: "model-evidence-result-audit-preview",
    href: "/model-evidence-result-audit-preview",
    phase: "Phase 1542",
    title: "Model Evidence Result Audit Preview",
    commandLabel: "Go to Model Evidence Result Audit Preview",
    summary: "Previews model evidence, result, and audit capture without persisting from the UI.",
    markerPhrases: [
      "Model evidence result audit preview",
      "Model evidence result audit preview does not persist evidence results or audit from the UI",
      "Model evidence result audit preview requires backend-owned capture",
      "Model evidence result audit preview shows prompt payload approval provider model output result redaction evidence and audit references",
      "Denied model evidence result audit paths remain blocked",
      "Model evidence result audit checklist",
    ],
    recordIds: ["evidenceResultAuditPreview", "approvalGate", "promptPayloadPreview", "deniedModelBoundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-model-router-summary",
    href: "/cockpit-model-router-summary",
    phase: "Phase 1543",
    title: "Cockpit Model Router Summary",
    commandLabel: "Go to Cockpit Model Router Summary",
    summary: "Keeps model router review in the cockpit while phase pages remain dev test diagnostics only.",
    markerPhrases: [
      "Cockpit model router summary",
      "Cockpit model router summary keeps the cockpit as the normal user surface",
      "Cockpit model router summary does not call models providers or connectors from the cockpit",
      "Cockpit model router summary shows capability local private cheapest capable paid pro specialist privacy cost prompt approval fallback denied evidence result and audit",
      "Phase pages remain dev test diagnostics only",
      "Cockpit model router checklist",
    ],
    recordIds: ALL_RECORD_IDS,
    devOnly: true,
  },
  {
    slug: "first-model-router-v2-candidate",
    href: "/first-model-router-v2-candidate",
    phase: "Phase 1544",
    title: "First Model Router v2 Candidate",
    commandLabel: "Go to First Model Router v2 Candidate",
    summary: "Combines the first model router v2 candidate across every routing preview.",
    markerPhrases: [
      "First model router v2 candidate",
      "First model router v2 candidate does not call models from the UI",
      "First model router v2 candidate requires explicit operator approval",
      "Candidate combines capability local private cheapest capable paid pro specialist privacy cost prompt approval fallback denial evidence result and audit",
      "Denied first model router paths remain blocked",
      "First model router v2 checklist",
    ],
    recordIds: ALL_RECORD_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-model-router-v2-release-candidate",
    href: "/controlled-model-router-v2-release-candidate",
    phase: "Phase 1545",
    title: "Controlled Model Router v2 Release Candidate",
    commandLabel: "Go to Controlled Model Router v2 Release Candidate",
    summary:
      "Controlled model router v2 release candidate prepares backend-owned provider-gated routing without frontend model calls.",
    markerPhrases: [
      "Controlled model router v2 release candidate",
      "Controlled model router v2 release candidate does not call models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials or write browser storage from the frontend",
      "Controlled model router v2 release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned provider-gated model routing without frontend model calls",
      "Denied controlled model router paths remain blocked",
      "Controlled model router v2 release checklist",
    ],
    recordIds: ALL_RECORD_IDS,
    devOnly: true,
  },
];

export function listModelRouterV2RouteDefinitions(): readonly ModelRouterV2RouteDefinition[] {
  return ROUTES;
}

export function getModelRouterV2RouteDefinition(slug: ModelRouterV2RouteSlug): ModelRouterV2RouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  if (!route) return ROUTES[0];
  return route;
}

export function buildModelRouterV2RouteModel(
  slug: ModelRouterV2RouteSlug = "codexforge-cockpit"
): ModelRouterV2RouteModel {
  const route = getModelRouterV2RouteDefinition(slug);
  const records = route.recordIds.map((recordId) => RECORD_LOOKUP[recordId]).filter(Boolean);

  return {
    route,
    modelRouter: MODEL_ROUTER_V2_MODEL,
    records,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: MODEL_ROUTER_V2_COCKPIT_MARKERS,
    summary: summarizeModelRouterV2Route(route, records),
  };
}

export function buildModelRouterV2Model(): ModelRouterV2RouteModel {
  return buildModelRouterV2RouteModel("codexforge-cockpit");
}

export function summarizeModelRouterV2Route(
  route: ModelRouterV2RouteDefinition,
  records: readonly ModelRouterV2Record[]
): string {
  return `${route.title} keeps ${records.length} model router records static, deterministic, preview-only, review-only, approval-required, and blocked from frontend model/provider/connector calls.`;
}

export function buildModelRouterV2StableKey(parts: readonly string[]): string {
  return parts.join("__");
}
