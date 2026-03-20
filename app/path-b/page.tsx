"use client";

import PathPage from "@/components/PathPage";
import { pathBSteps } from "@/lib/path-b-steps";

export default function PathBPage() {
  return (
    <PathPage
      pathId="path-b"
      pathTitle="Resume From OTP"
      steps={pathBSteps}
    />
  );
}
