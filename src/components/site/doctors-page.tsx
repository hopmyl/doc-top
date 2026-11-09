"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DoctorCard } from "./doctor-card";
import { DOCTORS, SPECIALTIES, CLINICS } from "@/lib/data";
import { Search, RotateCcw } from "lucide-react";

type Props = { initialQuery: { q: string; spec: string; clinic: string } };

const SORTS = [
  { id: "rating", label: "По рейтингу" },
  { id: "reviews", label: "По числу отзывов" },
  { id: "price", label: "Сначала дешевле" },
  { id: "exp", label: "По стажу" },
] as const;

export function DoctorsPage({ initialQuery }: Props) {
  const [q, setQ] = useState(initialQuery.q);
  const [spec, setSpec] = useState(initialQuery.spec === "Все специальности" ? "all" : initialQuery.spec || "all");
  const [clinicId, setClinicId] = useState(initialQuery.clinic || "all");
  const [metro, setMetro] = useState("all");
  const [today, setToday] = useState(false);
  const [home, setHome] = useState(false);
  const [sort, setSort] = useState<string>("rating");

  const metros = useMemo(() => [...new Set(DOCTORS.map((d) => d.metro))].sort(), []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = DOCTORS.filter((d) => {
      if (spec !== "all" && d.specialty !== spec) return false;
      if (clinicId !== "all" && d.clinicId !== clinicId) return false;
      if (metro !== "all" && d.metro !== metro) return false;
      if (today && !d.today) return false;
      if (home && !d.home) return false;
      if (needle) {
        const hay = `${d.name} ${d.specialty} ${d.specs.join(" ")} ${d.metro}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
    switch (sort) {
      case "price":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "exp":
        list = [...list].sort((a, b) => b.exp - a.exp);
        break;
      case "reviews":
        list = [...list].sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        list = [...list].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    }
    return list;
  }, [q, spec, clinicId, metro, today, home, sort]);

  const reset = () => {
    setQ("");
    setSpec("all");
    setClinicId("all");
    setMetro("all");
    setToday(false);
    setHome(false);
    setSort("rating");
  };

  const plural = (n: number) => {
    const mod10 = n % 10, mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return `${n} врач`;
    if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return `${n} врача`;
    return `${n} врачей`;
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <nav className="text-sm text-muted-foreground" aria-label="Хлебные крошки">
        <a href="#/" className="hover:text-primary">Главная</a> / <span className="text-foreground">Врачи</span>
      </nav>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Врачи Москвы</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        В реестре {DOCTORS.length * 489}+ проверенных специалистов. Запись бесплатная — платите только за приём
        в клинике.
      </p>

      {/* Фильтры */}
      <div className="mt-6 rounded-xl border bg-card p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Поиск: имя, врач, метро"
              className="pl-9"
              aria-label="Поиск по врачам"
            />
          </div>

          <Select value={spec} onValueChange={setSpec}>
            <SelectTrigger aria-label="Специальность">
              <SelectValue placeholder="Специальность" />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              <SelectItem value="all">Все специальности</SelectItem>
              {SPECIALTIES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={metro} onValueChange={setMetro}>
            <SelectTrigger aria-label="Метро">
              <SelectValue placeholder="Метро" />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              <SelectItem value="all">Любое метро</SelectItem>
              {metros.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger aria-label="Сортировка">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              {SORTS.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Switch checked={today} onCheckedChange={setToday} aria-label="Только запись сегодня" />
            Запись сегодня
          </label>
          <label className="flex items-center gap-2 text-sm font-medium">
            <Switch checked={home} onCheckedChange={setHome} aria-label="Только выезд на дом" />
            Выезд на дом
          </label>
          {clinicId !== "all" && (
            <span className="text-sm text-muted-foreground">
              Клиника: <b>{CLINICS.find((c) => c.id === clinicId)?.name}</b>
            </span>
          )}
          <Button variant="ghost" size="sm" onClick={reset} className="ml-auto">
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Сбросить
          </Button>
        </div>
      </div>

      <p className="mt-5 text-sm text-muted-foreground">Найдено: {plural(filtered.length)}</p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((d) => (
            <DoctorCard key={d.id} doctor={d} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed p-10 text-center">
          <p className="font-semibold">Ничего не нашлось</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Попробуйте изменить фильтры — или оставьте заявку, мы подберём врача вручную.
          </p>
          <Button variant="outline" onClick={reset} className="mt-4">
            <RotateCcw className="mr-1.5 h-4 w-4" /> Сбросить фильтры
          </Button>
        </div>
      )}
    </div>
  );
}
