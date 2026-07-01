param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1932 Hook And Opening Beat Preview"
  ScriptFile = "smoke-codexforge-hook-and-opening-beat-preview.ps1"
  Domain = "src\lib\codexforge\hook-and-opening-beat-preview"
  Route = "src\app\hook-and-opening-beat-preview"
  CommandLabel = "Go to Hook And Opening Beat Preview"
  RouteHref = "/hook-and-opening-beat-preview"
  Markers = @("Hook and opening beat preview", "Hook and opening beat preview does not generate final copy call providers persist prompts or publish content from the UI", "Hook and opening beat preview requires deterministic synthetic opening beat planning only", "Hook and opening beat preview shows simulated hook option simulated opening question simulated visual beat simulated voice note simulated no model call state", "Denied hook and opening beat paths remain blocked", "Hook and opening beat checklist")
}
& (Join-Path $PSScriptRoot "codexforge-script-and-storyboard-workspace-smoke-helper.ps1") @params

