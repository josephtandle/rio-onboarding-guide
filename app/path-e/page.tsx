"use client";

import PathPage from "@/components/PathPage";
import { pathESteps } from "@/lib/path-e-steps";

export default function PathEPage() {
  return (
    <PathPage
      pathId="path-e"
      pathTitle="Connect Your Existing WhatsApp Business Account"
      screenIdPrefix="E"
      steps={pathESteps}
    />
  );
}
