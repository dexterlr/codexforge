param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3956 Jarvis Video Controlled Execution Trial Credential Token Boundary Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-credential-token-boundary-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-credential-token-boundary-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-credential-token-boundary-wiring' -Phase 'Phase 3956' -Title 'Jarvis Video Controlled Execution Trial Credential Token Boundary Wiring'
