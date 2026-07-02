param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2115 Worker Artifact Handoff Preview"
  ScriptFile = "smoke-codexforge-worker-artifact-handoff-preview.ps1"
  Domain = "src\\lib\\codexforge\\worker-artifact-handoff-preview"
  Route = "src\\app\\worker-artifact-handoff-preview"
  CommandLabel = "Go to Worker Artifact Handoff Preview"
  RouteHref = "/worker-artifact-handoff-preview"
  ContractFamily = "Worker"
  Markers = @("Worker artifact handoff preview", "Worker artifact handoff preview does not create artifacts persist files upload media download results or export files from the UI", "Worker artifact handoff preview requires backend-owned artifact storage checksum capture render result handoff and audit trail", "Worker artifact handoff preview shows simulated artifact pointer simulated checksum placeholder simulated storage gate simulated export hold simulated denied frontend artifact persistence", "Denied worker artifact handoff paths remain blocked", "Worker artifact handoff checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
