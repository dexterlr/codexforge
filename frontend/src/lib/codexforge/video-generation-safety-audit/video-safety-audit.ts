import type { VideoSafetyAudit } from "./video-generation-safety-types";
import { buildDefaultVideoSafetyBoundaries } from "./video-safety-boundary";
import { buildDefaultVideoSafetyChecks } from "./video-safety-check";
import { buildVideoSafetyDecision } from "./video-safety-decision";
import { buildVideoSafetyHandoff } from "./video-safety-handoff";
import { buildVideoSafetyRisk } from "./video-safety-risk";

export function buildVideoSafetyAudit(input: Partial<VideoSafetyAudit> = {}): VideoSafetyAudit {
  const checks = input.checks ?? buildDefaultVideoSafetyChecks();
  const decision = input.decision ?? buildVideoSafetyDecision(checks);
  const audit: VideoSafetyAudit = {
    id: input.id ?? "video-generation-safety-audit",
    title: input.title ?? "Video generation safety audit",
    checks,
    risks:
      input.risks ??
      [
        buildVideoSafetyRisk(),
        buildVideoSafetyRisk({
          id: "video-safety-risk-private-assets",
          label: "Private prompt or asset exposure",
          severity: "high",
          mitigation: "Review privacy before any future cloud handoff and keep local-first by default.",
          plainEnglish: "Nothing is uploaded by this audit, and future cloud use must pass privacy review.",
        }),
      ],
    boundaries: input.boundaries ?? buildDefaultVideoSafetyBoundaries(),
    decision,
    handoff: input.handoff ?? buildVideoSafetyHandoff(decision),
    summary: "",
  };
  return { ...audit, summary: `Audit status ${audit.decision.status}; ${audit.checks.length} safety check(s) reviewed.` };
}

export function buildDefaultVideoSafetyAudit(): VideoSafetyAudit {
  return buildVideoSafetyAudit();
}
