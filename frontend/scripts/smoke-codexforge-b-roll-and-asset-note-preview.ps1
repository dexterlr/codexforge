param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1937 B-Roll And Asset Note Preview"
  ScriptFile = "smoke-codexforge-b-roll-and-asset-note-preview.ps1"
  Domain = "src\lib\codexforge\b-roll-and-asset-note-preview"
  Route = "src\app\b-roll-and-asset-note-preview"
  CommandLabel = "Go to B-Roll And Asset Note Preview"
  RouteHref = "/b-roll-and-asset-note-preview"
  Markers = @("B-roll and asset note preview", "B-roll and asset note preview does not upload assets download assets store media mutate files or call asset providers from the UI", "B-roll and asset note preview requires backend-owned asset storage", "B-roll and asset note preview shows simulated b-roll need simulated logo need simulated product shot need simulated music note simulated storage prerequisite and denied frontend persistence", "Denied b-roll and asset note paths remain blocked", "B-roll and asset note checklist")
}
& (Join-Path $PSScriptRoot "codexforge-script-and-storyboard-workspace-smoke-helper.ps1") @params

