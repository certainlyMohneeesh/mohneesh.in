/**
 * The running stitch down the left selvedge — doubles as scroll progress.
 * Pure markup; all motion is a CSS scroll-driven animation (see `.stitch`).
 */
export function Stitch() {
  return (
    <div className="stitch" aria-hidden="true">
      <i className="stitch-thread" />
      <i className="stitch-needle" />
    </div>
  );
}
