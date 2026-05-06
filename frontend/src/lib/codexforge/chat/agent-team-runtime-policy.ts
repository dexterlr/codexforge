import type { CodexForgeStructuredReply } from "@/lib/codexforge/types";

type AnyRecord = Record<string, unknown>;

export type CodexForgeAgentRuntimePolicy = {
  domain: string | null;
  primaryAgent: string | null;
  primaryLabel: string | null;
  supportAgents: string[];
  reviewAgents: string[];
  allowedTools: string[];
  approvalRequiredTools: string[];
  blockedTools: string[];
  preferredSections: string[];
  runtimeRules: string[];
  safetyRules: string[];
  qualityGates: string[];
  visibleSummary: string[];
};

function asRecord(value: unknown): AnyRecord | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as AnyRecord)
    : null;
}

function normalizeString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return Array.from(
    new Set(
      value
        .map((item) => {
          if (typeof item === "string") return item.trim();

          const record = asRecord(item);
          return (
            normalizeString(record?.id) ??
            normalizeString(record?.role) ??
            normalizeString(record?.name) ??
            normalizeString(record?.label) ??
            normalizeString(record?.title) ??
            null
          );
        })
        .filter((item): item is string => !!item)
    )
  );
}

function firstString(record: AnyRecord | null, keys: string[]): string | null {
  if (!record) return null;

  for (const key of keys) {
    const value = normalizeString(record[key]);
    if (value) return value;
  }

  return null;
}

function roleId(value: unknown): string | null {
  if (typeof value === "string") return normalizeString(value);

  const record = asRecord(value);
  return firstString(record, ["id", "role", "name", "label", "title"]);
}

function roleLabel(value: unknown): string | null {
  if (typeof value === "string") return normalizeRoleLabel(value);

  const record = asRecord(value);
  return (
    firstString(record, ["label", "name", "title", "role", "id"]) ??
    normalizeString(value)
  );
}

function roleIds(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return Array.from(
    new Set(value.map((item) => roleId(item)).filter((item): item is string => !!item))
  );
}

