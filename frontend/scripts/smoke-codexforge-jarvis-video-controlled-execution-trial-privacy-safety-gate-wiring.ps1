param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3963 Jarvis Video Controlled Execution Trial Privacy Safety Gate Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-privacy-safety-gate-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-privacy-safety-gate-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-privacy-safety-gate-wiring' -Phase 'Phase 3963' -Title 'Jarvis Video Controlled Execution Trial Privacy Safety Gate Wiring'
