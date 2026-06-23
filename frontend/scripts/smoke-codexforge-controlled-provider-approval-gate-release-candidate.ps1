param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-provider-approval-gate-smoke-helper.ps1") `
  -SmokeName "Phase 1561 Controlled Provider Approval Gate Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-provider-approval-gate-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-provider-approval-gate-release-candidate" `
  -Route "src\app\controlled-provider-approval-gate-release-candidate" `
  -MainPanel "ProviderApprovalGateRoutePanel" `
  -CommandLabel "Go to Controlled Provider Approval Gate Release Candidate" `
  -RouteHref "/controlled-provider-approval-gate-release-candidate" `
  -Markers @("Controlled provider approval gate release candidate", "Controlled provider approval gate release candidate does not call models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials or write browser storage from the frontend", "Controlled provider approval gate release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned provider approval without frontend provider calls", "Denied controlled provider approval gate paths remain blocked", "Controlled provider approval gate release checklist")
