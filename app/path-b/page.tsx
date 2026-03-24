"use client";

import PathPage from "@/components/PathPage";
import { pathBSteps } from "@/lib/path-b-steps";

export default function PathBPage() {
  return (
    <PathPage
      pathId="path-b"
      pathTitle="Create a WhatsApp Business Account"
      screenIdPrefix="B"
      steps={pathBSteps}
    />
  );
}
