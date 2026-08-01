"use client";

import type { CSSProperties, KeyboardEvent, ReactNode } from "react";
import { useEffect, useRef } from "react";

export function CommandPaletteOverlay({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const frame = window.requestAnimationFrame(() => {
      const preferred = panelRef.current?.querySelector<HTMLElement>("[autofocus]");
      const first = preferred ?? panelRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      first?.focus();
    });
    return () => {
      window.cancelAnimationFrame(frame);
      previousFocus?.focus();
    };
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? []
    ).filter(
      (element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true"
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="CodexForge Command Palette"
      data-codexforge-command-palette-overlay="CommandPaletteOverlay renders"
      style={backdrop}
      onKeyDown={handleKeyDown}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div ref={panelRef} style={panel}>{children}</div>
    </div>
  );
}

const FOCUSABLE_SELECTOR = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const backdrop: CSSProperties = {
  alignItems: "start",
  background:
    "radial-gradient(720px 420px at 24% 12%, rgba(45,212,191,0.16), transparent 60%), rgba(2,6,23,0.82)",
  display: "grid",
  inset: 0,
  justifyItems: "center",
  overflowY: "auto",
  padding: "8vh min(4vw, 42px)",
  position: "fixed",
  zIndex: 80,
};

const panel: CSSProperties = {
  border: "1px solid rgba(94,234,212,0.26)",
  background:
    "linear-gradient(145deg, rgba(3,7,18,0.98), rgba(15,23,42,0.96) 56%, rgba(8,47,73,0.82))",
  borderRadius: 8,
  boxShadow: "0 34px 110px rgba(0,0,0,0.52), 0 0 34px rgba(45,212,191,0.08)",
  color: "#f8fafc",
  display: "grid",
  gap: 12,
  maxWidth: 940,
  minWidth: 0,
  padding: 14,
  width: "min(100%, 940px)",
};
