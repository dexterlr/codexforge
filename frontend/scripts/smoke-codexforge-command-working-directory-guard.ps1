param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-command-runner-safety-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1182 Command Working Directory Guard" `
  -ScriptFile "smoke-codexforge-command-working-directory-guard.ps1" `
  -Domain "src\lib\codexforge\command-working-directory-guard" `
  -Route "src\app\command-working-directory-guard" `
  -MainPanel "CommandRunnerSafetyV2RoutePanel" `
  -CommandLabel "Go to Command Working Directory Guard" `
  -RouteHref "/command-working-directory-guard" `
  -Markers @("Command working directory guard", "Command working directory guard does not change directories or run commands from the UI", "Command working directory guard requires explicit operator approval", "Command working directory guard checks workspace root containment traversal denial repository boundary and generated output paths", "Denied command working directory paths remain blocked", "Command working directory checklist")
