import { Star } from "lucide-react";
import { initials, avatarHue, formatReviews } from "@/lib/data";

export function Rating({ value, reviews }: { value: number; reviews?: number }) {
  return (
    <span className="inline-flex items-center gap-1" title={`Рейтинг ${value} из 5`}>
      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
      <span className="text-sm font-bold">{value.toFixed(1)}</span>
      {reviews !== undefined && <span className="text-sm text-muted-foreground">{formatReviews(reviews)}</span>}
    </span>
  );
}

export function DoctorAvatar({ name, size = "md" }: { name: string; size?: "md" | "lg" }) {
  const hue = avatarHue(name);
  const cls = size === "lg" ? "h-24 w-24 text-3xl" : "h-14 w-14 text-lg";
  return (
    <span
      aria-hidden="true"
      className={`${cls} shrink-0 select-none rounded-2xl inline-flex items-center justify-center font-extrabold text-white shadow-inner`}
      style={{
        background: `linear-gradient(135deg, oklch(0.72 0.11 ${hue}), oklch(0.58 0.11 ${(hue + 30) % 360}))`,
      }}
    >
      {initials(name)}
    </span>
  );
}
