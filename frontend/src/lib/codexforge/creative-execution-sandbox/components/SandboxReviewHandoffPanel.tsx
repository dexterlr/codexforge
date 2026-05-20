"use client";

import type { SandboxReviewHandoff } from "../creative-execution-sandbox-types";
import { SandboxList, SandboxPanel, codeStyle, pill, titleStyle } from "./shared";

export function SandboxReviewHandoffPanel({ handoff }: { handoff: SandboxReviewHandoff }) {
  return (
    <SandboxPanel marker="SandboxReviewHandoffPanel renders">
      <h2 style={titleStyle}>Review Handoff</h2>
      <span style={pill}>sandbox only</span>
      <SandboxList title="Safety notes" items={handoff.safetyNotes} />
      <SandboxList title="Fake artifacts" items={handoff.fakeArtifactList} />
      <SandboxList title="Verification" items={handoff.verificationSummary} />
      <div style={codeStyle}>{handoff.executorReviewPrompt}</div>
      <SandboxList title="Handoff summary" items={handoff.summary} />
    </SandboxPanel>
  );
}
