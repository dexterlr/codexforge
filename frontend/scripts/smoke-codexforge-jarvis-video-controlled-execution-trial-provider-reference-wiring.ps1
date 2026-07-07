param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3955 Jarvis Video Controlled Execution Trial Provider Reference Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-provider-reference-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-provider-reference-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-provider-reference-wiring' -Phase 'Phase 3955' -Title 'Jarvis Video Controlled Execution Trial Provider Reference Wiring'
