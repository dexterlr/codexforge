param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-command-runner-safety-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1509 Command Evidence Packet" `
  -ScriptFile "smoke-codexforge-command-evidence-packet.ps1" `
  -Domain "src\lib\codexforge\command-evidence-packet" `
  -Route "src\app\command-evidence-packet" `
  -MainPanel "CommandRunnerSafetyV2RoutePanel" `
  -CommandLabel "Go to Command Evidence Packet" `
  -RouteHref "/command-evidence-packet" `
  -Markers @("Command evidence packet", "Command evidence packet does not persist evidence from the UI", "Command evidence packet requires backend-owned evidence capture", "Command evidence packet previews command text allowlist arguments working directory environment names timeout stdout stderr exit code redaction and audit references", "Denied command evidence paths remain blocked", "Command evidence checklist")
