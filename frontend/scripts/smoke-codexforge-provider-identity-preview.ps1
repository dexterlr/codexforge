param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-provider-approval-gate-smoke-helper.ps1") `
  -SmokeName "Phase 1548 Provider Identity Preview" `
  -ScriptFile "smoke-codexforge-provider-identity-preview.ps1" `
  -Domain "src\lib\codexforge\provider-identity-preview" `
  -Route "src\app\provider-identity-preview" `
  -MainPanel "ProviderApprovalGateRoutePanel" `
  -CommandLabel "Go to Provider Identity Preview" `
  -RouteHref "/provider-identity-preview" `
  -Markers @("Provider identity preview", "Provider identity preview does not query providers", "Provider identity preview requires explicit operator approval", "Provider identity preview shows provider name model class local private paid pro specialist connector status and denied identities", "Denied provider identity paths remain blocked", "Provider identity checklist")
