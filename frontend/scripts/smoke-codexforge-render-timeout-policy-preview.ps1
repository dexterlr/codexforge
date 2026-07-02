param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2096 Render Timeout Policy Preview"
  ScriptFile = "smoke-codexforge-render-timeout-policy-preview.ps1"
  Domain = "src\\lib\\codexforge\\render-timeout-policy-preview"
  Route = "src\\app\\render-timeout-policy-preview"
  CommandLabel = "Go to Render Timeout Policy Preview"
  RouteHref = "/render-timeout-policy-preview"
  ContractFamily = "Render"
  Markers = @("Render timeout policy preview", "Render timeout policy preview does not kill jobs start jobs restart runtimes or persist timeout state from the UI", "Render timeout policy preview requires backend-owned timeout enforcement worker orchestration and failure ledger", "Render timeout policy preview shows simulated timeout window simulated hung worker rule simulated cancellation policy simulated operator review simulated denied frontend runtime control", "Denied render timeout policy paths remain blocked", "Render timeout policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
