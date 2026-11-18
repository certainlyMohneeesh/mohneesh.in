"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "drafted";

const labelClass = "block text-sm text-subtle";

/**
 * No backend: submitting opens the visitor's mail client with the message
 * pre-filled. The success state says exactly that (nothing is sent until they
 * hit send there) rather than claiming delivery.
 */
export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !from || !message) return;

    setStatus("sending");
    const subject = encodeURIComponent(`Message from ${name} via cyth.dev`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${from}\n\n${message}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setTimeout(() => setStatus("drafted"), 600);
  };

  return (
    <>
      {status === "drafted" && (
        <div
          role="status"
          className="rounded-lg border border-dashed border-chalk p-10 text-center"
        >
          <div className="mb-2 font-hand text-3xl text-chalk">draft ready</div>
          <p className="mb-6 text-muted">
            Your mail app should have opened with the message filled in — hit
            send there. Nothing goes out until you do.
          </p>
          <button type="button" className="btn" onClick={() => setStatus("idle")}>
            Edit message
          </button>
        </div>
      )}

      {/* Kept mounted (just hidden) so edits survive "edit message" */}
      <form
        onSubmit={onSubmit}
        hidden={status === "drafted"}
        className="flex flex-col gap-5"
      >
        <h2 className="text-xl">Send a message</h2>

        <div>
          <label htmlFor="cf-name" className={labelClass}>Name</label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" placeholder="Your name" className="field" />
        </div>

        <div>
          <label htmlFor="cf-email" className={labelClass}>Email</label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder="you@email.com" className="field" />
        </div>

        <div>
          <label htmlFor="cf-message" className={labelClass}>Message</label>
          <textarea id="cf-message" name="message" required rows={5} placeholder="What's on your mind?" className="field resize-none leading-[1.7]" />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className={cn("btn btn-primary mt-1 self-start px-5 py-2.5")}
        >
          {status === "sending" ? (
            <>
              Opening mail…
            </>
          ) : (
            "Send"
          )}
        </button>
      </form>
    </>
  );
}
