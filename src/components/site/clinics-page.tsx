"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { ClinicCard } from "./clinic-card";
import { CLINICS } from "@/lib/data";
import { Search } from "lucide-react";

export function ClinicsPage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return CLINICS;
    return CLINICS.filter((c) =>
      `${c.name} ${c.shortName} ${c.metro} ${c.address} ${c.services.join(" ")}`.toLowerCase().includes(needle)
    );
  }, [q]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <nav className="text-sm text-muted-foreground" aria-label="Хлебные крошки">
        <a href="#/" className="hover:text-primary">Главная</a> / <span className="text-foreground">Клиники</span>
      </nav>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Клиники Москвы</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Только учреждения с действующими лицензиями и проверенными отзывами пациентов.
      </p>

      <div className="relative mt-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Поиск: название, метро, услуга"
          className="pl-9"
          aria-label="Поиск по клиникам"
        />
      </div>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {filtered.map((c) => (
            <ClinicCard key={c.id} clinic={c} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed p-10 text-center">
          <p className="font-semibold">Клиники не найдены</p>
          <p className="mt-1 text-sm text-muted-foreground">Попробуйте другой запрос — например, «стоматология» или «Академическая».</p>
        </div>
      )}
    </div>
  );
}
