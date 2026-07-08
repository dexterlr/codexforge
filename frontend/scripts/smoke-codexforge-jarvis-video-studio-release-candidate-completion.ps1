param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4073 Jarvis Video Studio Release Candidate Completion' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-completion.ps1' -Route 'jarvis-video-studio-release-candidate-completion' -RouteHref '/jarvis-video-studio-release-candidate-completion' -Phase 'Phase 4073' -Title 'Jarvis Video Studio Release Candidate Completion'
