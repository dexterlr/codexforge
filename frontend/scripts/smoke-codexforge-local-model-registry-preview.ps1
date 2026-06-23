param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-local-model-bridge-smoke-helper.ps1") `
  -SmokeName "Phase 1564 Local Model Registry Preview" `
  -ScriptFile "smoke-codexforge-local-model-registry-preview.ps1" `
  -Domain "src\lib\codexforge\local-model-registry-preview" `
  -Route "src\app\local-model-registry-preview" `
  -MainPanel "LocalModelBridgeRoutePanel" `
  -CommandLabel "Go to Local Model Registry Preview" `
  -RouteHref "/local-model-registry-preview" `
  -Markers @("Local model registry preview", "Local model registry preview does not query local runtimes", "Local model registry preview requires explicit operator approval", "Local model registry preview shows model name capability class privacy class context window tool support status and denied registry states", "Denied local model registry paths remain blocked", "Local model registry checklist")
