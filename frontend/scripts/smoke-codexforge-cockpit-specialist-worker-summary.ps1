param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-specialist-worker-registry-smoke-helper.ps1") `
  -SmokeName "Cockpit Specialist Worker Summary" `
  -ScriptFile "smoke-codexforge-cockpit-specialist-worker-summary.ps1" `
  -Domain "src\lib\codexforge\cockpit-specialist-worker-summary" `
  -Route "src\app\cockpit-specialist-worker-summary" `
  -MainPanel "SpecialistWorkerRegistryRoutePanel" `
  -CommandLabel "Go to Cockpit Specialist Worker Summary" `
  -RouteHref "/cockpit-specialist-worker-summary" `
  -Markers @("Cockpit specialist worker summary", "Cockpit specialist worker summary keeps the cockpit as the normal user surface", "No worker dispatch from the cockpit", "No model calls from the cockpit", "No provider calls from the cockpit", "No connector calls from the cockpit", "No command execution from the cockpit", "Backend-owned worker routing remains required", "Explicit operator approval remains required", "Cockpit specialist worker checklist")
