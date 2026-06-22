param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-trial-hardening-smoke-helper.ps1") `
  -SmokeName "Phase 1373 Approval Expiry Failure Handling" `
  -ScriptFile "smoke-codexforge-approval-expiry-failure-handling.ps1" `
  -Domain "src\lib\codexforge\approval-expiry-failure-handling" `
  -Route "src\app\approval-expiry-failure-handling" `
  -MainPanel "RealTrialHardeningRoutePanel" `
  -CommandLabel "Go to Approval Expiry Failure Handling" `
  -RouteHref "/approval-expiry-failure-handling" `
  -Markers @("Approval expiry failure handling", "Approval expiry failure handling does not persist approvals", "Approval expiry failure handling requires explicit human re-approval", "Approval expiry failure handling blocks stale expired mismatched replayed and scope-invalid approval tickets", "Expired approval recovery remains blocked", "Approval expiry failure checklist")
