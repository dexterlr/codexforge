param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2045 Prompt Review Packet Preview"
  ScriptFile = "smoke-codexforge-prompt-review-packet-preview.ps1"
  Domain = "src\lib\codexforge\prompt-review-packet-preview"
  Route = "src\app\prompt-review-packet-preview"
  CommandLabel = "Go to Prompt Review Packet Preview"
  RouteHref = "/prompt-review-packet-preview"
  Markers = @("Prompt review packet preview", "Prompt review packet preview does not send prompts call providers persist prompts or generate outputs from the UI", "Prompt review packet preview requires backend-owned prompt review approval capture redaction policy and audit trail", "Prompt review packet preview shows simulated prompt purpose simulated redaction note simulated review owner simulated approval state simulated denied frontend prompt sending", "Denied prompt review packet paths remain blocked", "Prompt review packet checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-contract-smoke-helper.ps1") @params

