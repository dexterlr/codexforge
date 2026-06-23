param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-provider-approval-gate-smoke-helper.ps1") `
  -SmokeName "Phase 1560 First Provider Approval Gate Candidate" `
  -ScriptFile "smoke-codexforge-first-provider-approval-gate-candidate.ps1" `
  -Domain "src\lib\codexforge\first-provider-approval-gate-candidate" `
  -Route "src\app\first-provider-approval-gate-candidate" `
  -MainPanel "ProviderApprovalGateRoutePanel" `
  -CommandLabel "Go to First Provider Approval Gate Candidate" `
  -RouteHref "/first-provider-approval-gate-candidate" `
  -Markers @("First provider approval gate candidate", "First provider approval gate candidate does not call providers from the UI", "First provider approval gate candidate requires explicit operator approval", "Candidate combines provider request identity prompt data boundary privacy cost capability expiry replay fallback denial evidence result and audit", "Denied first provider approval gate paths remain blocked", "First provider approval gate checklist")
