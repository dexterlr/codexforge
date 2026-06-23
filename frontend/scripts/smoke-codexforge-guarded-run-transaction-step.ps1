param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-apply-run-transaction-smoke-helper.ps1") `
  -SmokeName "Phase 1487 Guarded Run Transaction Step" `
  -ScriptFile "smoke-codexforge-guarded-run-transaction-step.ps1" `
  -Domain "src\lib\codexforge\guarded-run-transaction-step" `
  -Route "src\app\guarded-run-transaction-step" `
  -MainPanel "ApplyRunTransactionRoutePanel" `
  -CommandLabel "Go to Guarded Run Transaction Step" `
  -RouteHref "/guarded-run-transaction-step" `
  -Markers @("Guarded run transaction step", "Guarded run transaction step does not run commands from the UI", "Guarded run transaction step requires explicit operator approval", "Guarded run transaction step previews command guard allowlist arguments working directory timeout stdout stderr exit code and denied command requirements", "Denied guarded run transaction paths remain blocked", "Guarded run transaction checklist")
