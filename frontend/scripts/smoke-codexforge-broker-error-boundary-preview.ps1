param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-broker-execution-boundary-smoke-helper.ps1") `
  -SmokeName "Phase 1747 Broker Error Boundary Preview" `
  -ScriptFile "smoke-codexforge-broker-error-boundary-preview.ps1" `
  -Domain "src\lib\codexforge\broker-error-boundary-preview" `
  -Route "src\app\broker-error-boundary-preview" `
  -CommandLabel "Go to Broker Error Boundary Preview" `
  -RouteHref "/broker-error-boundary-preview" `
  -Markers @("Broker error boundary preview", "Broker error boundary preview does not retry broker calls recover orders or mutate live orders from the UI", "Broker error boundary preview requires backend-owned recovery", "Broker error boundary preview shows broker timeout broker rejection auth failure risk rejection kill switch rejection network failure retry hold and operator review requirement", "Denied broker error paths remain blocked", "Broker error boundary checklist")
