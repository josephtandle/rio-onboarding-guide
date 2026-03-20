"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-rio-green/10 bg-rio-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <Image
            src="/rio-logo.png"
            alt="Rio"
            width={36}
            height={36}
            className="rounded"
          />
          <span className="text-lg font-semibold text-rio-black">Rio</span>
        </Link>
        <span className="text-sm text-rio-green">Setup Guide</span>
      </div>
    </header>
  );
}
