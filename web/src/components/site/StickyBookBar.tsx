"use client";

import { useEffect, useState } from "react";

/**
 * Phone-only booking bar fixed to the bottom of a paid class page. It hides while the booking card
 * (#register) is on screen, so it never covers the real button.
 */
export function StickyBookBar({ price, when }: { price: string; when: string }) {
  const [registerVisible, setRegisterVisible] = useState(false);

  useEffect(() => {
    const el = document.getElementById("register");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setRegisterVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden={registerVisible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 py-3 pl-4 pr-24 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-200 lg:hidden ${
        registerVisible ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1 leading-tight">
          <p className="text-lg font-bold text-brand">{price}</p>
          <p className="truncate text-xs text-zinc-600">{when}</p>
        </div>
        <a
          href="#register"
          tabIndex={registerVisible ? -1 : 0}
          className="shrink-0 rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Book your seat
        </a>
      </div>
    </div>
  );
}
