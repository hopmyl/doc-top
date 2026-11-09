export type RequestType = "booking" | "selection" | "feedback";

export type RequestPayload = {
  type: RequestType;
  name?: string;
  phone?: string;
  email?: string;
  target?: string;
  preferredTime?: string;
  message?: string;
};

export type SubmitResult = { ok: true } | { ok: false; error: string };

/**
 * В статической сборке для GitHub Pages (NEXT_PUBLIC_STATIC_EXPORT=1)
 * серверных API-роутов нет, поэтому формы работают в демонстрационном
 * режиме: заявка «принимается» с небольшой задержкой, но никуда не сохраняется.
 * На реальном хостинге (Vercel / любой Node-сервер) заявки сохраняются в SQLite.
 */
const STATIC_DEMO = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

export async function submitRequest(payload: RequestPayload): Promise<SubmitResult> {
  if (STATIC_DEMO) {
    await new Promise((resolve) => setTimeout(resolve, 700));
    return { ok: true };
  }

  try {
    const res = await fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.ok) {
      return { ok: false, error: data?.error || "Ошибка отправки" };
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.",
    };
  }
}
