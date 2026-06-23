param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-local-model-bridge-smoke-helper.ps1") `
  -SmokeName "Phase 1562 Local Model Bridge Boundary" `
  -ScriptFile "smoke-codexforge-local-model-bridge-boundary.ps1" `
  -Domain "src\lib\codexforge\local-model-bridge-boundary" `
  -Route "src\app\local-model-bridge-boundary" `
  -MainPanel "LocalModelBridgeRoutePanel" `
  -CommandLabel "Go to Local Model Bridge Boundary" `
  -RouteHref "/local-model-bridge-boundary" `
  -Markers @("Local model bridge boundary", "Local model bridge boundary does not call local models from the UI", "Local model bridge requires explicit operator approval before local model use", "Local model bridge prepares backend-owned private model routing without frontend model calls", "Denied local model bridge paths remain blocked", "Local model bridge checklist")
