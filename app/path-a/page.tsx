"use client";

import { useState } from "react";
import PathPage from "@/components/PathPage";
import PrerequisiteChecklist from "@/components/PrerequisiteChecklist";
import { pathASteps } from "@/lib/path-a-steps";

export default function PathAPage() {
  const [prereqDone, setPrereqDone] = useState(false);

  if (!prereqDone) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-rio-black">
              Fresh Setup
            </h1>
            <p className="mt-1 text-sm text-rio-green">
              Let&apos;s make sure you have everything ready before we start.
            </p>
          </div>
          <PrerequisiteChecklist onReady={() => setPrereqDone(true)} />
          <div className="mt-4 text-center">
            <a
              href="/"
              className="text-sm text-rio-green hover:underline"
            >
              &larr; This doesn&apos;t match what I&apos;m seeing
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PathPage
      pathId="path-a"
      pathTitle="Fresh Setup"
      steps={pathASteps}
    />
  );
}
