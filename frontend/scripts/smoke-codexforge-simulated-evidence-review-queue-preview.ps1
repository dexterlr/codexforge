param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-review-dashboard-smoke-helper.ps1") `
  -SmokeName "Phase 1790 Simulated Evidence Review Queue Preview" `
  -ScriptFile "smoke-codexforge-simulated-evidence-review-queue-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-evidence-review-queue-preview" `
  -Route "src\app\simulated-evidence-review-queue-preview" `
  -CommandLabel "Go to Simulated Evidence Review Queue Preview" `
  -RouteHref "/simulated-evidence-review-queue-preview" `
  -Markers @("Simulated evidence review queue preview", "Simulated evidence review queue preview does not persist evidence mutate audit trails write files or promote memory from the UI", "Simulated evidence review queue preview requires deterministic synthetic evidence rows only", "Simulated evidence review queue preview shows simulated intent evidence simulated validation evidence simulated fill evidence simulated rejection evidence simulated P&L evidence and redaction note", "Denied simulated evidence review queue paths remain blocked", "Simulated evidence review queue checklist")
