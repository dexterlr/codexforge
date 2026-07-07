param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3619 Jarvis Shared Backend Adapter Contract Avatar Manifest Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-avatar-manifest-wiring.ps1' -Route 'jarvis-shared-adapter-contract-avatar-manifest-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Avatar Manifest Wiring' -RouteHref '/jarvis-shared-adapter-contract-avatar-manifest-wiring' -Phase '3619' -Title 'Jarvis Shared Backend Adapter Contract Avatar Manifest Wiring'
