import type { VideoSafetyAudit, VideoSafetySummary } from "./video-generation-safety-types";
import { buildDefaultVideoSafetyAudit } from "./video-safety-audit";

export function buildVideoSafetySummary(
  audit: VideoSafetyAudit = buildDefaultVideoSafetyAudit()
): VideoSafetySummary {
  const summary: VideoSafetySummary = {
    audit,
    passCount: audit.checks.filter((check) => check.status === "pass").length,
    warnCount: audit.checks.filter((check) => check.status === "warn").length,
    blockCount: audit.checks.filter((check) => check.status === "block").length,
    summary: "",
  };
  return { ...summary, summary: summarizeVideoSafetyAudit(audit) };
}

export function summarizeVideoSafetyAudit(audit: VideoSafetyAudit): string {
  const warnCount = audit.checks.filter((check) => check.status === "warn").length;
  const blockCount = audit.checks.filter((check) => check.status === "block").length;
  return `${audit.title}: ${audit.decision.status}, ${warnCount} warning(s), ${blockCount} blocker(s), no real generation started.`;
}
