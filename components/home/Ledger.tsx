import { Mark } from "@/components/Mark";
import { formatPeriod } from "@/lib/format";
import type { EducationEntry, WorkEntry } from "@/lib/types";

/**
 * Experience as a ledger. Rows are native <details name="ledger"> — an
 * exclusive accordion with no JavaScript, animated by `::details-content`
 * where supported. The live role is highlighter-marked.
 */
export function Ledger({
  work,
  education,
}: {
  work: WorkEntry[];
  education: EducationEntry[];
}) {
  return (
    <div>
      <div className="ledger">
        {work.map((item, i) => {
          const { label, current } = formatPeriod(item.duration);
          return (
            <details key={item.id} name="ledger" open={i === 0}>
              <summary>
                <span className="ledger-period">
                  {current ? (
                    <Mark type="highlight" tone="sun" padding={2} iterations={1} delay={150}>
                      <span className="text-fg">{label}</span>
                    </Mark>
                  ) : (
                    label
                  )}
                </span>
                <span className="ledger-title">
                  <span className="block text-[1.0625rem] font-semibold text-fg">{item.company}</span>
                  <span className="block text-sm text-muted">{item.role}</span>
                </span>
              </summary>

              <div className="pb-5 sm:pl-[9rem]">
                <ul className="space-y-2.5 text-[0.9375rem] leading-relaxed text-muted">
                  {item.bullets.map((b, j) => (
                    <li key={j} className="relative pl-5">
                      <span aria-hidden="true" className="absolute left-0 text-chalk">–</span>
                      {b}
                    </li>
                  ))}
                </ul>
                {item.link && (
                  <a
                    href={item.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ln mt-4 text-sm"
                  >
                    {item.link.label}
                  </a>
                )}
              </div>
            </details>
          );
        })}
      </div>

      <h3 className="mt-12 mb-4 text-base text-muted">Education</h3>
      <div>
        {education.map((edu) => (
          <div
            key={edu.degree}
            className="grid grid-cols-1 gap-x-4 gap-y-1 border-y border-dashed border-line-strong py-4 sm:grid-cols-[8rem_1fr]"
          >
            <span className="text-sm text-subtle tabular-nums">{edu.period}</span>
            <div>
              <div className="text-[1.0625rem] font-semibold text-fg">{edu.degree}</div>
              <div className="text-sm text-muted">{edu.institution}</div>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{edu.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
