param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-guarded-apply-run-dry-run-smoke-helper.ps1") `
  -SmokeName "Phase 1338 Guarded Apply Run Dry-Run Boundary" `
  -ScriptFile "smoke-codexforge-guarded-apply-run-dry-run-boundary.ps1" `
  -Domain "src\lib\codexforge\guarded-apply-run-dry-run-boundary" `
  -Route "src\app\guarded-apply-run-dry-run-boundary" `
  -MainPanel "GuardedApplyRunDryRunRoutePanel" `
  -CommandLabel "Go to Guarded Apply Run Dry-Run Boundary" `
  -RouteHref "/guarded-apply-run-dry-run-boundary" `
  -Markers @("Guarded apply run dry-run boundary", "Guarded apply run dry-run boundary does not execute apply or run", "Guarded apply run dry-run requires explicit operator approval", "Dry-run boundary separates frontend preview from future backend-owned guarded apply and command run", "Denied guarded apply run dry-run paths remain blocked", "Guarded apply run dry-run checklist")
