param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1936 Visual Reference Planning Preview"
  ScriptFile = "smoke-codexforge-visual-reference-planning-preview.ps1"
  Domain = "src\lib\codexforge\visual-reference-planning-preview"
  Route = "src\app\visual-reference-planning-preview"
  CommandLabel = "Go to Visual Reference Planning Preview"
  RouteHref = "/visual-reference-planning-preview"
  Markers = @("Visual reference planning preview", "Visual reference planning preview does not download images upload references call providers generate images or store assets from the UI", "Visual reference planning preview requires backend-owned asset storage and rights review", "Visual reference planning preview shows simulated reference purpose simulated source note simulated rights note simulated brand safety note simulated asset persistence blocked state", "Denied visual reference planning paths remain blocked", "Visual reference planning checklist")
}
& (Join-Path $PSScriptRoot "codexforge-script-and-storyboard-workspace-smoke-helper.ps1") @params

