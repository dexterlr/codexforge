param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-local-model-bridge-smoke-helper.ps1") `
  -SmokeName "Phase 1567 Local Context Redaction Preview" `
  -ScriptFile "smoke-codexforge-local-context-redaction-preview.ps1" `
  -Domain "src\lib\codexforge\local-context-redaction-preview" `
  -Route "src\app\local-context-redaction-preview" `
  -MainPanel "LocalModelBridgeRoutePanel" `
  -CommandLabel "Go to Local Context Redaction Preview" `
  -RouteHref "/local-context-redaction-preview" `
  -Markers @("Local context redaction preview", "Local context redaction preview does not read secrets", "Local context redaction preview requires explicit operator approval", "Local context redaction preview blocks secrets tokens credentials keys environment values private files denied paths and unapproved project context", "Denied local context redaction paths remain blocked", "Local context redaction checklist")
