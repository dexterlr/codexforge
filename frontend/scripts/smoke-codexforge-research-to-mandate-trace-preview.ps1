param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1867 Research To Mandate Trace Preview"
  ScriptFile = "smoke-codexforge-research-to-mandate-trace-preview.ps1"
  Domain = "src\lib\codexforge\research-to-mandate-trace-preview"
  Route = "src\app\research-to-mandate-trace-preview"
  CommandLabel = "Go to Research To Mandate Trace Preview"
  RouteHref = "/research-to-mandate-trace-preview"
  Markers = @("Research to mandate trace preview", "Research to mandate trace preview does not create trading advice persist evidence mutate mandates or create buy sell instructions from the UI", "Research to mandate trace preview requires deterministic synthetic research trace rows only", "Research to mandate trace preview shows simulated research note simulated evidence source simulated mandate link simulated review status simulated no recommendation note and denied frontend persistence", "Denied research to mandate trace paths remain blocked", "Research to mandate trace checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-trading-end-to-end-review-smoke-helper.ps1") @params
