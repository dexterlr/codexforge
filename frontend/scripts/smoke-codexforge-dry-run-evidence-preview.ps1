param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-guarded-apply-run-dry-run-smoke-helper.ps1") `
  -SmokeName "Phase 1345 Dry-Run Evidence Preview" `
  -ScriptFile "smoke-codexforge-dry-run-evidence-preview.ps1" `
  -Domain "src\lib\codexforge\dry-run-evidence-preview" `
  -Route "src\app\dry-run-evidence-preview" `
  -MainPanel "GuardedApplyRunDryRunRoutePanel" `
  -CommandLabel "Go to Dry-Run Evidence Preview" `
  -RouteHref "/dry-run-evidence-preview" `
  -Markers @("Dry-run evidence preview", "Dry-run evidence preview does not persist evidence", "Dry-run evidence preview requires explicit operator approval", "Evidence preview shows diff command stdout stderr exit code approval timestamp redaction operator audit and queue references without capturing runtime evidence", "Denied dry-run evidence paths remain blocked", "Dry-run evidence checklist")
