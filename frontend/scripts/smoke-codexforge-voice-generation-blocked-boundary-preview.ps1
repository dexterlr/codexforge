param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1973 Voice Generation Blocked Boundary Preview"
  ScriptFile = "smoke-codexforge-voice-generation-blocked-boundary-preview.ps1"
  Domain = "src\lib\codexforge\voice-generation-blocked-boundary-preview"
  Route = "src\app\voice-generation-blocked-boundary-preview"
  CommandLabel = "Go to Voice Generation Blocked Boundary Preview"
  RouteHref = "/voice-generation-blocked-boundary-preview"
  Markers = @("Voice generation blocked boundary preview", "Voice generation blocked boundary preview blocks frontend voice cloning frontend audio synthesis frontend provider calls frontend model calls frontend prompt sending frontend audio persistence and frontend consent persistence", "Voice generation blocked boundary preview requires backend-owned provider gateway consent review rights review approval capture and explicit operator approval", "Voice generation blocked boundary preview shows denied voice clone denied audio synthesis denied provider call denied prompt send denied audio persistence denied consent persistence and backend prerequisite", "Denied voice generation paths remain blocked", "Voice generation blocked boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-voiceover-and-caption-planning-workspace-smoke-helper.ps1") @params

