param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2126 Artifact Access Policy Preview"
  ScriptFile = "smoke-codexforge-artifact-access-policy-preview.ps1"
  Domain = "src\\lib\\codexforge\\artifact-access-policy-preview"
  Route = "src\\app\\artifact-access-policy-preview"
  CommandLabel = "Go to Artifact Access Policy Preview"
  RouteHref = "/artifact-access-policy-preview"
  ContractFamily = "ArtifactExport"
  Markers = @("Artifact access policy preview", "Artifact access policy preview does not grant permissions expose artifacts create signed URLs or persist access policy from the UI", "Artifact access policy preview requires backend-owned access control identity binding signed URL policy and audit trail", "Artifact access policy preview shows simulated role access simulated expiry rule simulated download hold simulated redaction state simulated denied frontend access mutation", "Denied artifact access paths remain blocked", "Artifact access policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
