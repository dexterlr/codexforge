param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3599 Jarvis Shared Backend Adapter Contract Permission Posture Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-permission-posture-wiring.ps1' -Route 'jarvis-shared-adapter-contract-permission-posture-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Permission Posture Wiring' -RouteHref '/jarvis-shared-adapter-contract-permission-posture-wiring' -Phase '3599' -Title 'Jarvis Shared Backend Adapter Contract Permission Posture Wiring'
