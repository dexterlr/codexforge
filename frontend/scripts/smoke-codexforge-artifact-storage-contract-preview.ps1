param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2032 Artifact Storage Contract Preview"
  ScriptFile = "smoke-codexforge-artifact-storage-contract-preview.ps1"
  Domain = "src\lib\codexforge\artifact-storage-contract-preview"
  Route = "src\app\artifact-storage-contract-preview"
  CommandLabel = "Go to Artifact Storage Contract Preview"
  RouteHref = "/artifact-storage-contract-preview"
  Markers = @("Artifact storage contract preview", "Artifact storage contract preview does not create artifacts persist media download files upload files or write browser storage from the UI", "Artifact storage contract preview requires backend-owned artifact storage checksum capture retention policy access control and audit trail", "Artifact storage contract preview shows simulated artifact contract simulated checksum prerequisite simulated retention prerequisite simulated access control prerequisite simulated denied frontend artifact creation", "Denied artifact storage contract paths remain blocked", "Artifact storage contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-backend-service-contract-boundary-smoke-helper.ps1") @params

