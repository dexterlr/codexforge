param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-provider-approval-gate-smoke-helper.ps1") `
  -SmokeName "Phase 1547 Provider Request Packet" `
  -ScriptFile "smoke-codexforge-provider-request-packet.ps1" `
  -Domain "src\lib\codexforge\provider-request-packet" `
  -Route "src\app\provider-request-packet" `
  -MainPanel "ProviderApprovalGateRoutePanel" `
  -CommandLabel "Go to Provider Request Packet" `
  -RouteHref "/provider-request-packet" `
  -Markers @("Provider request packet", "Provider request packet does not send prompts", "Provider request packet requires explicit operator approval", "Provider request packet previews provider model prompt payload privacy class cost class data boundary capability justification and audit needs", "Denied provider request paths remain blocked", "Provider request packet checklist")