function mergeUnique(...groups: unknown[]): string[] {
  return Array.from(
    new Set(
      groups
        .flatMap((group) => normalizeStringArray(group))
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );
}

function normalizeRoleLabel(value: string): string {
  return value
    .replace(/^agent-team:/i, "")
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function extractAgentTeamSource(
  structured: CodexForgeStructuredReply,
  explicitAgentTeam?: unknown
): AnyRecord | null {
  const structuredRecord = structured as unknown as AnyRecord;

  return (
    asRecord(explicitAgentTeam) ??
    asRecord(structuredRecord.agentTeam) ??
    asRecord(structuredRecord.agent_team) ??
    asRecord(asRecord(structuredRecord.meta)?.agentTeam) ??
    null
  );
}

function fallbackPolicyForDomain(domain: string | null): Partial<CodexForgeAgentRuntimePolicy> {
  switch ((domain ?? "").toLowerCase()) {
    case "trading":
      return {
        allowedTools: ["research", "external-api", "read-file", "search-project"],
        approvalRequiredTools: ["external-api"],
        blockedTools: ["broker-execution", "live-trade", "place-order", "send-order"],
        preferredSections: [
          "Market research boundaries",
          "Risk model",
          "Non-execution trading plan",
        ],
        runtimeRules: [
          "Treat trading prompts as research and planning unless an explicit, approved execution adapter exists.",
          "Do not execute broker actions, place orders, send trades, or imply live execution capability.",
          "Separate research, signal design, risk sizing, and execution policy into distinct steps.",
        ],
        safetyRules: [
          "Broker execution is blocked.",
          "Trading output must include risk, uncertainty, and human approval boundaries.",
        ],
        qualityGates: [
          "Verify the response does not recommend broker execution.",
          "Verify research claims are framed as analysis, not financial advice.",
        ],
      };

    case "blender":
      return {
        allowedTools: [
          "blender-python",
          "render-job",
          "generate-diff",
          "video-render",
          "external-api",
        ],
        approvalRequiredTools: [
          "blender-python",
          "render-job",
          "generate-diff",
          "video-render",
          "external-api",
        ],
        blockedTools: [],
        preferredSections: [
          "Scene plan",
          "Asset and material plan",
          "Render approval gates",
          "ComfyUI handoff",
        ],
        runtimeRules: [
          "Treat Blender automation as approval-gated creative production.",
          "Separate scene design, asset generation, animation, render settings, and final export.",
          "Require explicit approval before running Blender Python, render jobs, video rendering, or external generation.",
        ],
        safetyRules: [
          "Render and generation tools require approval.",
          "Never mutate project files or launch long-running render jobs without an approval gate.",
        ],
        qualityGates: [
          "Verify the plan names render approval gates.",
          "Verify ComfyUI/Blender handoffs are explicit when relevant.",
        ],
      };

    case "decks":
      return {
        allowedTools: ["deck-export", "external-api", "generate-diff"],
        approvalRequiredTools: ["deck-export", "external-api", "generate-diff"],
        blockedTools: [],
        preferredSections: [
          "Deck narrative",
          "Slide architecture",
          "Research support",
          "Export approval gates",
        ],
        runtimeRules: [
          "Treat deck work as narrative strategy, information design, and export-controlled production.",
          "Separate audience, thesis, slide outline, visual system, evidence, and export gates.",
          "Require explicit approval before deck export or external research/API use.",
        ],
        safetyRules: [
          "Deck export is approval-gated.",
          "External research/API use must be explicit and reviewable.",
        ],
        qualityGates: [
          "Verify the deck has a clear thesis and audience.",
          "Verify export approval gates are visible.",
        ],
      };

    case "marketing":
      return {
        allowedTools: ["external-api", "generate-diff", "deck-export"],
        approvalRequiredTools: ["external-api", "generate-diff", "deck-export"],
        blockedTools: [],
        preferredSections: [
          "Audience",
          "Positioning",
          "Creative system",
          "Campaign approval gates",
        ],
        runtimeRules: [
          "Treat marketing work as positioning, audience, offer, channel, and creative-system planning.",
          "Require approval before external API calls, diff generation, or deck export.",
        ],
        safetyRules: [
          "Claims should remain reviewable and evidence-backed.",
          "External publication/export actions require approval.",
        ],
        qualityGates: [
          "Verify audience and offer are explicit.",
          "Verify campaign claims do not overstate capabilities.",
        ],
      };

    case "design":
      return {
        allowedTools: [
          "generate-diff",
          "apply-diff",
          "write-file",
          "run-command",
          "run-tests",
          "build-web-app",
        ],
        approvalRequiredTools: [
          "generate-diff",
          "apply-diff",
          "write-file",
          "run-command",
          "run-tests",
          "build-web-app",
        ],
        blockedTools: [],
        preferredSections: [
          "Design intent",
          "Interaction model",
          "Implementation plan",
          "Approval gates",
        ],
        runtimeRules: [
          "Treat design work as product-quality interaction, visual system, and implementation planning.",
          "Require explicit approval before file mutations, diffs, commands, tests, or builds.",
        ],
        safetyRules: [
          "Mutating tools are approval-gated.",
          "Preserve local-first and operator-safe behavior.",
        ],
        qualityGates: [
          "Verify the plan includes interaction, visual, and implementation quality gates.",
        ],
      };

    default:
      return {
        allowedTools: [],
        approvalRequiredTools: [],
        blockedTools: [],
        preferredSections: ["Plan", "Risks", "Approval gates"],
        runtimeRules: [
          "Prefer local-first read/search/plan behavior before mutation.",
          "Require explicit approval before any mutation or long-running action.",
        ],
        safetyRules: [
          "Keep generated actions reviewable.",
          "Never apply mutations without explicit approval state.",
        ],
        qualityGates: [
          "Verify relevant files, risks, and next steps are visible.",
        ],
      };
  }
}

export function buildCodexForgeAgentRuntimePolicy(
  structured: CodexForgeStructuredReply,
  explicitAgentTeam?: unknown
): CodexForgeAgentRuntimePolicy | null {
  const structuredRecord = structured as unknown as AnyRecord;
  const source = extractAgentTeamSource(structured, explicitAgentTeam);

  const primarySource =
    source?.primary ??
    source?.primaryRole ??
    source?.primaryAgent ??
    source?.lead ??
    source?.owner;

  const domain =
    firstString(source, ["domain", "capabilityDomain", "capability"]) ??
    firstString(asRecord(primarySource), ["domain"]) ??
    normalizeString(structuredRecord.domain) ??
    firstString(asRecord(structuredRecord.plan), ["domain"]);

  const primaryAgent =
    roleId(primarySource) ??
    firstString(source, ["primary", "primaryRole", "primaryAgent", "primaryId"]) ??
    null;

  const primaryLabel =
    roleLabel(primarySource) ??
    (primaryAgent ? normalizeRoleLabel(primaryAgent) : null);

  const supportAgents = Array.from(
    new Set([
      ...roleIds(source?.support),
      ...roleIds(source?.supportRoles),
      ...roleIds(source?.supportAgents),
      ...normalizeStringArray(source?.supportLabels),
    ])
  );

  const reviewAgents = Array.from(
    new Set([
      ...roleIds(source?.review),
      ...roleIds(source?.reviewRoles),
      ...roleIds(source?.reviewAgents),
      ...normalizeStringArray(source?.reviewLabels),
    ])
  );

  const fallback = fallbackPolicyForDomain(domain);

  const allowedTools = mergeUnique(
    source?.allowedTools,
    source?.allowed_tools,
    source?.tools,
    fallback.allowedTools
  );

  const approvalRequiredTools = mergeUnique(
    source?.approvalTools,
    source?.approval_tools,
    source?.approvalRequiredTools,
    source?.approval_required_tools,
    source?.requiresApproval,
    source?.requires_approval,
    source?.approvalGatedTools,
    source?.approval_gated_tools,
    source?.toolsRequiringApproval,
    source?.tools_requiring_approval,
    source?.humanApprovalTools,
    source?.human_approval_tools,
    fallback.approvalRequiredTools
  );

  const blockedTools = mergeUnique(
    source?.blockedTools,
    source?.blocked_tools,
    source?.forbiddenTools,
    source?.forbidden_tools,
    source?.disallowedTools,
    source?.disallowed_tools,
    source?.deniedTools,
    source?.denied_tools,
    fallback.blockedTools
  );

  const preferredSections = mergeUnique(
    source?.preferredSections,
    source?.preferred_sections,
    fallback.preferredSections
  );

  const runtimeRules = mergeUnique(
    source?.runtimeRules,
    source?.runtime_rules,
    fallback.runtimeRules
  );

  const safetyRules = mergeUnique(
    source?.safetyRules,
    source?.safety_rules,
    fallback.safetyRules
  );

  const qualityGates = mergeUnique(
    source?.qualityGates,
    source?.quality_gates,
    fallback.qualityGates
  );

  const hasPolicy =
    !!domain ||
    !!primaryAgent ||
    !!primaryLabel ||
    supportAgents.length > 0 ||
    reviewAgents.length > 0 ||
    allowedTools.length > 0 ||
    approvalRequiredTools.length > 0 ||
    blockedTools.length > 0 ||
    runtimeRules.length > 0 ||
    safetyRules.length > 0 ||
    qualityGates.length > 0;

  if (!hasPolicy) return null;

  const visibleSummary = [
    domain ? `Domain policy: ${domain}` : null,
    primaryLabel ? `Primary operator: ${primaryLabel}` : null,
    allowedTools.length > 0 ? `Allowed tools: ${allowedTools.join(", ")}` : null,
    approvalRequiredTools.length > 0
      ? `Approval-required tools: ${approvalRequiredTools.join(", ")}`
      : null,
    blockedTools.length > 0 ? `Blocked tools: ${blockedTools.join(", ")}` : null,
  ].filter((item): item is string => !!item);

  return {
    domain,
    primaryAgent,
    primaryLabel,
    supportAgents,
    reviewAgents,
    allowedTools,
    approvalRequiredTools,
    blockedTools,
    preferredSections,
    runtimeRules,
    safetyRules,
    qualityGates,
    visibleSummary,
  };
}

function hasSection(sections: unknown, title: string): boolean {
  if (!Array.isArray(sections)) return false;

  return sections.some((section) => {
    const record = asRecord(section);
    return normalizeString(record?.title)?.toLowerCase() === title.toLowerCase();
  });
}

function section(title: string, items: string[]): AnyRecord | null {
  const clean = items.map((item) => item.trim()).filter(Boolean);
  return clean.length > 0 ? { title, items: clean } : null;
}

export function applyAgentTeamRuntimePolicy(
  structured: CodexForgeStructuredReply,
  explicitAgentTeam?: unknown
): CodexForgeStructuredReply {
  const policy = buildCodexForgeAgentRuntimePolicy(structured, explicitAgentTeam);
  if (!policy) return structured;

  const structuredRecord = structured as unknown as AnyRecord;
  const currentPlan = asRecord(structuredRecord.plan) ?? {};
  const existingSections = Array.isArray(structuredRecord.sections)
    ? structuredRecord.sections
    : [];

  const nextSections = [...existingSections];

  const runtimeSections = [
    section("Agent runtime policy", policy.visibleSummary),
    section("Runtime rules", policy.runtimeRules),
    section("Safety rules", policy.safetyRules),
    section("Quality gates", policy.qualityGates),
    section("Preferred output sections", policy.preferredSections),
  ].filter((item): item is AnyRecord => !!item);

  for (const item of runtimeSections) {
    const title = normalizeString(item.title);
    if (title && !hasSection(nextSections, title)) {
      nextSections.push(item);
    }
  }

  const nextPlan: AnyRecord = {
    ...currentPlan,
    domain: currentPlan.domain ?? policy.domain ?? structuredRecord.domain ?? undefined,
    notes: mergeUnique(
      currentPlan.notes,
      policy.runtimeRules,
      policy.visibleSummary
    ),
    risks: mergeUnique(
      currentPlan.risks,
      policy.safetyRules,
      policy.blockedTools.length > 0
        ? [`Blocked tools: ${policy.blockedTools.join(", ")}`]
        : [],
      policy.approvalRequiredTools.length > 0
        ? [`Approval-required tools: ${policy.approvalRequiredTools.join(", ")}`]
        : []
    ),
    tags: mergeUnique(
      currentPlan.tags,
      structuredRecord.tags,
      policy.domain ? [`runtime-policy:${policy.domain}`] : [],
      policy.primaryAgent ? [`primary-agent:${policy.primaryAgent}`] : []
    ),
  };

  const nextMeta = {
    ...(asRecord(structuredRecord.meta) ?? {}),
    agentRuntimePolicy: policy,
  };

  return {
    ...structured,
    plan: nextPlan,
    sections: nextSections as CodexForgeStructuredReply["sections"],
    meta: nextMeta,
  } as unknown as CodexForgeStructuredReply;
}
