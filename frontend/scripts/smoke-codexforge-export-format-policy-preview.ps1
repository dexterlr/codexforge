param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2129 Export Format Policy Preview"
  ScriptFile = "smoke-codexforge-export-format-policy-preview.ps1"
  Domain = "src\\lib\\codexforge\\export-format-policy-preview"
  Route = "src\\app\\export-format-policy-preview"
  CommandLabel = "Go to Export Format Policy Preview"
  RouteHref = "/export-format-policy-preview"
  ContractFamily = "ArtifactExport"
  Markers = @("Export format policy preview", "Export format policy preview does not transcode video export files persist settings or create derivatives from the UI", "Export format policy preview requires backend-owned export service format policy render artifact input and audit trail", "Export format policy preview shows simulated format simulated resolution simulated aspect ratio simulated caption option simulated denied frontend transcode", "Denied export format policy paths remain blocked", "Export format policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
