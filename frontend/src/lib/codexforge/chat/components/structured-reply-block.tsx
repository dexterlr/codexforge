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

type StructuredReplyBlockProps = {
  structured?: CodexForgeStructuredReply | null;
};

/* ================= HELPERS ================= */

/* ================= SMALL UI PIECES ================= */

/* ================= CORE SECTIONS ================= */

/* ================= MAIN ================= */

export function StructuredReplyBlock({
  structured,
}: StructuredReplyBlockProps) {
  if (!structured) return null;

  return (
    <div style={styles.structuredWrap}>
      <HeroSection structured={structured} />
      <AgentTeamSection structured={structured} />

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
