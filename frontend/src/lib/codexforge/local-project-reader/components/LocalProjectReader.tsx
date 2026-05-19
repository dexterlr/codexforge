"use client";

import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  buildLocalProjectReaderSummary,
  buildProjectFileMetadata,
  buildProjectFilePreview,
  buildProjectFileRiskReport,
  buildProjectReaderHandoff,
  buildProjectTree,
  inferProjectFilePurpose,
  searchProjectFiles,
  summarizeLocalProjectReaderSession,
  summarizeProjectFileSearchResults,
  type ProjectFilePreview,
  type ProjectReaderApiError,
  type ProjectReaderEntry,
  type ProjectReaderReadResponse,
  type ProjectReaderSnapshot,
} from "../index";
import { RealPatchPreviewPanel } from "@/lib/codexforge/real-patch-preview/components/RealPatchPreviewPanel";
import { ProjectFileList } from "./ProjectFileList";
import { ProjectFileMetadataPanel } from "./ProjectFileMetadataPanel";
import { ProjectFilePreviewPanel } from "./ProjectFilePreviewPanel";
import { ProjectFilePurposePanel } from "./ProjectFilePurposePanel";
import { ProjectFileRiskPanel } from "./ProjectFileRiskPanel";
import { ProjectFileSearchPanel } from "./ProjectFileSearchPanel";
import { ProjectReaderEmptyState } from "./ProjectReaderEmptyState";
import { ProjectReaderHandoffPanel } from "./ProjectReaderHandoffPanel";
import { ProjectReaderSafetyNotice } from "./ProjectReaderSafetyNotice";
import { ProjectTreePanel } from "./ProjectTreePanel";

type LocalProjectReaderProps = {
  initialSnapshot: ProjectReaderSnapshot | null;
  initialSelectedPath?: string;
  unavailableReason?: string;
};

