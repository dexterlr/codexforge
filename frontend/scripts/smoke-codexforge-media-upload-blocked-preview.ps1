param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2143 Media Upload Blocked Preview"
  ScriptFile = "smoke-codexforge-media-upload-blocked-preview.ps1"
  Domain = "src\\lib\\codexforge\\media-upload-blocked-preview"
  Route = "src\\app\\media-upload-blocked-preview"
  CommandLabel = "Go to Media Upload Blocked Preview"
  RouteHref = "/media-upload-blocked-preview"
  ContractFamily = "PublishGateway"
  Markers = @("Media upload blocked preview", "Media upload blocked preview blocks frontend media upload frontend social upload frontend file upload frontend artifact upload frontend account mutation and frontend token use", "Media upload blocked preview requires backend-owned publish gateway account authorization artifact storage rights review approval capture and audit trail", "Media upload blocked preview shows denied media upload denied social upload denied file upload denied token use denied account mutation and backend prerequisite", "Denied media upload paths remain blocked", "Media upload blocked checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
