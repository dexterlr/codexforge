param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1933 Scene Beat Outline Preview"
  ScriptFile = "smoke-codexforge-scene-beat-outline-preview.ps1"
  Domain = "src\lib\codexforge\scene-beat-outline-preview"
  Route = "src\app\scene-beat-outline-preview"
  CommandLabel = "Go to Scene Beat Outline Preview"
  RouteHref = "/scene-beat-outline-preview"
  Markers = @("Scene beat outline preview", "Scene beat outline preview does not write scripts generate timelines persist outlines or create files from the UI", "Scene beat outline preview requires deterministic synthetic beat outlines only", "Scene beat outline preview shows simulated intro beat simulated proof beat simulated demo beat simulated CTA beat simulated review note and denied frontend persistence", "Denied scene beat outline paths remain blocked", "Scene beat outline checklist")
}
& (Join-Path $PSScriptRoot "codexforge-script-and-storyboard-workspace-smoke-helper.ps1") @params

