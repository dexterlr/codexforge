"use client";

import type { RealCreativeReadinessInput, RealCreativeReadinessValidation } from "../real-creative-readiness-types";
import { summarizeRealCreativeReadinessInput } from "../readiness-input";
import { ReadinessList, ReadinessMetric, ReadinessPanel, codeStyle } from "./shared";

export function ReadinessInputPanel({
  input,
  validation,
}: {
  input: RealCreativeReadinessInput;
  validation: RealCreativeReadinessValidation;
}) {
  return (
    <ReadinessPanel title="Readiness Input" marker="ReadinessInputPanel renders audit-only supports blender comfyui unreal ffmpeg local-renderer artifact-capture manual-export mixed-pipeline unknown">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))", gap: 8, minWidth: 0 }}>
        <ReadinessMetric label="Audit" value={input.auditId} />
        <ReadinessMetric label="Target" value={input.targetExecutorKind} />
        <ReadinessMetric label="Level" value={input.targetReadinessLevel} />
        <ReadinessMetric label="Valid" value={String(validation.valid)} />
      </div>
      <div style={codeStyle}>
        <span>{input.noExecutionGuarantee}</span>
        <span>{input.latestMessageAuthorityReminder}</span>
      </div>
      <ReadinessList title="Input summary" items={summarizeRealCreativeReadinessInput(input).slice(0, 6)} />
      {validation.blockedReasons.length > 0 ? <ReadinessList title="Input blockers" items={validation.blockedReasons} /> : null}
      {validation.warnings.length > 0 ? <ReadinessList title="Input warnings" items={validation.warnings} /> : null}
    </ReadinessPanel>
  );
}
