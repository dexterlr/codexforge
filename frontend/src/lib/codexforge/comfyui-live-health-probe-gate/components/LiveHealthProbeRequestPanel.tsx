"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { LiveHealthProbeRequest } from "../comfyui-live-health-gate-types";

export function LiveHealthProbeRequestPanel({ request }: { request: LiveHealthProbeRequest }) {
  return (
    <PreviewFoundationCard title="Future probe request">
      <PreviewFoundationCopy>Target: {request.baseUrl || "No local base URL supplied"}</PreviewFoundationCopy>
      <PreviewFoundationCopy>Approval posture: {request.approvalPosture}</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={[
          request.localOnlyBaseUrl ? "local-only base URL" : "local URL missing or blocked",
          "metadata-only intention",
          "no prompt payload",
          "no workflow payload",
          "no-auto-run guarantee",
        ]}
      />
    </PreviewFoundationCard>
  );
}
