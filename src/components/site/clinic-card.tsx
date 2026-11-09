"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating } from "./rating";
import { useBooking } from "@/lib/store";
import type { Clinic } from "@/lib/data";
import { MapPin, Clock, Building2, ArrowRight } from "lucide-react";

const PRICE_LABEL: Record<Clinic["priceLevel"], string> = {
  "Бюджетно": "₽ — бюджетно",
  "Средние цены": "₽₽ — средние цены",
  "Премиум": "₽₽₽ — премиум",
};

export function ClinicCard({ clinic }: { clinic: Clinic }) {
  const openBooking = useBooking((s) => s.openBooking);
  return (
    <article className="flex flex-col rounded-xl border bg-card p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-bold leading-snug">
          <a href={`#/clinics`} className="hover:text-primary transition-colors">
            {clinic.name}
          </a>
        </h3>
        <Rating value={clinic.rating} reviews={clinic.reviews} />
      </div>

      <div className="mt-3 flex flex-col gap-1.5 text-[13px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 shrink-0" /> м. {clinic.metro} · {clinic.metroDist} · {clinic.address}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 shrink-0" /> {clinic.hours}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Building2 className="h-3.5 w-3.5 shrink-0" /> {PRICE_LABEL[clinic.priceLevel]}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">{clinic.about}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {clinic.services.slice(0, 4).map((s) => (
          <Badge key={s} variant="secondary" className="font-normal">
            {s}
          </Badge>
        ))}
        {clinic.services.length > 4 && <Badge variant="secondary">+{clinic.services.length - 4}</Badge>}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
        <Button variant="outline" onClick={() => openBooking(`Клиника «${clinic.shortName}»`)}>
          Записаться
        </Button>
        <a
          href={`#/doctors?clinic=${clinic.id}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          Врачи клиники <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}
