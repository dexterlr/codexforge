param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1962 Voiceover And Caption Planning Workspace Boundary"
  ScriptFile = "smoke-codexforge-voiceover-and-caption-planning-workspace-boundary.ps1"
  Domain = "src\lib\codexforge\voiceover-and-caption-planning-workspace-boundary"
  Route = "src\app\voiceover-and-caption-planning-workspace-boundary"
  CommandLabel = "Go to Voiceover And Caption Planning Workspace Boundary"
  RouteHref = "/voiceover-and-caption-planning-workspace-boundary"
  Markers = @("Voiceover and caption planning workspace boundary", "Voiceover and caption planning workspace boundary does not synthesize voice clone voice transcribe audio burn captions export subtitles upload audio download audio render videos export files call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals persist voice scripts persist captions persist transcripts persist audio persist rights or write files from the UI", "Voiceover and caption planning workspace boundary requires explicit operator approval", "Voiceover and caption planning workspace boundary prepares deterministic synthetic voiceover and caption planning workflows without frontend audio generation transcription rendering export provider calls caption persistence audio persistence rights persistence or publishing", "Denied voiceover and caption planning workspace paths remain blocked", "Voiceover and caption planning workspace boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-voiceover-and-caption-planning-workspace-smoke-helper.ps1") @params

