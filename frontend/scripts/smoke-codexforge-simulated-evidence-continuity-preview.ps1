param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-result-ledger-smoke-helper.ps1") `
  -SmokeName "Phase 1781 Simulated Evidence Continuity Preview" `
  -ScriptFile "smoke-codexforge-simulated-evidence-continuity-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-evidence-continuity-preview" `
  -Route "src\app\simulated-evidence-continuity-preview" `
  -CommandLabel "Go to Simulated Evidence Continuity Preview" `
  -RouteHref "/simulated-evidence-continuity-preview" `
  -Markers @("Simulated evidence continuity preview", "Simulated evidence continuity preview does not promote memory persist evidence mutate audit trails or write files from the UI", "Simulated evidence continuity preview requires backend-owned evidence continuity", "Simulated evidence continuity preview shows simulated evidence chain simulated source references simulated redaction simulated review state simulated retention note and denied frontend persistence", "Denied simulated evidence continuity paths remain blocked", "Simulated evidence continuity checklist")
