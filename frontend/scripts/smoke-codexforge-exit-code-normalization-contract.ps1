param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-command-runner-safety-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1505 Exit Code Normalization Contract" `
  -ScriptFile "smoke-codexforge-exit-code-normalization-contract.ps1" `
  -Domain "src\lib\codexforge\exit-code-normalization-contract" `
  -Route "src\app\exit-code-normalization-contract" `
  -MainPanel "CommandRunnerSafetyV2RoutePanel" `
  -CommandLabel "Go to Exit Code Normalization Contract" `
  -RouteHref "/exit-code-normalization-contract" `
  -Markers @("Exit code normalization contract", "Exit code normalization contract does not run commands", "Exit code normalization contract requires backend-owned result capture", "Exit code normalization contract maps zero nonzero timeout canceled denied blocked failed and manual-review outcomes", "Denied exit code normalization paths remain blocked", "Exit code normalization checklist")
