param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-guarded-apply-run-dry-run-smoke-helper.ps1") `
  -SmokeName "Phase 1349 Dry-Run Queue Preview" `
  -ScriptFile "smoke-codexforge-dry-run-queue-preview.ps1" `
  -Domain "src\lib\codexforge\dry-run-queue-preview" `
  -Route "src\app\dry-run-queue-preview" `
  -MainPanel "GuardedApplyRunDryRunRoutePanel" `
  -CommandLabel "Go to Dry-Run Queue Preview" `
  -RouteHref "/dry-run-queue-preview" `
  -Markers @("Dry-run queue preview", "Dry-run queue preview does not create queue jobs", "Dry-run queue preview requires explicit operator approval", "Queue preview shows preview blocked approved queued applying running completed failed timeout canceled recovered and manual-review states without persistence", "Denied dry-run queue paths remain blocked", "Dry-run queue checklist")
