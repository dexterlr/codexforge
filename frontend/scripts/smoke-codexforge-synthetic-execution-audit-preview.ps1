param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-broker-adapter-simulator-smoke-helper.ps1") `
  -SmokeName "Phase 1765 Synthetic Execution Audit Preview" `
  -ScriptFile "smoke-codexforge-synthetic-execution-audit-preview.ps1" `
  -Domain "src\lib\codexforge\synthetic-execution-audit-preview" `
  -Route "src\app\synthetic-execution-audit-preview" `
  -CommandLabel "Go to Synthetic Execution Audit Preview" `
  -RouteHref "/synthetic-execution-audit-preview" `
  -Markers @("Synthetic execution audit preview", "Synthetic execution audit preview does not persist execution evidence results audit approvals queues transactions or broker decisions from the UI", "Synthetic execution audit preview requires backend-owned synthetic audit capture", "Synthetic execution audit preview shows simulated intent evidence simulated validation evidence simulated queue evidence simulated fill evidence simulated rejection evidence redaction and audit continuity", "Denied synthetic execution audit paths remain blocked", "Synthetic execution audit checklist")
