"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useBooking } from "@/lib/store";
import { formatPhoneInput, isValidPhone } from "@/lib/data";
import { submitRequest } from "@/lib/submit-request";
import { Loader2, ShieldCheck } from "lucide-react";

const TIMES = ["Сегодня", "Завтра", "На этой неделе", "Уточню по телефону"] as const;

export function BookingDialog() {
  const { open, target, time, closeBooking } = useBooking();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7 ");
  const [preferredTime, setPreferredTime] = useState<string>("Сегодня");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(true);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; consent?: string }>({});
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (open) {
      setPreferredTime(time || "Сегодня");
      setErrors({});
    }
  }, [open, time]);

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
        type: "booking",
        name: name.trim(),
        phone,
        target: target || "Общий запрос",
        preferredTime,
        message: message.trim(),
      });
      if (!result.ok) {
        throw new Error(result.error);
      }
      closeBooking();
      toast({
        title: "Заявка принята!",
        description: `${name.trim()}, администратор перезвонит на ${phone} в течение 10 минут и подтвердит запись.`,
      });
      setName("");
      setPhone("+7 ");
      setMessage("");
      setPreferredTime("Сегодня");
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
    <Dialog open={open} onOpenChange={(v) => !v && closeBooking()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Запись на приём</DialogTitle>
          <DialogDescription>
            Оставьте контакты — администратор перезвонит в течение 10 минут и подтвердит запись. Запись
            бесплатная, платите только за приём.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="bk-target">Врач или клиника</Label>
            <Input
              id="bk-target"
              value={target}
              onChange={(e) => useBooking.setState({ target: e.target.value })}
              placeholder="Например: терапевт, клиника «Медлайн»"
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="bk-name">Ваше имя *</Label>
            <Input
              id="bk-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Как к вам обращаться"
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="bk-phone">Телефон *</Label>
            <Input
              id="bk-phone"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
              placeholder="+7 (___) ___-__-__"
              aria-invalid={!!errors.phone}
            />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
          </div>

          <div className="grid gap-1.5">
            <Label>Когда удобно</Label>
            <Select value={preferredTime} onValueChange={setPreferredTime}>
              <SelectTrigger aria-label="Удобное время приёма">
                <SelectValue placeholder="Выберите время" />
              </SelectTrigger>
              <SelectContent>
                {TIMES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="bk-msg">Комментарий (необязательно)</Label>
            <Textarea
              id="bk-msg"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Кратко опишите, что беспокоит"
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
          {errors.consent && <p className="-mt-3 text-xs text-destructive">{errors.consent}</p>}

          <Button onClick={submit} disabled={sending} size="lg">
            {sending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {sending ? "Отправляем…" : "Отправить заявку"}
          </Button>

          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Перезвоним в течение 10 минут, без спама
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
