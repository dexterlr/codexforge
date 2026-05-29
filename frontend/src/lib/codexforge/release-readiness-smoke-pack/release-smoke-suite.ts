import type { ReleaseSmokeSuite } from "./release-smoke-pack-types";
import { buildReleaseSmokeCommand } from "./release-smoke-command";

export function buildReleaseSmokeSuite(): ReleaseSmokeSuite {
  return { title: "Release smoke pack", noAutoRun: true, commands: [
    buildReleaseSmokeCommand("npm run build", "Build before release."),
    buildReleaseSmokeCommand("powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-coding-flow-live-manual-trial.ps1", "Manual trial smoke."),
    buildReleaseSmokeCommand("powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-mvp-working-path-lock.ps1", "MVP path smoke."),
    buildReleaseSmokeCommand("powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-release-readiness-smoke-pack.ps1", "Release smoke pack smoke."),
    buildReleaseSmokeCommand("powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-guarded-apply-mvp.ps1", "Guarded apply smoke."),
    buildReleaseSmokeCommand("powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-validation-result-capture-mvp.ps1", "Validation capture smoke."),
    buildReleaseSmokeCommand("npm run smoke:codexforge:server", "Full server smoke."),
    buildReleaseSmokeCommand("git diff --check", "Whitespace safety."),
    buildReleaseSmokeCommand("git status --short", "Worktree summary."),
    buildReleaseSmokeCommand("git diff --stat", "Change size summary."),
  ] };
}