export function LocalProjectReader({
  initialSnapshot,
  initialSelectedPath,
  unavailableReason,
}: LocalProjectReaderProps) {
  const [snapshot, setSnapshot] = useState<ProjectReaderSnapshot | null>(initialSnapshot);
  const [query, setQuery] = useState("");
  const [selectedPath, setSelectedPath] = useState(initialSelectedPath ?? initialSnapshot?.entries.find((entry) => entry.type === "file")?.path ?? "");
  const [readResponse, setReadResponse] = useState<ProjectReaderReadResponse | null>(null);
  const [loadingSnapshot, setLoadingSnapshot] = useState(false);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [error, setError] = useState(unavailableReason ?? "");
  const [copied, setCopied] = useState("");

  const entries = snapshot?.entries ?? [];
  const tree = useMemo(() => buildProjectTree(entries), [entries]);
  const selectedEntry = useMemo(
    () => entries.find((entry) => entry.path === selectedPath && entry.type === "file") ?? null,
    [entries, selectedPath]
  );

  const searchFilesInput = useMemo(
    () =>
      entries
        .filter((entry) => entry.type === "file")
        .map((entry) => {
          const metadata = buildProjectFileMetadata(entry);
          const purpose = inferProjectFilePurpose(metadata);
          const risk = buildProjectFileRiskReport(entry);
          return {
            path: entry.path,
            name: metadata.name,
            extension: metadata.extension,
            category: metadata.category,
            purpose: purpose.summary,
            risk: risk.level,
            keywords: [metadata.probableRole, metadata.language, metadata.category, purpose.kind],
            summary: purpose.summary,
          };
        }),
    [entries]
  );

  const searchResults = useMemo(
    () => searchProjectFiles(searchFilesInput, query, 120),
    [query, searchFilesInput]
  );
  const searchSummary = useMemo(
    () => summarizeProjectFileSearchResults(searchResults, query),
    [query, searchResults]
  );

  const metadata = useMemo(
    () => (selectedEntry ? buildProjectFileMetadata(selectedEntry) : null),
    [selectedEntry]
  );
  const purpose = useMemo(
    () => (metadata ? inferProjectFilePurpose(metadata) : null),
    [metadata]
  );
  const riskReport = useMemo(
    () => (selectedEntry ? buildProjectFileRiskReport(selectedEntry) : null),
    [selectedEntry]
  );
  const preview: ProjectFilePreview | null = useMemo(() => {
    if (!selectedPath) return null;
    if (!readResponse || readResponse.path !== selectedPath) {
      return buildProjectFilePreview({
        path: selectedPath,
        content: "",
        lineCount: selectedEntry?.lineCount,
        binaryBlocked: selectedEntry?.binary === true,
        sizeBlocked: false,
      });
    }
    return buildProjectFilePreview({
      path: readResponse.path,
      content: readResponse.content,
      lineCount: readResponse.lineCount,
      binaryBlocked: readResponse.binaryBlocked,
      sizeBlocked: readResponse.sizeBlocked,
    });
  }, [readResponse, selectedEntry, selectedPath]);
  const selectedReadContent =
    readResponse &&
    readResponse.path === selectedPath &&
    !readResponse.binaryBlocked &&
    !readResponse.sizeBlocked
      ? readResponse.content
      : null;
  const handoff = useMemo(
    () =>
      selectedPath
        ? buildProjectReaderHandoff({
            path: selectedPath,
            metadata,
            preview,
            purpose,
            risk: riskReport,
            action: "inspect this file",
          })
        : null,
    [metadata, preview, purpose, riskReport, selectedPath]
  );
  const sessionSummary = useMemo(() => {
    const riskReports = entries
      .filter((entry) => entry.type === "file")
      .map((entry) => buildProjectFileRiskReport(entry));
    return buildLocalProjectReaderSummary({
      tree,
      selectedFile: selectedPath,
      searchResultCount: searchResults.length,
      riskReports,
      preview,
    });
  }, [entries, preview, searchResults.length, selectedPath, tree]);

  const readSelectedFile = useCallback(async () => {
    if (!selectedPath) return;
    setLoadingPreview(true);
    setError("");
    try {
      const response = await fetch(`/api/codexforge/project/read?path=${encodeURIComponent(selectedPath)}`, {
        method: "GET",
        cache: "no-store",
      });
      const payload = (await response.json()) as ProjectReaderReadResponse | ProjectReaderApiError;
      if (!payload.ok) {
        setReadResponse(null);
        setError(payload.error);
        return;
      }
      setReadResponse(payload);
    } catch (readError) {
      setReadResponse(null);
      setError(readError instanceof Error ? readError.message : "Read-only preview API unavailable.");
    } finally {
      setLoadingPreview(false);
    }
  }, [selectedPath]);

  const refreshSnapshot = useCallback(async () => {
    setLoadingSnapshot(true);
    setError("");
    try {
      const response = await fetch("/api/codexforge/project/snapshot?maxResults=800", {
        method: "GET",
        cache: "no-store",
      });
      const payload = (await response.json()) as ProjectReaderSnapshot | ProjectReaderApiError;
      if (!payload.ok) {
        setError(payload.error);
        return;
      }
      setSnapshot(payload);
      const nextSelected =
        payload.entries.find((entry) => entry.path === selectedPath && entry.type === "file")?.path ??
        payload.entries.find((entry) => entry.type === "file")?.path ??
        "";
      setSelectedPath(nextSelected);
      setReadResponse(null);
    } catch (snapshotError) {
      setError(snapshotError instanceof Error ? snapshotError.message : "Read-only snapshot API unavailable.");
    } finally {
      setLoadingSnapshot(false);
    }
  }, [selectedPath]);

  useEffect(() => {
    if (selectedPath) {
      void readSelectedFile();
    }
  }, [readSelectedFile, selectedPath]);

  function selectPath(path: string) {
    setSelectedPath(path);
    setReadResponse(null);
  }

  function copyText(label: string, value: string) {
    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) return;
    void navigator.clipboard.writeText(value).then(() => setCopied(label)).catch(() => setCopied(""));
  }

  if (!snapshot || snapshot.entries.length === 0) {
    return (
      <main
        data-codexforge-local-project-reader="LocalProjectReader renders read-only no file writes no command execution Safe Patch Preview preserve latest-message authority"
        style={page}
      >
        <ProjectReaderSafetyNotice />
        <ProjectReaderEmptyState reason={error || unavailableReason || "Read-only project snapshot is not available."} />
      </main>
    );
  }

  return (
    <main
      data-codexforge-local-project-reader="LocalProjectReader renders real local project reader read-only no file writes no command execution Safe Patch Preview preserve latest-message authority"
      style={page}
    >
      <section style={hero}>
        <div style={heroText}>
          <div style={eyebrow}>Files Command Center</div>
          <h1 style={title}>Project Reader</h1>
          <p style={lede}>
            Real local project tree, capped read-only file preview, deterministic metadata, purpose, risk, search, and
            copy-only handoff into Safe Patch Preview.
          </p>
        </div>
        <div style={stats}>
          <Stat label="Files" value={String(sessionSummary.fileCount)} />
          <Stat label="Directories" value={String(sessionSummary.directoryCount)} />
          <Stat label="High risk" value={String(sessionSummary.highRiskFileCount)} />
          <Stat label="Blocked" value={String(sessionSummary.blockedFileCount)} />
        </div>
      </section>

      <ProjectReaderSafetyNotice />

      <section style={statusStrip}>
        <span>{summarizeLocalProjectReaderSession(sessionSummary)}</span>
        {copied ? <strong>Copied {copied}</strong> : null}
      </section>

      {error ? <ProjectReaderEmptyState reason={error} /> : null}

      <ProjectFileSearchPanel
        query={query}
        onQueryChange={setQuery}
        summary={searchSummary}
        onRefresh={refreshSnapshot}
        loading={loadingSnapshot}
      />

      <section style={layout}>
        <div style={leftRail}>
          <ProjectTreePanel tree={tree} selectedPath={selectedPath} onSelectPath={selectPath} />
          <ProjectFileList results={searchResults} selectedPath={selectedPath} onSelectPath={selectPath} />
        </div>
        <div style={mainColumn}>
          <ProjectFilePreviewPanel
            preview={preview}
            selectedPath={selectedPath}
            loading={loadingPreview}
            error={error}
            onRead={readSelectedFile}
          />
          <ProjectReaderHandoffPanel handoff={handoff} onCopy={copyText} />
          <RealPatchPreviewPanel
            selectedFilePath={selectedPath}
            selectedFileCategory={metadata?.category ?? "unknown"}
            fileContent={selectedReadContent}
            metadata={metadata}
            purpose={purpose}
            risk={riskReport}
            onCopy={copyText}
          />
        </div>
        <aside style={rightRail}>
          <ProjectFileMetadataPanel metadata={metadata} />
          <ProjectFilePurposePanel purpose={purpose} />
          <ProjectFileRiskPanel report={riskReport} />
        </aside>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={statCard}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const page: CSSProperties = {
  background: "transparent",
  color: "#f8fafc",
  display: "grid",
  fontFamily:
    "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
  gap: 14,
  minHeight: 0,
  minWidth: 0,
  padding: 0,
};

const hero: CSSProperties = {
  alignItems: "end",
  display: "grid",
  gap: 16,
  gridTemplateColumns: "minmax(0, 1fr)",
  margin: "0 auto",
  maxWidth: 1560,
  minWidth: 0,
  width: "100%",
};

const heroText: CSSProperties = {
  display: "grid",
  gap: 6,
  minWidth: 0,
};

const eyebrow: CSSProperties = {
  color: "#7dd3fc",
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
};

const title: CSSProperties = {
  fontSize: 38,
  letterSpacing: 0,
  lineHeight: 1.05,
  margin: 0,
  maxWidth: 860,
  overflowWrap: "normal",
  wordBreak: "normal",
};

const lede: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 14,
  lineHeight: 1.5,
  margin: 0,
  maxWidth: 780,
  overflowWrap: "anywhere",
};

