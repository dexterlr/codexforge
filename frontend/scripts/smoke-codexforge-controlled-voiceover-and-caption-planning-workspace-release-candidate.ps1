param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1977 Controlled Voiceover And Caption Planning Workspace Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-voiceover-and-caption-planning-workspace-release-candidate.ps1"
  Domain = "src\lib\codexforge\controlled-voiceover-and-caption-planning-workspace-release-candidate"
  Route = "src\app\controlled-voiceover-and-caption-planning-workspace-release-candidate"
  CommandLabel = "Go to Controlled Voiceover And Caption Planning Workspace Release Candidate"
  RouteHref = "/controlled-voiceover-and-caption-planning-workspace-release-candidate"
  Markers = @("Controlled voiceover and caption planning workspace release candidate", "Controlled voiceover and caption planning workspace release candidate does not render videos export files upload assets download assets upload audio download audio store media synthesize voice clone voice transcribe audio burn captions export subtitles call providers call models call connectors generate images generate videos generate voice synthesize audio publish posts schedule content write files persist voice scripts persist captions persist transcripts persist audio persist assets persist rights persist prompts persist jobs persist approvals dispatch workers create queues create artifacts run commands spawn processes bind ports install packages deploy runtimes start runtimes send prompts store credentials probe localhost write browser storage or guarantee performance from the frontend", "Controlled voiceover and caption planning workspace release requires explicit operator approval", "Release candidate adds the Voiceover And Caption Planning Workspace as a review-only planning workspace without frontend voice generation caption export transcription rendering export provider calls model calls audio persistence caption persistence rights persistence prompt persistence job persistence approval persistence publishing scheduling or file mutation", "Denied controlled voiceover and caption planning workspace paths remain blocked", "Controlled voiceover and caption planning workspace checklist")
}
& (Join-Path $PSScriptRoot "codexforge-voiceover-and-caption-planning-workspace-smoke-helper.ps1") @params

