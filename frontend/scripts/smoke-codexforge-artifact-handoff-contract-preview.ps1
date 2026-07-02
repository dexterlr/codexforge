param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2133 Artifact Handoff Contract Preview"
  ScriptFile = "smoke-codexforge-artifact-handoff-contract-preview.ps1"
  Domain = "src\\lib\\codexforge\\artifact-handoff-contract-preview"
  Route = "src\\app\\artifact-handoff-contract-preview"
  CommandLabel = "Go to Artifact Handoff Contract Preview"
  RouteHref = "/artifact-handoff-contract-preview"
  ContractFamily = "ArtifactExport"
  Markers = @("Artifact handoff contract preview", "Artifact handoff contract preview does not create artifacts export packets download files or persist handoffs from the UI", "Artifact handoff contract preview requires backend-owned artifact storage export service approval capture and audit trail", "Artifact handoff contract preview shows simulated handoff packet simulated receiving gateway simulated checksum placeholder simulated approval gate simulated denied frontend handoff persistence", "Denied artifact handoff paths remain blocked", "Artifact handoff contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
