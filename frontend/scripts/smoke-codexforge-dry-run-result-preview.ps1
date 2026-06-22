param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-guarded-apply-run-dry-run-smoke-helper.ps1") `
  -SmokeName "Phase 1346 Dry-Run Result Preview" `
  -ScriptFile "smoke-codexforge-dry-run-result-preview.ps1" `
  -Domain "src\lib\codexforge\dry-run-result-preview" `
  -Route "src\app\dry-run-result-preview" `
  -MainPanel "GuardedApplyRunDryRunRoutePanel" `
  -CommandLabel "Go to Dry-Run Result Preview" `
  -RouteHref "/dry-run-result-preview" `
  -Markers @("Dry-run result preview", "Dry-run result preview does not persist results", "Dry-run result preview requires explicit operator approval", "Result preview shows success denied blocked failed timeout canceled needs-review manual-review retryable and recovered states without claiming execution happened", "Denied dry-run result paths remain blocked", "Dry-run result checklist")
