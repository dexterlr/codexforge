param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Asset Dependency Tracker" `
  -ScriptFile "smoke-codexforge-asset-dependency-tracker.ps1" `
  -Domain "src\lib\codexforge\asset-dependency-tracker" `
  -Route "src\app\video-assets" `
  -MainPanel "AssetDependencyTrackerPanel" `
  -CommandLabel "Go to Video Assets" `
  -Modules @("asset-dependency-types.ts","asset-dependency.ts","asset-dependency-group.ts","asset-dependency-risk.ts","asset-dependency-readiness.ts","asset-dependency-next-action.ts","asset-dependency-handoff.ts","asset-dependency-summary.ts","index.ts") `
  -Components @("AssetDependencyTrackerPanel.tsx","AssetDependencyPanel.tsx","AssetDependencyGroupPanel.tsx","AssetDependencyRiskPanel.tsx","AssetDependencyReadinessPanel.tsx","AssetDependencyNextActionPanel.tsx","AssetDependencyHandoffPanel.tsx","AssetDependencySummaryPanel.tsx","AssetDependencySafetyStrip.tsx","AssetDependencyEmptyState.tsx","index.ts") `
  -Exports @("buildAssetDependency","buildDefaultAssetDependencies","buildAssetDependencyGroup","buildAssetDependencyRisk","buildAssetDependencyReadiness","buildAssetDependencyNextAction","buildAssetDependencyHandoff","buildAssetDependencySummary","summarizeAssetDependencies") `
  -PlainEnglish @("Video assets","See what a project needs before draft, finishing, or export.","Review assets","prompt","style preset","consistency subject","shot template","storyboard shot","keyframe prompt","local image","keyframe image","workflow package","draft video","review note","export target","missing model note","missing custom node note","ready","missing","optional","needs-review","blocked","supplied","unknown","No file browser","No delete button","No arbitrary path access","Copy asset checklist allowed","no auto-generation","no fake generation success","no direct ComfyUI workflow run","no ComfyUI queue submit","no job queue mutation","no arbitrary file browsing","no delete artifact button","no real export","no upload","no deletion","no silent persistence") `
  -ExtraRoutes @("/video-projects","/comfyui-jobs/package","/local-video-draft","/video-artifacts","/video-recovery")
