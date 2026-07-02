param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2124 Artifact Checksum Contract Preview"
  ScriptFile = "smoke-codexforge-artifact-checksum-contract-preview.ps1"
  Domain = "src\\lib\\codexforge\\artifact-checksum-contract-preview"
  Route = "src\\app\\artifact-checksum-contract-preview"
  CommandLabel = "Go to Artifact Checksum Contract Preview"
  RouteHref = "/artifact-checksum-contract-preview"
  ContractFamily = "ArtifactExport"
  Markers = @("Artifact checksum contract preview", "Artifact checksum contract preview does not hash files read media persist checksums or write storage records from the UI", "Artifact checksum contract preview requires backend-owned checksum capture integrity verification and audit trail", "Artifact checksum contract preview shows simulated checksum placeholder simulated integrity state simulated verification note simulated mismatch hold simulated denied frontend checksum persistence", "Denied artifact checksum paths remain blocked", "Artifact checksum contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
