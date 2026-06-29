param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-broker-execution-boundary-smoke-helper.ps1") `
  -SmokeName "Phase 1748 Broker Kill Switch Integration Preview" `
  -ScriptFile "smoke-codexforge-broker-kill-switch-integration-preview.ps1" `
  -Domain "src\lib\codexforge\broker-kill-switch-integration-preview" `
  -Route "src\app\broker-kill-switch-integration-preview" `
  -CommandLabel "Go to Broker Kill Switch Integration Preview" `
  -RouteHref "/broker-kill-switch-integration-preview" `
  -Markers @("Broker kill switch integration preview", "Broker kill switch integration preview does not control broker accounts stop live trades or cancel orders from the UI", "Broker kill switch integration preview requires backend-owned kill switch enforcement", "Broker kill switch integration preview shows kill switch state daily loss breach drawdown breach manual stop signal invalidation broker error order hold and frontend denied control", "Denied broker kill switch integration paths remain blocked", "Broker kill switch integration checklist")
