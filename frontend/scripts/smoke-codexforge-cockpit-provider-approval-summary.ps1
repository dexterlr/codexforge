param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-provider-approval-gate-smoke-helper.ps1") `
  -SmokeName "Phase 1559 Cockpit Provider Approval Summary" `
  -ScriptFile "smoke-codexforge-cockpit-provider-approval-summary.ps1" `
  -Domain "src\lib\codexforge\cockpit-provider-approval-summary" `
  -Route "src\app\cockpit-provider-approval-summary" `
  -MainPanel "ProviderApprovalGateRoutePanel" `
  -CommandLabel "Go to Cockpit Provider Approval Summary" `
  -RouteHref "/cockpit-provider-approval-summary" `
  -Markers @("Cockpit provider approval summary", "Cockpit provider approval summary keeps the cockpit as the normal user surface", "Cockpit provider approval summary does not call providers models or connectors from the cockpit", "Cockpit provider approval summary shows provider model prompt data boundary privacy cost capability expiry replay fallback denied evidence result and audit", "Phase pages remain dev test diagnostics only", "Cockpit provider approval checklist")
