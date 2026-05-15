import type {
  EvidenceGroundedReplySection,
  EvidenceGroundedReplySections,
  EvidenceGroundingContext,
  EvidenceTrustPolicy,
} from "./evidence-grounded-chat-types";

export function buildEvidenceGroundingSection(args: {
  context: EvidenceGroundingContext;
  policy: EvidenceTrustPolicy;
}): EvidenceGroundedReplySection {
  return {
    title: "Evidence used",
    items:
      args.context.blocks.length > 0
        ? args.context.blocks.map((block) => `${block.evidenceTitle} (${(block.confidence * 100).toFixed(0)}%, ${block.trustLevel})`)
        : ["No selected evidence was injected."],
  };
}

export function buildEvidenceGroundedReplySections(args: {
  context: EvidenceGroundingContext;
  policy: EvidenceTrustPolicy;
}): EvidenceGroundedReplySections {
  const fileItems = Array.from(new Set(args.context.blocks.flatMap((block) => block.filePaths))).sort();
  const caveats = [
    ...args.context.blocks.flatMap((block) => block.warnings),
    args.policy.weakItemIds.length > 0 ? "Weak evidence requires manual verification." : "",
    args.policy.staleItemIds.length > 0 ? "Stale evidence requires current-file verification." : "",
  ].filter(Boolean);
  const sections: EvidenceGroundedReplySection[] = [
    buildEvidenceGroundingSection(args),
    {
      title: "Confidence and caveats",
      items: caveats.length > 0 ? caveats : ["No weak or stale evidence warnings were present."],
    },
    {
      title: "Files to verify",
      items: fileItems.length > 0 ? fileItems : ["No file path was attached to the selected evidence."],
    },
    {
      title: "Safe next step",
      items: ["Inspect current files before proposing edits or preparing a Safe Patch Preview."],
    },
    {
      title: "No mutation boundary",
      items: [
        "No memory promotion from chat.",
        "No graph mutation from chat.",
        "No file mutation without Safe Patch Preview.",
      ],
    },
  ];

  return {
    id: "evidence-grounded-reply-sections",
    sections,
    summary: summarizeEvidenceGroundedReplySections({ id: "evidence-grounded-reply-sections", sections, summary: [] }),
  };
}

export function summarizeEvidenceGroundedReplySections(reply: EvidenceGroundedReplySections): string[] {
  return [
    `${reply.sections.length} structured reply grounding section(s) prepared.`,
    "Reply sections include Evidence used, Confidence and caveats, Files to verify, Safe next step, and No mutation boundary.",
  ];
}
