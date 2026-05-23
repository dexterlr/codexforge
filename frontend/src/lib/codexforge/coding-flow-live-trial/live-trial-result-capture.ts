import type { LiveTrialResultCapture, LiveTrialResultCaptureItem } from "./coding-flow-live-trial-types";

export function buildLiveTrialResultCaptureItem(input: LiveTrialResultCaptureItem): LiveTrialResultCaptureItem {
  return { ...input, copyOnly: true };
}

function item(label: string, instruction: string, status: LiveTrialResultCaptureItem["status"] = "unknown"): LiveTrialResultCaptureItem {
  return buildLiveTrialResultCaptureItem({ itemId: `capture-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, label, instruction, status, copyOnly: true });
}

export function buildLiveTrialResultCapture(): LiveTrialResultCapture {
  return {
    captureId: "coding-flow-live-trial-result-capture",
    title: "Result Capture Guide",
    items: [
      item("selected file", "Record category and selected path only after review."),
      item("change request", "Capture the exact requested wording or small UI label change."),
      item("preview summary", "Summarize files changed and diff size."),
      item("apply status", "Record whether apply was not requested, blocked, approved, or completed through the existing guarded boundary."),
      item("validation commands", "List commands copied and manually run."),
      item("validation result", "Mark passed, failed, blocked, abandoned, or unknown."),
      item("pass/fail summary", "Use capped output and route failure to closed loop."),
      item("run history record", "Prepare run history handoff manually."),
      item("handoff summary", "Copy the reviewed trial report."),
      item("next action", "Choose run history handoff, closed-loop triage, or finish."),
    ],
    persistenceBoundary: ["no auto-persistence", "no Brain auto-mutation", "no memory auto-promotion", "copyable/reviewed only"],
  };
}

export function summarizeLiveTrialResultCapture(capture = buildLiveTrialResultCapture()): string {
  return `${capture.items.length} capture items; ${capture.persistenceBoundary.join(", ")}.`;
}
