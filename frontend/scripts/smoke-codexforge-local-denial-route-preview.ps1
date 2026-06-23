param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-local-model-bridge-smoke-helper.ps1") `
  -SmokeName "Phase 1572 Local Denial Route Preview" `
  -ScriptFile "smoke-codexforge-local-denial-route-preview.ps1" `
  -Domain "src\lib\codexforge\local-denial-route-preview" `
  -Route "src\app\local-denial-route-preview" `
  -MainPanel "LocalModelBridgeRoutePanel" `
  -CommandLabel "Go to Local Denial Route Preview" `
  -RouteHref "/local-denial-route-preview" `
  -Markers @("Local denial route preview", "Local denial route preview does not mutate workflow state", "Local denial route preview requires explicit operator approval", "Local denial route preview blocks unavailable runtime unsupported capability secret payload stale approval localhost disallowed port denied timeout risk and prompt denied states", "Denied local denial route paths remain blocked", "Local denial route checklist")
