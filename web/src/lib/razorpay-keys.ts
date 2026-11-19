/**
 * Clean a key pasted into Vercel: trims spaces and line breaks, removes surrounding quotes,
 * and removes a "NAME=" prefix (when a whole .env line was pasted into the value).
 */
export function cleanKey(raw: string | undefined, name: string): string {
  let v = (raw ?? "").trim();
  if (v.startsWith(`${name}=`)) v = v.slice(name.length + 1).trim();
  if (v.length >= 2 && ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))) {
    v = v.slice(1, -1).trim();
  }
  return v;
}

export type KeyReport = {
  mode: "live" | "test" | "unknown" | "missing";
  /** the Key ID with its middle hidden, e.g. rzp_live_U2…uY (Key IDs are public; safe to show) */
  idShown: string;
  idLength: number;
  idLooksRight: boolean;
  secretLength: number;
  secretLooksRight: boolean;
  webhookSet: boolean;
};

/** What the admin can see about the keys, without showing any secret. */
export function describeKeys(id: string, secret: string, webhook: string): KeyReport {
  const m = /^rzp_(live|test)_/.exec(id);
  return {
    mode: !id ? "missing" : m ? (m[1] as "live" | "test") : "unknown",
    idShown: id ? (id.length > 14 ? `${id.slice(0, 11)}…${id.slice(-2)}` : `${id.slice(0, 4)}…`) : "",
    idLength: id.length,
    idLooksRight: /^rzp_(live|test)_[A-Za-z0-9]{14}$/.test(id),
    secretLength: secret.length,
    secretLooksRight: /^[A-Za-z0-9]{20,32}$/.test(secret),
    webhookSet: webhook.length > 0,
  };
}
