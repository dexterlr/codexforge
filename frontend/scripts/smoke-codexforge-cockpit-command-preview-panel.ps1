param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1198 Cockpit Command Preview Panel" `
  -ScriptFile "smoke-codexforge-cockpit-command-preview-panel.ps1" `
  -Domain "src\lib\codexforge\cockpit-command-preview-panel" `
  -Route "src\app\cockpit-command-preview-panel" `
  -MainPanel "CockpitCommandPreviewPanel" `
  -CommandLabel "Go to Cockpit Command Preview Panel" `
  -RouteHref "/cockpit-command-preview-panel" `
  -Markers @("Cockpit command preview panel", "Cockpit command preview panel does not run commands", "Command preview panel requires explicit operator approval before future execution", "Command panel shows allowlist arguments working directory environment evidence result and recovery readiness", "Denied cockpit command paths remain blocked", "Cockpit command preview checklist")
