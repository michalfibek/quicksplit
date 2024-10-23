"use client";

import { ReactNode } from "react";

export default function MainBlock({ children }: { children: ReactNode }) {
  return (
    <div id="Main" className="mx-auto py-5 max-w-xl">
      {children}
    </div>
  );
}
