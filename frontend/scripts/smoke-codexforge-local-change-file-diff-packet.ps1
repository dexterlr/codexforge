param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1229 Local Change File Diff Packet" `
  -ScriptFile "smoke-codexforge-local-change-file-diff-packet.ps1" `
  -Domain "src\lib\codexforge\local-change-file-diff-packet" `
  -Route "src\app\local-change-file-diff-packet" `
  -MainPanel "FirstLocalChangeTrialRoutePanel" `
  -CommandLabel "Go to Local Change File Diff Packet" `
  -RouteHref "/local-change-file-diff-packet" `
  -Markers @("Local change file diff packet", "Local change file diff packet does not write files", "Local change file diff requires explicit operator approval before future apply", "File diff packet shows path guard before after diff and rollback preview", "Denied local change file diff paths remain blocked", "Local change file diff checklist")
