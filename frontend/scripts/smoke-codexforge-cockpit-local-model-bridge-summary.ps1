param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-local-model-bridge-smoke-helper.ps1") `
  -SmokeName "Phase 1575 Cockpit Local Model Bridge Summary" `
  -ScriptFile "smoke-codexforge-cockpit-local-model-bridge-summary.ps1" `
  -Domain "src\lib\codexforge\cockpit-local-model-bridge-summary" `
  -Route "src\app\cockpit-local-model-bridge-summary" `
  -MainPanel "LocalModelBridgeRoutePanel" `
  -CommandLabel "Go to Cockpit Local Model Bridge Summary" `
  -RouteHref "/cockpit-local-model-bridge-summary" `
  -Markers @("Cockpit local model bridge summary", "Cockpit local model bridge summary keeps the cockpit as the normal user surface", "Cockpit local model bridge summary does not call local models from the cockpit", "Cockpit local model bridge summary shows runtime model registry endpoint prompt handoff redaction capability timeout cancel response fallback denied evidence result and audit", "Phase pages remain dev test diagnostics only", "Cockpit local model bridge checklist")
