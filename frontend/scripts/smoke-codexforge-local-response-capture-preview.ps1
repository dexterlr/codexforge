param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-local-model-bridge-smoke-helper.ps1") `
  -SmokeName "Phase 1570 Local Response Capture Preview" `
  -ScriptFile "smoke-codexforge-local-response-capture-preview.ps1" `
  -Domain "src\lib\codexforge\local-response-capture-preview" `
  -Route "src\app\local-response-capture-preview" `
  -MainPanel "LocalModelBridgeRoutePanel" `
  -CommandLabel "Go to Local Response Capture Preview" `
  -RouteHref "/local-response-capture-preview" `
  -Markers @("Local response capture preview", "Local response capture preview does not capture live model output from the UI", "Local response capture preview requires backend-owned model response capture", "Local response capture preview shows response text redaction token metadata status fallback references evidence linkage and audit linkage", "Denied local response capture paths remain blocked", "Local response capture checklist")
