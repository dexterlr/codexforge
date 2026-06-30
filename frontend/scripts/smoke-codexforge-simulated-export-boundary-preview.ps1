param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-result-ledger-smoke-helper.ps1") `
  -SmokeName "Phase 1782 Simulated Export Boundary Preview" `
  -ScriptFile "smoke-codexforge-simulated-export-boundary-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-export-boundary-preview" `
  -Route "src\app\simulated-export-boundary-preview" `
  -CommandLabel "Go to Simulated Export Boundary Preview" `
  -RouteHref "/simulated-export-boundary-preview" `
  -Markers @("Simulated export boundary preview", "Simulated export boundary preview does not download files write files export ledgers send reports or persist artifacts from the UI", "Simulated export boundary preview requires backend-owned export boundary", "Simulated export boundary preview shows simulated export request simulated redaction requirement simulated approval requirement simulated artifact boundary and denied frontend file writes", "Denied simulated export boundary paths remain blocked", "Simulated export boundary checklist")
