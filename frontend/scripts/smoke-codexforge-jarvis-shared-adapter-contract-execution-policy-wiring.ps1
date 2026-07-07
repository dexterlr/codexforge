param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3608 Jarvis Shared Backend Adapter Contract Execution Policy Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-execution-policy-wiring.ps1' -Route 'jarvis-shared-adapter-contract-execution-policy-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Execution Policy Wiring' -RouteHref '/jarvis-shared-adapter-contract-execution-policy-wiring' -Phase '3608' -Title 'Jarvis Shared Backend Adapter Contract Execution Policy Wiring'
