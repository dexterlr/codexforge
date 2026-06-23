param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-provider-approval-gate-smoke-helper.ps1") `
  -SmokeName "Phase 1551 Privacy Class Approval Preview" `
  -ScriptFile "smoke-codexforge-privacy-class-approval-preview.ps1" `
  -Domain "src\lib\codexforge\privacy-class-approval-preview" `
  -Route "src\app\privacy-class-approval-preview" `
  -MainPanel "ProviderApprovalGateRoutePanel" `
  -CommandLabel "Go to Privacy Class Approval Preview" `
  -RouteHref "/privacy-class-approval-preview" `
  -Markers @("Privacy class approval preview", "Privacy class approval preview does not send private content to providers", "Privacy class approval preview requires explicit operator approval", "Privacy class approval preview shows local-only private project-sensitive provider-allowed public-safe and blocked privacy classes", "Denied privacy class approval paths remain blocked", "Privacy class approval checklist")
