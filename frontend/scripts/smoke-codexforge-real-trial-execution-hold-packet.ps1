param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-controlled-operator-trial-packet-smoke-helper.ps1") `
  -SmokeName "Phase 1296 Real Trial Execution Hold Packet" `
  -ScriptFile "smoke-codexforge-real-trial-execution-hold-packet.ps1" `
  -Domain "src\lib\codexforge\real-trial-execution-hold-packet" `
  -Route "src\app\real-trial-execution-hold-packet" `
  -MainPanel "RealControlledOperatorTrialPacketRoutePanel" `
  -CommandLabel "Go to Real Trial Execution Hold Packet" `
  -RouteHref "/real-trial-execution-hold-packet" `
  -Markers @("Real trial execution hold packet", "Real trial execution hold packet does not release execution locks", "Real trial execution hold packet requires explicit operator approval", "Execution hold packet keeps file writes commands models providers connectors runtimes adapters persistence recovery exports queues and memory promotion blocked", "Denied real trial execution hold paths remain blocked", "Real trial execution hold checklist")
