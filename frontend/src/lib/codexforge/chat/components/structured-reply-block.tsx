import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";
import { AgentTeamSection } from "@/lib/codexforge/chat/components/agent-team-section";
import {
  ListSection,
} from "@/lib/codexforge/chat/components/structured-basic-sections";
import { HeroSection } from "@/lib/codexforge/chat/components/structured-reply-hero";
import { PlanSections } from "@/lib/codexforge/chat/components/structured-plan-sections";
import {
  DiffPreviewSection,
  DiffSection,
  getApprovalCount,
  getDiffPreviewCount,
  getPendingApprovalCount,
} from "@/lib/codexforge/chat/components/diff-approval-sections";
import {
  ExecutionSection,
  SnapshotSection,
} from "@/lib/codexforge/chat/components/execution-snapshot-sections";
import { StructuredSections } from "@/lib/codexforge/chat/components/structured-sections";
import { ToolPolicyDecisionPanel } from "@/lib/codexforge/chat/components/tool-policy-decision-panel";
import {
  getGroundingSections,
  getNonGroundingSections,
  GroundingSection,
  ToolEvidenceSummary,
  ToolsSection,
} from "@/lib/codexforge/chat/components/grounding-inspection-section";
import type {
  CodexForgeStructuredReply,
} from "@/lib/codexforge/types";
import type { CodexForgeVisibleToolPolicy } from "@/lib/codexforge/tools/tool-policy-visibility";
import type { CodexForgeToolApprovalReplayRequest } from "@/lib/codexforge/tools/tool-approval-retry";
import type { CodexForgeToolExecutionEvent } from "@/lib/codexforge/chat/tool-execution-events";

type StructuredReplyBlockProps = {
  structured?: CodexForgeStructuredReply | null;
  onToolExecutionResult?: (event: CodexForgeToolExecutionEvent) => void;
};

/* ================= HELPERS ================= */

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isVisibleToolPolicy(value: unknown): value is CodexForgeVisibleToolPolicy {
  if (!isRecord(value)) return false;

  return (
    typeof value.title === "string" &&
    typeof value.tone === "string" &&
    typeof value.badge === "string" &&
    typeof value.summary === "string" &&
    typeof value.nextAction === "string" &&
    isStringArray(value.bullets) &&
    isStringArray(value.audit)
  );
}

function isToolApprovalReplayRequest(
  value: unknown
): value is CodexForgeToolApprovalReplayRequest {
  if (!isRecord(value)) return false;

  return (
    typeof value.toolName === "string" &&
    (!("mode" in value) ||
      value.mode === "execute" ||
      value.mode === "plan" ||
      value.mode === "preview") &&
    (!("input" in value) || isRecord(value.input)) &&
    (!("context" in value) || isRecord(value.context))
  );
}

function getStructuredToolPolicyReplayRequest(
  structured?: CodexForgeStructuredReply | null
): CodexForgeToolApprovalReplayRequest | null {
  if (!structured) return null;

  const directReplayRequest = (structured as { toolPolicyReplayRequest?: unknown })
    .toolPolicyReplayRequest;
  if (isToolApprovalReplayRequest(directReplayRequest)) return directReplayRequest;

  const metadataValue = (structured as { metadata?: unknown }).metadata;
  const metadata = isRecord(metadataValue) ? metadataValue : null;
  const metadataReplayRequest = metadata?.toolPolicyReplayRequest;

  return isToolApprovalReplayRequest(metadataReplayRequest)
    ? metadataReplayRequest
    : null;
}

function getStructuredToolPolicySummary(
  structured?: CodexForgeStructuredReply | null
): CodexForgeVisibleToolPolicy | null {
  if (!structured) return null;

  const directSummary = (structured as { toolPolicySummary?: unknown }).toolPolicySummary;
  if (isVisibleToolPolicy(directSummary)) return directSummary;

  const metadataValue = (structured as { metadata?: unknown }).metadata;
  const metadata = isRecord(metadataValue) ? metadataValue : null;
  const metadataSummary = metadata?.toolPolicySummary;

  return isVisibleToolPolicy(metadataSummary) ? metadataSummary : null;
}

/* ================= SMALL UI PIECES ================= */

/* ================= CORE SECTIONS ================= */

/* ================= MAIN ================= */

export function StructuredReplyBlock({ structured, onToolExecutionResult }: StructuredReplyBlockProps) {
  if (!structured) return null;

  return (
    <div style={styles.structuredWrap}>
      <HeroSection structured={structured} />
      <AgentTeamSection structured={structured} />
      <ToolPolicyDecisionPanel
        summary={getStructuredToolPolicySummary(structured)}
        replayRequest={getStructuredToolPolicyReplayRequest(structured)}
              onToolExecutionResult={onToolExecutionResult}
      />

      <ExecutionSection structured={structured} />
      <SnapshotSection structured={structured} />
      <DiffPreviewSection structured={structured} />
      <DiffSection structured={structured} />

      <PlanSections structured={structured} />

      <ListSection title="Context" items={structured.context} />
      <ListSection title="What I understood" items={structured.understanding} />

      <GroundingSection structured={structured} />
      <ToolEvidenceSummary structured={structured} />

      {getGroundingSections(structured.sections).length === 0 ? (
        <ToolsSection tools={structured.tools} />
      ) : null}

      <ListSection title="Status" items={structured.status} />
      <StructuredSections sections={getNonGroundingSections(structured.sections)} />
    </div>
  );
}
/* ================= EXTRA STYLES ================= */
