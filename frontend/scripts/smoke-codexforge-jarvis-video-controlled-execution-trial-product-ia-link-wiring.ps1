param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-controlled-execution-trial-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke -SmokeName 'Phase 3972 Jarvis Video Controlled Execution Trial Product IA Link Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-controlled-execution-trial-product-ia-link-wiring.ps1' -Route 'jarvis-video-controlled-execution-trial-product-ia-link-wiring' -RouteHref '/jarvis-video-controlled-execution-trial-product-ia-link-wiring' -Phase 'Phase 3972' -Title 'Jarvis Video Controlled Execution Trial Product IA Link Wiring'
