import Link from "next/link";
import React from "react";
import { codexForgeProductSurface } from "@/lib/codexforge/product-surface";

export function CodexForgeProductSurface() {
  const surface = codexForgeProductSurface;

  return (
    <section style={shellStyle}>
      <div style={ambientOneStyle} />
      <div style={ambientTwoStyle} />

      <div style={heroStyle}>
        <div style={heroCopyStyle}>
          <div style={eyebrowStyle}>{surface.eyebrow}</div>

          <h1 style={titleStyle}>
            {surface.title}{" "}
            <span style={gradientTextStyle}>{surface.gradientTitle}</span>.
          </h1>

          <p style={subtitleStyle}>{surface.subtitle}</p>

          <div style={actionRowStyle}>
            <a href={surface.primaryCta.href} style={primaryActionStyle}>
              {surface.primaryCta.label}
            </a>

            <Link href={surface.secondaryCta.href} style={secondaryActionStyle}>
              {surface.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div style={consoleCardStyle}>
          <div style={consoleTopStyle}>
            <span style={consoleDotStyle} />
            CodexForge mission stack
          </div>

          <div style={consoleLinesStyle}>
            <div style={consoleLineStyle}>
              <span style={consoleKeyStyle}>Mode</span>
              <span>AI workspace + operator loop</span>
            </div>
            <div style={consoleLineStyle}>
              <span style={consoleKeyStyle}>Posture</span>
              <span>local-first, backend-optional, approval-safe</span>
            </div>
            <div style={consoleLineStyle}>
              <span style={consoleKeyStyle}>Domains</span>
              <span>web, research, Blender, ComfyUI, Unreal, film, trading</span>
            </div>
            <div style={consoleLineStyle}>
              <span style={consoleKeyStyle}>Goal</span>
              <span>world-class Jarvis-level builder cockpit</span>
            </div>
          </div>
        </div>
      </div>

      <div style={metricsGridStyle}>
        {surface.metrics.map((metric) => (
          <div key={metric.label} style={metricCardStyle}>
            <div style={metricLabelStyle}>{metric.label}</div>
            <div style={metricValueStyle}>{metric.value}</div>
            <div style={metricDetailStyle}>{metric.detail}</div>
          </div>
        ))}
      </div>

      <div style={sectionHeaderStyle}>
        <div style={sectionKickerStyle}>Core systems</div>
        <h2 style={sectionTitleStyle}>One workspace for planning, context, and controlled execution.</h2>
      </div>

      <div style={capabilityGridStyle}>
        {surface.capabilities.map((capability) => (
          <div key={capability.title} style={capabilityCardStyle}>
            <div style={capabilityTitleStyle}>{capability.title}</div>
            <div style={capabilityTextStyle}>{capability.text}</div>
            <div style={tagRowStyle}>
              {capability.tags.map((tag) => (
                <span key={tag} style={tagStyle}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={workflowShellStyle}>
        <div style={sectionHeaderStyle}>
          <div style={sectionKickerStyle}>Operating loop</div>
          <h2 style={sectionTitleStyle}>From idea to approved action.</h2>
        </div>

        <div style={workflowGridStyle}>
          {surface.workflow.map((step) => (
            <div key={step.step} style={workflowCardStyle}>
              <div style={workflowStepStyle}>{step.step}</div>
              <div style={workflowTitleStyle}>{step.title}</div>
              <div style={workflowTextStyle}>{step.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={useCaseGridStyle}>
        {surface.useCases.map((useCase) => (
          <div key={useCase.title} style={useCaseCardStyle}>
            <div style={useCaseTitleStyle}>{useCase.title}</div>
            <div style={useCaseTextStyle}>{useCase.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const shellStyle: React.CSSProperties = {
  position: "relative",
  overflow: "hidden",
  borderRadius: 30,
  border: "1px solid rgba(148,163,184,0.18)",
  background:
    "radial-gradient(circle at top left, rgba(99,102,241,0.26), transparent 34%), radial-gradient(circle at top right, rgba(16,185,129,0.18), transparent 30%), linear-gradient(180deg, rgba(15,23,42,0.94), rgba(2,6,23,0.96))",
  padding: 22,
  boxShadow:
    "0 30px 100px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.08)",
  display: "grid",
  gap: 22,
};

const ambientOneStyle: React.CSSProperties = {
  position: "absolute",
  width: 280,
  height: 280,
  borderRadius: 999,
  background: "rgba(99,102,241,0.16)",
  filter: "blur(40px)",
  top: -90,
  right: 70,
  pointerEvents: "none",
};

const ambientTwoStyle: React.CSSProperties = {
  position: "absolute",
  width: 240,
  height: 240,
  borderRadius: 999,
  background: "rgba(16,185,129,0.12)",
  filter: "blur(42px)",
  bottom: -90,
  left: 70,
  pointerEvents: "none",
};

const heroStyle: React.CSSProperties = {
  position: "relative",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
  gap: 18,
  alignItems: "stretch",
};

const heroCopyStyle: React.CSSProperties = {
  display: "grid",
  gap: 16,
  alignContent: "center",
};

const eyebrowStyle: React.CSSProperties = {
  width: "fit-content",
  padding: "7px 11px",
  borderRadius: 999,
  border: "1px solid rgba(99,102,241,0.28)",
  background: "rgba(99,102,241,0.12)",
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  maxWidth: 940,
  fontSize: "clamp(38px, 7vw, 88px)",
  lineHeight: 0.92,
  letterSpacing: -3,
};

const gradientTextStyle: React.CSSProperties = {
  background:
    "linear-gradient(135deg, rgba(129,140,248,1), rgba(45,212,191,1), rgba(244,114,182,1))",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

const subtitleStyle: React.CSSProperties = {
  maxWidth: 880,
  margin: 0,
  color: "rgba(226,232,240,0.86)",
  fontSize: 16,
  lineHeight: 1.75,
};

const actionRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
};

const primaryActionStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 46,
  padding: "0 16px",
  borderRadius: 16,
  color: "white",
  textDecoration: "none",
  fontWeight: 950,
  background:
    "linear-gradient(135deg, rgba(99,102,241,1), rgba(16,185,129,1))",
  boxShadow: "0 18px 40px rgba(79,70,229,0.24)",
};

const secondaryActionStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 46,
  padding: "0 16px",
  borderRadius: 16,
  color: "white",
  textDecoration: "none",
  fontWeight: 900,
  border: "1px solid rgba(255,255,255,0.16)",
  background: "rgba(255,255,255,0.06)",
};

const consoleCardStyle: React.CSSProperties = {
  borderRadius: 24,
  border: "1px solid rgba(148,163,184,0.18)",
  background: "rgba(2,6,23,0.54)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
  padding: 16,
  display: "grid",
  gap: 14,
  alignContent: "start",
};

const consoleTopStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 12,
  fontWeight: 900,
  color: "rgba(226,232,240,0.86)",
};

const consoleDotStyle: React.CSSProperties = {
  width: 9,
  height: 9,
  borderRadius: 999,
  background: "rgba(16,185,129,1)",
  boxShadow: "0 0 0 5px rgba(16,185,129,0.12)",
};

const consoleLinesStyle: React.CSSProperties = {
  display: "grid",
  gap: 9,
};

const consoleLineStyle: React.CSSProperties = {
  display: "grid",
  gap: 4,
  padding: 11,
  borderRadius: 14,
  border: "1px solid rgba(148,163,184,0.12)",
  background: "rgba(15,23,42,0.52)",
  fontSize: 12,
  color: "rgba(226,232,240,0.86)",
};

const consoleKeyStyle: React.CSSProperties = {
  color: "rgba(129,140,248,0.96)",
  fontWeight: 950,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  fontSize: 10,
};

const metricsGridStyle: React.CSSProperties = {
  position: "relative",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))",
  gap: 10,
};

const metricCardStyle: React.CSSProperties = {
  padding: 14,
  borderRadius: 18,
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(15,23,42,0.42)",
  display: "grid",
  gap: 6,
};

const metricLabelStyle: React.CSSProperties = {
  fontSize: 11,
  opacity: 0.72,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  fontWeight: 900,
};

const metricValueStyle: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 950,
};

const metricDetailStyle: React.CSSProperties = {
  color: "rgba(226,232,240,0.76)",
  fontSize: 12,
  lineHeight: 1.55,
};

const sectionHeaderStyle: React.CSSProperties = {
  position: "relative",
  display: "grid",
  gap: 6,
};

const sectionKickerStyle: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "rgba(45,212,191,0.92)",
  fontWeight: 950,
};

const sectionTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(22px, 3vw, 34px)",
  letterSpacing: -0.8,
};

const capabilityGridStyle: React.CSSProperties = {
  position: "relative",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
  gap: 12,
};

const capabilityCardStyle: React.CSSProperties = {
  minHeight: 190,
  padding: 16,
  borderRadius: 22,
  border: "1px solid rgba(148,163,184,0.16)",
  background:
    "linear-gradient(180deg, rgba(30,41,59,0.62), rgba(15,23,42,0.44))",
  display: "grid",
  gap: 12,
  alignContent: "start",
};

const capabilityTitleStyle: React.CSSProperties = {
  fontSize: 17,
  fontWeight: 950,
  letterSpacing: -0.2,
};

const capabilityTextStyle: React.CSSProperties = {
  color: "rgba(226,232,240,0.78)",
  fontSize: 13,
  lineHeight: 1.65,
};

const tagRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 7,
  flexWrap: "wrap",
};

const tagStyle: React.CSSProperties = {
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(255,255,255,0.05)",
  color: "rgba(226,232,240,0.82)",
  fontSize: 11,
  fontWeight: 800,
};

const workflowShellStyle: React.CSSProperties = {
  position: "relative",
  display: "grid",
  gap: 14,
};

const workflowGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))",
  gap: 10,
};

const workflowCardStyle: React.CSSProperties = {
  padding: 14,
  borderRadius: 18,
  border: "1px solid rgba(148,163,184,0.15)",
  background: "rgba(2,6,23,0.34)",
  display: "grid",
  gap: 8,
};

const workflowStepStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 950,
  color: "rgba(129,140,248,0.98)",
};

const workflowTitleStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 950,
};

const workflowTextStyle: React.CSSProperties = {
  color: "rgba(226,232,240,0.76)",
  fontSize: 12,
  lineHeight: 1.6,
};

const useCaseGridStyle: React.CSSProperties = {
  position: "relative",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
  gap: 10,
};

const useCaseCardStyle: React.CSSProperties = {
  padding: 14,
  borderRadius: 18,
  border: "1px solid rgba(99,102,241,0.18)",
  background: "rgba(99,102,241,0.08)",
  display: "grid",
  gap: 7,
};

const useCaseTitleStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 950,
};

const useCaseTextStyle: React.CSSProperties = {
  color: "rgba(226,232,240,0.76)",
  fontSize: 12,
  lineHeight: 1.58,
};
