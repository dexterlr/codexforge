param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2033 Export Service Contract Preview"
  ScriptFile = "smoke-codexforge-export-service-contract-preview.ps1"
  Domain = "src\lib\codexforge\export-service-contract-preview"
  Route = "src\app\export-service-contract-preview"
  CommandLabel = "Go to Export Service Contract Preview"
  RouteHref = "/export-service-contract-preview"
  Markers = @("Export service contract preview", "Export service contract preview does not export videos transcode files create downloads upload files or write local files from the UI", "Export service contract preview requires backend-owned export service render artifact input rights approval output policy and audit trail", "Export service contract preview shows simulated export contract simulated format policy simulated approval gate simulated artifact prerequisite simulated denied frontend export", "Denied export service contract paths remain blocked", "Export service contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-backend-service-contract-boundary-smoke-helper.ps1") @params

