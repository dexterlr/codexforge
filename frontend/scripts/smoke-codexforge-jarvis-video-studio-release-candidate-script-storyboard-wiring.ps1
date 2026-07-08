param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4047 Jarvis Video Studio Release Candidate Script Storyboard Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-script-storyboard-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-script-storyboard-wiring' -RouteHref '/jarvis-video-studio-release-candidate-script-storyboard-wiring' -Phase 'Phase 4047' -Title 'Jarvis Video Studio Release Candidate Script Storyboard Wiring'
