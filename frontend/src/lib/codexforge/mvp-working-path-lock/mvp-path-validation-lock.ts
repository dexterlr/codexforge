import type { MvpPathValidationLock } from "./mvp-working-path-types";

export function buildMvpPathValidationLock(): MvpPathValidationLock {
  return { manualValidation: true, approvedRunnerBoundaryOnly: true, commands: ["npm run build", "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-mvp-working-path-lock.ps1", "npm run smoke:codexforge:server", "git diff --check"] };
}
