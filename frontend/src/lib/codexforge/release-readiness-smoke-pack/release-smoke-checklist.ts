import type { ReleaseSmokeChecklist, ReleaseSmokeSuite } from "./release-smoke-pack-types";

export function buildReleaseSmokeChecklist(suite: ReleaseSmokeSuite): ReleaseSmokeChecklist {
  return { manual: true, items: suite.commands.map((command) => `Copy and run manually: ${command.command}`) };
}
