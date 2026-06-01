"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoFailureDiagnosis } from "../video-failure-recovery-types";

export function VideoFailureDiagnosisPanel({ diagnoses }: { diagnoses: VideoFailureDiagnosis[] }) {
  return (
    <PreviewFoundationCard title="Diagnosis">
      <PreviewFoundationCopy>Diagnosis is a best guess for review, not proof and not an automatic fix.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={diagnoses.map((diagnosis) => `${diagnosis.confidence}: ${diagnosis.likelyCause}`)} />
    </PreviewFoundationCard>
  );
}
