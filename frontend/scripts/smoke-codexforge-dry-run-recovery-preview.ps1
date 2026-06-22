param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-guarded-apply-run-dry-run-smoke-helper.ps1") `
  -SmokeName "Phase 1347 Dry-Run Recovery Preview" `
  -ScriptFile "smoke-codexforge-dry-run-recovery-preview.ps1" `
  -Domain "src\lib\codexforge\dry-run-recovery-preview" `
  -Route "src\app\dry-run-recovery-preview" `
  -MainPanel "GuardedApplyRunDryRunRoutePanel" `
  -CommandLabel "Go to Dry-Run Recovery Preview" `
  -RouteHref "/dry-run-recovery-preview" `
  -Markers @("Dry-run recovery preview", "Dry-run recovery preview does not execute recovery", "Dry-run recovery preview requires explicit operator approval", "Recovery preview shows rollback retry stop restore explain-failure manual-review safety-stop and partial-recovery options as non-executing preview actions", "Denied dry-run recovery paths remain blocked", "Dry-run recovery checklist")
