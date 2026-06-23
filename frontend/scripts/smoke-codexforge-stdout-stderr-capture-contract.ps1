param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-command-runner-safety-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1504 Stdout Stderr Capture Contract" `
  -ScriptFile "smoke-codexforge-stdout-stderr-capture-contract.ps1" `
  -Domain "src\lib\codexforge\stdout-stderr-capture-contract" `
  -Route "src\app\stdout-stderr-capture-contract" `
  -MainPanel "CommandRunnerSafetyV2RoutePanel" `
  -CommandLabel "Go to Stdout Stderr Capture Contract" `
  -RouteHref "/stdout-stderr-capture-contract" `
  -Markers @("Stdout stderr capture contract", "Stdout stderr capture contract does not capture live output from the UI", "Stdout stderr capture contract requires backend-owned command execution", "Stdout stderr capture contract defines stdout stderr truncation redaction timestamps exit code references and evidence linkage", "Denied stdout stderr capture paths remain blocked", "Stdout stderr capture checklist")
