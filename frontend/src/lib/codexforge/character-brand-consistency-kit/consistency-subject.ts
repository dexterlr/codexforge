import type { ConsistencySubject } from "./consistency-kit-types";

export function buildConsistencySubject(input: Partial<ConsistencySubject> = {}): ConsistencySubject {
  return {
    id: input.id ?? "consistency-subject-product-001",
    label: input.label ?? "Reusable product bottle",
    subjectKind: input.subjectKind ?? "product",
    description: input.description ?? "A matte cylindrical bottle used across prompts, keyframes, and local video drafts.",
    mustKeep: input.mustKeep ?? ["matte finish", "short neck", "center label", "rounded cap"],
    mustAvoid: input.mustAvoid ?? ["changing logo position", "extra handles", "transparent material"],
    colors: input.colors ?? ["deep green", "warm white", "black cap"],
    materials: input.materials ?? ["matte glass", "paper label", "soft rubber cap"],
    silhouette: input.silhouette ?? "Tall simple cylinder with a short neck and rounded cap.",
    cameraAngleRules: input.cameraAngleRules ?? ["Keep label readable", "Avoid extreme top-down angles"],
    styleReferencesAsNotesOnly: input.styleReferencesAsNotesOnly ?? [
      "Use style references as notes only; do not treat them as hidden assets.",
    ],
    approvalStatus: input.approvalStatus ?? "needs-review",
  };
}

export function buildDefaultConsistencySubjects(): ConsistencySubject[] {
  return [
    buildConsistencySubject(),
    buildConsistencySubject({
      id: "consistency-subject-character-001",
      label: "Friendly workshop guide",
      subjectKind: "character",
      description: "A recurring stylized guide character for educational creative scenes.",
      mustKeep: ["blue jacket", "round glasses", "tool belt", "upright posture"],
      mustAvoid: ["face identity claims", "photoreal likeness claims", "changing jacket color"],
      colors: ["blue", "white", "warm gray"],
      materials: ["simple fabric", "brushed metal tools"],
      silhouette: "Compact upright figure with round glasses and a visible tool belt.",
      cameraAngleRules: ["Use medium shot or wider", "Keep glasses and jacket visible"],
      styleReferencesAsNotesOnly: ["Planning notes only; no upload requirement and no face identity claim."],
      approvalStatus: "draft",
    }),
    buildConsistencySubject({
      id: "consistency-subject-brand-001",
      label: "Quiet operations brand",
      subjectKind: "brand",
      description: "A calm technical brand system for dashboards and product explainers.",
      mustKeep: ["clear logo space", "plain typography", "reserved accents"],
      mustAvoid: ["overloaded gradients", "tiny unreadable text", "unreviewed brand marks"],
      colors: ["near black", "cool teal", "soft white"],
      materials: ["matte UI panels", "subtle glass highlight"],
      silhouette: "Simple rectangular mark with generous breathing room.",
      cameraAngleRules: ["Keep brand mark flat or gently angled", "Avoid warped perspective"],
      styleReferencesAsNotesOnly: ["Reference notes are planning aids, not asset dependencies."],
      approvalStatus: "reviewed",
    }),
  ];
}
