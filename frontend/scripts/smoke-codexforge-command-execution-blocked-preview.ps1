param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2110 Command Execution Blocked Preview"
  ScriptFile = "smoke-codexforge-command-execution-blocked-preview.ps1"
  Domain = "src\\lib\\codexforge\\command-execution-blocked-preview"
  Route = "src\\app\\command-execution-blocked-preview"
  CommandLabel = "Go to Command Execution Blocked Preview"
  RouteHref = "/command-execution-blocked-preview"
  ContractFamily = "Worker"
  Markers = @("Command execution blocked preview", "Command execution blocked preview blocks frontend command execution frontend shell access frontend script execution frontend runtime start frontend package install and frontend service deployment", "Command execution blocked preview requires backend-owned worker orchestration runtime isolation approval capture and audit trail", "Command execution blocked preview shows denied command execution denied shell access denied runtime start denied package install denied service deployment and backend prerequisite", "Denied command execution paths remain blocked", "Command execution blocked checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
