param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2067 Asset Redaction Policy Preview"
  ScriptFile = "smoke-codexforge-asset-redaction-policy-preview.ps1"
  Domain = "src\lib\codexforge\asset-redaction-policy-preview"
  Route = "src\app\asset-redaction-policy-preview"
  CommandLabel = "Go to Asset Redaction Policy Preview"
  RouteHref = "/asset-redaction-policy-preview"
  Contract = "Asset"
  Markers = @("Asset redaction policy preview", "Asset redaction policy preview does not edit media redact files write derivatives or persist redacted assets from the UI", "Asset redaction policy preview requires backend-owned redaction workflow artifact storage approval capture and audit trail", "Asset redaction policy preview shows simulated redaction reason simulated derivative placeholder simulated approval need simulated audit note simulated denied frontend file mutation", "Denied asset redaction paths remain blocked", "Asset redaction policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
