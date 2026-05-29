import type { ReleaseSmokeSuite, ReleaseSmokeSummary } from "./release-smoke-pack-types";

export function buildReleaseSmokeSummary(suite: ReleaseSmokeSuite): ReleaseSmokeSummary {
  return { title: "Release smoke pack", commandCount: suite.commands.length, nextAction: "Copy smoke checklist", safety: "copy commands only, no auto-run, output capture manual" };
}
