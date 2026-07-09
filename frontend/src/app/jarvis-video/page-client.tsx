'use client';

import { JarvisUnifiedProductPageClientShell } from "@/lib/codexforge/jarvis-unified-product-ia-map/components";
import type { JarvisVideoResultCaptureAuditEnvelopeApprovalJoinPreview } from "@/lib/codexforge/jarvis-video-studio-release-candidate-map/jarvis-video-result-capture-audit-envelope-approval-join-preview";
import type { JarvisVideoBackendRunnerFoundationDryRunAdmissionPreview } from "@/lib/codexforge/jarvis-video-studio-release-candidate-map/jarvis-video-backend-runner-foundation-dry-run-admission-preview";
import type { JarvisVideoServerOnlyRunnerSyntheticDryRunPreview } from "@/lib/codexforge/jarvis-video-studio-release-candidate-map/jarvis-video-server-only-runner-synthetic-dry-run-preview";

// 3914-3945 - Jarvis Unified Product IA and God-Tier UX Polish
// 3946-3977 - First Jarvis-Controlled Video Controlled Execution Trial
// 3978-4009 - First Jarvis-Controlled Video Backend Trial Runner Contract
// 4010-4041 - First Jarvis-Controlled Video Trial Result Review and Recovery
// 4042-4073 - Jarvis Video Studio Release Candidate
// 4042-4073 - Jarvis Video Studio Release Candidate Mega Batch v1
// 4074-4105 - Jarvis Video Backend Execution Implementation Plan
// 4074-4105 - Jarvis Video Backend Execution Implementation Plan Mega Batch v1
// 4106-4137 - Jarvis Video Backend Implementation Readiness Follow-Up
// 4106-4137 - Jarvis Video Backend Implementation Readiness Follow-Up Mega Batch v1
// 4138-4169 - Jarvis Video Backend Runner Contract Hardening
// 4170-4201 - Jarvis Video Backend Runner Foundation Dry-Run Admission
// 4202-4233 - Jarvis Video Server-Only Runner Skeleton and Synthetic Dry Run
// 4234-4265 - Jarvis Video Result Capture Audit Envelope and Approval Join
// Jarvis Video Studio Release Candidate
// Jarvis Video Backend Execution Implementation Plan
// Jarvis Video Backend Implementation Readiness Follow-Up
// Jarvis Video Backend Runner Contract Hardening
// Jarvis Video Backend Runner Foundation Dry-Run Admission
// Jarvis Video Server-Only Runner Skeleton and Synthetic Dry Run
// Jarvis Video Result Capture Audit Envelope and Approval Join
// video studio remains primary active workspace
// /jarvis-video release candidate remains review-only
// premium video studio release candidate
// Plan, review, approve, then hand off to backend
// backend execution implementation plan
// implementation plan only
// backend implementation readiness only
// Backend implementation readiness
// Review backend readiness
// Confirm server-only boundary
// Prepare runner contract
// Keep generation locked
// Provider calls remain blocked
// Queue and worker dispatch remain disabled
// Result and audit persistence remain unimplemented
// Plan backend execution
// Review server-only path
// Confirm approval gates
// Prepare credential isolation
// generation remains locked
// backend-owned execution required
// operator approval required
// no provider call from frontend
// This batch is a plan only
// no queue/worker/provider/persistence exists yet
// next backend implementation must be server-only
// controlled trial console only
// backend trial runner contract only
// backend runner contract hardening only
// trial result review recovery only
// /jarvis-video backend trial runner remains review-only
// /jarvis-video controlled trial remains review-only
// /jarvis-video trial result review remains review-only
// controlled execution trial remains disabled
// runner contract drafted
// runner contract is being hardened
// backend dry-run admission foundation only
// synthetic dry-run admission only
// server-only runner skeleton only
// synthetic dry run only
// static result envelope only
// result review is staged
// synthetic result only
// recovery remains backend-owned
// no result persistence
// no retry or fallback execution
// operator acceptance required
// JarvisVideoBackendExecutionReadinessPageClientShell
type JarvisVideoWorkspacePageClientProps = Readonly<{
  resultCaptureAuditApprovalJoinPreview: JarvisVideoResultCaptureAuditEnvelopeApprovalJoinPreview;
  backendDryRunAdmissionPreview: JarvisVideoBackendRunnerFoundationDryRunAdmissionPreview;
  serverOnlySyntheticDryRunPreview: JarvisVideoServerOnlyRunnerSyntheticDryRunPreview;
}>;

export default function JarvisVideoWorkspacePageClient({
  resultCaptureAuditApprovalJoinPreview,
  backendDryRunAdmissionPreview,
  serverOnlySyntheticDryRunPreview,
}: JarvisVideoWorkspacePageClientProps) {
  return (
    <JarvisUnifiedProductPageClientShell
      surfaceId="jarvis-video"
      jarvisVideoResultCaptureAuditApprovalJoinPreview={
        resultCaptureAuditApprovalJoinPreview
      }
      jarvisVideoBackendDryRunAdmissionPreview={backendDryRunAdmissionPreview}
      jarvisVideoServerOnlySyntheticDryRunPreview={
        serverOnlySyntheticDryRunPreview
      }
    />
  );
}
