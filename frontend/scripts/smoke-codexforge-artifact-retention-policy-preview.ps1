param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2125 Artifact Retention Policy Preview"
  ScriptFile = "smoke-codexforge-artifact-retention-policy-preview.ps1"
  Domain = "src\\lib\\codexforge\\artifact-retention-policy-preview"
  Route = "src\\app\\artifact-retention-policy-preview"
  CommandLabel = "Go to Artifact Retention Policy Preview"
  RouteHref = "/artifact-retention-policy-preview"
  ContractFamily = "ArtifactExport"
  Markers = @("Artifact retention policy preview", "Artifact retention policy preview does not delete artifacts persist retention state mutate storage or purge files from the UI", "Artifact retention policy preview requires backend-owned retention policy legal hold deletion workflow and audit trail", "Artifact retention policy preview shows simulated retention period simulated legal hold simulated purge blocked simulated review requirement simulated denied frontend deletion", "Denied artifact retention paths remain blocked", "Artifact retention policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
