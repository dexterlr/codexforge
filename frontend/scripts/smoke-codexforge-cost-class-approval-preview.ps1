param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-provider-approval-gate-smoke-helper.ps1") `
  -SmokeName "Phase 1552 Cost Class Approval Preview" `
  -ScriptFile "smoke-codexforge-cost-class-approval-preview.ps1" `
  -Domain "src\lib\codexforge\cost-class-approval-preview" `
  -Route "src\app\cost-class-approval-preview" `
  -MainPanel "ProviderApprovalGateRoutePanel" `
  -CommandLabel "Go to Cost Class Approval Preview" `
  -RouteHref "/cost-class-approval-preview" `
  -Markers @("Cost class approval preview", "Cost class approval preview does not spend tokens or call providers", "Cost class approval preview requires explicit operator approval", "Cost class approval preview shows free local low-cost paid pro specialist unknown and blocked cost classes", "Denied cost class approval paths remain blocked", "Cost class approval checklist")
