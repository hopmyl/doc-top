import type { NextConfig } from "next";

// Обычная сборка (Vercel / любой Node-хостинг): output: "standalone",
// API-роуты работают, заявки сохраняются в SQLite.
//
// STATIC_EXPORT=1 — статическая сборка для GitHub Pages (демо для заказчика).
//   NEXT_PUBLIC_STATIC_EXPORT=1 — формы работают в демо-режиме (без сервера).
//   NEXT_PUBLIC_BASE_PATH=/имя-репозитория — префикс пути для GitHub Pages.
const staticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = staticExport
  ? {
      output: "export",
      basePath: basePath || undefined,
      images: { unoptimized: true },
      trailingSlash: true,
      typescript: {
        ignoreBuildErrors: true,
      },
      reactStrictMode: false,
    }
  : {
      output: "standalone",
      typescript: {
        ignoreBuildErrors: true,
      },
      reactStrictMode: false,
    };

export default nextConfig;
