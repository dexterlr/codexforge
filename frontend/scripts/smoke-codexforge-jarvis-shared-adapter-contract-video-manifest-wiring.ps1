param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3617 Jarvis Shared Backend Adapter Contract Video Manifest Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-video-manifest-wiring.ps1' -Route 'jarvis-shared-adapter-contract-video-manifest-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Video Manifest Wiring' -RouteHref '/jarvis-shared-adapter-contract-video-manifest-wiring' -Phase '3617' -Title 'Jarvis Shared Backend Adapter Contract Video Manifest Wiring'
