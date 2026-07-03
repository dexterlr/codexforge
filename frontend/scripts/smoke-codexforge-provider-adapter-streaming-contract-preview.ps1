param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2324 Provider Adapter Streaming Contract Preview"
  ScriptFile = "smoke-codexforge-provider-adapter-streaming-contract-preview.ps1"
  Domain = "provider-adapter-streaming-contract-preview"
  Route = "provider-adapter-streaming-contract-preview"
  CommandLabel = "Go to Provider Adapter Streaming Contract Preview"
  RouteHref = "/provider-adapter-streaming-contract-preview"
  Markers = @("Provider adapter streaming contract preview", "Provider adapter streaming contract preview defines future streaming boundaries without opening streams or receiving tokens", "Provider adapter streaming contract preview keeps streaming backend-owned and approval-gated", "Provider adapter streaming contract preview blocks live streams", "Denied provider adapter streaming paths remain blocked", "Provider adapter streaming checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
