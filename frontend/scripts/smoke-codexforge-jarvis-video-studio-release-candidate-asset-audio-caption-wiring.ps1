param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4048 Jarvis Video Studio Release Candidate Asset Audio Caption Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-asset-audio-caption-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-asset-audio-caption-wiring' -RouteHref '/jarvis-video-studio-release-candidate-asset-audio-caption-wiring' -Phase 'Phase 4048' -Title 'Jarvis Video Studio Release Candidate Asset Audio Caption Wiring'
