param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2053 Provider Failure Retry Boundary Preview"
  ScriptFile = "smoke-codexforge-provider-failure-retry-boundary-preview.ps1"
  Domain = "src\lib\codexforge\provider-failure-retry-boundary-preview"
  Route = "src\app\provider-failure-retry-boundary-preview"
  CommandLabel = "Go to Provider Failure Retry Boundary Preview"
  RouteHref = "/provider-failure-retry-boundary-preview"
  Markers = @("Provider failure retry boundary preview", "Provider failure retry boundary preview does not retry live requests create jobs dispatch workers call providers or persist failures from the UI", "Provider failure retry boundary preview requires backend-owned retry policy failure ledger provider health monitor and audit trail", "Provider failure retry boundary preview shows simulated provider timeout simulated moderation hold simulated quota hold simulated retry policy simulated denied frontend retry dispatch", "Denied provider failure retry paths remain blocked", "Provider failure retry boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-contract-smoke-helper.ps1") @params

