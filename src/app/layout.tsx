import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Док Топ — рейтинг медицинских услуг | Запись к врачам в Москве",
  description:
    "Поможем выбрать лучшего врача: 11 727 врачей и 2 187 клиник Москвы. Бесплатная запись без комиссий, мгновенные окна на сегодня и завтра, честные отзывы пациентов.",
  keywords: ["Док Топ", "запись к врачу", "врачи Москвы", "клиники Москвы", "рейтинг врачей", "медицинские услуги"],
  icons: {
    // Учитываем basePath при сборке для GitHub Pages
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo.svg`,
  },
  openGraph: {
    title: "Док Топ — рейтинг медицинских услуг",
    description: "Запись к лучшим врачам Москвы. Бесплатно, без комиссий.",
    siteName: "Док Топ",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d9488",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${manrope.variable} antialiased bg-background text-foreground font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
