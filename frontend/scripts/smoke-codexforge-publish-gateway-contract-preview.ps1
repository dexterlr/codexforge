param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2034 Publish Gateway Contract Preview"
  ScriptFile = "smoke-codexforge-publish-gateway-contract-preview.ps1"
  Domain = "src\lib\codexforge\publish-gateway-contract-preview"
  Route = "src\app\publish-gateway-contract-preview"
  CommandLabel = "Go to Publish Gateway Contract Preview"
  RouteHref = "/publish-gateway-contract-preview"
  Markers = @("Publish gateway contract preview", "Publish gateway contract preview does not publish posts schedule content call social APIs upload media or persist publish state from the UI", "Publish gateway contract preview requires backend-owned publish gateway account authorization rights review approval capture and audit trail", "Publish gateway contract preview shows simulated publish gateway simulated account authorization prerequisite simulated approval gate simulated schedule policy simulated denied frontend publish", "Denied publish gateway contract paths remain blocked", "Publish gateway contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-backend-service-contract-boundary-smoke-helper.ps1") @params

