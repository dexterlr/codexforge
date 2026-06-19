param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 828 Command Runner Backend Dry-Run Packet" `
  -ScriptFile "smoke-codexforge-command-runner-backend-dry-run-packet.ps1" `
  -Domain "src\lib\codexforge\command-runner-backend-dry-run-packet" `
  -Route "src\app\command-runner-backend-dry-run-packet" `
  -MainPanel "CommandRunnerBackendDryRunPacketPanel" `
  -CommandLabel "Go to Command Runner Backend Dry-Run Packet" `
  -Modules @("command-runner-backend-dry-run-packet-model.ts", "index.ts") `
  -Components @("CommandRunnerBackendDryRunPacketPanel.tsx", "index.ts") `
  -Exports @("buildCommandRunnerBackendDryRunPacketStableKey", "buildCommandRunnerBackendDryRunPacket", "buildCommandRunnerBackendDryRunPacketItems", "buildCommandRunnerBackendDryRunPacketBoundary", "buildCommandRunnerBackendDryRunPacketModel", "summarizeCommandRunnerBackendDryRunPacket", "COMMAND_RUNNER_BACKEND_DRY_RUN_PACKET_LANGUAGE") `
  -PhaseMarkers @("Command runner backend dry-run packet", "Command runner backend dry-run packet does not execute commands", "Command dry-runs require explicit operator approval", "Denied command dry-run paths remain blocked", "Command dry-run groups", "Command dry-run checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Command runner backend dry-run packet does not execute commands", "Command dry-runs require explicit operator approval", "Denied command dry-run paths remain blocked") `
  -RouteHref "/command-runner-backend-dry-run-packet"

Write-Host "[OK] CodexForge Phase 828 Command runner backend dry-run packet smoke passed."
