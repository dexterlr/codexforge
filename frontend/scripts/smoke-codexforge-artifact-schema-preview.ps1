param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2123 Artifact Schema Preview"
  ScriptFile = "smoke-codexforge-artifact-schema-preview.ps1"
  Domain = "src\\lib\\codexforge\\artifact-schema-preview"
  Route = "src\\app\\artifact-schema-preview"
  CommandLabel = "Go to Artifact Schema Preview"
  RouteHref = "/artifact-schema-preview"
  ContractFamily = "ArtifactExport"
  Markers = @("Artifact schema preview", "Artifact schema preview does not create artifacts persist files write records or expose storage from the UI", "Artifact schema preview requires backend-owned artifact storage schema validation checksum capture and audit trail", "Artifact schema preview shows simulated artifact id simulated media type simulated checksum placeholder simulated source job reference simulated denied frontend artifact persistence", "Denied artifact schema paths remain blocked", "Artifact schema checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
