param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-provider-approval-gate-smoke-helper.ps1") `
  -SmokeName "Phase 1550 Data Boundary Approval Preview" `
  -ScriptFile "smoke-codexforge-data-boundary-approval-preview.ps1" `
  -Domain "src\lib\codexforge\data-boundary-approval-preview" `
  -Route "src\app\data-boundary-approval-preview" `
  -MainPanel "ProviderApprovalGateRoutePanel" `
  -CommandLabel "Go to Data Boundary Approval Preview" `
  -RouteHref "/data-boundary-approval-preview" `
  -Markers @("Data boundary approval preview", "Data boundary approval preview does not transmit data", "Data boundary approval preview requires explicit operator approval", "Data boundary approval preview shows local-only project-sensitive provider-allowed connector-blocked secret-blocked and manually-redacted data boundaries", "Denied data boundary paths remain blocked", "Data boundary approval checklist")
