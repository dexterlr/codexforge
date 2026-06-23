param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-local-model-bridge-smoke-helper.ps1") `
  -SmokeName "Phase 1569 Local Timeout Cancellation Preview" `
  -ScriptFile "smoke-codexforge-local-timeout-cancellation-preview.ps1" `
  -Domain "src\lib\codexforge\local-timeout-cancellation-preview" `
  -Route "src\app\local-timeout-cancellation-preview" `
  -MainPanel "LocalModelBridgeRoutePanel" `
  -CommandLabel "Go to Local Timeout Cancellation Preview" `
  -RouteHref "/local-timeout-cancellation-preview" `
  -Markers @("Local timeout cancellation preview", "Local timeout cancellation preview does not start or cancel local model processes from the UI", "Local timeout cancellation preview requires explicit operator approval", "Local timeout cancellation preview shows timeout limits cancellation boundaries manual stop backend-owned process control and evidence requirements", "Denied local timeout cancellation paths remain blocked", "Local timeout cancellation checklist")
