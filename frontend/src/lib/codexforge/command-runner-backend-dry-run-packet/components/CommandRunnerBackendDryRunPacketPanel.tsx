"use client";

import { ControlledBuilderReviewPhasePanel } from "@/lib/codexforge/controlled-builder-dry-run-review-kit";
import { buildCommandRunnerBackendDryRunPacketModel } from "@/lib/codexforge/command-runner-backend-dry-run-packet";

export function CommandRunnerBackendDryRunPacketPanel() {
  return <ControlledBuilderReviewPhasePanel model={buildCommandRunnerBackendDryRunPacketModel()} />;
}
