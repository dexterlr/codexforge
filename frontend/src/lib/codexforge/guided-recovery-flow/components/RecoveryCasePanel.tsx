"use client";
import Link from "next/link";
import { buildDefaultRecoveryCases } from "../index";
import { buttonLike, card, muted } from "./ComponentStyles";

export function RecoveryCasePanel() {
  const cases = buildDefaultRecoveryCases();
  return <section style={card}><strong>Recovery cases</strong>{cases.map((item) => <p key={item.id} style={muted}>{item.title}: {item.detail}</p>)}<Link href={cases[0]?.route ?? "/assist"} style={buttonLike}>Open case route</Link></section>;
}
