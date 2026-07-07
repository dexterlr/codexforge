param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3962 Jarvis Video Controlled Execution Trial Duration Resolution Size Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-duration-resolution-size-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-duration-resolution-size-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-duration-resolution-size-wiring' -Phase 'Phase 3962' -Title 'Jarvis Video Controlled Execution Trial Duration Resolution Size Wiring'
