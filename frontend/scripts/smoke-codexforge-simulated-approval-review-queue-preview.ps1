param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-review-dashboard-smoke-helper.ps1") `
  -SmokeName "Phase 1791 Simulated Approval Review Queue Preview" `
  -ScriptFile "smoke-codexforge-simulated-approval-review-queue-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-approval-review-queue-preview" `
  -Route "src\app\simulated-approval-review-queue-preview" `
  -CommandLabel "Go to Simulated Approval Review Queue Preview" `
  -RouteHref "/simulated-approval-review-queue-preview" `
  -Markers @("Simulated approval review queue preview", "Simulated approval review queue preview does not persist approvals release locks dispatch workers or approve real execution from the UI", "Simulated approval review queue preview requires deterministic synthetic approval rows only", "Simulated approval review queue preview shows simulated approval packet simulated expiry simulated replay protection simulated approver placeholder simulated operator signoff requirement", "Denied simulated approval review queue paths remain blocked", "Simulated approval review queue checklist")
