param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-guarded-apply-run-dry-run-smoke-helper.ps1") `
  -SmokeName "Phase 1350 Dry-Run Denied Path Matrix" `
  -ScriptFile "smoke-codexforge-dry-run-denied-path-matrix.ps1" `
  -Domain "src\lib\codexforge\dry-run-denied-path-matrix" `
  -Route "src\app\dry-run-denied-path-matrix" `
  -MainPanel "GuardedApplyRunDryRunRoutePanel" `
  -CommandLabel "Go to Dry-Run Denied Path Matrix" `
  -RouteHref "/dry-run-denied-path-matrix" `
  -Markers @("Dry-run denied path matrix", "Dry-run denied path matrix does not mutate workflow state", "Dry-run denied path matrix requires explicit operator approval", "Denied path matrix lists blocked prompts models providers connectors files commands git tests builds smokes runtimes adapters persistence export recovery queues deploy install scaffold secrets memory promotion and backend execution", "Denied dry-run paths remain blocked", "Dry-run denied path checklist")
