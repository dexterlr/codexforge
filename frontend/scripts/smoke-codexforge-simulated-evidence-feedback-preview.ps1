param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-performance-review-loop-smoke-helper.ps1") `
  -SmokeName "Phase 1809 Simulated Evidence Feedback Preview" `
  -ScriptFile "smoke-codexforge-simulated-evidence-feedback-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-evidence-feedback-preview" `
  -Route "src\app\simulated-evidence-feedback-preview" `
  -CommandLabel "Go to Simulated Evidence Feedback Preview" `
  -RouteHref "/simulated-evidence-feedback-preview" `
  -Markers @("Simulated evidence feedback preview", "Simulated evidence feedback preview does not persist evidence promote memory write files or mutate audit trails from the UI", "Simulated evidence feedback preview requires backend-owned evidence capture", "Simulated evidence feedback preview shows simulated evidence gap simulated evidence match simulated review note simulated redaction requirement simulated source continuity and denied frontend persistence", "Denied simulated evidence feedback paths remain blocked", "Simulated evidence feedback checklist")
