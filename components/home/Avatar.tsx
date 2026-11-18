"use client";

import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import { EGG_EVENT } from "@/components/EasterEgg";

const AVATAR_SRC =
  "https://res.cloudinary.com/dj3dp0ccy/image/upload/f_auto/q_auto/v1776790797/mohneeshphoto_x0qjek.png";

/** Profile photo cut like a swatch (pinked edges) and pinned on. Five clicks wake the egg. */
export function Avatar() {
  const clicks = useRef(0);

  const onClick = () => {
    clicks.current += 1;
    if (clicks.current < 5) return;
    clicks.current = 0;
    window.dispatchEvent(new CustomEvent(EGG_EVENT, { detail: "five clicks. you are persistent." }));
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Profile photo"
      className="relative block size-16 shrink-0 cursor-pointer"
    >
      <span
        className="pinked block size-full overflow-hidden bg-raised"
        style={{ "--z": "6px" } as CSSProperties}
      >
        <Image
          src={AVATAR_SRC}
          alt="Mohneesh"
          width={128}
          height={128}
          priority
          className="size-full object-cover"
        />
      </span>
      <span
        aria-hidden="true"
        className="absolute -top-0.5 left-1/2 size-2 -translate-x-1/2 rounded-full bg-chalk shadow-[0_0_0_2px_var(--bg)]"
      />
    </button>
  );
}
