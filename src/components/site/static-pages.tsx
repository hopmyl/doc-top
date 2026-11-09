"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/lib/data";
import { LEGAL, CONTACTS } from "@/lib/site";

export function FaqPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
      <nav className="text-sm text-muted-foreground" aria-label="Хлебные крошки">
        <a href="#/" className="hover:text-primary">Главная</a> / <span className="text-foreground">Частые вопросы</span>
      </nav>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Частые вопросы</h1>
      <p className="mt-2 text-muted-foreground">
        Не нашли ответа? Позвоните нам: <a href={`tel:${CONTACTS.phoneMain.replace(/[^+\d]/g, "")}`} className="font-semibold text-primary hover:underline">{CONTACTS.phoneMain}</a>
      </p>
      <Accordion type="single" collapsible className="mt-6">
        {FAQ_ITEMS.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
      <nav className="text-sm text-muted-foreground" aria-label="Хлебные крошки">
        <a href="#/" className="hover:text-primary">Главная</a> /{" "}
        <span className="text-foreground">Политика обработки персональных данных</span>
      </nav>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
        Политика в отношении обработки персональных данных
      </h1>
      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
        <p>
          Настоящая политика определяет порядок обработки персональных данных пользователей сайта «Док Топ»
          ({LEGAL.ip}; далее — Оператор) и разработана в соответствии с Федеральным законом от 27.07.2006
          № 152-ФЗ «О персональных данных».
        </p>
        <h2 className="pt-2 text-lg font-bold text-foreground">1. Какие данные мы собираем</h2>
        <p>
          При отправке заявки мы получаем: имя, номер телефона, адрес электронной почты и текст обращения.
          Эти данные используются исключительно для связи с вами: подбора врача, подтверждения записи и
          ответов на вопросы.
        </p>
        <h2 className="pt-2 text-lg font-bold text-foreground">2. Цели обработки</h2>
        <p>
          Данные обрабатываются с согласия пользователя для оказания сервисных услуг по записи к врачам и
          клиникам, а также для улучшения работы сервиса. Мы не передаём персональные данные третьим лицам,
          кроме клиник, в которые вы оформили запись.
        </p>
        <h2 className="pt-2 text-lg font-bold text-foreground">3. Хранение и защита</h2>
        <p>
          Данные хранятся на защищённых серверах на территории Российской Федерации. Доступ к ним имеют
          только уполномоченные сотрудники Оператора.
        </p>
        <h2 className="pt-2 text-lg font-bold text-foreground">4. Права пользователя</h2>
        <p>
          Вы вправе запросить уточнение, блокирование или удаление своих персональных данных, направив
          запрос на {CONTACTS.email}. Срок рассмотрения — не более 30 дней.
        </p>
      </div>
    </div>
  );
}

export function ReviewRulesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
      <nav className="text-sm text-muted-foreground" aria-label="Хлебные крошки">
        <a href="#/" className="hover:text-primary">Главная</a> /{" "}
        <span className="text-foreground">Правила публикации отзывов</span>
      </nav>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Правила публикации отзывов</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
        <p>
          Чтобы рейтинг «Док Топ» был честным, мы придерживаемся следующих правил модерации отзывов
          пациентов.
        </p>
        <h2 className="pt-2 text-lg font-bold text-foreground">Кто может оставить отзыв</h2>
        <p>
          Отзыв о враче или клинике может оставить только пациент, который записался через наш сервис. Это
          исключает заказные отзывы и оценку «на эмоциях» без визита.
        </p>
        <h2 className="pt-2 text-lg font-bold text-foreground">Что запрещено в отзывах</h2>
        <p>
          Оскорбления и нецензурная лексика, персональные данные третьих лиц, реклама, ссылки на сторонние
          ресурсы, а также медицинские диагнозы других пациентов. Такие отзывы не публикуются.
        </p>
        <h2 className="pt-2 text-lg font-bold text-foreground">Модерация и удаление</h2>
        <p>
          Отзыв проверяется модератором в течение 1–2 рабочих дней. Клиника может ответить на отзыв, но не
          может удалить его самостоятельно. Удаление возможно только по решению редакции, например при
          нарушении правил.
        </p>
        <h2 className="pt-2 text-lg font-bold text-foreground">Право на ответ</h2>
        <p>
          Если вы считаете отзыв недостоверным, напишите на {CONTACTS.email} — мы проведём повторную
          проверку и при необходимости скорректируем рейтинг.
        </p>
      </div>
    </div>
  );
}
