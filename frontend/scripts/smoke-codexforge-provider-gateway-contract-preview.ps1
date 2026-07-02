param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2027 Provider Gateway Contract Preview"
  ScriptFile = "smoke-codexforge-provider-gateway-contract-preview.ps1"
  Domain = "src\lib\codexforge\provider-gateway-contract-preview"
  Route = "src\app\provider-gateway-contract-preview"
  CommandLabel = "Go to Provider Gateway Contract Preview"
  RouteHref = "/provider-gateway-contract-preview"
  Markers = @("Provider gateway contract preview", "Provider gateway contract preview does not call providers call models send prompts store API keys store credentials or generate content from the UI", "Provider gateway contract preview requires backend-owned provider gateway credential vault prompt review approval capture and audit trail", "Provider gateway contract preview shows simulated provider gateway interface simulated model routing prerequisite simulated prompt review prerequisite simulated credential vault prerequisite simulated audit prerequisite and denied frontend provider call", "Denied provider gateway contract paths remain blocked", "Provider gateway contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-backend-service-contract-boundary-smoke-helper.ps1") @params

