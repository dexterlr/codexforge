param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2083 Audio Access Policy Preview"
  ScriptFile = "smoke-codexforge-audio-access-policy-preview.ps1"
  Domain = "src\lib\codexforge\audio-access-policy-preview"
  Route = "src\app\audio-access-policy-preview"
  CommandLabel = "Go to Audio Access Policy Preview"
  RouteHref = "/audio-access-policy-preview"
  Contract = "Audio"
  Markers = @("Audio access policy preview", "Audio access policy preview does not grant permissions expose audio create signed URLs or persist access policies from the UI", "Audio access policy preview requires backend-owned access control identity binding signed URL policy and audit trail", "Audio access policy preview shows simulated role access simulated expiry rule simulated download hold simulated redaction state simulated denied frontend access mutation", "Denied audio access policy paths remain blocked", "Audio access policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
