import React from "react";
import {
  getDomainLabel,
  getNextAction,
  getStructuredPlan,
} from "@/lib/codexforge/chat/client-renderers";
import type {
  CodexForgePlanDomain,
  CodexForgeStructuredReply,
} from "@/lib/codexforge/types";
import {
  hasItems,
  ListSection,
  normalizeString,
  normalizeStringArray,
  ParagraphBlock,
} from "@/lib/codexforge/chat/components/structured-basic-sections";

function PlanSection({
  goal,
  domain,
  steps,
  tags,
  files,
  commands,
  risks,
  notes,
}: {
  goal?: string | null;
  domain?: CodexForgePlanDomain | null;
  steps?: string[] | null;
  tags?: string[] | null;
  files?: string[] | null;
  commands?: string[] | null;
  risks?: string[] | null;
  notes?: string[] | null;
}) {
  const domainLabel = getDomainLabel(domain ?? null);

  return (
    <>
      <ParagraphBlock title="Goal" text={goal} />
      {domainLabel ? <ParagraphBlock title="Domain" text={domainLabel} /> : null}

      <ListSection title="Execution steps" items={steps} ordered />
      <ListSection title="Tags" items={tags} />
      <ListSection title="Files to touch" items={files} />
      <ListSection title="Commands to run" items={commands} />
      <ListSection title="Risks" items={risks} />
      <ListSection title="Notes" items={notes} />
    </>
  );
}

export function PlanSections({
  structured,
}: {
  structured: CodexForgeStructuredReply;
}) {
  const plan = getStructuredPlan(structured);
  const nextAction = getNextAction(plan);
  const tags = normalizeStringArray(plan?.tags ?? structured.tags);

  if (plan) {
    return (
      <PlanSection
        goal={plan.goal}
        domain={plan.domain}
        steps={plan.steps}
        tags={tags}
        files={plan.files}
        commands={plan.commands}
        risks={plan.risks}
        notes={plan.notes}
      />
    );
  }

  const hasFallbackGoal = !!normalizeString(structured.goal);

  if (!hasFallbackGoal) return null;

  return (
    <>
      <ParagraphBlock title="Goal" text={structured.goal} />
      {structured.summary ? (
        <ParagraphBlock title="Summary" text={structured.summary} />
      ) : null}
      {hasItems(tags) ? <ListSection title="Tags" items={tags} /> : null}
      {nextAction ? <ParagraphBlock title="Next action" text={nextAction} /> : null}
      <ListSection title="Next steps" items={structured.nextSteps} ordered />
    </>
  );
}
