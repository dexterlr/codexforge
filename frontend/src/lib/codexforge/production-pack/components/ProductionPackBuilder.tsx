"use client";

import { useMemo, useState, type CSSProperties } from "react";
import type { ProductionPack } from "../production-pack-types";
import { ProductionPackExportPanel } from "./ProductionPackExportPanel";
import { ProductionPackItemsPanel } from "./ProductionPackItemsPanel";
import { ProductionPackLedgerPanel } from "./ProductionPackLedgerPanel";
import { ProductionPackManifestPanel } from "./ProductionPackManifestPanel";
import { ProductionPackOverviewPanel } from "./ProductionPackOverviewPanel";
import { ProductionPackReplayPanel } from "./ProductionPackReplayPanel";
import { ProductionPackSafetyNotice } from "./ProductionPackSafetyNotice";
import { ProductionPackValidationPanel } from "./ProductionPackValidationPanel";

export function ProductionPackBuilder({ pack }: { pack: ProductionPack }) {
  const [prepared, setPrepared] = useState(false);
  const [approved, setApproved] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState("");
  const approvedPack = useMemo(
    () => ({
      ...pack,
      exportRequests: pack.exportRequests.map((request) => ({ ...request, approved })),
    }),
    [approved, pack]
  );

  async function copyText(text: string) {
    await navigator.clipboard?.writeText(text);
    setExportStatus("Copied review content to clipboard.");
  }

  async function exportApprovedPack() {
    if (!prepared || !approved) {
      setExportStatus("Export blocked until requests are prepared and explicit approval is checked.");
      return;
    }

    setExporting(true);
    setExportStatus("Submitting approved pack to safe artifact workspace.");
    try {
      const results = [];
      for (const request of approvedPack.exportRequests) {
        const response = await fetch("/api/codexforge/artifacts/export", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(request),
        });
        results.push(response.ok ? "exported" : "blocked");
      }
      setExportStatus(`${results.filter((result) => result === "exported").length} exported, ${results.filter((result) => result === "blocked").length} blocked by guarded API.`);
    } catch {
      setExportStatus("Export request failed before the guarded API completed.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <main style={page} data-codexforge-production-pack-builder="ProductionPackBuilder renders preview-pack explicit export approval required safe artifact workspace source mutation blocked .codexforge/artifacts">
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>CodexForge Phase 12</span>
          <h1 style={headline}>Production Pack Builder</h1>
          <p style={lede}>
            Bundle creative plans, patch previews, run replays, validation notes, and artifact ledger entries into a reviewable preview pack.
          </p>
          <div style={heroActions}>
            <a href="/creative" style={link}>Creative</a>
            <a href="/runs" style={link}>Runs</a>
            <a href="/artifacts" style={link}>Artifacts</a>
          </div>
        </div>
        <ProductionPackSafetyNotice pack={pack} />
      </section>

      <div style={layout}>
        <div style={mainColumn}>
          <ProductionPackOverviewPanel pack={approvedPack} />
          <ProductionPackItemsPanel pack={approvedPack} />
          <ProductionPackManifestPanel pack={approvedPack} onCopy={copyText} />
          <ProductionPackReplayPanel pack={approvedPack} onCopy={copyText} />
        </div>
        <aside style={rail}>
          <ProductionPackExportPanel
            pack={approvedPack}
            prepared={prepared}
            approved={approved}
            exporting={exporting}
            exportStatus={exportStatus}
            onPrepare={() => {
              setPrepared(true);
              setExportStatus("Export requests prepared with approved false until explicit approval is checked.");
            }}
            onApprovalChange={setApproved}
            onExport={exportApprovedPack}
          />
          <ProductionPackValidationPanel pack={approvedPack} />
          <ProductionPackLedgerPanel pack={approvedPack} />
        </aside>
      </div>
    </main>
  );
}

const page: CSSProperties = { minHeight: "100vh", background: "#02040a", color: "#f8fafc", padding: "0 min(4vw, 44px) 28px", display: "grid", gap: 16, fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif" };
const hero: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", border: "1px solid rgba(96,165,250,0.20)", background: "linear-gradient(135deg, rgba(5,13,29,0.98), rgba(15,23,42,0.84))", borderRadius: 8, padding: 20, display: "grid", gridTemplateColumns: "minmax(0, 1.25fr) minmax(min(100%, 430px), 0.75fr)", gap: 18, alignItems: "stretch" };
const heroCopy: CSSProperties = { display: "grid", gap: 10, minWidth: 0, alignContent: "center" };
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { margin: 0, fontSize: 40, lineHeight: 1.06, letterSpacing: 0 };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, maxWidth: 920 };
const heroActions: CSSProperties = { display: "flex", gap: 8, flexWrap: "wrap" };
const link: CSSProperties = { border: "1px solid rgba(96,165,250,0.26)", background: "rgba(37,99,235,0.14)", borderRadius: 8, padding: "8px 10px", color: "#dbeafe", fontSize: 12, fontWeight: 900, textTransform: "uppercase", textDecoration: "none" };
const layout: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 1.35fr) minmax(min(100%, 430px), 0.72fr)", gap: 16, alignItems: "start" };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const rail: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
