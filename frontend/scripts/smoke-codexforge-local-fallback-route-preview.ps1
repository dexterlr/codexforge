param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-local-model-bridge-smoke-helper.ps1") `
  -SmokeName "Phase 1571 Local Fallback Route Preview" `
  -ScriptFile "smoke-codexforge-local-fallback-route-preview.ps1" `
  -Domain "src\lib\codexforge\local-fallback-route-preview" `
  -Route "src\app\local-fallback-route-preview" `
  -MainPanel "LocalModelBridgeRoutePanel" `
  -CommandLabel "Go to Local Fallback Route Preview" `
  -RouteHref "/local-fallback-route-preview" `
  -Markers @("Local fallback route preview", "Local fallback route preview does not call fallback models", "Local fallback route preview requires explicit operator approval", "Local fallback route preview shows smaller local fallback safer local fallback manual review provider approval handoff and blocked fallback states", "Denied local fallback route paths remain blocked", "Local fallback route checklist")
