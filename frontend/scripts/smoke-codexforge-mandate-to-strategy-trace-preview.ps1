param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1868 Mandate To Strategy Trace Preview"
  ScriptFile = "smoke-codexforge-mandate-to-strategy-trace-preview.ps1"
  Domain = "src\lib\codexforge\mandate-to-strategy-trace-preview"
  Route = "src\app\mandate-to-strategy-trace-preview"
  CommandLabel = "Go to Mandate To Strategy Trace Preview"
  RouteHref = "/mandate-to-strategy-trace-preview"
  Markers = @("Mandate to strategy trace preview", "Mandate to strategy trace preview does not change mandate rules mutate strategies write files approve execution or rank strategies from the UI", "Mandate to strategy trace preview requires backend-owned mandate and strategy review workflow", "Mandate to strategy trace preview shows simulated mandate fit simulated strategy hypothesis simulated approved universe simulated risk envelope simulated operator review note and denied frontend mutation", "Denied mandate to strategy trace paths remain blocked", "Mandate to strategy trace checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-trading-end-to-end-review-smoke-helper.ps1") @params
