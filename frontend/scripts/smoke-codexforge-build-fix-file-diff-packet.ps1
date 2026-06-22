param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1246 Build Fix File Diff Packet" `
  -ScriptFile "smoke-codexforge-build-fix-file-diff-packet.ps1" `
  -Domain "src\lib\codexforge\build-fix-file-diff-packet" `
  -Route "src\app\build-fix-file-diff-packet" `
  -MainPanel "EndToEndBuildFixWorkflowRoutePanel" `
  -CommandLabel "Go to Build Fix File Diff Packet" `
  -RouteHref "/build-fix-file-diff-packet" `
  -Markers @("Build fix file diff packet", "Build fix file diff packet does not write files", "Build fix file diff requires explicit operator approval before future apply", "File diff packet shows path guard before after diff and rollback preview", "Denied build fix file diff paths remain blocked", "Build fix file diff checklist")
