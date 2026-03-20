"use client";

import Header from "@/components/Header";
import TriageQuiz from "@/components/TriageQuiz";
import SupportWidget from "@/components/SupportWidget";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-rio-black">
            Connect Your WhatsApp Number to Rio
          </h1>
          <p className="mt-2 text-sm text-rio-green">
            Answer a few questions so we can show you the right steps.
          </p>
        </div>

        <p className="mb-6 text-center text-sm text-rio-green">
          Answer a few quick questions and we&apos;ll show you exactly what to do.
        </p>
        <TriageQuiz />
      </main>

      <SupportWidget />
    </div>
  );
}
