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
const fallbackDomainLabel = getDomainLabel(
    (structured.domain as CodexForgePlanDomain | null | undefined) ?? null
  );

  return (
    <div style={styles.structuredWrap}>
      <HeroSection structured={structured} />
      <AgentTeamSection structured={structured} />

      <ExecutionSection structured={structured} />
      <SnapshotSection structured={structured} />
      <DiffPreviewSection structured={structured} />
      <DiffSection structured={structured} />

      {plan ? (
        <PlanSection
          goal={plan.goal}
          steps={plan.steps}
          files={plan.files}
          commands={plan.commands}
          risks={plan.risks}
          notes={plan.notes}
          tags={plan.tags}
          domain={plan.domain}
          nextAction={nextAction}
        />
      ) : null}

      {hasFallbackGoal ? <ParagraphBlock title="Goal" text={structured.goal} /> : null}

      <ListSection title="Context" items={structured.context} />
      <ListSection title="What I understood" items={structured.understanding} />

      {!plan ? (
        <>
          <ListSection
            title="Domain"
            items={fallbackDomainLabel ? [fallbackDomainLabel] : []}
          />
          <ListSection title="Tags" items={tags} />
          <ListSection title="Files to check" items={structured.files} />
          <ListSection title="Commands to run" items={structured.commands} />
          <ListSection title="Risks" items={structured.risks} />
          <ListSection title="Next steps" items={structured.nextSteps} ordered />
        </>
      ) : null}      {getGroundingSections(structured.sections).length === 0 ? (
        <ToolsSection tools={structured.tools} />
      ) : null}
      <ListSection title="Status" items={structured.status} />
      <StructuredSections sections={getNonGroundingSections(structured.sections)} />
    </div>
  );
}

/* ================= EXTRA STYLES ================= */
