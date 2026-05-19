import {
  buildSnapshotRestoreStableKey,
  type SnapshotRestoreApprovalPacket,
  type SnapshotRestoreApprovalPacketInput,
  type SnapshotRestoreApprovalValidation,
} from "./snapshot-restore-gate-types";

const ACK_LABELS: Array<[keyof SnapshotRestoreApprovalPacket, string]> = [
  ["acknowledgedSourceSnapshot", "source snapshot"],
  ["acknowledgedTargetSnapshot", "target/live snapshot"],
  ["acknowledgedComparisonEvidence", "comparison evidence"],
  ["acknowledgedReplayEvidence", "replay evidence"],
  ["acknowledgedGovernanceReview", "governance review"],
  ["acknowledgedRuntimeJournalReview", "runtime journal review"],
  ["acknowledgedDataLossRisk", "data loss risk"],
  ["acknowledgedNoAutomaticRestore", "no automatic restore"],
  ["acknowledgedFutureExecutorBoundary", "future executor boundary"],
  ["acknowledgedLatestMessageAuthority", "latest-message authority"],
];

export function buildSnapshotRestoreApprovalPacket(input: SnapshotRestoreApprovalPacketInput): SnapshotRestoreApprovalPacket {
  const packet: SnapshotRestoreApprovalPacket = {
    id: buildSnapshotRestoreStableKey("snapshot-restore-approval-packet", input.candidate.id),
    restoreCandidateId: input.candidate.id,
    approved: input.approved === true,
    approvalNote: String(input.approvalNote ?? "Approval defaults false; packet review only.").trim(),
    acknowledgedSourceSnapshot: input.acknowledgedSourceSnapshot === true,
    acknowledgedTargetSnapshot: input.acknowledgedTargetSnapshot === true,
    acknowledgedComparisonEvidence: input.acknowledgedComparisonEvidence === true,
    acknowledgedReplayEvidence: input.acknowledgedReplayEvidence === true,
    acknowledgedGovernanceReview: input.acknowledgedGovernanceReview === true,
    acknowledgedRuntimeJournalReview: input.acknowledgedRuntimeJournalReview === true,
    acknowledgedDataLossRisk: input.acknowledgedDataLossRisk === true,
    acknowledgedNoAutomaticRestore: input.acknowledgedNoAutomaticRestore === true,
    acknowledgedFutureExecutorBoundary: input.acknowledgedFutureExecutorBoundary === true,
    acknowledgedLatestMessageAuthority: input.acknowledgedLatestMessageAuthority === true,
    requestAcknowledgementsReady: false,
    summary: [],
  };
  packet.requestAcknowledgementsReady = ACK_LABELS.every(([key]) => packet[key] === true);
  packet.summary = [
    packet.approved ? "Approval packet is approved for request preview only." : "Approval packet defaults approved false.",
    packet.requestAcknowledgementsReady ? "All acknowledgements are present." : "Missing acknowledgements block request readiness.",
    "Approval does not execute restore.",
  ];
  return packet;
}

export function validateSnapshotRestoreApprovalPacket(packet: SnapshotRestoreApprovalPacket): SnapshotRestoreApprovalValidation {
  const missingAcknowledgements = ACK_LABELS.filter(([key]) => packet[key] !== true).map(([, label]) => label);
  const blockedReasons = [
    packet.approved ? null : "Approval packet is not approved.",
    ...missingAcknowledgements.map((label) => `Missing acknowledgement: ${label}.`),
  ].filter((item): item is string => Boolean(item));

  return {
    valid: blockedReasons.length === 0,
    missingAcknowledgements,
    blockedReasons,
    summary: [
      blockedReasons.length === 0 ? "Approval packet is valid for request preview." : "Approval packet blocks request readiness.",
      `${missingAcknowledgements.length} missing acknowledgement(s).`,
      "Approval packet validation does not restore snapshots.",
    ],
  };
}

export function summarizeSnapshotRestoreApprovalPacket(packet: SnapshotRestoreApprovalPacket): string[] {
  return [
    ...packet.summary,
    `Approved: ${packet.approved}.`,
    `Acknowledgements ready: ${packet.requestAcknowledgementsReady}.`,
  ];
}
