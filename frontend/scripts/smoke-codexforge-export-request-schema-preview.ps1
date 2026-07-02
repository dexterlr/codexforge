param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2127 Export Request Schema Preview"
  ScriptFile = "smoke-codexforge-export-request-schema-preview.ps1"
  Domain = "src\\lib\\codexforge\\export-request-schema-preview"
  Route = "src\\app\\export-request-schema-preview"
  CommandLabel = "Go to Export Request Schema Preview"
  RouteHref = "/export-request-schema-preview"
  ContractFamily = "ArtifactExport"
  Markers = @("Export request schema preview", "Export request schema preview does not export files create downloads persist requests or dispatch workers from the UI", "Export request schema preview requires backend-owned export request validation artifact prerequisite approval capture and audit trail", "Export request schema preview shows simulated export id simulated artifact reference simulated output format simulated approval gate simulated denied frontend export request", "Denied export request schema paths remain blocked", "Export request schema checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
