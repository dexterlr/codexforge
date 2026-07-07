param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3977 Jarvis Video Controlled Execution Trial Completion' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-completion.ps1' -Route 'jarvis-video-controlled-execution-trial-completion' -RouteHref '/jarvis-video-controlled-execution-trial-completion' -Phase 'Phase 3977' -Title 'Jarvis Video Controlled Execution Trial Completion'
