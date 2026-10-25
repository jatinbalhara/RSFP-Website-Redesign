import { unconfirmed } from "@/site.config";

/** Shown only in `npm run dev`, so placeholders don't slip into the live site unnoticed. */
export function PlaceholderStrip() {
  if (process.env.NODE_ENV === "production" || unconfirmed.length === 0) return null;
  return (
    <div className="placeholder-strip" role="note">
      <strong>Dev only · still placeholders:</strong> {unconfirmed.join(" · ")}. Edit <code>site.config.ts</code>.
    </div>
  );
}
