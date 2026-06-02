"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoExportPackage } from "../video-export-handoff-types";

export function VideoExportPackagePanel({ exportPackage }: { exportPackage: VideoExportPackage }) {
  return (
    <PreviewFoundationCard title="Export package">
      <PreviewFoundationCopy>{exportPackage.title}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{`Final candidate: ${exportPackage.finalCandidateId}`}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={["handoff-only", "no file write", "no upload", "no export executed"]} />
    </PreviewFoundationCard>
  );
}
