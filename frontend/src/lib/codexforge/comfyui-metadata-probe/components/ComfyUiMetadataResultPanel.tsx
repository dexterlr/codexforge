"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ComfyUiMetadataResult } from "../comfyui-metadata-probe-types";

export function ComfyUiMetadataResultPanel({ result }: { result: ComfyUiMetadataResult }) {
  return (
    <PreviewFoundationCard title="Metadata result fields">
      <PreviewFoundationCopy>Result source: {result.resultSource}</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={[
          `base URL status: ${result.baseUrlStatus}`,
          `local-only status: ${result.localOnlyStatus}`,
          `server reachable: ${result.serverReachable}`,
          `version: ${result.version}`,
          `system stats: ${result.systemStats}`,
          `queue stats: ${result.queueStats}`,
          `node list: ${result.nodeList}`,
          `model list: ${result.modelList}`,
          "no prompt sent",
          "no workflow submitted",
          "no queue mutation",
        ]}
      />
    </PreviewFoundationCard>
  );
}
