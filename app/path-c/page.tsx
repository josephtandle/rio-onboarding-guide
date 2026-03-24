"use client";

import PathPage from "@/components/PathPage";
import { pathCSteps } from "@/lib/path-c-steps";

export default function PathCPage() {
  return (
    <PathPage
      pathId="path-c"
      pathTitle="Connect a WhatsApp Business App"
      screenIdPrefix="C"
      steps={pathCSteps}
    />
  );
}
