import type { ReleaseSmokeResultCapture } from "./release-smoke-pack-types";

export function buildReleaseSmokeResultCapture(): ReleaseSmokeResultCapture {
  return { fields: ["command", "exit code", "output excerpt", "pass/fail", "operator note"], outputManual: true, noFabricatedSuccess: true };
}
