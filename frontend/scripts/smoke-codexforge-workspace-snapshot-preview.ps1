param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-apply-run-transaction-smoke-helper.ps1") `
  -SmokeName "Phase 1485 Workspace Snapshot Preview" `
  -ScriptFile "smoke-codexforge-workspace-snapshot-preview.ps1" `
  -Domain "src\lib\codexforge\workspace-snapshot-preview" `
  -Route "src\app\workspace-snapshot-preview" `
  -MainPanel "ApplyRunTransactionRoutePanel" `
  -CommandLabel "Go to Workspace Snapshot Preview" `
  -RouteHref "/workspace-snapshot-preview" `
  -Markers @("Workspace snapshot preview", "Workspace snapshot preview does not create snapshots from the UI", "Workspace snapshot preview requires explicit operator approval", "Workspace snapshot preview shows snapshot requirement touched files rollback readiness dirty workspace risk and manual review needs", "Denied workspace snapshot paths remain blocked", "Workspace snapshot checklist")
