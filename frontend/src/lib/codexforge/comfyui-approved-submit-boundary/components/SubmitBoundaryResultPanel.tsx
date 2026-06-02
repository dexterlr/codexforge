"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { SubmitBoundaryResult } from "../comfyui-submit-boundary-types";

export function SubmitBoundaryResultPanel({ result }: { result: SubmitBoundaryResult }) {
  return (
    <PreviewFoundationCard title="Submit result">
      <PreviewFoundationCopy>{result.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[result.status, `source: ${result.source}`]} />
    </PreviewFoundationCard>
  );
}
