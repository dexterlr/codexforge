param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1951 Visual Reference Board Preview"
  ScriptFile = "smoke-codexforge-visual-reference-board-preview.ps1"
  Domain = "src\lib\codexforge\visual-reference-board-preview"
  Route = "src\app\visual-reference-board-preview"
  CommandLabel = "Go to Visual Reference Board Preview"
  RouteHref = "/visual-reference-board-preview"
  Markers = @("Visual reference board preview", "Visual reference board preview does not download images upload references call providers generate images store assets or clear rights from the UI", "Visual reference board preview requires backend-owned asset storage and rights review", "Visual reference board preview shows simulated reference card simulated visual purpose simulated source note simulated rights note simulated generation blocked state", "Denied visual reference board paths remain blocked", "Visual reference board checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-and-shot-planning-workspace-smoke-helper.ps1") @params

