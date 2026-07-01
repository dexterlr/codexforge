param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1941 Model Generation Blocked Boundary Preview"
  ScriptFile = "smoke-codexforge-model-generation-blocked-boundary-preview.ps1"
  Domain = "src\lib\codexforge\model-generation-blocked-boundary-preview"
  Route = "src\app\model-generation-blocked-boundary-preview"
  CommandLabel = "Go to Model Generation Blocked Boundary Preview"
  RouteHref = "/model-generation-blocked-boundary-preview"
  Markers = @("Model generation blocked boundary preview", "Model generation blocked boundary preview blocks frontend prompt sending frontend model calls frontend provider calls frontend connector calls frontend script generation and frontend storyboard image generation", "Model generation blocked boundary preview requires backend-owned provider gateway prompt review approval capture and explicit operator approval", "Model generation blocked boundary preview shows denied prompt send denied model call denied provider call denied connector call denied generated script and backend prerequisite", "Denied model generation paths remain blocked", "Model generation blocked boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-script-and-storyboard-workspace-smoke-helper.ps1") @params

