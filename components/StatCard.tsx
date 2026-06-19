"use client";

import { useId, useState } from "react";
import CountUp from "./CountUp";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  title: string;
  desc: string;
  breakdown: string;
};

export default function StatCard({
  value,
  prefix,
  suffix,
  title,
  desc,
  breakdown,
}: Props) {
  const [open, setOpen] = useState(false);
  const breakdownId = useId();

  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={breakdownId}
      onClick={() => setOpen((o) => !o)}
      className="stat-card card flex flex-col text-left"
    >
      <span className="font-display text-5xl font-bold tracking-tight">
        <CountUp value={value} prefix={prefix} suffix={suffix} />
      </span>
      <span className="mt-5 text-[15px] font-medium text-white">{title}</span>
      <span className="mt-2 text-[13px] leading-relaxed text-faint">{desc}</span>

      <span
        id={breakdownId}
        className={`stat-breakdown text-[12px] leading-relaxed text-muted ${
          open ? "is-open" : ""
        }`}
      >
        <span className="block pt-3">{breakdown}</span>
      </span>
    </button>
  );
}
