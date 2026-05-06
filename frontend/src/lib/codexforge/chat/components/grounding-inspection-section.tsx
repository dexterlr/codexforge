import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";
import type {
  CodexForgeStructuredReply,
  CodexForgeStructuredSection,
  CodexForgeStructuredTool,
} from "@/lib/codexforge/types";

type PrimaryGroundingEvidence = {
  file?: string;
  editPoint?: string;
  confidence?: string;
  tool?: string;
  why?: string;
};

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return Array.from(
    new Set(
      value
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );
}

function plural(value: number, singular: string, pluralLabel?: string): string {
  return `${value} ${value === 1 ? singular : pluralLabel ?? `${singular}s`}`;
}

function normalizeTitleKey(value: string): string {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

function isGroundingSection(section: CodexForgeStructuredSection): boolean {
  const title = normalizeTitleKey(section.title);

  return (
    title === "best edit target" ||
    title === "next action" ||
    title === "grounded recommendation" ||
    title === "recommended next action" ||
    title === "tool audit" ||
    title.startsWith("auto inspection:") ||
    title.startsWith("follow-up inspection:")
  );
}

export function getGroundingSections(
  sections?: CodexForgeStructuredSection[] | null
): CodexForgeStructuredSection[] {
  if (!Array.isArray(sections)) return [];
  return sections.filter(isGroundingSection);
}

export function getNonGroundingSections(
  sections?: CodexForgeStructuredSection[] | null
): CodexForgeStructuredSection[] {
  if (!Array.isArray(sections)) return [];
  return sections.filter((section) => !isGroundingSection(section));
}

function getReadyToolCount(tools?: CodexForgeStructuredTool[] | null): number {
  if (!Array.isArray(tools)) return 0;
  return tools.filter((tool) => tool.availability === "ready").length;
}

function getToolAvailabilityLabel(tool: CodexForgeStructuredTool): string {
  if (tool.availability === "ready") return "Ready";
  if (tool.availability === "stub") return "Stub";
  return "Unavailable";
}

function getToolAvailabilityStyle(
  tool: CodexForgeStructuredTool
): React.CSSProperties {
  if (tool.availability === "ready") {
    return styles.toolBadgeReady;
  }

  if (tool.availability === "stub") {
    return styles.toolBadgeStub;
  }

  return styles.toolBadgeUnavailable;
}

function getSectionKey(section: CodexForgeStructuredSection, index: number): string {
  return `${section.title}-${index}`;
}

function getEvidenceValue(items: string[], prefixes: string[]): string | undefined {
  const match = items.find((item) =>
    prefixes.some((prefix) => item.toLowerCase().startsWith(prefix.toLowerCase()))
  );

  if (!match) return undefined;

  const colonIndex = match.indexOf(":");
  if (colonIndex < 0) return match.trim();

  return match.slice(colonIndex + 1).trim();
}

function getPrimaryGroundingEvidence(
  sections?: CodexForgeStructuredSection[] | null
): PrimaryGroundingEvidence | null {
  const groundingSections = getGroundingSections(sections);
  if (groundingSections.length === 0) return null;

  const primarySection =
    groundingSections.find((section) => {
      const title = normalizeTitleKey(section.title);
      return (
        title === "grounded recommendation" ||
        title.startsWith("auto inspection:") ||
        title.startsWith("follow-up inspection:")
      );
    }) ?? groundingSections[0];

  const items = normalizeStringArray(primarySection.items);

  const file =
    getEvidenceValue(items, [
      "Best next edit point",
      "Best edit target",
      "Matched file",
      "Best grounded file",
      "Primary file",
    ]) ?? undefined;

  const editPoint =
    getEvidenceValue(items, [
      "Matched function",
      "Best grounded function",
      "Change target",
      "Primary file edit point",
      "Primary file function",
    ]) ?? undefined;

  const confidence =
    getEvidenceValue(items, [
      "Confidence",
      "Grounding confidence",
      "Primary file confidence",
    ]) ?? undefined;

  const explicitTool = getEvidenceValue(items, ["Tool used"]) ?? undefined;
  const toolFromTitle =
    primarySection.title.includes(":")
      ? primarySection.title.split(":").slice(1).join(":").trim()
      : undefined;

  const why = items.find((item) => item.toLowerCase().startsWith("why this"));

  const evidence: PrimaryGroundingEvidence = {
    file,
    editPoint,
    confidence,
    tool: explicitTool ?? toolFromTitle,
    why,
  };

  return Object.values(evidence).some(Boolean) ? evidence : null;
}

function StatChip({ children }: { children: React.ReactNode }) {
  return <span style={statChip}>{children}</span>;
}

function StructuredCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={styles.structuredCard}>
      <div style={styles.structuredTitle}>{title}</div>
      {children}
    </section>
  );
}

