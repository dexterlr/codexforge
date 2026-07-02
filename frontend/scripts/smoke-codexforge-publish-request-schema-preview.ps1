param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2140 Publish Request Schema Preview"
  ScriptFile = "smoke-codexforge-publish-request-schema-preview.ps1"
  Domain = "src\\lib\\codexforge\\publish-request-schema-preview"
  Route = "src\\app\\publish-request-schema-preview"
  CommandLabel = "Go to Publish Request Schema Preview"
  RouteHref = "/publish-request-schema-preview"
  ContractFamily = "PublishGateway"
  Markers = @("Publish request schema preview", "Publish request schema preview does not publish content create posts persist requests or call social APIs from the UI", "Publish request schema preview requires backend-owned publish request validation artifact prerequisite approval capture and audit trail", "Publish request schema preview shows simulated publish id simulated artifact reference simulated caption placeholder simulated platform target simulated denied frontend publish request", "Denied publish request schema paths remain blocked", "Publish request schema checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
