"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { DryRunCheck } from "../comfyui-dry-run-types";

export function DryRunCheckPanel({ checks }: { checks: DryRunCheck[] }) {
  return (
    <PreviewFoundationCard title="Dry run checks">
      <PreviewFoundationCopy>Each check must be understood before a future submit boundary is reviewed.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={checks.map((check) => `${check.id}: ${check.status}`)} />
    </PreviewFoundationCard>
  );
}
