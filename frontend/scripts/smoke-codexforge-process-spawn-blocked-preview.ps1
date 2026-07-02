param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2111 Process Spawn Blocked Preview"
  ScriptFile = "smoke-codexforge-process-spawn-blocked-preview.ps1"
  Domain = "src\\lib\\codexforge\\process-spawn-blocked-preview"
  Route = "src\\app\\process-spawn-blocked-preview"
  CommandLabel = "Go to Process Spawn Blocked Preview"
  RouteHref = "/process-spawn-blocked-preview"
  ContractFamily = "Worker"
  Markers = @("Process spawn blocked preview", "Process spawn blocked preview blocks frontend process spawning frontend child processes frontend daemon starts frontend worker starts and frontend runtime deployment", "Process spawn blocked preview requires backend-owned process control worker orchestration runtime isolation and audit trail", "Process spawn blocked preview shows denied process spawn denied daemon start denied worker start denied runtime deployment denied service start and backend prerequisite", "Denied process spawn paths remain blocked", "Process spawn blocked checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
