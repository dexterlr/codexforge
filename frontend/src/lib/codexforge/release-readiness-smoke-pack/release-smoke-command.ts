import type { ReleaseSmokeCommand } from "./release-smoke-pack-types";

export function buildReleaseSmokeStableKey(...parts: Array<string | null | undefined>): string {
  return parts.filter(Boolean).join(":").toLowerCase().replace(/[^a-z0-9/_:.-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 96) || "release-smoke";
}

export function buildReleaseSmokeCommand(command = "npm run build", purpose = "Build the app manually."): ReleaseSmokeCommand {
  return { id: buildReleaseSmokeStableKey(command), command, purpose, copyOnly: true };
}
