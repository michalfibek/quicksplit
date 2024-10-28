"use client";

import { ReactNode } from "react";

export default function MainBlock({ children }: { children: ReactNode }) {
  return (
    <main id="main" className="w-full">
      <div className="h-screen flex items-center justify-center">
        <div>{children}</div>
      </div>
    </main>
  );
}
