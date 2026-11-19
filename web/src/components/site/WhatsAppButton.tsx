import { BRAND, waHref, WHATSAPP_GREETING } from "@/lib/brand";

/** Floating "chat on WhatsApp" button, bottom-right on every public page. Hidden if no number is set. */
export function WhatsAppButton() {
  const number = BRAND.contact.whatsapp;
  if (!number) return null;
  return (
    <a
      href={waHref(number, WHATSAPP_GREETING)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
    >
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden fill="white">
        <path d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.75a12.96 12.96 0 0 0 6.36 1.63h.01C23.22 28.88 29 23.06 29 15.9 29 8.82 23.22 3 16.04 3Zm0 23.7h-.01a10.8 10.8 0 0 1-5.5-1.5l-.4-.24-3.96 1.04 1.06-3.86-.26-.4a10.75 10.75 0 0 1-1.65-5.74c0-5.95 4.85-10.8 10.82-10.8 2.89 0 5.6 1.13 7.64 3.17a10.73 10.73 0 0 1 3.16 7.64c0 5.95-4.85 10.7-10.9 10.7Zm5.93-8.07c-.33-.16-1.93-.95-2.23-1.06-.3-.11-.52-.16-.73.16-.22.33-.84 1.06-1.03 1.27-.19.22-.38.24-.7.08-.33-.16-1.38-.51-2.62-1.62-.97-.86-1.62-1.93-1.81-2.25-.19-.33-.02-.5.14-.66.15-.15.33-.38.49-.57.16-.19.22-.33.33-.54.11-.22.05-.41-.03-.57-.08-.16-.73-1.76-1-2.41-.26-.63-.53-.55-.73-.56h-.62c-.22 0-.57.08-.87.41-.3.33-1.14 1.11-1.14 2.71 0 1.6 1.17 3.15 1.33 3.36.16.22 2.3 3.5 5.56 4.91.78.34 1.39.54 1.86.69.78.25 1.49.21 2.05.13.63-.09 1.93-.79 2.2-1.55.27-.76.27-1.41.19-1.55-.08-.14-.3-.22-.62-.38Z" />
      </svg>
    </a>
  );
}
