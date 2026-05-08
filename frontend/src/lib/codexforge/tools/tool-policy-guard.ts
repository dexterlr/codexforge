import type { CodexForgeAgentRuntimePolicy } from "@/lib/codexforge/chat/agent-team-runtime-policy";

type AnyRecord = Record<string, unknown>;

export type CodexForgeToolPolicyMode =
  | "plan"
  | "preview"
  | "execute"
  | "apply"
  | "verify";

export type CodexForgeToolApprovalState = {
  approved?: boolean;
  approvalId?: string | null;
  approvedAt?: string | number | null;
  approvedBy?: string | null;
  reason?: string | null;
};

export type CodexForgeToolPolicyInput = {
  toolName: unknown;
  mode?: CodexForgeToolPolicyMode | string | null;
  domain?: unknown;
  runtimePolicy?: unknown;
  agentRuntimePolicy?: unknown;
  agentTeam?: unknown;
  approvalState?: unknown;
  approval?: unknown;
  metadata?: unknown;
};

export type CodexForgeToolPolicyDecision = {
  allowed: boolean;
  status: 200 | 400 | 403 | 409 | 428;
  toolName: string | null;
  normalizedToolName: string | null;
  mode: string;
  domain: string | null;
  reason: string;
  requiresApproval: boolean;
  blocked: boolean;
  approvalSatisfied: boolean;
  approvalId: string | null;
  approvalState: CodexForgeToolApprovalState;
  source: "blocked" | "approval-required" | "allowed" | "unknown-tool" | "missing-tool";
  approvalRequiredTools: string[];
  blockedTools: string[];
  readOnlyTools: string[];
  mutationTools: string[];
};

export class CodexForgeToolPolicyError extends Error {
  readonly decision: CodexForgeToolPolicyDecision;

  constructor(decision: CodexForgeToolPolicyDecision) {
    super(decision.reason);
    this.name = "CodexForgeToolPolicyError";
    this.decision = decision;
  }
}

const READ_ONLY_TOOLS = [
  "list-files",
  "read-file",
  "search-project",
  "snapshot-project",
  "research",
];

const MUTATION_OR_EXTERNAL_TOOLS = [
  "apply-diff",
  "write-file",
  "run-command",
  "run-tests",
  "build-web-app",
  "generate-diff",
  "external-api",
  "blender-python",
  "render-job",
  "video-render",
  "deck-export",
];

const ALWAYS_BLOCKED_TOOLS = [
  "broker-execution",
  "live-trade",
  "place-order",
  "send-order",
  "withdraw-funds",
  "transfer-funds",
];

const DOMAIN_APPROVAL_REQUIRED: Record<string, string[]> = {
  blender: [
    "blender-python",
    "render-job",
    "generate-diff",
    "video-render",
    "external-api",
  ],
  trading: [
    "external-api",
  ],
  decks: [
    "deck-export",
    "external-api",
    "generate-diff",
  ],
  marketing: [
    "external-api",
    "generate-diff",
    "deck-export",
  ],
  design: [
    "generate-diff",
    "apply-diff",
    "write-file",
    "run-command",
    "run-tests",
    "build-web-app",
  ],
};

const DOMAIN_BLOCKED: Record<string, string[]> = {
  trading: [
    "broker-execution",
    "live-trade",
    "place-order",
    "send-order",
  ],
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

function normalizeToolName(value: unknown): string | null {
  const raw = normalizeString(value);
  if (!raw) return null;

  return raw
    .replace(/^tool:/i, "")
    .replace(/^codexforge:/i, "")
    .trim()
    .toLowerCase();
}

function normalizeList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return Array.from(
    new Set(
      value
        .map((item) => {
          if (typeof item === "string") return normalizeToolName(item);

          const record = asRecord(item);
          return (
            normalizeToolName(record?.id) ??
            normalizeToolName(record?.name) ??
            normalizeToolName(record?.tool) ??
            normalizeToolName(record?.toolName) ??
            normalizeToolName(record?.label) ??
            null
          );
        })
        .filter((item): item is string => !!item)
    )
  );
}

