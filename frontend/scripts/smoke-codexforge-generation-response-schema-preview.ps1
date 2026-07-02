param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2048 Generation Response Schema Preview"
  ScriptFile = "smoke-codexforge-generation-response-schema-preview.ps1"
  Domain = "src\lib\codexforge\generation-response-schema-preview"
  Route = "src\app\generation-response-schema-preview"
  CommandLabel = "Go to Generation Response Schema Preview"
  RouteHref = "/generation-response-schema-preview"
  Markers = @("Generation response schema preview", "Generation response schema preview does not receive live provider responses persist outputs create artifacts or write files from the UI", "Generation response schema preview requires backend-owned response schema validation moderation review artifact policy and audit trail", "Generation response schema preview shows simulated response id simulated output summary simulated moderation status simulated artifact pointer placeholder simulated denied frontend output persistence", "Denied generation response schema paths remain blocked", "Generation response schema checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-contract-smoke-helper.ps1") @params

