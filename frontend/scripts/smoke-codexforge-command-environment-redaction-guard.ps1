param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-command-runner-safety-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1502 Command Environment Redaction Guard" `
  -ScriptFile "smoke-codexforge-command-environment-redaction-guard.ps1" `
  -Domain "src\lib\codexforge\command-environment-redaction-guard" `
  -Route "src\app\command-environment-redaction-guard" `
  -MainPanel "CommandRunnerSafetyV2RoutePanel" `
  -CommandLabel "Go to Command Environment Redaction Guard" `
  -RouteHref "/command-environment-redaction-guard" `
  -Markers @("Command environment redaction guard", "Command environment redaction guard does not read or display environment values", "Command environment redaction guard requires explicit operator approval", "Command environment redaction guard shows environment names only and blocks secrets tokens credentials keys and raw values", "Denied command environment paths remain blocked", "Command environment redaction checklist")
