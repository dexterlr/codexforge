param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Cloud Video Provider Fallback Registry" `
  -ScriptFile "smoke-codexforge-cloud-video-provider-fallback-registry.ps1" `
  -Domain "src\lib\codexforge\cloud-video-provider-fallback-registry" `
  -Route "src\app\cloud-video-providers" `
  -MainPanel "CloudVideoProviderFallbackRegistryPanel" `
  -CommandLabel "Go to Cloud Video Providers" `
  -Modules @("cloud-video-provider-types.ts","cloud-video-provider.ts","cloud-video-provider-kind.ts","cloud-video-capability.ts","cloud-video-cost-risk.ts","cloud-video-fallback-policy.ts","cloud-video-provider-handoff.ts","cloud-video-provider-summary.ts","index.ts") `
  -Components @("CloudVideoProviderFallbackRegistryPanel.tsx","CloudVideoProviderPanel.tsx","CloudVideoProviderKindPanel.tsx","CloudVideoCapabilityPanel.tsx","CloudVideoCostRiskPanel.tsx","CloudVideoFallbackPolicyPanel.tsx","CloudVideoProviderHandoffPanel.tsx","CloudVideoProviderSummaryPanel.tsx","CloudVideoProviderSafetyStrip.tsx","CloudVideoProviderEmptyState.tsx","index.ts") `
  -Exports @("buildCloudVideoProvider","buildDefaultCloudVideoProviders","buildCloudVideoProviderKind","buildCloudVideoCapability","buildCloudVideoCostRisk","buildCloudVideoFallbackPolicy","buildCloudVideoProviderHandoff","buildCloudVideoProviderSummary","summarizeCloudVideoProviders") `
  -PlainEnglish @("Cloud video fallback","Keep local-first, and use cloud only when it is worth it.","Review cloud fallback options","runway","pika","replicate","luma","kling","veo","sora-manual","custom-http-video","manual-cloud-provider","unknown","text-to-video","image-to-video","keyframe-to-video","upscale","extend video","lip sync","final render","cloud-only feature","manual browser workflow","Unknown cost","low","medium","high","Credit based","Subscription limited","manual-only","No provider is called","No credits are spent","Cloud providers can cost money or credits","No API key fields","No run button","Nothing is uploaded yet","Copy provider handoff allowed","optional cloud fallback","no cloud provider API calls","no upload","no auto-generation","no fake generation success","no real export","no direct ComfyUI workflow run","no ComfyUI queue submit","no job queue mutation","no arbitrary file browsing","no delete artifact button","no silent persistence") `
  -ExtraRoutes @("/video-projects","/creative-cost-router","/local-vs-cloud","/cloud-final-render","/video-export","/provider-setup")
