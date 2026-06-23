param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-model-router-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1543 Cockpit Model Router Summary" `
  -ScriptFile "smoke-codexforge-cockpit-model-router-summary.ps1" `
  -Domain "src\lib\codexforge\cockpit-model-router-summary" `
  -Route "src\app\cockpit-model-router-summary" `
  -MainPanel "ModelRouterV2RoutePanel" `
  -CommandLabel "Go to Cockpit Model Router Summary" `
  -RouteHref "/cockpit-model-router-summary" `
  -Markers @("Cockpit model router summary", "Cockpit model router summary keeps the cockpit as the normal user surface", "Cockpit model router summary does not call models providers or connectors from the cockpit", "Cockpit model router summary shows capability local private cheapest capable paid pro specialist privacy cost prompt approval fallback denied evidence result and audit", "Phase pages remain dev test diagnostics only", "Cockpit model router checklist")
