"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { WorkflowSafetyCheck } from "../comfyui-workflow-safety-types";

export function WorkflowSafetyCheckPanel({ checks }: { checks: WorkflowSafetyCheck[] }) {
  return (
    <PreviewFoundationCard title="Safety checks">
      <PreviewFoundationCopy>Each check uses plain English so a beginner can see what needs review before any render is allowed.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={checks.map((check) => `${check.label}: ${check.plainEnglish}`)} />
    </PreviewFoundationCard>
  );
}
