import { LogoMark } from "./logo";
import { CONTACTS, LEGAL, BRAND, FOOTER_DOCTOR_LINKS, NAV_SERVICE_LINKS } from "@/lib/site";
import { Mail, Phone, Clock, MapPin, Send } from "lucide-react";

export function Footer() {
  const tel = (p: string) => p.replace(/[^+\d]/g, "");
  return (
    <footer className="mt-auto bg-teal-950 text-teal-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Бренд */}
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-9 w-9" />
              <span className="leading-none">
                <span className="block text-xl font-extrabold tracking-tight">
                  DOC<span className="text-teal-300">.</span>TOP
                </span>
                <span className="block text-[11px] text-teal-200/80 mt-0.5">{BRAND.tagline}</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-teal-100/75">
              Помогаем выбрать лучшего врача в Москве с 2016 года. Бесплатная запись без комиссий, честные
              отзывы пациентов.
            </p>
            <a
              href={CONTACTS.vk}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-white/20"
            >
              <Send className="h-4 w-4" /> Мы ВКонтакте
            </a>
          </div>

          {/* Пациенту */}
          <nav aria-label="Пациенту">
            <h3 className="text-sm font-bold uppercase tracking-wider text-teal-300">Пациенту</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {FOOTER_DOCTOR_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-teal-100/85 hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#/services" className="text-teal-100/85 hover:text-white transition-colors">
                  Все услуги и цены
                </a>
              </li>
              <li>
                <a href="#/faq" className="text-teal-100/85 hover:text-white transition-colors">
                  Частые вопросы
                </a>
              </li>
            </ul>
          </nav>

          {/* Сервис */}
          <nav aria-label="Сервис">
            <h3 className="text-sm font-bold uppercase tracking-wider text-teal-300">Сервис</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_SERVICE_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-teal-100/85 hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#/about" className="text-teal-100/85 hover:text-white transition-colors">
                  О нас
                </a>
              </li>
              <li>
                <a href="#/contacts" className="text-teal-100/85 hover:text-white transition-colors">
                  Контакты
                </a>
              </li>
              <li>
                <a href="#/privacy" className="text-teal-100/85 hover:text-white transition-colors">
                  Политика в отношении обработки персональных данных
                </a>
              </li>
              <li>
                <a href="#/review-rules" className="text-teal-100/85 hover:text-white transition-colors">
                  Правила публикации отзывов
                </a>
              </li>
            </ul>
          </nav>

          {/* Контакты */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-teal-300">Контакты</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={`tel:${tel(CONTACTS.phoneMain)}`} className="flex items-start gap-2 hover:text-white">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                  <span>
                    <span className="block font-bold">{CONTACTS.phoneMain}</span>
                    <span className="block text-xs text-teal-100/60">основной номер</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`tel:${tel(CONTACTS.phoneCallCenter)}`} className="flex items-start gap-2 hover:text-white">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                  <span>
                    <span className="block font-semibold">{CONTACTS.phoneCallCenter}</span>
                    <span className="block text-xs text-teal-100/60">колл-центр</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`tel:${tel(CONTACTS.phoneSupport)}`} className="flex items-start gap-2 hover:text-white">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                  <span>
                    <span className="block font-semibold">{CONTACTS.phoneSupport}</span>
                    <span className="block text-xs text-teal-100/60">служба поддержки</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACTS.email}`} className="flex items-center gap-2 hover:text-white">
                  <Mail className="h-4 w-4 shrink-0 text-teal-300" /> {CONTACTS.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-teal-100/70">
                <Clock className="h-4 w-4 shrink-0 text-teal-300" /> {CONTACTS.hoursCallCenter}
              </li>
              <li className="flex items-center gap-2 text-teal-100/70">
                <MapPin className="h-4 w-4 shrink-0 text-teal-300" /> г. {CONTACTS.city}, работаем онлайн
              </li>
            </ul>
          </div>
        </div>

        {/* Самый низ — перенесён со старого сайта doc-top.ru */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-teal-100/55">{LEGAL.disclaimer}</p>
          <div className="mt-4 flex flex-col gap-2 text-xs text-teal-100/70 md:flex-row md:items-center md:justify-between">
            <span>
              {LEGAL.ip} · {LEGAL.inn} · {LEGAL.ogrnip}
            </span>
            <span className="md:text-right">{BRAND.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
