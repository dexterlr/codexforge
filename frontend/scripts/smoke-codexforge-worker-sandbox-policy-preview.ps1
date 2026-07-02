param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2109 Worker Sandbox Policy Preview"
  ScriptFile = "smoke-codexforge-worker-sandbox-policy-preview.ps1"
  Domain = "src\\lib\\codexforge\\worker-sandbox-policy-preview"
  Route = "src\\app\\worker-sandbox-policy-preview"
  CommandLabel = "Go to Worker Sandbox Policy Preview"
  RouteHref = "/worker-sandbox-policy-preview"
  ContractFamily = "Worker"
  Markers = @("Worker sandbox policy preview", "Worker sandbox policy preview does not change sandbox settings execute commands mount filesystems or deploy services from the UI", "Worker sandbox policy preview requires backend-owned sandbox policy least privilege isolation and audit trail", "Worker sandbox policy preview shows simulated sandbox profile simulated permission boundary simulated network hold simulated filesystem hold simulated denied frontend sandbox mutation", "Denied worker sandbox policy paths remain blocked", "Worker sandbox policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
