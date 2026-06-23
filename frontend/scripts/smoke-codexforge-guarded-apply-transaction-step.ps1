param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-apply-run-transaction-smoke-helper.ps1") `
  -SmokeName "Phase 1486 Guarded Apply Transaction Step" `
  -ScriptFile "smoke-codexforge-guarded-apply-transaction-step.ps1" `
  -Domain "src\lib\codexforge\guarded-apply-transaction-step" `
  -Route "src\app\guarded-apply-transaction-step" `
  -MainPanel "ApplyRunTransactionRoutePanel" `
  -CommandLabel "Go to Guarded Apply Transaction Step" `
  -RouteHref "/guarded-apply-transaction-step" `
  -Markers @("Guarded apply transaction step", "Guarded apply transaction step does not write files or apply diffs from the UI", "Guarded apply transaction step requires explicit operator approval", "Guarded apply transaction step previews path guard diff apply snapshot evidence rollback and denied path requirements", "Denied guarded apply transaction paths remain blocked", "Guarded apply transaction checklist")
