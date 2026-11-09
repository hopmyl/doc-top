"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rating, DoctorAvatar } from "./rating";
import { DoctorCard } from "./doctor-card";
import { useBooking } from "@/lib/store";
import { DOCTORS, getClinic, formatReviews } from "@/lib/data";
import {
  MapPin,
  Building2,
  GraduationCap,
  Clock,
  Home as HomeIcon,
  Percent,
  ChevronLeft,
  Phone,
} from "lucide-react";
import { CONTACTS } from "@/lib/site";

export function DoctorDetailPage({ doctorId }: { doctorId: string }) {
  const openBooking = useBooking((s) => s.openBooking);
  const doctor = DOCTORS.find((d) => d.id === doctorId);

  if (!doctor) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="text-2xl font-extrabold">Врач не найден</h1>
        <p className="mt-2 text-muted-foreground">Возможно, профиль был перемещён. Откройте каталог врачей.</p>
        <Button className="mt-5" asChild>
          <a href="#/doctors">Все врачи</a>
        </Button>
      </div>
    );
  }

  const clinic = getClinic(doctor.clinicId);
  const similar = DOCTORS.filter((d) => d.specialty === doctor.specialty && d.id !== doctor.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <nav className="text-sm text-muted-foreground" aria-label="Хлебные крошки">
        <a href="#/" className="hover:text-primary">Главная</a> /{" "}
        <a href="#/doctors" className="hover:text-primary">Врачи</a> /{" "}
        <span className="text-foreground">{doctor.name}</span>
      </nav>

      <a
        href="#/doctors"
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
      >
        <ChevronLeft className="h-4 w-4" /> Ко всем врачам
      </a>

      <div className="mt-4 rounded-2xl border bg-card p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-start">
          <div className="flex items-start gap-4 lg:flex-col lg:items-center">
            <DoctorAvatar name={doctor.name} size="lg" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{doctor.name}</h1>
            <p className="mt-1.5 text-muted-foreground">{doctor.specs.join(" · ")}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <Rating value={doctor.rating} reviews={doctor.reviews} />
              <span className="font-semibold">Стаж {doctor.exp} лет</span>
              {doctor.category && (
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <GraduationCap className="h-4 w-4" /> {doctor.category}
                </span>
              )}
              {doctor.degree && (
                <span className="text-muted-foreground">{doctor.degree}</span>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {doctor.today && (
                <Badge className="border-transparent bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                  <Clock className="mr-1 h-3 w-3" /> Запись сегодня
                </Badge>
              )}
              {doctor.home && (
                <Badge variant="outline" className="border-transparent bg-secondary text-secondary-foreground">
                  <HomeIcon className="mr-1 h-3 w-3" /> Выезд на дом
                </Badge>
              )}
              {doctor.promo && (
                <Badge className="border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100">
                  <Percent className="mr-1 h-3 w-3" /> {doctor.promo}
                </Badge>
              )}
            </div>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{doctor.about}</p>
          </div>

          <div className="rounded-xl border bg-secondary/40 p-5 lg:w-72">
            <p className="text-2xl font-extrabold">от {doctor.price.toLocaleString("ru-RU")} ₽</p>
            <p className="text-[13px] text-muted-foreground">за приём · оплата в клинике</p>
            <Button size="lg" className="mt-4 w-full" onClick={() => openBooking(`${doctor.name} (${doctor.specialty})`)}>
              Записаться на приём
            </Button>
            <a
              href={`tel:${CONTACTS.phoneMain.replace(/[^+\d]/g, "")}`}
              className="mt-3 flex items-center justify-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              <Phone className="h-4 w-4" /> {CONTACTS.phoneMain}
            </a>
            <p className="mt-3 text-xs text-muted-foreground text-center">
              Запись бесплатная · без комиссий
            </p>
          </div>
        </div>

        {/* Клиника врача */}
        <div className="mt-6 rounded-xl border bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-bold inline-flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" /> {clinic.name}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> м. {clinic.metro} · {clinic.metroDist} · {clinic.address}
              </p>
            </div>
            <Rating value={clinic.rating} reviews={clinic.reviews} />
          </div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          Отзывов о враче: <b className="text-foreground">{formatReviews(doctor.reviews)}</b>. Все отзывы — от
          пациентов, записывавшихся через Док Топ.
        </div>
      </div>

      {similar.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-extrabold tracking-tight">Похожие специалисты</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {similar.map((d) => (
              <DoctorCard key={d.id} doctor={d} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
