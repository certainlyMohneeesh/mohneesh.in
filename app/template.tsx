import { ViewTransition } from "react";

/**
 * Route transition. A template re-mounts on every navigation, so React sees
 * the old page exit and the new page enter and hands both to the browser's
 * View Transitions API. The CSS (`.fold` / `.unfold` in globals.css) makes
 * the next page unroll from the top edge. `default="none"` keeps unrelated
 * updates (filters, drawers) from animating.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="unfold" exit="fold" default="none">
      {children}
    </ViewTransition>
  );
}
