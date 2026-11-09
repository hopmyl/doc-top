"use client";

import { Badge } from "@/components/ui/badge";
import { RequestBlock } from "./request-block";
import { SERVICE_CATEGORIES } from "@/lib/data";
import { Stethoscope, Smile, ScanHeart, FlaskConical, Sparkles, Activity } from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Stethoscope,
  Smile,
  ScanHeart,
  FlaskConical,
  Sparkles,
  Activity,
};

type Props = { initialCat: string };

export function ServicesPage({ initialCat }: Props) {
  const active = SERVICE_CATEGORIES.find((c) => c.id === initialCat);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <nav className="text-sm text-muted-foreground" aria-label="Хлебные крошки">
        <a href="#/" className="hover:text-primary">Главная</a> / <span className="text-foreground">Услуги</span>
      </nav>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Услуги и цены</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        1 060 медицинских услуг с честными ценами — по прайсу клиник, без наших наценок и комиссий.
      </p>

      {/* Якорное меню категорий */}
      <nav className="mt-6 flex flex-wrap gap-2" aria-label="Категории услуг">
        {SERVICE_CATEGORIES.map((c) => {
          const Icon = CATEGORY_ICONS[c.icon] ?? Stethoscope;
          const isActive = c.id === initialCat;
          return (
            <a
              key={c.id}
              href={`#/services?cat=${c.id}`}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-primary bg-primary text-white"
                  : "bg-white hover:border-primary hover:text-primary"
              }`}
            >
              <Icon className="h-4 w-4" /> {c.label}
            </a>
          );
        })}
      </nav>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {SERVICE_CATEGORIES.filter((c) => !active || c.id === active.id).map((cat) => {
          const Icon = CATEGORY_ICONS[cat.icon] ?? Stethoscope;
          return (
            <section key={cat.id} className="rounded-xl border bg-card p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon className="h-5.5 w-5.5" />
                </span>
                <h2 className="text-xl font-extrabold tracking-tight">{cat.label}</h2>
              </div>
              <ul className="mt-4 divide-y">
                {cat.items.map((item) => (
                  <li key={item.name} className="flex items-baseline justify-between gap-4 py-2.5">
                    <span className="text-sm">
                      {item.name}
                      {item.note && (
                        <Badge variant="secondary" className="ml-2 font-normal">
                          {item.note}
                        </Badge>
                      )}
                    </span>
                    <span className="whitespace-nowrap font-bold">{item.price}</span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="mt-10">
        <RequestBlock />
      </div>
    </div>
  );
}
