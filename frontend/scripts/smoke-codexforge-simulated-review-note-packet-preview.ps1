param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-review-dashboard-smoke-helper.ps1") `
  -SmokeName "Phase 1795 Simulated Review Note Packet Preview" `
  -ScriptFile "smoke-codexforge-simulated-review-note-packet-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-review-note-packet-preview" `
  -Route "src\app\simulated-review-note-packet-preview" `
  -CommandLabel "Go to Simulated Review Note Packet Preview" `
  -RouteHref "/simulated-review-note-packet-preview" `
  -Markers @("Simulated review note packet preview", "Simulated review note packet preview does not save notes persist memory write files or mutate audit trails from the UI", "Simulated review note packet preview requires backend-owned review note capture", "Simulated review note packet preview shows simulated note body simulated reviewer placeholder simulated redaction requirement simulated linked evidence simulated retention note and denied frontend persistence", "Denied simulated review note packet paths remain blocked", "Simulated review note packet checklist")
