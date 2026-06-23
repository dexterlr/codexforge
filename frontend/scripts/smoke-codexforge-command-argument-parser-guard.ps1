param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-command-runner-safety-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1500 Command Argument Parser Guard" `
  -ScriptFile "smoke-codexforge-command-argument-parser-guard.ps1" `
  -Domain "src\lib\codexforge\command-argument-parser-guard" `
  -Route "src\app\command-argument-parser-guard" `
  -MainPanel "CommandRunnerSafetyV2RoutePanel" `
  -CommandLabel "Go to Command Argument Parser Guard" `
  -RouteHref "/command-argument-parser-guard" `
  -Markers @("Command argument parser guard", "Command argument parser guard does not run parsed commands", "Command argument parser guard requires explicit operator approval", "Command argument parser guard checks unsafe flags shell operators chained commands redirection traversal encoded payloads and unknown arguments", "Denied command argument paths remain blocked", "Command argument parser checklist")
