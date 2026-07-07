param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3596 Jarvis Shared Backend Adapter Contract Capability Id Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-capability-id-wiring.ps1' -Route 'jarvis-shared-adapter-contract-capability-id-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Capability Id Wiring' -RouteHref '/jarvis-shared-adapter-contract-capability-id-wiring' -Phase '3596' -Title 'Jarvis Shared Backend Adapter Contract Capability Id Wiring'
