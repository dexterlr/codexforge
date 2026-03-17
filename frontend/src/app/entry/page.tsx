"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { addEntry, type HealthEntry } from "@/lib/storage";

function todayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function uid(): string {
  // Good enough for a testbed; we can swap to crypto.randomUUID() later if desired.
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function EntryPage() {
  const router = useRouter();
  const defaultDate = useMemo(() => todayISO(), []);

  const [date, setDate] = useState(defaultDate);
  const [weight, setWeight] = useState<string>("");
  const [steps, setSteps] = useState<string>("");
  const [water, setWater] = useState<string>("");
  const [sleep, setSleep] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [saving, setSaving] = useState(false);

  function toNumberOrUndef(v: string): number | undefined {
    const trimmed = v.trim();
    if (!trimmed) return undefined;
    const n = Number(trimmed);
    return Number.isFinite(n) ? n : undefined;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);

    const entry: HealthEntry = {
      id: uid(),
      date,
      weight: toNumberOrUndef(weight),
      steps: toNumberOrUndef(steps),
      water: toNumberOrUndef(water),
      sleep: toNumberOrUndef(sleep),
      notes: notes.trim() || undefined,
    };

    addEntry(entry);

    // Navigate to history so you can immediately see it.
    router.push("/history");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: 24,
        color: "white",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        background:
          "radial-gradient(1200px 600px at 20% 10%, rgba(99,102,241,0.18), transparent 60%)," +
          "linear-gradient(180deg, #070A12 0%, #050710 100%)",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link
            href="/"
            style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none" }}
          >
            ← Home
          </Link>
          <div style={{ opacity: 0.6 }}>•</div>
          <Link
            href="/history"
            style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none" }}
          >
            History
          </Link>
        </div>

        <h1
          style={{
            marginTop: 18,
            marginBottom: 6,
            fontSize: 40,
            letterSpacing: -0.6,
          }}
        >
          Add today’s entry
        </h1>
        <p style={{ marginTop: 0, opacity: 0.85, lineHeight: 1.6 }}>
          Testbed form → saves locally. (Next: AI reads these entries for
          insights.)
        </p>

        <form
          onSubmit={onSubmit}
          style={{
            marginTop: 18,
            padding: 18,
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(10px)",
            display: "grid",
            gap: 14,
          }}
        >
          <Field label="Date">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={input}
              required
            />
          </Field>

          <div
            style={{
              display: "grid",
              gap: 12,
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            }}
          >
            <Field label="Weight (kg)">
              <input
                inputMode="decimal"
                placeholder="e.g. 82.4"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                style={input}
              />
            </Field>

            <Field label="Steps">
              <input
                inputMode="numeric"
                placeholder="e.g. 8500"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                style={input}
              />
            </Field>

            <Field label="Water (liters)">
              <input
                inputMode="decimal"
                placeholder="e.g. 2.0"
                value={water}
                onChange={(e) => setWater(e.target.value)}
                style={input}
              />
            </Field>

            <Field label="Sleep (hours)">
              <input
                inputMode="decimal"
                placeholder="e.g. 7.5"
                value={sleep}
                onChange={(e) => setSleep(e.target.value)}
                style={input}
              />
            </Field>
          </div>

          <Field label="Notes">
            <textarea
              placeholder="Anything you want to remember…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ ...input, minHeight: 110, resize: "vertical" }}
            />
          </Field>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <button type="submit" disabled={saving} style={btnPrimary}>
              {saving ? "Saving…" : "Save entry"}
            </button>

            <Link href="/history" style={btnGhost}>
              View history
            </Link>

            <div style={{ fontSize: 12, opacity: 0.7 }}>
              Stored locally (fast). Backend/AI wiring comes next.
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

function Field(props: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <div style={{ fontSize: 12, opacity: 0.8 }}>{props.label}</div>
      {props.children}
    </label>
  );
}

const input: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(0,0,0,0.25)",
  color: "white",
  outline: "none",
};

const btnPrimary: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "linear-gradient(135deg, rgba(99,102,241,1), rgba(16,185,129,1))",
  color: "white",
  fontWeight: 800,
  cursor: "pointer",
};

const btnGhost: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.06)",
  color: "white",
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
};