function mergeUnique(...groups: unknown[]): string[] {
  return Array.from(
    new Set(
      groups
        .flatMap((group) => normalizeList(group))
        .map((item) => item.trim())
        .filter(Boolean)
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

function extractRuntimePolicy(input: CodexForgeToolPolicyInput): AnyRecord | null {
  return (
    asRecord(input.agentRuntimePolicy) ??
    asRecord(input.runtimePolicy) ??
    asRecord(asRecord(input.metadata)?.agentRuntimePolicy) ??
    asRecord(asRecord(input.metadata)?.runtimePolicy) ??
    null
  );
}

function extractAgentTeam(input: CodexForgeToolPolicyInput): AnyRecord | null {
  return (
    asRecord(input.agentTeam) ??
    asRecord(asRecord(input.metadata)?.agentTeam) ??
    null
  );
}

function extractApprovalState(input: CodexForgeToolPolicyInput): CodexForgeToolApprovalState {
  const direct =
    asRecord(input.approvalState) ??
    asRecord(input.approval) ??
    asRecord(asRecord(input.metadata)?.approvalState) ??
    asRecord(asRecord(input.metadata)?.approval) ??
    null;

  if (!direct) return {};

  return {
    approved: direct.approved === true || direct.status === "approved",
    approvalId: normalizeString(direct.approvalId) ?? normalizeString(direct.id),
    approvedAt:
      typeof direct.approvedAt === "string" || typeof direct.approvedAt === "number"
        ? direct.approvedAt
        : null,
    approvedBy:
      normalizeString(direct.approvedBy) ??
      normalizeString(direct.user) ??
      normalizeString(direct.actor),
    reason: normalizeString(direct.reason),
  };
}

function approvalSatisfied(value: CodexForgeToolApprovalState): boolean {
  return value.approved === true && !!value.approvalId;
}

function slugApprovalPart(value: string | null | undefined): string {
  const normalized = value?.trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
  return normalized && normalized.length > 0 ? normalized : "unknown";
}

function buildPendingApprovalId(args: {
  domain: string | null;
  mode: string;
  toolName: string;
}): string {
  return [
    "codexforge-approval",
    slugApprovalPart(args.domain ?? "general"),
    slugApprovalPart(args.mode),
    slugApprovalPart(args.toolName),
  ].join(":");
}

function extractDomain(input: CodexForgeToolPolicyInput, runtimePolicy: AnyRecord | null): string | null {
  return (
    normalizeString(input.domain) ??
    firstString(runtimePolicy, ["domain", "capabilityDomain", "capability"]) ??
    firstString(asRecord(input.metadata), ["domain", "capabilityDomain", "capability"])
  )?.toLowerCase() ?? null;
}

function extractPolicyTools(input: CodexForgeToolPolicyInput): {
  approvalRequiredTools: string[];
  blockedTools: string[];
} {
  const runtimePolicy = extractRuntimePolicy(input);
  const agentTeam = extractAgentTeam(input);
  const domain = extractDomain(input, runtimePolicy);

  const approvalRequiredTools = mergeUnique(
    runtimePolicy?.approvalRequiredTools,
    runtimePolicy?.approval_required_tools,
    runtimePolicy?.approvalTools,
    runtimePolicy?.approval_tools,
    runtimePolicy?.requiresApproval,
    runtimePolicy?.requires_approval,
    runtimePolicy?.approvalGatedTools,
    runtimePolicy?.approval_gated_tools,
    agentTeam?.approvalTools,
    agentTeam?.approval_tools,
    agentTeam?.approvalRequiredTools,
    agentTeam?.approval_required_tools,
    domain ? DOMAIN_APPROVAL_REQUIRED[domain] : [],
    MUTATION_OR_EXTERNAL_TOOLS
  );

  const blockedTools = mergeUnique(
    runtimePolicy?.blockedTools,
    runtimePolicy?.blocked_tools,
    runtimePolicy?.forbiddenTools,
    runtimePolicy?.forbidden_tools,
    runtimePolicy?.disallowedTools,
    runtimePolicy?.disallowed_tools,
    agentTeam?.blockedTools,
    agentTeam?.blocked_tools,
    agentTeam?.forbiddenTools,
    agentTeam?.forbidden_tools,
    domain ? DOMAIN_BLOCKED[domain] : [],
    ALWAYS_BLOCKED_TOOLS
  );

  return {
    approvalRequiredTools,
    blockedTools,
  };
}

export function buildCodexForgeToolPolicyInputFromBody(body: unknown): CodexForgeToolPolicyInput {
  const record = asRecord(body) ?? {};

  const metadata =
    asRecord(record.metadata) ??
    asRecord(record.meta) ??
    asRecord(record.context) ??
    {};

  const metadataRecord = asRecord(metadata) ?? {};
  const contextRecord = asRecord(record.context) ?? {};
  const actionRecord = asRecord(record.action) ?? {};
  const requestRecord = asRecord(record.request) ?? {};

  return {
    toolName:
      record.toolName ??
      record.tool ??
      record.name ??
      record.id ??
      requestRecord.toolName ??
      requestRecord.tool ??
      actionRecord.toolName ??
      actionRecord.tool,
    mode:
      normalizeString(record.mode) ??
      normalizeString(record.phase) ??
      normalizeString(actionRecord.mode) ??
      normalizeString(requestRecord.mode),
    domain:
      record.domain ??
      metadataRecord.domain ??
      contextRecord.domain,
    runtimePolicy:
      record.runtimePolicy ??
      record.agentRuntimePolicy ??
      metadataRecord.runtimePolicy ??
      metadataRecord.agentRuntimePolicy,
    agentRuntimePolicy:
      record.agentRuntimePolicy ??
      metadataRecord.agentRuntimePolicy,
    agentTeam:
      record.agentTeam ??
      metadataRecord.agentTeam ??
      contextRecord.agentTeam,
    approvalState:
      record.approvalState ??
      record.approval ??
      metadataRecord.approvalState ??
      metadataRecord.approval,
    approval:
      record.approval,
    metadata,
  };
}

export function evaluateCodexForgeToolPolicy(
  input: CodexForgeToolPolicyInput
): CodexForgeToolPolicyDecision {
  const normalizedToolName = normalizeToolName(input.toolName);
  const mode = normalizeString(input.mode) ?? "execute";
  const runtimePolicy = extractRuntimePolicy(input);
  const domain = extractDomain(input, runtimePolicy);
  const approval = extractApprovalState(input);
  const approvalOk = approvalSatisfied(approval);
  const { approvalRequiredTools, blockedTools } = extractPolicyTools(input);

  const readOnlyTools = [...READ_ONLY_TOOLS];
  const mutationTools = [...MUTATION_OR_EXTERNAL_TOOLS];

  if (!normalizedToolName) {
    return {
      allowed: false,
      status: 400,
      toolName: normalizeString(input.toolName),
      normalizedToolName: null,
      mode,
      domain,
      reason: "Tool execution blocked: request is missing a tool name.",
      requiresApproval: false,
      blocked: false,
      approvalSatisfied: false,
      approvalId: approval.approvalId ?? null,
      approvalState: approval,
      source: "missing-tool",
      approvalRequiredTools,
      blockedTools,
      readOnlyTools,
      mutationTools,
    };
  }

  if (blockedTools.includes(normalizedToolName)) {
    return {
      allowed: false,
      status: 403,
      toolName: normalizeString(input.toolName),
      normalizedToolName,
      mode,
      domain,
      reason: `Tool execution blocked by CodexForge runtime policy: ${normalizedToolName}.`,
      requiresApproval: false,
      blocked: true,
      approvalSatisfied: approvalOk,
      approvalId: approval.approvalId ?? null,
      approvalState: approval,
      source: "blocked",
      approvalRequiredTools,
      blockedTools,
      readOnlyTools,
      mutationTools,
    };
  }

  const requiresApproval =
    approvalRequiredTools.includes(normalizedToolName) ||
    (mutationTools.includes(normalizedToolName) && !readOnlyTools.includes(normalizedToolName));

  if (requiresApproval && !approvalOk) {
    return {
      allowed: false,
      status: 428,
      toolName: normalizeString(input.toolName),
      normalizedToolName,
      mode,
      domain,
      reason: `Tool execution requires explicit approval before running: ${normalizedToolName}.`,
      requiresApproval: true,
      blocked: false,
      approvalSatisfied: false,
      approvalId:
        approval.approvalId ??
        buildPendingApprovalId({
          domain,
          mode,
          toolName: normalizedToolName,
        }),
      approvalState: approval,
      source: "approval-required",
      approvalRequiredTools,
      blockedTools,
      readOnlyTools,
      mutationTools,
    };
  }

  return {
    allowed: true,
    status: 200,
    toolName: normalizeString(input.toolName),
    normalizedToolName,
    mode,
    domain,
    reason: readOnlyTools.includes(normalizedToolName)
      ? `Read-only tool allowed: ${normalizedToolName}.`
      : requiresApproval
        ? `Approval satisfied for tool: ${normalizedToolName}.`
        : `Tool allowed by CodexForge runtime policy: ${normalizedToolName}.`,
    requiresApproval,
    blocked: false,
    approvalSatisfied: approvalOk,
    approvalId:
      approval.approvalId ??
      (requiresApproval
        ? buildPendingApprovalId({
            domain,
            mode,
            toolName: normalizedToolName,
          })
        : null),
    approvalState: approval,
    source: "allowed",
    approvalRequiredTools,
    blockedTools,
    readOnlyTools,
    mutationTools,
  };
}

export function assertCodexForgeToolAllowed(
  input: CodexForgeToolPolicyInput
): CodexForgeToolPolicyDecision {
  const decision = evaluateCodexForgeToolPolicy(input);

  if (!decision.allowed) {
    throw new CodexForgeToolPolicyError(decision);
  }

  return decision;
}

export function evaluateCodexForgeToolPolicyFromBody(
  body: unknown
): CodexForgeToolPolicyDecision {
  return evaluateCodexForgeToolPolicy(buildCodexForgeToolPolicyInputFromBody(body));
}

export function isCodexForgeToolPolicyError(
  error: unknown
): error is CodexForgeToolPolicyError {
  return error instanceof CodexForgeToolPolicyError;
}

export function getCodexForgeToolPolicyHttpStatus(error: unknown): number {
  return isCodexForgeToolPolicyError(error) ? error.decision.status : 500;
}

export function getCodexForgeToolPolicyErrorPayload(error: unknown): AnyRecord {
  if (!isCodexForgeToolPolicyError(error)) {
    return {
      ok: false,
      error: "Unknown tool policy failure.",
    };
  }

  return {
    ok: false,
    error: error.decision.reason,
    toolPolicy: error.decision,
  };
}

export function summarizeCodexForgeToolPolicy(
  policy: CodexForgeAgentRuntimePolicy | null | undefined
): string[] {
  if (!policy) return [];

  return [
    policy.domain ? `Domain: ${policy.domain}` : null,
    policy.primaryLabel ? `Primary: ${policy.primaryLabel}` : null,
    policy.approvalRequiredTools.length > 0
      ? `Approval-required tools: ${policy.approvalRequiredTools.join(", ")}`
      : null,
    policy.blockedTools.length > 0
      ? `Blocked tools: ${policy.blockedTools.join(", ")}`
      : null,
  ].filter((item): item is string => !!item);
}