function BulletList({
  items,
  ordered = false,
}: {
  items: string[];
  ordered?: boolean;
}) {
  const normalized = normalizeStringArray(items);
  if (normalized.length === 0) return null;

  return (
    <div style={styles.structuredList}>
      {normalized.map((item, idx) => (
        <div key={`${idx}-${item}`} style={styles.structuredListItem}>
          <span style={styles.structuredBullet}>
            {ordered ? `${idx + 1}.` : "-"}
          </span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function EvidenceTile({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  if (value === undefined || value === null || value === "") return null;

  return (
    <div style={toolEvidenceEvidenceCard}>
      <div style={toolEvidenceLabel}>{label}</div>
      <div style={toolEvidenceValue}>{value}</div>
    </div>
  );
}

export function ToolEvidenceSummary({
  structured,
}: {
  structured?: CodexForgeStructuredReply | null;
}) {
  const groundingSections = getGroundingSections(structured?.sections);
  const tools = Array.isArray(structured?.tools) ? structured.tools : [];
  const readyToolCount = getReadyToolCount(tools);
  const unavailableToolCount = tools.filter(
    (tool) => tool.availability !== "ready"
  ).length;
  const primaryEvidence = getPrimaryGroundingEvidence(structured?.sections);

  const hasEvidence =
    groundingSections.length > 0 || tools.length > 0 || !!primaryEvidence;
  if (!hasEvidence) return null;

  return (
    <div style={toolEvidenceSummary}>
      <div style={toolEvidenceHeader}>
        <div>
          <div style={toolEvidenceTitle}>Grounding evidence</div>
          <div style={toolEvidenceText}>
            Primary file, edit point, tool audit, and inspection confidence used
            to shape this response.
          </div>
        </div>

        <div style={toolEvidenceStats}>
          {groundingSections.length > 0 ? (
            <StatChip>{plural(groundingSections.length, "grounding section")}</StatChip>
          ) : null}

          {tools.length > 0 ? <StatChip>{plural(tools.length, "tool")}</StatChip> : null}

          {readyToolCount > 0 ? (
            <StatChip>{plural(readyToolCount, "ready tool")}</StatChip>
          ) : null}

          {unavailableToolCount > 0 ? (
            <StatChip>{plural(unavailableToolCount, "limited tool")}</StatChip>
          ) : null}
        </div>
      </div>

      {primaryEvidence ? (
        <div style={toolEvidenceEvidenceGrid}>
          <EvidenceTile label="Primary grounded file" value={primaryEvidence.file} />
          <EvidenceTile label="Likely edit point" value={primaryEvidence.editPoint} />
          <EvidenceTile label="Tool used" value={primaryEvidence.tool} />
          <EvidenceTile label="Confidence" value={primaryEvidence.confidence} />
          <EvidenceTile label="Why this matters" value={primaryEvidence.why} />
        </div>
      ) : null}
    </div>
  );
}

export function GroundingSection({
  structured,
}: {
  structured?: CodexForgeStructuredReply | null;
}) {
  const groundingSections = getGroundingSections(structured?.sections);
  const tools = Array.isArray(structured?.tools) ? structured.tools : [];
  const readyToolCount = getReadyToolCount(tools);

  if (groundingSections.length === 0 && tools.length === 0) return null;

  return (
    <StructuredCard title="Grounding and inspection">
      <div style={groundingHero}>
        <div style={groundingHeroText}>
          Repository-aware evidence, inspection notes, and tool availability used
          to shape this response.
        </div>

        <div style={approvalHeroStats}>
          {groundingSections.length > 0 ? (
            <StatChip>{plural(groundingSections.length, "grounding section")}</StatChip>
          ) : null}
          {tools.length > 0 ? <StatChip>{plural(tools.length, "tool")}</StatChip> : null}
          {readyToolCount > 0 ? (
            <StatChip>{plural(readyToolCount, "ready tool")}</StatChip>
          ) : null}
        </div>
      </div>

      {groundingSections.length > 0 ? (
        <div style={groundingSectionGrid}>
          {groundingSections.map((section, index) => (
            <div key={getSectionKey(section, index)} style={groundingSectionCard}>
              <div style={groundingSectionTitle}>{section.title}</div>
              <BulletList items={normalizeStringArray(section.items)} />
            </div>
          ))}
        </div>
      ) : null}

      {tools.length > 0 ? (
        <div style={{ marginTop: groundingSections.length > 0 ? 12 : 0 }}>
          <ToolsSection tools={tools} compact />
        </div>
      ) : null}
    </StructuredCard>
  );
}

export function ToolsSection({
  tools,
  compact = false,
}: {
  tools?: CodexForgeStructuredTool[] | null;
  compact?: boolean;
}) {
  if (!tools || tools.length === 0) return null;

  const content = (
    <div style={compact ? compactToolGrid : styles.toolGrid}>
      {tools.map((tool) => (
        <div key={tool.name} style={compact ? compactToolCard : styles.toolCard}>
          <div style={styles.toolHeader}>
            <div style={styles.toolName}>{tool.name}</div>
            <span
              style={{
                ...styles.toolBadgeBase,
                ...getToolAvailabilityStyle(tool),
              }}
            >
              {getToolAvailabilityLabel(tool)}
            </span>
          </div>

          <div style={styles.toolDescription}>{tool.description}</div>
        </div>
      ))}
    </div>
  );

  if (compact) return content;

  return <StructuredCard title="Recommended tools">{content}</StructuredCard>;
}

const statChip: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  fontSize: 11,
  fontWeight: 800,
};

const approvalHeroStats: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  alignItems: "flex-start",
};

const groundingHero: React.CSSProperties = {
  display: "grid",
  gap: 10,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(99,102,241,0.18)",
  background: "rgba(99,102,241,0.08)",
  marginBottom: 12,
};

const groundingHeroText: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.55,
  opacity: 0.88,
};

const groundingSectionGrid: React.CSSProperties = {
  display: "grid",
  gap: 10,
};

const groundingSectionCard: React.CSSProperties = {
  display: "grid",
  gap: 8,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.035)",
};

const groundingSectionTitle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: 0.2,
};

const compactToolGrid: React.CSSProperties = {
  display: "grid",
  gap: 8,
};

const compactToolCard: React.CSSProperties = {
  display: "grid",
  gap: 6,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.035)",
};

const toolEvidenceSummary: React.CSSProperties = {
  padding: 10,
  borderRadius: 14,
  border: "1px solid rgba(99,102,241,0.16)",
  background: "rgba(99,102,241,0.07)",
};

const toolEvidenceHeader: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 12,
  flexWrap: "wrap",
};

const toolEvidenceTitle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: 0.35,
  textTransform: "uppercase",
};

const toolEvidenceText: React.CSSProperties = {
  marginTop: 4,
  fontSize: 12,
  lineHeight: 1.45,
  opacity: 0.78,
};

const toolEvidenceStats: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  alignItems: "flex-start",
};

const toolEvidenceEvidenceGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 8,
  marginTop: 10,
};

const toolEvidenceEvidenceCard: React.CSSProperties = {
  display: "grid",
  gap: 4,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.035)",
};

const toolEvidenceLabel: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0.35,
  textTransform: "uppercase",
  opacity: 0.72,
};

const toolEvidenceValue: React.CSSProperties = {
  fontSize: 12,
  lineHeight: 1.45,
  fontWeight: 750,
  wordBreak: "break-word",
};
