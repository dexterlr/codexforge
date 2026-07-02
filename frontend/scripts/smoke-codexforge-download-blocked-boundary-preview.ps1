param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2131 Download Blocked Boundary Preview"
  ScriptFile = "smoke-codexforge-download-blocked-boundary-preview.ps1"
  Domain = "src\\lib\\codexforge\\download-blocked-boundary-preview"
  Route = "src\\app\\download-blocked-boundary-preview"
  CommandLabel = "Go to Download Blocked Boundary Preview"
  RouteHref = "/download-blocked-boundary-preview"
  ContractFamily = "ArtifactExport"
  Markers = @("Download blocked boundary preview", "Download blocked boundary preview blocks frontend download frontend export frontend file read frontend file write frontend signed URL creation frontend artifact access mutation and frontend browser storage writes", "Download blocked boundary preview requires backend-owned export service artifact storage access policy approval capture and audit trail", "Download blocked boundary preview shows denied download denied export denied signed URL denied file write denied artifact access mutation and backend prerequisite", "Denied download boundary paths remain blocked", "Download blocked boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
