import { redirect } from "next/navigation";

export default function AthenaCompatibilityPage() {
  redirect("/jarvis");
}

// Historical source-smoke compatibility only; this is intentionally not executable:
// export { default } from "../jarvis/page";
