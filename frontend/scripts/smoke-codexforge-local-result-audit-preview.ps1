param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-local-model-bridge-smoke-helper.ps1") `
  -SmokeName "Phase 1574 Local Result Audit Preview" `
  -ScriptFile "smoke-codexforge-local-result-audit-preview.ps1" `
  -Domain "src\lib\codexforge\local-result-audit-preview" `
  -Route "src\app\local-result-audit-preview" `
  -MainPanel "LocalModelBridgeRoutePanel" `
  -CommandLabel "Go to Local Result Audit Preview" `
  -RouteHref "/local-result-audit-preview" `
  -Markers @("Local result audit preview", "Local result audit preview does not persist results or audit from the UI", "Local result audit preview requires backend-owned result and audit capture", "Local result audit preview shows success blocked denied failed timeout canceled fallback manual-review redacted operator-accepted and audit-continuity outcomes", "Denied local result audit paths remain blocked", "Local result audit checklist")
