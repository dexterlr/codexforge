"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { SubmitBoundaryPolicy } from "../comfyui-submit-boundary-types";

export function SubmitBoundaryPolicyPanel({ policy }: { policy: SubmitBoundaryPolicy }) {
  return (
    <PreviewFoundationCard title="Submit policy">
      <PreviewFoundationCopy>All requirements must remain true before any future local submit executor can even be considered.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={policy.requirements} />
      <PreviewFoundationCopy>{policy.failures.length > 0 ? `Blocked: ${policy.failures.join(" ")}` : "Policy requirements are prepared."}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
