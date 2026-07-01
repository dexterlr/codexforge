param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1987 Worker Dispatch Blocked Preview"
  ScriptFile = "smoke-codexforge-worker-dispatch-blocked-preview.ps1"
  Domain = "src\lib\codexforge\worker-dispatch-blocked-preview"
  Route = "src\app\worker-dispatch-blocked-preview"
  CommandLabel = "Go to Worker Dispatch Blocked Preview"
  RouteHref = "/worker-dispatch-blocked-preview"
  Markers = @("Worker dispatch blocked preview", "Worker dispatch blocked preview does not dispatch workers spawn processes bind ports run commands deploy runtimes or start render services from the UI", "Worker dispatch blocked preview requires backend-owned worker orchestration and explicit operator approval", "Worker dispatch blocked preview shows denied worker dispatch denied process spawn denied command execution denied runtime start denied service start and backend prerequisite", "Denied worker dispatch paths remain blocked", "Worker dispatch blocked checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-job-boundary-smoke-helper.ps1") @params

