param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-provider-approval-gate-smoke-helper.ps1") `
  -SmokeName "Phase 1558 Provider Result Capture Preview" `
  -ScriptFile "smoke-codexforge-provider-result-capture-preview.ps1" `
  -Domain "src\lib\codexforge\provider-result-capture-preview" `
  -Route "src\app\provider-result-capture-preview" `
  -MainPanel "ProviderApprovalGateRoutePanel" `
  -CommandLabel "Go to Provider Result Capture Preview" `
  -RouteHref "/provider-result-capture-preview" `
  -Markers @("Provider result capture preview", "Provider result capture preview does not persist results from the UI", "Provider result capture preview requires backend-owned result capture", "Provider result capture preview shows success blocked denied failed timeout canceled fallback manual-review redacted and operator-accepted provider outcomes", "Denied provider result paths remain blocked", "Provider result capture checklist")
