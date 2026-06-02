"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { SubmitBoundarySafety } from "../comfyui-submit-boundary-types";

export function SubmitBoundarySafetyPanel({ safety }: { safety: SubmitBoundarySafety }) {
  return (
    <PreviewFoundationCard title="Submit safety">
      <PreviewFoundationCopy>Actual submit is still blocked unless a later approved local bridge or tool boundary exists.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={safety.guarantees} />
      <PreviewFoundationCopy>Blocked: {safety.blocked.join(", ")}.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
