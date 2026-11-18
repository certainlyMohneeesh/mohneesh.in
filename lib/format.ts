/**
 * "WORKING · PRESENT" → "present", "JUN 2025 – AUG 2025" → "Jun – Aug 2025",
 * "2022 – 2026" → "2022 – 2026". Keeps data/experience.json untouched.
 */
export function formatPeriod(raw: string): { label: string; current: boolean } {
  if (/present/i.test(raw)) return { label: "present", current: true };

  const m = raw.match(/^([A-Za-z]{3})\s+(\d{4})\s*[–-]\s*([A-Za-z]{3})\s+(\d{4})$/);
  if (m) {
    const cap = (s: string) => s[0].toUpperCase() + s.slice(1).toLowerCase();
    const [, m1, y1, m2, y2] = m;
    return {
      label: y1 === y2 ? `${cap(m1)} – ${cap(m2)} ${y1}` : `${cap(m1)} ${y1} – ${cap(m2)} ${y2}`,
      current: false,
    };
  }
  return { label: raw, current: false };
}
