"use client";

import PathPage from "@/components/PathPage";
import { pathBSteps } from "@/lib/path-b-steps";

export default function PathBPage() {
  return (
    <PathPage
      pathId="path-b"
      pathTitle="Finish Your WhatsApp Setup"
      screenIdPrefix="B"
      steps={pathBSteps}
    />
  );
}
