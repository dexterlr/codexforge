param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-evidence-memory-smoke-helper.ps1") `
  -SmokeName "Phase 1455 Command Memory Snapshot Preview" `
  -ScriptFile "smoke-codexforge-command-memory-snapshot-preview.ps1" `
  -Domain "src\lib\codexforge\command-memory-snapshot-preview" `
  -Route "src\app\command-memory-snapshot-preview" `
  -MainPanel "EvidenceMemoryRoutePanel" `
  -CommandLabel "Go to Command Memory Snapshot Preview" `
  -RouteHref "/command-memory-snapshot-preview" `
  -Markers @("Command memory snapshot preview", "Command memory snapshot preview does not run commands", "Command memory snapshot preview requires explicit operator approval before promotion", "Command memory snapshot captures command candidates allowlist status arguments working directory timeout evidence and denied commands", "Denied command memory paths remain blocked", "Command memory snapshot checklist")
