param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2066 Asset Retention Policy Preview"
  ScriptFile = "smoke-codexforge-asset-retention-policy-preview.ps1"
  Domain = "src\lib\codexforge\asset-retention-policy-preview"
  Route = "src\app\asset-retention-policy-preview"
  CommandLabel = "Go to Asset Retention Policy Preview"
  RouteHref = "/asset-retention-policy-preview"
  Contract = "Asset"
  Markers = @("Asset retention policy preview", "Asset retention policy preview does not delete assets persist retention state mutate storage or purge files from the UI", "Asset retention policy preview requires backend-owned retention policy legal hold deletion workflow and audit trail", "Asset retention policy preview shows simulated retention period simulated legal hold simulated purge blocked simulated review requirement simulated denied frontend deletion", "Denied asset retention paths remain blocked", "Asset retention policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
