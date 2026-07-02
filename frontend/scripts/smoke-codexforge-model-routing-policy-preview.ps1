param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2044 Model Routing Policy Preview"
  ScriptFile = "smoke-codexforge-model-routing-policy-preview.ps1"
  Domain = "src\lib\codexforge\model-routing-policy-preview"
  Route = "src\app\model-routing-policy-preview"
  CommandLabel = "Go to Model Routing Policy Preview"
  RouteHref = "/model-routing-policy-preview"
  Markers = @("Model routing policy preview", "Model routing policy preview does not call models send prompts route live inference or persist model choices from the UI", "Model routing policy preview requires backend-owned model routing policy safety review prompt review and audit trail", "Model routing policy preview shows simulated model class simulated routing reason simulated fallback rule simulated safety gate simulated denied frontend model routing", "Denied model routing policy paths remain blocked", "Model routing policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-contract-smoke-helper.ps1") @params

