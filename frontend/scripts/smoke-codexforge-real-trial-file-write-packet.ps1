param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-controlled-operator-trial-packet-smoke-helper.ps1") `
  -SmokeName "Phase 1293 Real Trial File Write Packet" `
  -ScriptFile "smoke-codexforge-real-trial-file-write-packet.ps1" `
  -Domain "src\lib\codexforge\real-trial-file-write-packet" `
  -Route "src\app\real-trial-file-write-packet" `
  -MainPanel "RealControlledOperatorTrialPacketRoutePanel" `
  -CommandLabel "Go to Real Trial File Write Packet" `
  -RouteHref "/real-trial-file-write-packet" `
  -Markers @("Real trial file write packet", "Real trial file write packet does not write files or apply diffs", "Real trial file write packet requires explicit operator approval", "File write packet shows target path guard before after diff rollback and denied mutation review", "Denied real trial file write paths remain blocked", "Real trial file write checklist")
