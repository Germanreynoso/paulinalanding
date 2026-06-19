"use client";

type Props = {
  id: string;
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

export default function Accordion({ id, title, open, onToggle, children }: Props) {
  return (
    <div className="border-t border-line last:border-b">
      <button
        type="button"
        id={`acc-btn-${id}`}
        aria-expanded={open}
        aria-controls={`acc-panel-${id}`}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-[17px] font-medium text-white md:text-lg">
          {title}
        </span>
        <span
          aria-hidden
          className="accordion-icon text-xl text-muted"
          data-open={open}
        >
          +
        </span>
      </button>
      <div
        id={`acc-panel-${id}`}
        role="region"
        aria-labelledby={`acc-btn-${id}`}
        className="accordion-panel"
        data-open={open}
      >
        <div className="accordion-inner">
          <div className="pb-5 pr-8 text-[15px] leading-relaxed text-muted">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
