param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-local-model-bridge-smoke-helper.ps1") `
  -SmokeName "Phase 1565 Local Endpoint Boundary Preview" `
  -ScriptFile "smoke-codexforge-local-endpoint-boundary-preview.ps1" `
  -Domain "src\lib\codexforge\local-endpoint-boundary-preview" `
  -Route "src\app\local-endpoint-boundary-preview" `
  -MainPanel "LocalModelBridgeRoutePanel" `
  -CommandLabel "Go to Local Endpoint Boundary Preview" `
  -RouteHref "/local-endpoint-boundary-preview" `
  -Markers @("Local endpoint boundary preview", "Local endpoint boundary preview does not probe localhost or bind ports", "Local endpoint boundary preview requires explicit operator approval", "Local endpoint boundary preview shows localhost-only backend-owned endpoint allowlist port policy timeout boundary and denied endpoint states", "Denied local endpoint paths remain blocked", "Local endpoint boundary checklist")
