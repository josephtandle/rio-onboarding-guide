"use client";

import PathPage from "@/components/PathPage";
import { pathCSteps } from "@/lib/path-c-steps";

export default function PathCPage() {
  return (
    <PathPage
      pathId="path-c"
      pathTitle="Ready to Connect"
      steps={pathCSteps}
    />
  );
}
