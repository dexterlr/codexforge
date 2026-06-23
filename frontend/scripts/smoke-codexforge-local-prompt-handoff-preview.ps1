param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-local-model-bridge-smoke-helper.ps1") `
  -SmokeName "Phase 1566 Local Prompt Handoff Preview" `
  -ScriptFile "smoke-codexforge-local-prompt-handoff-preview.ps1" `
  -Domain "src\lib\codexforge\local-prompt-handoff-preview" `
  -Route "src\app\local-prompt-handoff-preview" `
  -MainPanel "LocalModelBridgeRoutePanel" `
  -CommandLabel "Go to Local Prompt Handoff Preview" `
  -RouteHref "/local-prompt-handoff-preview" `
  -Markers @("Local prompt handoff preview", "Local prompt handoff preview does not send prompts", "Local prompt handoff preview requires explicit operator approval", "Local prompt handoff preview shows goal context files commands evidence redaction privacy class and approval references before local model use", "Denied local prompt handoff paths remain blocked", "Local prompt handoff checklist")
