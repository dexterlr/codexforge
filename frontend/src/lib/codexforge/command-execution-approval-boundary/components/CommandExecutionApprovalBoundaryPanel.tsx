"use client";

import { UniversalExecutionReviewSurface } from "@/lib/codexforge/universal-execution-review-kit";
import { buildCommandExecutionApprovalBoundaryModel } from "@/lib/codexforge/command-execution-approval-boundary";

const COMMAND_EXECUTION_APPROVAL_BOUNDARY_MARKERS = [
  "Command execution approval boundary",
  "Command execution approval boundary does not run commands",
  "Command execution requires explicit operator approval",
  "Unsafe commands stay blocked",
  "Command risk groups",
  "Working-directory checklist",
] as const;

export function CommandExecutionApprovalBoundaryPanel() {
  const model = buildCommandExecutionApprovalBoundaryModel();

  return (
    <UniversalExecutionReviewSurface
      phase="Phase 620"
      title="Command execution approval boundary"
      subtitle="Command execution approval boundary reviews commands without running them. Command execution requires explicit operator approval, and unsafe commands stay blocked."
      primaryLabel="Review command boundary"
      anchor="command-execution-approval-boundary"
      plainEnglishTitle="Plain-English command execution approval boundary"
      plainEnglishCopy="This page enables future builds, tests, packaging, game server validation, local runtime starts, and repair commands only after a bounded command implementation exists. It does not run shell, git, test, build, smoke, package, server, or local bridge commands from UI."
      language={model.language}
      markers={[...COMMAND_EXECUTION_APPROVAL_BOUNDARY_MARKERS]}
      links={[
        { href: "/local-runtime-approval-boundary", label: "Local runtime boundary" },
        { href: "/recovery-retry-boundary", label: "Recovery boundary" },
        { href: "/universal-execution-boundary-inventory", label: "Universal inventory" },
      ]}
      packets={model.commandExecutionApprovalBoundaries}
      advancedSummary="Advanced command execution approval boundary details"
      advancedDetails={model.advancedDetails}
      advancedCopy="advanced command execution approval boundary details collapsed/secondary. This route does not run commands, start servers, call local bridge endpoints, or persist command approval decisions."
      dataScope="command-execution-approval-boundary buildCommandExecutionApprovalBoundaryStableKey CommandExecutionApprovalBoundaryPanel"
    />
  );
}