const stats: CSSProperties = {
  display: "grid",
  gap: 8,
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  minWidth: 0,
};

const statCard: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(15,23,42,0.66)",
  borderRadius: 8,
  display: "grid",
  gap: 4,
  minWidth: 0,
  padding: 12,
};

const statusStrip: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.14)",
  background: "rgba(15,23,42,0.62)",
  borderRadius: 8,
  color: "#cbd5e1",
  display: "flex",
  flexWrap: "wrap",
  fontSize: 12,
  gap: 10,
  justifyContent: "space-between",
  lineHeight: 1.45,
  margin: "0 auto",
  maxWidth: 1560,
  minWidth: 0,
  padding: "10px 12px",
  width: "100%",
};

const layout: CSSProperties = {
  alignItems: "start",
  display: "grid",
  gap: 14,
  gridTemplateColumns: "minmax(260px, 0.75fr) minmax(0, 1.35fr) minmax(260px, 0.75fr)",
  margin: "0 auto",
  maxWidth: 1560,
  minWidth: 0,
  width: "100%",
};

const leftRail: CSSProperties = {
  display: "grid",
  gap: 12,
  minWidth: 0,
};

const mainColumn: CSSProperties = {
  display: "grid",
  gap: 12,
  minWidth: 0,
};

const rightRail: CSSProperties = {
  display: "grid",
  gap: 12,
  minWidth: 0,
};
