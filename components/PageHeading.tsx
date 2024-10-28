import { ReactNode } from "react";

export default function PageHeading({ children }: { children: ReactNode }) {
  return (
    <div className="py-5">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-gray-50 sm:truncate sm:text-3xl sm:tracking-tight">
          {children}
        </h2>
      </div>
    </div>
  );
}
