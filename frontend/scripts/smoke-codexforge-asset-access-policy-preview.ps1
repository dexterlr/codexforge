param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2064 Asset Access Policy Preview"
  ScriptFile = "smoke-codexforge-asset-access-policy-preview.ps1"
  Domain = "src\lib\codexforge\asset-access-policy-preview"
  Route = "src\app\asset-access-policy-preview"
  CommandLabel = "Go to Asset Access Policy Preview"
  RouteHref = "/asset-access-policy-preview"
  Contract = "Asset"
  Markers = @("Asset access policy preview", "Asset access policy preview does not grant permissions persist access policies expose files or create signed URLs from the UI", "Asset access policy preview requires backend-owned access control identity binding signed URL policy and audit trail", "Asset access policy preview shows simulated role access simulated expiry rule simulated download hold simulated redaction state simulated denied frontend access mutation", "Denied asset access policy paths remain blocked", "Asset access policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
