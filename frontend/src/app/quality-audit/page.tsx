import { buildFullSystemQualityAuditSession } from "@/lib/codexforge/full-system-quality-audit";
import QualityAuditPageClient from "./page-client";

export default function QualityAuditPage() {
  return <QualityAuditPageClient initialData={buildFullSystemQualityAuditSession()} />;
}
