param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-local-model-bridge-smoke-helper.ps1") `
  -SmokeName "Phase 1568 Local Capability Fit Preview" `
  -ScriptFile "smoke-codexforge-local-capability-fit-preview.ps1" `
  -Domain "src\lib\codexforge\local-capability-fit-preview" `
  -Route "src\app\local-capability-fit-preview" `
  -MainPanel "LocalModelBridgeRoutePanel" `
  -CommandLabel "Go to Local Capability Fit Preview" `
  -RouteHref "/local-capability-fit-preview" `
  -Markers @("Local capability fit preview", "Local capability fit preview does not call models", "Local capability fit preview requires explicit operator approval", "Local capability fit preview checks coding reasoning research creative game server data docs and domain-fit capability before local model use", "Denied local capability fit paths remain blocked", "Local capability fit checklist")
