"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating, DoctorAvatar } from "./rating";
import { useBooking } from "@/lib/store";
import { getClinic, type Doctor } from "@/lib/data";
import { MapPin, Building2, Home as HomeIcon, Clock, Percent, GraduationCap } from "lucide-react";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const openBooking = useBooking((s) => s.openBooking);
  const clinic = getClinic(doctor.clinicId);

  return (
    <article className="group flex flex-col rounded-xl border bg-card p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start gap-4">
        <a href={`#/doctor/${doctor.id}`} aria-label={`Профиль врача ${doctor.name}`}>
          <DoctorAvatar name={doctor.name} />
        </a>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
            <a
              href={`#/doctor/${doctor.id}`}
              className="font-bold leading-snug hover:text-primary transition-colors"
            >
              {doctor.name}
            </a>
            <Rating value={doctor.rating} reviews={doctor.reviews} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {doctor.specs.join(" · ")}
          </p>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]">
            <span className="font-semibold">Стаж {doctor.exp} лет</span>
            {doctor.category && (
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <GraduationCap className="h-3.5 w-3.5" /> {doctor.category}
              </span>
            )}
          </p>
        </div>
      </div>

      {(doctor.today || doctor.promo || doctor.home) && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {doctor.today && (
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-transparent">
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
      )}

      <div className="mt-3 flex flex-col gap-1.5 text-[13px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Building2 className="h-3.5 w-3.5 shrink-0" />
          <a href={`#/clinics`} className="hover:text-primary transition-colors truncate">
            {clinic.name}
          </a>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 shrink-0" /> м. {doctor.metro} · {doctor.metroDist}
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
        <div className="leading-tight">
          <span className="block text-lg font-extrabold">от {doctor.price.toLocaleString("ru-RU")} ₽</span>
          <span className="text-xs text-muted-foreground">оплата в клинике, без комиссий</span>
        </div>
        <Button onClick={() => openBooking(`${doctor.name} (${doctor.specialty})`)}>Записаться</Button>
      </div>
    </article>
  );
}
