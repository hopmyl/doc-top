"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useBooking } from "@/lib/store";
import { formatPhoneInput, isValidPhone } from "@/lib/data";
import { submitRequest } from "@/lib/submit-request";
import { CONTACTS } from "@/lib/site";
import { Loader2, PhoneCall, Headset } from "lucide-react";

export function RequestBlock() {
  const openBooking = useBooking((s) => s.openBooking);
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7 ");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(true);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; consent?: string }>({});
  const [sending, setSending] = useState(false);

  const submit = async () => {
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = "Укажите имя";
    if (!isValidPhone(phone)) next.phone = "Введите номер полностью";
    if (!consent) next.consent = "Нужно согласие на обработку данных";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    try {
      const result = await submitRequest({
        type: "selection",
        name: name.trim(),
        phone,
        message: message.trim(),
        target: "Подбор врача",
      });
      if (!result.ok) throw new Error(result.error);
      toast({
        title: "Заявка на подбор принята!",
        description: "Консультант свяжется с вами в течение 10 минут и подберёт врача.",
      });
      setName("");
      setPhone("+7 ");
      setMessage("");
    } catch (e) {
      toast({
        title: "Не получилось отправить заявку",
        description: e instanceof Error ? e.message : "Попробуйте ещё раз или позвоните нам.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="rounded-2xl bg-gradient-to-br from-teal-700 to-emerald-700 text-white p-6 sm:p-10">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Бесплатная помощь в подборе врача
          </h2>
          <p className="mt-3 text-teal-50/90 leading-relaxed">
            Не знаете, к какому специалисту идти? Оставьте заявку — медицинский консультант задаст несколько
            вопросов, подберёт нужного врача и запишет вас на приём. Услуга бесплатна, вы платите только за
            консультацию в клинике.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${CONTACTS.phoneMain.replace(/[^+\d]/g, "")}`}
              className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2.5 font-bold hover:bg-white/25 transition-colors"
            >
              <PhoneCall className="h-4 w-4" /> {CONTACTS.phoneMain}
            </a>
            <button
              onClick={() => openBooking()}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 font-bold text-teal-800 hover:bg-teal-50 transition-colors"
            >
              <Headset className="h-4 w-4" /> Записаться сразу
            </button>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="rounded-xl bg-white p-5 text-foreground shadow-lg grid gap-3"
        >
          <div className="grid gap-1.5">
            <Label htmlFor="rq-name">Ваше имя *</Label>
            <Input
              id="rq-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Как к вам обращаться"
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="rq-phone">Телефон *</Label>
            <Input
              id="rq-phone"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
              placeholder="+7 (___) ___-__-__"
              aria-invalid={!!errors.phone}
            />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="rq-msg">Что беспокоит?</Label>
            <Textarea
              id="rq-msg"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Например: болит спина вторую неделю"
              rows={2}
            />
          </div>
          <label className="flex items-start gap-2.5 text-[13px] leading-snug text-muted-foreground cursor-pointer">
            <Checkbox checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-0.5" />
            <span>
              Соглашаюсь с{" "}
              <a href="#/privacy" className="text-primary underline underline-offset-2">
                политикой обработки персональных данных
              </a>
            </span>
          </label>
          {errors.consent && <p className="-mt-2 text-xs text-destructive">{errors.consent}</p>}
          <Button type="submit" disabled={sending}>
            {sending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {sending ? "Отправляем…" : "Оставить заявку"}
          </Button>
        </form>
      </div>
    </section>
  );
}
