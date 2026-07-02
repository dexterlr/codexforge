param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2128 Export Readiness Gate Preview"
  ScriptFile = "smoke-codexforge-export-readiness-gate-preview.ps1"
  Domain = "src\\lib\\codexforge\\export-readiness-gate-preview"
  Route = "src\\app\\export-readiness-gate-preview"
  CommandLabel = "Go to Export Readiness Gate Preview"
  RouteHref = "/export-readiness-gate-preview"
  ContractFamily = "ArtifactExport"
  Markers = @("Export readiness gate preview", "Export readiness gate preview does not approve exports persist readiness state create artifacts or download files from the UI", "Export readiness gate preview requires backend-owned rights review brand review artifact validation and approval capture", "Export readiness gate preview shows simulated rights ready simulated brand ready simulated artifact ready simulated caption ready simulated denied frontend readiness persistence", "Denied export readiness gate paths remain blocked", "Export readiness gate checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
