param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-review-dashboard-smoke-helper.ps1") `
  -SmokeName "Phase 1797 Simulated Dashboard Export Boundary Preview" `
  -ScriptFile "smoke-codexforge-simulated-dashboard-export-boundary-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-dashboard-export-boundary-preview" `
  -Route "src\app\simulated-dashboard-export-boundary-preview" `
  -CommandLabel "Go to Simulated Dashboard Export Boundary Preview" `
  -RouteHref "/simulated-dashboard-export-boundary-preview" `
  -Markers @("Simulated dashboard export boundary preview", "Simulated dashboard export boundary preview does not download files write files export reports send reports or persist artifacts from the UI", "Simulated dashboard export boundary preview requires backend-owned export boundary", "Simulated dashboard export boundary preview shows simulated dashboard export request simulated redaction requirement simulated approval requirement simulated artifact boundary and denied frontend file writes", "Denied simulated dashboard export boundary paths remain blocked", "Simulated dashboard export boundary checklist")
