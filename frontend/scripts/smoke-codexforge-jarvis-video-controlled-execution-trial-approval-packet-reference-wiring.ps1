param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3951 Jarvis Video Controlled Execution Trial Approval Packet Reference Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-approval-packet-reference-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-approval-packet-reference-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-approval-packet-reference-wiring' -Phase 'Phase 3951' -Title 'Jarvis Video Controlled Execution Trial Approval Packet Reference Wiring'
