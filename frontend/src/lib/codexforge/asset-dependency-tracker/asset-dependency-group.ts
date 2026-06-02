import type { AssetDependency, AssetDependencyGroup } from "./asset-dependency-types";

export function buildAssetDependencyGroup(input: Partial<AssetDependencyGroup> & { title: string; dependencies: AssetDependency[] }): AssetDependencyGroup {
  return {
    id: input.id ?? `asset-dependency-group-${input.title.toLowerCase().replaceAll(" ", "-")}`,
    title: input.title,
    plainEnglish: input.plainEnglish ?? "These assets should be reviewed together before the next creative step.",
    dependencies: input.dependencies,
  };
}

export function buildDefaultAssetDependencyGroups(dependencies: AssetDependency[]): AssetDependencyGroup[] {
  return [
    buildAssetDependencyGroup({
      title: "Creative inputs",
      plainEnglish: "Prompt, style, consistency, and shot assets explain what the project should be.",
      dependencies: dependencies.filter((dependency) =>
        ["prompt", "style preset", "consistency subject", "shot template", "storyboard shot", "keyframe prompt"].includes(dependency.kind)
      ),
    }),
    buildAssetDependencyGroup({
      title: "Draft inputs",
      plainEnglish: "Keyframe images, workflow packages, and draft video records decide whether draft work can continue.",
      dependencies: dependencies.filter((dependency) =>
        ["local image", "keyframe image", "workflow package", "draft video"].includes(dependency.kind)
      ),
    }),
    buildAssetDependencyGroup({
      title: "Review and export blockers",
      plainEnglish: "Review notes, export target, missing model notes, and missing custom node notes decide what remains blocked.",
      dependencies: dependencies.filter((dependency) =>
        ["review note", "export target", "missing model note", "missing custom node note"].includes(dependency.kind)
      ),
    }),
  ];
}
