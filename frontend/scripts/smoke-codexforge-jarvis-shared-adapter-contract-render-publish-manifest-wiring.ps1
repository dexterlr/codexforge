param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3623 Jarvis Shared Backend Adapter Contract Render Publish Manifest Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-render-publish-manifest-wiring.ps1' -Route 'jarvis-shared-adapter-contract-render-publish-manifest-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Render Publish Manifest Wiring' -RouteHref '/jarvis-shared-adapter-contract-render-publish-manifest-wiring' -Phase '3623' -Title 'Jarvis Shared Backend Adapter Contract Render Publish Manifest Wiring'
