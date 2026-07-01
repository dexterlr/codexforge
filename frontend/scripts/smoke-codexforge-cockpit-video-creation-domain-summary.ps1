param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1927 Cockpit Video Creation Domain Summary"
  ScriptFile = "smoke-codexforge-cockpit-video-creation-domain-summary.ps1"
  Domain = "src\lib\codexforge\cockpit-video-creation-domain-summary"
  Route = "src\app\cockpit-video-creation-domain-summary"
  CommandLabel = "Go to Cockpit Video Creation Domain Summary"
  RouteHref = "/cockpit-video-creation-domain-summary"
  Markers = @("Cockpit video creation domain summary", "Cockpit video creation domain summary keeps the cockpit as the normal user surface", "Cockpit video creation domain summary does not render videos export files upload assets download assets call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals or write files from the cockpit", "Cockpit video creation domain summary shows workspace intake project brief audience and goal format boundary safety and rights asset planning script planning storyboard planning voiceover planning caption planning render job blocked export blocked and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit video creation domain checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-creation-domain-smoke-helper.ps1") @params
