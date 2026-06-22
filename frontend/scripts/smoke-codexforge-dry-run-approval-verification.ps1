param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-guarded-apply-run-dry-run-smoke-helper.ps1") `
  -SmokeName "Phase 1344 Dry-Run Approval Verification" `
  -ScriptFile "smoke-codexforge-dry-run-approval-verification.ps1" `
  -Domain "src\lib\codexforge\dry-run-approval-verification" `
  -Route "src\app\dry-run-approval-verification" `
  -MainPanel "GuardedApplyRunDryRunRoutePanel" `
  -CommandLabel "Go to Dry-Run Approval Verification" `
  -RouteHref "/dry-run-approval-verification" `
  -Markers @("Dry-run approval verification", "Dry-run approval verification does not persist approvals or release execution", "Dry-run approval verification requires explicit human approval", "Approval verification previews operator identity approval scope expiry denied paths replay protection and backend authorization checks", "Denied dry-run approval verification paths remain blocked", "Dry-run approval verification checklist")
