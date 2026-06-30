param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-performance-review-loop-smoke-helper.ps1") `
  -SmokeName "Phase 1813 Simulated Strategy Change Request Preview" `
  -ScriptFile "smoke-codexforge-simulated-strategy-change-request-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-strategy-change-request-preview" `
  -Route "src\app\simulated-strategy-change-request-preview" `
  -CommandLabel "Go to Simulated Strategy Change Request Preview" `
  -RouteHref "/simulated-strategy-change-request-preview" `
  -Markers @("Simulated strategy change request preview", "Simulated strategy change request preview does not mutate strategy code change trading rules write files or apply diffs from the UI", "Simulated strategy change request preview requires backend-owned change workflow", "Simulated strategy change request preview shows simulated change request simulated rationale simulated evidence links simulated risk impact simulated operator signoff and denied frontend mutation", "Denied simulated strategy change request paths remain blocked", "Simulated strategy change request checklist")
