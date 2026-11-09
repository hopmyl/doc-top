import { Button } from "@/components/ui/button";
import { STATS, USPS } from "@/lib/site";
import { BadgeCheck, FileCheck2, HeartHandshake, ShieldCheck } from "lucide-react";

const PRINCIPLES = [
  {
    icon: BadgeCheck,
    title: "Проверяем каждого",
    text: "Дипломы, сертификаты и лицензии клиник — до публикации в каталоге. Не пропускаем учреждения с систематическими жалобами.",
  },
  {
    icon: ShieldCheck,
    title: "Не берём комиссий",
    text: "Запись через сервис бесплатна. Цена приёма — ровно как в клинике, без скрытых наценок «за подбор».",
  },
  {
    icon: HeartHandshake,
    title: "Слушаем пациентов",
    text: "Отзывы можно оставить только после реальной записи. Модерация следит, чтобы рейтинг отражал настоящий опыт людей.",
  },
  {
    icon: FileCheck2,
    title: "Честные цифры",
    text: "Статистика каталога обновляется автоматически, а рейтинги считаются по формуле, а не по заказу.",
  },
];

export function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <nav className="text-sm text-muted-foreground" aria-label="Хлебные крошки">
        <a href="#/" className="hover:text-primary">Главная</a> / <span className="text-foreground">О нас</span>
      </nav>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight">О сервисе «Док Топ»</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
          <p>
            <b className="text-foreground">Док Топ — рейтинг медицинских услуг.</b> Мы работаем с 2016 года и
            помогаем жителям Москвы выбирать врачей и клиники без звонков по всем подряд телефонам и
            многочасовых очередей. На сайте собраны {STATS.doctors} врачей, {STATS.clinics} клиник и{" "}
            {STATS.services} услуг с актуальными ценами.
          </p>
          <p>
            Наша задача простая: чтобы хороший врач находился за пару минут. Мы показываем реальные отзывы
            пациентов, стаж и квалификацию специалистов, цены на приём и расположение клиник у станций метро.
            Запись занимает одно действие — а подтвердит её администратор в течение 10 минут.
          </p>
          <p>
            За 10 лет работы мы научились главному: людям важно доверие. Поэтому мы не продаём места в
            рейтингах, не удаляем неудобные отзывы и не берём комиссий с пациентов. Сервис зарабатывает на
            партнёрских программах клиник, поэтому для вас всё бесплатно.
          </p>
        </div>

        <div className="rounded-xl bg-secondary p-5">
          <h2 className="font-bold text-secondary-foreground">Док Топ в цифрах</h2>
          <dl className="mt-4 space-y-3 text-sm">
            {[
              ["Год запуска", "2016"],
              ["Врачей в реестре", STATS.doctors],
              ["Клиник-партнёров", STATS.clinics],
              ["Услуг с ценами", STATS.services],
              ["Средняя оценка врачей", "4.9 из 5"],
              ["Комиссий с пациентов", "0 ₽"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-3 border-b border-teal-200/60 pb-2 last:border-0">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-extrabold text-secondary-foreground">{v}</dd>
              </div>
            ))}
          </dl>
          <Button className="mt-5 w-full" asChild>
            <a href="#/doctors">Найти врача</a>
          </Button>
        </div>
      </div>

      <h2 className="mt-12 text-2xl font-extrabold tracking-tight">Принципы работы</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PRINCIPLES.map((p) => (
          <div key={p.title} className="rounded-xl border bg-card p-5">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary">
              <p.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-3 font-bold">{p.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{p.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {USPS.map((u) => (
          <div key={u.title} className="rounded-xl bg-gradient-to-br from-teal-700 to-emerald-700 p-5 text-white">
            <h3 className="font-bold">{u.title}</h3>
            <p className="mt-1 text-sm text-teal-50/90 leading-relaxed">{u.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
