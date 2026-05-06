import type { CodexForgeStructuredReply } from "@/lib/codexforge/types";

type AnyRecord = Record<string, unknown>;

type AgentTeamInfluence = {
  domain: string | null;
  primaryLabel: string | null;
  supportLabels: string[];
  reviewLabels: string[];
  approvalTools: string[];
  blockedTools: string[];
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
            normalizeString(record?.label) ??
            normalizeString(record?.name) ??
            normalizeString(record?.role) ??
            normalizeString(record?.id) ??
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

function roleLabel(value: unknown): string | null {
  if (typeof value === "string") return normalizeString(value);

  const record = asRecord(value);
  return firstString(record, ["label", "name", "role", "id", "title"]);
}

function roleLabels(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return Array.from(
    new Set(
      value
        .map((item) => roleLabel(item))
        .filter((item): item is string => !!item)
    )
  );
}

function mergeUnique(...groups: Array<unknown>): string[] {
  return Array.from(
    new Set(
      groups
        .flatMap((group) => normalizeStringArray(group))
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );
}

function hasSection(sections: unknown, title: string): boolean {
  if (!Array.isArray(sections)) return false;

  return sections.some((section) => {
    const record = asRecord(section);
    return normalizeString(record?.title)?.toLowerCase() === title.toLowerCase();
  });
}

function extractAgentTeamInfluence(
  structured: CodexForgeStructuredReply,
  explicitAgentTeam?: unknown
): AgentTeamInfluence | null {
  const structuredRecord = structured as unknown as AnyRecord;
  const source =
    asRecord(explicitAgentTeam) ??
    asRecord(structuredRecord.agentTeam) ??
    asRecord(structuredRecord.agent_team);

  if (!source) return null;

  const primarySource =
    source.primary ??
    source.primaryRole ??
    source.primaryAgent ??
    source.lead ??
    source.owner;

  const primaryLabel =
    roleLabel(primarySource) ??
    firstString(source, ["primaryLabel", "primary", "primaryRole", "primaryAgent"]);

  const supportLabels = Array.from(
    new Set([
      ...roleLabels(source.support),
      ...roleLabels(source.supportRoles),
      ...roleLabels(source.supportAgents),
      ...normalizeStringArray(source.supportLabels),
    ])
  );

  const reviewLabels = Array.from(
    new Set([
      ...roleLabels(source.review),
      ...roleLabels(source.reviewRoles),
      ...roleLabels(source.reviewAgents),
      ...normalizeStringArray(source.reviewLabels),
    ])
  );

  const approvalTools = mergeUnique(source.approvalTools, source.approval_tools);
  const blockedTools = mergeUnique(source.blockedTools, source.blocked_tools);

  const domain =
    firstString(source, ["domain", "capabilityDomain", "capability"]) ??
    firstString(asRecord(primarySource), ["domain"]);

  const hasInfluence =
    !!domain ||
    !!primaryLabel ||
    supportLabels.length > 0 ||
    reviewLabels.length > 0 ||
    approvalTools.length > 0 ||
    blockedTools.length > 0;

  if (!hasInfluence) return null;

  return {
    domain,
    primaryLabel,
    supportLabels,
    reviewLabels,
    approvalTools,
    blockedTools,
  };
}

function buildInfluenceNotes(team: AgentTeamInfluence): string[] {
  const notes: string[] = [];

  if (team.primaryLabel) {
    notes.push(
      `Primary agent role: ${team.primaryLabel}. Bias the plan toward that role's execution standards, deliverables, and review lens.`
    );
  }

  if (team.supportLabels.length > 0) {
    notes.push(
      `Support roles: ${team.supportLabels.join(", ")}. Use these roles to cover specialist gaps before recommending changes.`
    );
  }

  if (team.reviewLabels.length > 0) {
    notes.push(
      `Review gate: ${team.reviewLabels.join(", ")} should pressure-test risk, quality, and approval readiness before action.`
    );
  }

  if (team.approvalTools.length > 0) {
    notes.push(
      `Approval-gated tools: ${team.approvalTools.join(", ")}. Treat these as explicit approval points, not automatic actions.`
    );
  }

  if (team.blockedTools.length > 0) {
    notes.push(
      `Blocked tools: ${team.blockedTools.join(", ")}. Do not propose these as executable actions.`
    );
  }

  return notes;
}

function buildInfluenceRisks(team: AgentTeamInfluence): string[] {
  const risks: string[] = [];

  if (team.blockedTools.length > 0) {
    risks.push(
      `Blocked capability risk: the selected agent team forbids ${team.blockedTools.join(", ")} for this task.`
    );
  }

  if (team.approvalTools.length > 0) {
    risks.push(
      `Approval boundary risk: ${team.approvalTools.join(", ")} require a human approval checkpoint before execution.`
    );
  }

  if (team.reviewLabels.length > 0) {
    risks.push(
      `Quality gate risk: route final recommendations through ${team.reviewLabels.join(", ")} before irreversible changes.`
    );
  }

  return risks;
}

function buildInfluenceSections(team: AgentTeamInfluence): Array<AnyRecord> {
  const roleItems = [
    team.primaryLabel ? `Primary: ${team.primaryLabel}` : null,
    team.domain ? `Domain: ${team.domain}` : null,
    team.supportLabels.length > 0
      ? `Support: ${team.supportLabels.join(", ")}`
      : null,
    team.reviewLabels.length > 0
      ? `Review: ${team.reviewLabels.join(", ")}`
      : null,
  ].filter((item): item is string => !!item);

  const safetyItems = [
    team.approvalTools.length > 0
      ? `Approval tools: ${team.approvalTools.join(", ")}`
      : null,
    team.blockedTools.length > 0
      ? `Blocked tools: ${team.blockedTools.join(", ")}`
      : null,
  ].filter((item): item is string => !!item);

  return [
    roleItems.length > 0
      ? {
          title: "Agent-directed planning",
          items: roleItems,
        }
      : null,
    safetyItems.length > 0
      ? {
          title: "Agent safety and approval gates",
          items: safetyItems,
        }
      : null,
  ].filter((item): item is AnyRecord => !!item);
}

export function applyAgentTeamEngineInfluence(
  structured: CodexForgeStructuredReply,
  explicitAgentTeam?: unknown
): CodexForgeStructuredReply {
  const team = extractAgentTeamInfluence(structured, explicitAgentTeam);
  if (!team) return structured;

  const structuredRecord = structured as unknown as AnyRecord;
  const currentPlan = asRecord(structuredRecord.plan) ?? {};
  const notes = buildInfluenceNotes(team);
  const risks = buildInfluenceRisks(team);
  const existingSections = Array.isArray(structuredRecord.sections)
    ? structuredRecord.sections
    : [];

  const nextSections = [...existingSections];

  for (const section of buildInfluenceSections(team)) {
    const title = normalizeString(section.title);
    if (title && !hasSection(nextSections, title)) {
      nextSections.push(section);
    }
  }

  const nextPlan: AnyRecord = {
    ...currentPlan,
    domain: currentPlan.domain ?? team.domain ?? structuredRecord.domain ?? undefined,
    notes: mergeUnique(currentPlan.notes, notes),
    risks: mergeUnique(currentPlan.risks, risks),
    tags: mergeUnique(
      currentPlan.tags,
      structuredRecord.tags,
      team.domain ? [`agent-team:${team.domain}`] : []
    ),
  };

  if (!normalizeString(nextPlan.goal) && normalizeString(structuredRecord.goal)) {
    nextPlan.goal = structuredRecord.goal;
  }

  return {
    ...structured,
    plan: nextPlan,
    sections: nextSections as CodexForgeStructuredReply["sections"],
  } as CodexForgeStructuredReply;
}
