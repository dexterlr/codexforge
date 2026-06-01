"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ComfyUiJobApprovalCheck } from "../comfyui-job-package-types";

export function ComfyUiJobApprovalCheckPanel({ checks }: { checks: ComfyUiJobApprovalCheck[] }) {
  return (
    <PreviewFoundationCard title="Readiness checks">
      <PreviewFoundationCopy>Every package has a visible approval posture before any future submit is allowed.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={checks.map((check) => `${check.label}: ${check.plainEnglish}`)} />
    </PreviewFoundationCard>
  );
}
