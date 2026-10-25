import { site } from "@/site.config";

/** Slugs in season for a given month (1–12), with their note. */
export function inSeason(month: number) {
  return site.seasons.filter((s) => (s.months as readonly number[]).includes(month));
}
