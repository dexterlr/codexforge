param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-guarded-apply-run-dry-run-smoke-helper.ps1") `
  -SmokeName "Phase 1351 Dry-Run Go No-Go Review" `
  -ScriptFile "smoke-codexforge-dry-run-go-no-go-review.ps1" `
  -Domain "src\lib\codexforge\dry-run-go-no-go-review" `
  -Route "src\app\dry-run-go-no-go-review" `
  -MainPanel "GuardedApplyRunDryRunRoutePanel" `
  -CommandLabel "Go to Dry-Run Go No Go Review" `
  -RouteHref "/dry-run-go-no-go-review" `
  -Markers @("Dry-run go no-go review", "Dry-run go no-go review does not release execution", "Dry-run go no-go review requires explicit operator approval", "Go no-go review reports dry-run-only status blocked apply run and required future backend guards", "Denied dry-run go no-go paths remain blocked", "Dry-run go no-go checklist")
