param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Style Preset Library" `
  -ScriptFile "smoke-codexforge-style-preset-library.ps1" `
  -Domain "src\lib\codexforge\style-preset-library" `
  -Route "src\app\style-presets" `
  -MainPanel "StylePresetLibraryPanel" `
  -CommandLabel "Go to Style Presets" `
  -Modules @("style-preset-types.ts","style-preset.ts","style-preset-category.ts","style-preset-token.ts","style-preset-safety.ts","style-preset-reuse.ts","style-preset-handoff.ts","style-preset-library-summary.ts","index.ts") `
  -Components @("StylePresetLibraryPanel.tsx","StylePresetPanel.tsx","StylePresetCategoryPanel.tsx","StylePresetTokenPanel.tsx","StylePresetSafetyPanel.tsx","StylePresetReusePanel.tsx","StylePresetHandoffPanel.tsx","StylePresetLibrarySummaryPanel.tsx","StylePresetSafetyStrip.tsx","StylePresetEmptyState.tsx","index.ts") `
  -Exports @("buildStylePreset","buildDefaultStylePresets","buildStylePresetCategory","buildStylePresetToken","buildStylePresetSafety","buildStylePresetReuse","buildStylePresetHandoff","buildStylePresetLibrarySummary","summarizeStylePresetLibrary") `
  -PlainEnglish @("Style presets","Reuse clear visual styles across prompts, keyframes, and drafts.","Choose style preset","style preset","preset id","label","category","visual language","lighting","camera","color palette","texture/material notes","negative guidance","best use","avoid use","local generation suitability","cinematic","product","character","environment","social","logo/motion","concept art","realistic","stylized","local draft","No provider calls","No image/video generation","Copy style handoff allowed","deterministic local definitions","no auto-generation","no fake generation success","no direct ComfyUI workflow run","no ComfyUI queue submit","no job queue mutation","no arbitrary file browsing","no delete artifact button") `
  -ExtraRoutes @("/video-prompt","/keyframes","/local-image","/local-keyframes","/creative-memory","/consistency-kit")
