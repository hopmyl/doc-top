import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

type Payload = {
  type?: string;
  name?: string;
  phone?: string;
  email?: string;
  target?: string;
  preferredTime?: string;
  message?: string;
};

const ALLOWED_TYPES = new Set(["booking", "selection", "feedback"]);

export async function POST(req: NextRequest) {
  try {
    const body: Payload = await req.json().catch(() => ({}));

    const type = typeof body.type === "string" && ALLOWED_TYPES.has(body.type) ? body.type : "booking";
    const name = (body.name ?? "").trim();
    const phone = (body.phone ?? "").trim();
    const email = (body.email ?? "").trim();

    if (name.length < 2) {
      return NextResponse.json({ ok: false, error: "Укажите имя (минимум 2 символа)" }, { status: 400 });
    }
    if (type !== "feedback" && phone.replace(/\D/g, "").length !== 11) {
      return NextResponse.json({ ok: false, error: "Укажите телефон в формате +7 (999) 123-45-67" }, { status: 400 });
    }
    if (type === "feedback" && !phone && !email) {
      return NextResponse.json({ ok: false, error: "Укажите телефон или email для ответа" }, { status: 400 });
    }

    const created = await db.bookingRequest.create({
      data: {
        type,
        name,
        phone: phone || null,
        email: email || null,
        target: (body.target ?? "").trim() || null,
        preferredTime: (body.preferredTime ?? "").trim() || null,
        message: (body.message ?? "").trim() || null,
      },
    });

    return NextResponse.json({ ok: true, id: created.id });
  } catch (e) {
    console.error("[api/requests] failed:", e);
    return NextResponse.json(
      { ok: false, error: "Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам." },
      { status: 500 }
    );
  }
}
