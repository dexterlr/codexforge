param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-performance-review-loop-smoke-helper.ps1") `
  -SmokeName "Phase 1808 Simulated Invalidation Review Preview" `
  -ScriptFile "smoke-codexforge-simulated-invalidation-review-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-invalidation-review-preview" `
  -Route "src\app\simulated-invalidation-review-preview" `
  -CommandLabel "Go to Simulated Invalidation Review Preview" `
  -RouteHref "/simulated-invalidation-review-preview" `
  -Markers @("Simulated invalidation review preview", "Simulated invalidation review preview does not invalidate live trades cancel orders or mutate broker state from the UI", "Simulated invalidation review preview requires deterministic synthetic invalidation rows only", "Simulated invalidation review preview shows simulated thesis broken simulated risk breach simulated catalyst failure simulated stale setup simulated operator hold and review-only decision", "Denied simulated invalidation review paths remain blocked", "Simulated invalidation review checklist")
