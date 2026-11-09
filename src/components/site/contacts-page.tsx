"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CONTACTS, LEGAL } from "@/lib/site";
import { formatPhoneInput, isValidPhone } from "@/lib/data";
import { submitRequest } from "@/lib/submit-request";
import { useBooking } from "@/lib/store";
import {
  Phone,
  Mail,
  Send,
  Clock,
  Headset,
  Loader2,
  MapPin,
  MessageSquareText,
  ShieldAlert,
} from "lucide-react";

export function ContactsPage() {
  const openBooking = useBooking((s) => s.openBooking);
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; contact?: string; message?: string }>({});

  const submit = async () => {
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = "Укажите имя";
    const hasPhone = isValidPhone(contact) || contact.replace(/\D/g, "").length === 11;
    const hasEmail = /.+@.+\..+/.test(contact);
    if (!hasPhone && !hasEmail) next.contact = "Укажите телефон или email";
    if (message.trim().length < 5) next.message = "Напишите пару слов о вопросе";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    try {
      const result = await submitRequest({
        type: "feedback",
        name: name.trim(),
        phone: hasPhone ? formatPhoneInput(contact) : "",
        email: hasEmail ? contact.trim() : "",
        message: message.trim(),
        target: "Обратная связь",
      });
      if (!result.ok) throw new Error(result.error);
      toast({
        title: "Сообщение отправлено!",
        description: "Служба поддержки ответит в рабочее время — обычно в течение пары часов.",
      });
      setName("");
      setContact("");
      setMessage("");
    } catch (e) {
      toast({
        title: "Не получилось отправить сообщение",
        description: e instanceof Error ? e.message : "Попробуйте ещё раз или позвоните нам.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const tel = (p: string) => p.replace(/[^+\d]/g, "");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <nav className="text-sm text-muted-foreground" aria-label="Хлебные крошки">
        <a href="#/" className="hover:text-primary">Главная</a> / <span className="text-foreground">Контакты</span>
      </nav>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Контакты</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Позвоните, напишите или оставьте заявку — поможем выбрать врача, ответим на вопросы о записи и ценах.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* Контакты — перенесены со старого сайта doc-top.ru */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border bg-card p-5">
            <h2 className="flex items-center gap-2 font-bold">
              <Phone className="h-4.5 w-4.5 text-primary" /> Телефоны
            </h2>
            <ul className="mt-4 space-y-4">
              {[
                [CONTACTS.phoneMain, "Основной номер — запись на приём"],
                [CONTACTS.phoneCallCenter, "Колл-центр — подбор врача и консультации"],
                [CONTACTS.phoneSupport, "Служба поддержки — вопросы по сайту и отзывам"],
              ].map(([phone, label]) => (
                <li key={phone}>
                  <a
                    href={`tel:${tel(phone)}`}
                    className="text-lg font-extrabold hover:text-primary transition-colors"
                  >
                    {phone}
                  </a>
                  <p className="text-[13px] text-muted-foreground">{label}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border bg-card p-5">
            <h2 className="flex items-center gap-2 font-bold">
              <Mail className="h-4.5 w-4.5 text-primary" /> Почта и соцсети
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={`mailto:${CONTACTS.email}`} className="font-semibold hover:text-primary transition-colors">
                  {CONTACTS.email}
                </a>
                <p className="text-[13px] text-muted-foreground">для вопросов и сотрудничества</p>
              </li>
              <li>
                <a
                  href={CONTACTS.vk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold hover:text-primary transition-colors"
                >
                  <Send className="h-4 w-4" /> Сообщество ВКонтакте
                </a>
                <p className="text-[13px] text-muted-foreground">новости и полезные материалы о здоровье</p>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border bg-card p-5">
            <h2 className="flex items-center gap-2 font-bold">
              <Clock className="h-4.5 w-4.5 text-primary" /> Режим работы
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Headset className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <b>{CONTACTS.hoursCallCenter}</b>
                  <span className="block text-[13px] text-muted-foreground">колл-центр и подбор врача</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MessageSquareText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <b>Заявки с сайта — круглосуточно</b>
                  <span className="block text-[13px] text-muted-foreground">
                    перезваниваем в рабочие часы, в течение 10 минут
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <b>г. {CONTACTS.city}</b>
                  <span className="block text-[13px] text-muted-foreground">
                    работаем онлайн по всей Москве и области
                  </span>
                </span>
              </li>
            </ul>
          </div>

          <Button size="lg" className="w-full" onClick={() => openBooking()}>
            Записаться на приём
          </Button>
        </div>

        {/* Форма обратной связи */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="lg:col-span-3 rounded-xl border bg-card p-5 sm:p-6 grid gap-4 h-fit"
        >
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">Написать нам</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Вопрос о записи, отзыве или клинике? Ответим по телефону или на почту.
            </p>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="fb-name">Ваше имя *</Label>
            <Input
              id="fb-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Как к вам обращаться"
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="fb-contact">Телефон или email *</Label>
            <Input
              id="fb-contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="+7 (999) 123-45-67 или you@mail.ru"
              aria-invalid={!!errors.contact}
            />
            {errors.contact && <p className="text-xs text-destructive">{errors.contact}</p>}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="fb-msg">Сообщение *</Label>
            <Textarea
              id="fb-msg"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Опишите ваш вопрос"
              rows={5}
              aria-invalid={!!errors.message}
            />
            {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Отправляя сообщение, вы соглашаетесь с{" "}
            <a href="#/privacy" className="text-primary underline underline-offset-2">
              политикой обработки персональных данных
            </a>
            .
          </p>
          <Button type="submit" disabled={sending} size="lg">
            {sending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {sending ? "Отправляем…" : "Отправить сообщение"}
          </Button>
        </form>
      </div>

      <div className="mt-8 rounded-xl border bg-secondary/50 p-5 flex items-start gap-3">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          <b className="text-foreground">{LEGAL.ip}</b> · {LEGAL.inn} · {LEGAL.ogrnip}. {LEGAL.disclaimer}
        </p>
      </div>
    </div>
  );
}
