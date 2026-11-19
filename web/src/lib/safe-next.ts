/** Where to go after login: only paths inside our own site (no open redirects). */
export function safeNext(next: unknown): string {
  const n = typeof next === "string" ? next : "";
  return n.startsWith("/") && !n.startsWith("//") && !n.startsWith("/\\") ? n : "/account";
}
