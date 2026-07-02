param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2031 Worker Orchestration Contract Preview"
  ScriptFile = "smoke-codexforge-worker-orchestration-contract-preview.ps1"
  Domain = "src\lib\codexforge\worker-orchestration-contract-preview"
  Route = "src\app\worker-orchestration-contract-preview"
  CommandLabel = "Go to Worker Orchestration Contract Preview"
  RouteHref = "/worker-orchestration-contract-preview"
  Markers = @("Worker orchestration contract preview", "Worker orchestration contract preview does not dispatch workers spawn processes run commands bind ports deploy runtimes or start services from the UI", "Worker orchestration contract preview requires backend-owned worker orchestration runtime isolation credential boundary job lease and audit trail", "Worker orchestration contract preview shows simulated worker contract simulated lease prerequisite simulated isolation prerequisite simulated retry prerequisite simulated denied frontend worker dispatch", "Denied worker orchestration contract paths remain blocked", "Worker orchestration contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-backend-service-contract-boundary-smoke-helper.ps1") @params

