param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1971 Transcript Review Lane Preview"
  ScriptFile = "smoke-codexforge-transcript-review-lane-preview.ps1"
  Domain = "src\lib\codexforge\transcript-review-lane-preview"
  Route = "src\app\transcript-review-lane-preview"
  CommandLabel = "Go to Transcript Review Lane Preview"
  RouteHref = "/transcript-review-lane-preview"
  Markers = @("Transcript review lane preview", "Transcript review lane preview does not transcribe audio call models persist transcripts write files or approve captions from the UI", "Transcript review lane preview requires backend-owned transcript workflow and approval capture", "Transcript review lane preview shows simulated transcript note simulated correction note simulated review owner simulated approval state simulated denied frontend transcript persistence", "Denied transcript review lane paths remain blocked", "Transcript review lane checklist")
}
& (Join-Path $PSScriptRoot "codexforge-voiceover-and-caption-planning-workspace-smoke-helper.ps1") @params

