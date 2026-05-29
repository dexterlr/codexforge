import type { ReleaseSmokeHandoff, ReleaseSmokeSuite } from "./release-smoke-pack-types";

export function buildReleaseSmokeHandoff(suite: ReleaseSmokeSuite): ReleaseSmokeHandoff {
  return { title: "Release smoke checklist", copyChecklist: suite.commands.map((command) => command.command).join("\n"), noUnsafeExecution: true };
}
