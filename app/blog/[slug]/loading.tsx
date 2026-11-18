export default function Loading() {
  return (
    <section aria-busy="true" className="pt-12 sm:pt-20">
      <div className="shell">
        <p
          role="status"
          className="mb-8 flex items-center gap-2 font-mono text-xs tracking-wide text-subtle"
        >
          <span
            aria-hidden="true"
            className="h-4 border-l-2 border-dashed border-chalk"
          />
          Unrolling journal entry
        </p>

        <div aria-hidden="true">
          <div className="mb-12 space-y-4">
            <div className="h-9 w-11/12 rounded bg-raised sm:h-11" />
            <div className="h-9 w-2/3 rounded bg-raised sm:h-11" />
            <div className="h-5 w-full rounded bg-raised" />
            <div className="h-5 w-3/4 rounded bg-raised" />
            <div className="h-4 w-1/3 rounded bg-raised" />
            <div className="flex gap-2 pt-1">
              <div className="h-5 w-16 rounded bg-raised" />
              <div className="h-5 w-20 rounded bg-raised" />
              <div className="h-5 w-14 rounded bg-raised" />
            </div>
          </div>

          <div className="space-y-4 border-l border-dashed border-line-strong pl-5">
            <div className="h-6 w-1/2 rounded bg-raised" />
            <div className="h-4 w-full rounded bg-raised" />
            <div className="h-4 w-11/12 rounded bg-raised" />
            <div className="h-4 w-4/5 rounded bg-raised" />
            <div className="h-24 rounded border border-dashed border-line-strong bg-raised sm:h-32" />
            <div className="h-4 w-full rounded bg-raised" />
            <div className="h-4 w-2/3 rounded bg-raised" />
          </div>
        </div>
      </div>
    </section>
  );
}
