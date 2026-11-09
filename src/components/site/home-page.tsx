"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DoctorCard } from "./doctor-card";
import { ClinicCard } from "./clinic-card";
import { RequestBlock } from "./request-block";
import { useBooking } from "@/lib/store";
import { DOCTORS, CLINICS, SPECIALTIES, SERVICE_CATEGORIES, FAQ_ITEMS, HOW_IT_WORKS } from "@/lib/data";
import { STATS, USPS } from "@/lib/site";
import {
  Search,
  ArrowRight,
  Wallet,
  Zap,
  MapPin,
  Stethoscope,
  Smile,
  ScanHeart,
  FlaskConical,
  Sparkles,
  Activity,
  BadgeCheck,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Stethoscope,
  Smile,
  ScanHeart,
  FlaskConical,
  Sparkles,
  Activity,
};

const USPS_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Wallet,
  Zap,
  MapPin,
};

export function HomePage() {
  const openBooking = useBooking((s) => s.openBooking);
  const [query, setQuery] = useState("");

  const search = () => {
    const q = query.trim();
    window.location.hash = q ? `#/doctors?q=${encodeURIComponent(q)}` : "#/doctors";
  };

  const topDoctors = [...DOCTORS].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews).slice(0, 8);
  const topClinics = [...CLINICS].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div>
      {/* Герой */}
      <section className="hero-gradient border-b">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Badge variant="secondary" className="mb-4 text-secondary-foreground">
              <BadgeCheck className="mr-1 h-3.5 w-3.5 text-primary" /> С {STATS.total} врачами и клиниками
              Москвы
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]">
              Поможем выбрать <span className="text-primary">лучшего врача</span>
            </h1>
            <p className="mt-4 max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed">
              Док Топ — рейтинг медицинских услуг Москвы. Сравните врачей по отзывам, рейтингу и ценам и
              запишитесь бесплатно. Мы не берём комиссий — вы платите только за приём.
            </p>

            <div className="mt-6 flex max-w-lg gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && search()}
                  placeholder="Врач, специальность или клиника"
                  className="h-12 pl-9 bg-white"
                  aria-label="Поиск врачей"
                />
              </div>
              <Button size="lg" onClick={search} className="h-12">
                Найти
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-[13px]">
              <span className="text-muted-foreground">Популярно:</span>
              {["Терапевт", "Стоматолог", "Кардиолог", "Педиатр"].map((s) => (
                <a
                  key={s}
                  href={`#/doctors?spec=${encodeURIComponent(s)}`}
                  className="rounded-full border bg-white px-3 py-0.5 font-medium hover:border-primary hover:text-primary transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Визуальная карточка */}
          <div className="hidden lg:block relative h-[360px]" aria-hidden="true">
            <div className="absolute right-6 top-2 w-[340px] rounded-2xl border bg-white p-5 shadow-lg">
              <div className="flex items-center gap-3">
                <span className="h-12 w-12 rounded-xl bg-teal-100 text-teal-800 inline-flex items-center justify-center font-extrabold">
                  АС
                </span>
                <div>
                  <p className="font-bold text-sm">Соколова Анна Викторовна</p>
                  <p className="text-xs text-muted-foreground">Кардиолог · стаж 22 года</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="font-bold">4.9 ★</span>
                <span className="text-muted-foreground">214 отзыва</span>
                <span className="font-extrabold">от 3 200 ₽</span>
              </div>
            </div>
            <div className="absolute right-40 top-36 w-[340px] rounded-2xl border bg-white p-5 shadow-xl">
              <p className="text-sm font-bold">Окно на сегодня · 17:30</p>
              <p className="mt-1 text-xs text-muted-foreground">Терапевт · клиника «Медлайн» · м. Смоленская</p>
              <div className="mt-3 rounded-lg bg-primary py-2 text-center text-sm font-bold text-white">
                Записаться бесплатно
              </div>
            </div>
            <div className="absolute right-2 top-64 w-[300px] rounded-2xl border bg-white p-4 shadow-md">
              <p className="text-sm font-bold">4.9 из 5</p>
              <p className="text-xs text-muted-foreground">средняя оценка врачей каталога</p>
              <div className="mt-2 h-2 rounded-full bg-teal-100">
                <div className="h-2 w-[92%] rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Статистика со старого сайта */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {[
            { v: STATS.doctors, l: "врачей в реестре" },
            { v: STATS.clinics, l: "медицинских центров" },
            { v: STATS.services, l: "услуг с ценами" },
            { v: `${STATS.years} лет`, l: "работаем с 2016 года" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-2xl sm:text-3xl font-extrabold text-primary">{s.v}</p>
              <p className="mt-1 text-[13px] text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* УТП */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <div className="grid gap-4 md:grid-cols-3">
          {USPS.map((u) => {
            const Icon = USPS_ICONS[u.icon] ?? Zap;
            return (
              <div key={u.title} className="rounded-xl border bg-card p-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-bold">{u.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{u.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Специальности */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight">Единый реестр врачей Москвы</h2>
          <a
            href="#/doctors"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Все 20 специальностей <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {SPECIALTIES.map((s) => (
            <a
              key={s}
              href={`#/doctors?spec=${encodeURIComponent(s)}`}
              className="rounded-full border bg-white px-4 py-1.5 text-sm font-medium transition-colors hover:border-primary hover:bg-secondary hover:text-primary"
            >
              {s}
            </a>
          ))}
        </div>
      </section>

      {/* Топ врачей */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight">Врачи с высоким рейтингом</h2>
          <a
            href="#/doctors"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Все врачи <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {topDoctors.map((d) => (
            <DoctorCard key={d.id} doctor={d} />
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Button variant="outline" asChild>
            <a href="#/doctors">Смотреть всех врачей</a>
          </Button>
        </div>
      </section>

      {/* Как это работает */}
      <section className="mx-auto max-w-6xl px-4 pt-14">
        <h2 className="text-2xl font-extrabold tracking-tight">Как это работает</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {HOW_IT_WORKS.map((h) => (
            <div key={h.step} className="rounded-xl border bg-card p-5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white font-extrabold">
                {h.step}
              </span>
              <h3 className="mt-3 font-bold">{h.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Популярные услуги */}
      <section className="mx-auto max-w-6xl px-4 pt-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight">Популярные услуги</h2>
          <a
            href="#/services"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Все услуги и цены <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CATEGORIES.slice(0, 6).map((cat) => {
            const Icon = CATEGORY_ICONS[cat.icon] ?? Stethoscope;
            return (
              <a
                key={cat.id}
                href={`#/services?cat=${cat.id}`}
                className="group rounded-xl border bg-card p-5 transition-shadow hover:shadow-md"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-bold group-hover:text-primary transition-colors">{cat.label}</h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {cat.items.slice(0, 3).map((i) => (
                    <li key={i.name} className="flex items-center justify-between gap-2">
                      <span className="truncate">{i.name}</span>
                      <span className="font-semibold text-foreground whitespace-nowrap">{i.price}</span>
                    </li>
                  ))}
                </ul>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Смотреть все цены <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </a>
            );
          })}
        </div>
      </section>

      {/* Клиники */}
      <section className="mx-auto max-w-6xl px-4 pt-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight">Проверенные клиники</h2>
          <a
            href="#/clinics"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Все клиники <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {topClinics.map((c) => (
            <ClinicCard key={c.id} clinic={c} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 pt-14">
        <h2 className="text-2xl font-extrabold tracking-tight">Частые вопросы</h2>
        <Accordion type="single" collapsible className="mt-5">
          {FAQ_ITEMS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Форма подбора */}
      <section className="mx-auto max-w-6xl px-4 pt-14">
        <RequestBlock />
      </section>

      {/* CTA записаться */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-14 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight">Готовы записаться к врачу?</h2>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          Выберите специалиста из каталога или позвоните нам — поможем бесплатно.
        </p>
        <div className="mt-5 flex flex-col sm:flex-row justify-center gap-3">
          <Button size="lg" onClick={() => openBooking()}>
            Записаться на приём
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#/doctors">Открыть каталог врачей</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
