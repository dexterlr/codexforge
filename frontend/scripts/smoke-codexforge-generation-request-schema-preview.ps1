param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2047 Generation Request Schema Preview"
  ScriptFile = "smoke-codexforge-generation-request-schema-preview.ps1"
  Domain = "src\lib\codexforge\generation-request-schema-preview"
  Route = "src\app\generation-request-schema-preview"
  CommandLabel = "Go to Generation Request Schema Preview"
  RouteHref = "/generation-request-schema-preview"
  Markers = @("Generation request schema preview", "Generation request schema preview does not create live requests call providers send prompts or persist request payloads from the UI", "Generation request schema preview requires backend-owned request schema validation prompt review approval capture and audit trail", "Generation request schema preview shows simulated request id simulated content type simulated input summary simulated safety flags simulated denied frontend request dispatch", "Denied generation request schema paths remain blocked", "Generation request schema checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-contract-smoke-helper.ps1") @params

