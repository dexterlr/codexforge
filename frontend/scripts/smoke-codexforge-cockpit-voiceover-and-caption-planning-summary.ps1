param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1975 Cockpit Voiceover And Caption Planning Summary"
  ScriptFile = "smoke-codexforge-cockpit-voiceover-and-caption-planning-summary.ps1"
  Domain = "src\lib\codexforge\cockpit-voiceover-and-caption-planning-summary"
  Route = "src\app\cockpit-voiceover-and-caption-planning-summary"
  CommandLabel = "Go to Cockpit Voiceover And Caption Planning Summary"
  RouteHref = "/cockpit-voiceover-and-caption-planning-summary"
  Markers = @("Cockpit voiceover and caption planning summary", "Cockpit voiceover and caption planning summary keeps the cockpit as the normal user surface", "Cockpit voiceover and caption planning summary does not synthesize voice clone voice transcribe audio burn captions export subtitles upload audio download audio render videos export files call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals persist voice scripts persist captions persist transcripts persist audio persist rights or write files from the cockpit", "Cockpit voiceover and caption planning summary shows narration brief voice tone and pace consent and rights audio cues caption style subtitle timing lower thirds accessibility notes transcript review audio caption blockers voice generation blocked caption export blocked and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit voiceover and caption planning checklist")
}
& (Join-Path $PSScriptRoot "codexforge-voiceover-and-caption-planning-workspace-smoke-helper.ps1") @params

