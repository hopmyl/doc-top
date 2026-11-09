"use client";

import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { BookingDialog } from "@/components/site/booking-dialog";
import { HomePage } from "@/components/site/home-page";
import { DoctorsPage } from "@/components/site/doctors-page";
import { ClinicsPage } from "@/components/site/clinics-page";
import { ServicesPage } from "@/components/site/services-page";
import { AboutPage } from "@/components/site/about-page";
import { ContactsPage } from "@/components/site/contacts-page";
import { DoctorDetailPage } from "@/components/site/doctor-detail-page";
import { FaqPage, PrivacyPage, ReviewRulesPage } from "@/components/site/static-pages";

type ParsedRoute = { path: string; params: URLSearchParams };

function parseHash(hash: string): ParsedRoute {
  const raw = (hash || "/").split("?")[0] || "/";
  const query = hash.includes("?") ? hash.slice(hash.indexOf("?") + 1) : "";
  return { path: raw.replace(/\/+$/, "") || "/", params: new URLSearchParams(query) };
}

const TITLES: Record<string, string> = {
  "/": "Док Топ — рейтинг медицинских услуг | Запись к врачам в Москве",
  "/doctors": "Врачи Москвы — каталог со стажем, рейтингом и ценами | Док Топ",
  "/clinics": "Клиники Москвы — проверенные медицинские центры | Док Топ",
  "/services": "Услуги и цены на приём и диагностику | Док Топ",
  "/about": "О сервисе Док Топ — рейтинг медицинских услуг",
  "/contacts": "Контакты — телефоны, почта, поддержка | Док Топ",
  "/faq": "Частые вопросы | Док Топ",
  "/privacy": "Политика обработки персональных данных | Док Топ",
  "/review-rules": "Правила публикации отзывов | Док Топ",
};

export default function Page() {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const read = () => setHash(window.location.hash.replace(/^#/, ""));
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const route = useMemo(() => parseHash(hash), [hash]);

  useEffect(() => {
    document.title = TITLES[route.path] ?? "Док Топ — рейтинг медицинских услуг";
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [route.path]);

  const page = (() => {
    switch (true) {
      case route.path === "/":
        return <HomePage />;
      case route.path === "/doctors":
        return (
          <DoctorsPage
            key={hash}
            initialQuery={{
              q: route.params.get("q") ?? "",
              spec: route.params.get("spec") ?? "",
              clinic: route.params.get("clinic") ?? "",
            }}
          />
        );
      case route.path === "/clinics":
        return <ClinicsPage />;
      case route.path === "/services":
        return <ServicesPage key={hash} initialCat={route.params.get("cat") ?? ""} />;
      case route.path === "/about":
        return <AboutPage />;
      case route.path === "/contacts":
        return <ContactsPage />;
      case route.path === "/faq":
        return <FaqPage />;
      case route.path === "/privacy":
        return <PrivacyPage />;
      case route.path === "/review-rules":
        return <ReviewRulesPage />;
      case route.path.startsWith("/doctor/"):
        return <DoctorDetailPage doctorId={route.path.replace("/doctor/", "")} />;
      default:
        return <NotFoundPage />;
    }
  })();

  return (
    <div className="flex min-h-screen flex-col">
      <Header route={route.path} />
      <main className="flex-1">{page}</main>
      <Footer />
      <BookingDialog />
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 text-center">
      <p className="text-6xl font-extrabold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-extrabold tracking-tight">Страница не найдена</h1>
      <p className="mt-2 text-muted-foreground">
        Возможно, ссылка устарела. Начните с главной или откройте каталог врачей.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <a
          href="#/"
          className="rounded-lg bg-primary px-5 py-2.5 font-bold text-white hover:opacity-90 transition-opacity"
        >
          На главную
        </a>
        <a
          href="#/doctors"
          className="rounded-lg border px-5 py-2.5 font-bold hover:border-primary hover:text-primary transition-colors"
        >
          Все врачи
        </a>
      </div>
    </div>
  );
}
