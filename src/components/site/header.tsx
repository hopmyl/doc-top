"use client";

import { useState } from "react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, Mail, Clock, MapPin, Phone } from "lucide-react";
import { useBooking } from "@/lib/store";
import { CONTACTS, NAV_MAIN, NAV_SERVICE_LINKS } from "@/lib/site";

export function Header({ route }: { route: string }) {
  const openBooking = useBooking((s) => s.openBooking);
  const [mobileOpen, setMobileOpen] = useState(false);
  const path = route.split("?")[0];

  const isActive = (href: string) => {
    const target = href.replace("#", "").split("?")[0];
    if (target === "/") return path === "/";
    return path.startsWith(target);
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      {/* Верхняя строка */}
      <div className="hidden md:block bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-6xl px-4 flex items-center justify-between h-9 text-[13px]">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> {CONTACTS.city}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {CONTACTS.hoursCallCenter}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href={`mailto:${CONTACTS.email}`} className="inline-flex items-center gap-1.5 hover:text-primary transition-colors">
              <Mail className="h-3.5 w-3.5" /> {CONTACTS.email}
            </a>
            <a
              href={CONTACTS.vk}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-primary transition-colors"
            >
              Мы ВКонтакте
            </a>
          </div>
        </div>
      </div>

      {/* Основная строка */}
      <div className="mx-auto max-w-6xl px-4 flex items-center justify-between gap-4 h-16">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1" aria-label="Основная навигация">
          {NAV_MAIN.map((item) =>
            item.label === "Услуги" ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                      isActive("/services") ? "text-primary" : ""
                    }`}
                  >
                    Услуги <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {NAV_SERVICE_LINKS.map((s) => (
                    <DropdownMenuItem key={s.label} asChild>
                      <a href={s.href}>{s.label}</a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href.replace("#", "")) ? "text-primary" : ""
                }`}
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${CONTACTS.phoneMain.replace(/[^+\d]/g, "")}`}
            className="hidden xl:flex flex-col items-end leading-tight hover:text-primary transition-colors"
          >
            <span className="text-[11px] text-muted-foreground">Телефон для записи</span>
            <span className="inline-flex items-center gap-1.5 font-bold">
              <Phone className="h-4 w-4 text-primary" />
              {CONTACTS.phoneMain}
            </span>
          </a>
          <Button onClick={() => openBooking()} className="hidden sm:inline-flex">
            Записаться
          </Button>

          {/* Мобильное меню */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Открыть меню">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <SheetTitle className="sr-only">Меню</SheetTitle>
              <SheetDescription className="sr-only">Навигация по сайту Док Топ</SheetDescription>
              <div className="mt-4 flex flex-col gap-1">
                {NAV_MAIN.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-lg px-3 py-2.5 text-base font-medium hover:bg-accent ${
                      isActive(item.href.replace("#", "")) ? "text-primary bg-secondary" : ""
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="mt-3 border-t pt-3">
                  <p className="px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Услуги
                  </p>
                  {NAV_SERVICE_LINKS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      onClick={() => setMobileOpen(false)}
                      className="mt-1 block rounded-lg px-3 py-2.5 text-base font-medium hover:bg-accent"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
                <div className="mt-4 border-t pt-4 flex flex-col gap-3 px-3">
                  <a href={`tel:${CONTACTS.phoneMain.replace(/[^+\d]/g, "")}`} className="font-bold text-lg">
                    {CONTACTS.phoneMain}
                  </a>
                  <span className="text-sm text-muted-foreground">{CONTACTS.hoursCallCenter}</span>
                  <Button
                    onClick={() => {
                      setMobileOpen(false);
                      openBooking();
                    }}
                  >
                    Записаться на приём
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
