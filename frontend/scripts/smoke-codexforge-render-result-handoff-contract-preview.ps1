param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2101 Render Result Handoff Contract Preview"
  ScriptFile = "smoke-codexforge-render-result-handoff-contract-preview.ps1"
  Domain = "src\\lib\\codexforge\\render-result-handoff-contract-preview"
  Route = "src\\app\\render-result-handoff-contract-preview"
  CommandLabel = "Go to Render Result Handoff Contract Preview"
  RouteHref = "/render-result-handoff-contract-preview"
  ContractFamily = "Render"
  Markers = @("Render result handoff contract preview", "Render result handoff contract preview does not create artifacts export media download files or persist render results from the UI", "Render result handoff contract preview requires backend-owned artifact storage checksum capture export service and approval capture", "Render result handoff contract preview shows simulated render result placeholder simulated artifact pointer simulated checksum placeholder simulated export hold simulated denied frontend artifact creation", "Denied render result handoff paths remain blocked", "Render result handoff contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
