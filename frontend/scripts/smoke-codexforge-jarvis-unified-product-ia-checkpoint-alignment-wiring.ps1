$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3942 Jarvis Unified Product IA Checkpoint Alignment Wiring' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-checkpoint-alignment-wiring' -CommandLabel 'Go to Jarvis Unified Product IA Checkpoint Alignment Wiring' -RouteHref '/jarvis-unified-product-ia-checkpoint-alignment-wiring' -Phase 'Phase 3942' -Title 'Jarvis Unified Product IA Checkpoint Alignment Wiring'