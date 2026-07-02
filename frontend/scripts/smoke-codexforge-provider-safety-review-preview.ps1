param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2049 Provider Safety Review Preview"
  ScriptFile = "smoke-codexforge-provider-safety-review-preview.ps1"
  Domain = "src\lib\codexforge\provider-safety-review-preview"
  Route = "src\app\provider-safety-review-preview"
  CommandLabel = "Go to Provider Safety Review Preview"
  RouteHref = "/provider-safety-review-preview"
  Markers = @("Provider safety review preview", "Provider safety review preview does not moderate live outputs call safety providers approve outputs or publish content from the UI", "Provider safety review preview requires backend-owned safety review moderation workflow approval capture and audit trail", "Provider safety review preview shows simulated policy check simulated rights check simulated brand check simulated moderation note simulated denied frontend approval persistence", "Denied provider safety review paths remain blocked", "Provider safety review checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-contract-smoke-helper.ps1") @params

