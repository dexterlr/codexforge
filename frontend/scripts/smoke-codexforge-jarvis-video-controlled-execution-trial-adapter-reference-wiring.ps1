param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3952 Jarvis Video Controlled Execution Trial Adapter Reference Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-adapter-reference-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-adapter-reference-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-adapter-reference-wiring' -Phase 'Phase 3952' -Title 'Jarvis Video Controlled Execution Trial Adapter Reference Wiring'
