param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-guarded-apply-run-dry-run-smoke-helper.ps1") `
  -SmokeName "Phase 1342 Dry-Run Path Guard Evaluation" `
  -ScriptFile "smoke-codexforge-dry-run-path-guard-evaluation.ps1" `
  -Domain "src\lib\codexforge\dry-run-path-guard-evaluation" `
  -Route "src\app\dry-run-path-guard-evaluation" `
  -MainPanel "GuardedApplyRunDryRunRoutePanel" `
  -CommandLabel "Go to Dry-Run Path Guard Evaluation" `
  -RouteHref "/dry-run-path-guard-evaluation" `
  -Markers @("Dry-run path guard evaluation", "Dry-run path guard evaluation does not browse arbitrary files or write files", "Dry-run path guard evaluation requires explicit operator approval", "Path guard evaluation previews workspace root containment traversal denial generated file policy binary guard and rollback requirements", "Denied dry-run path guard paths remain blocked", "Dry-run path guard checklist")
