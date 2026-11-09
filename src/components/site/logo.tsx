export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="2" width="60" height="60" rx="16" className="fill-primary" />
      <path d="M20 44V20h9.5c7.5 0 12.5 4.6 12.5 12s-5 12-12.5 12H20z" fill="#fff" />
      <circle cx="45" cy="40" r="6" fill="#99F6E4" />
      <path
        d="M42.5 40l2 2 3.5-4"
        stroke="#0D9488"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M24 24h5.5c4.6 0 7.5 3 7.5 8s-2.9 8-7.5 8H24V24z" fill="#0D9488" opacity="0.35" />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href="#/"
      className="flex items-center gap-2.5 shrink-0"
      aria-label="Док Топ — на главную"
    >
      <LogoMark />
      {!compact && (
        <span className="leading-none">
          <span className="block text-xl font-extrabold tracking-tight">
            DOC<span className="text-primary">.</span>TOP
          </span>
          <span className="block text-[11px] text-muted-foreground mt-0.5">рейтинг медицинских услуг</span>
        </span>
      )}
    </a>
  );
}
