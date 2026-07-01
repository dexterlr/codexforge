param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1876 End-to-End Blocker Map Preview"
  ScriptFile = "smoke-codexforge-end-to-end-blocker-map-preview.ps1"
  Domain = "src\lib\codexforge\end-to-end-blocker-map-preview"
  Route = "src\app\end-to-end-blocker-map-preview"
  CommandLabel = "Go to End-to-End Blocker Map Preview"
  RouteHref = "/end-to-end-blocker-map-preview"
  Markers = @("End-to-end blocker map preview", "End-to-end blocker map preview does not retry execution persist queues release locks mutate strategies or bypass approvals from the UI", "End-to-end blocker map preview requires deterministic synthetic blocker rows only", "End-to-end blocker map preview shows simulated research blocker simulated mandate blocker simulated risk blocker simulated evidence blocker simulated approval blocker simulated execution blocker and operator review note", "Denied end-to-end blocker map paths remain blocked", "End-to-end blocker map checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-trading-end-to-end-review-smoke-helper.ps1") @params
