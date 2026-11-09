// Константы бренда «Док Топ» — перенесены со старого сайта doc-top.ru (архивная копия от 19.06.2025)

export const BRAND = {
  name: "Док Топ",
  latin: "DOC.TOP",
  tagline: "Рейтинг медицинских услуг",
  domain: "doc-top.ru",
  since: 2016,
  copyright: `© 2016–2026 Док Топ — рейтинг медицинских услуг`,
} as const;

export const CONTACTS = {
  phoneMain: "+7 (495) 431-73-48",
  phoneCallCenter: "+7 (499) 116-77-39",
  phoneSupport: "+7 (499) 113-02-56",
  email: "info@doc-top.ru",
  vk: "https://vk.com/club206311781",
  city: "Москва",
  hoursCallCenter: "Пн–Пт: 9:00–21:00 · Сб–Вс: 10:00–18:00",
} as const;

export const LEGAL = {
  ip: "ИП Фельдеш Мария Сергеевна",
  inn: "ИНН 772365103066",
  ogrnip: "ОГРНИП 324774600106862",
  disclaimer:
    "Информация на сайте не может быть использована для самодиагностики и самолечения и не является публичной офертой (ст. 437 ч. 2 Гражданского кодекса РФ). По всем вопросам, касающимся здоровья и медицинской помощи, обращайтесь непосредственно в медицинские учреждения.",
} as const;

// Статистика со старого сайта doc-top.ru
export const STATS = {
  services: "1 060",
  doctors: "11 727",
  clinics: "2 187",
  total: "13 914",
  years: 10,
} as const;

// УТП со старого сайта
export const USPS = [
  {
    icon: "Wallet",
    title: "Мы не берём комиссии",
    text: "Запись бесплатна, платите только за приём — по цене клиники",
  },
  {
    icon: "Zap",
    title: "Мгновенная запись",
    text: "Свободные окна на сегодня и завтра — без звонков и ожидания",
  },
  {
    icon: "MapPin",
    title: "Врачи поблизости",
    text: "Поиск лучших врачей рядом с домом и работой, у любой станции метро",
  },
] as const;

export const NAV_MAIN = [
  { label: "Врачи", href: "#/doctors" },
  { label: "Клиники", href: "#/clinics" },
  { label: "Услуги", href: "#/services" },
  { label: "О нас", href: "#/about" },
  { label: "Контакты", href: "#/contacts" },
] as const;

// Разделы меню со старого сайта doc-top.ru
export const NAV_SERVICE_LINKS = [
  { label: "Услуги", href: "#/services" },
  { label: "Диагностика", href: "#/services?cat=diagnostics" },
  { label: "Стоматология", href: "#/services?cat=dental" },
  { label: "Пластическая хирургия", href: "#/services?cat=plastic" },
] as const;

export const FOOTER_DOCTOR_LINKS = [
  { label: "Все врачи", href: "#/doctors" },
  { label: "Терапевт", href: "#/doctors?spec=Терапевт" },
  { label: "Стоматолог", href: "#/doctors?spec=Стоматолог" },
  { label: "Кардиолог", href: "#/doctors?spec=Кардиолог" },
  { label: "Гинеколог", href: "#/doctors?spec=Гинеколог" },
  { label: "Педиатр", href: "#/doctors?spec=Педиатр" },
] as const;
