import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — OVD" },
      { name: "description", content: "Get in touch with the OVD team by email or WhatsApp." },
      { property: "og:title", content: "Contact — OVD" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t, lang } = useI18n();
  return (
    <section className="mx-auto max-w-2xl px-4 sm:px-6 py-20">
      <h1 className="text-4xl font-bold">{t("contact_title")}</h1>
      <p className="mt-3 text-muted-foreground">
        {lang === "ar" ? "نسعد بتواصلك معنا في أي وقت." : "We'd love to hear from you anytime."}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <a
          href="mailto:ayoubsa459@gmail.com"
          className="glass-card p-6 flex items-center gap-4 hover:-translate-y-1 transition-transform"
        >
          <div className="h-12 w-12 rounded-lg btn-hero grid place-items-center">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <div className="font-semibold">Email</div>
            <div className="text-sm text-muted-foreground break-all">ayoubsa459@gmail.com</div>
          </div>
        </a>
        <a
          href="https://wa.me/212695295586"
          target="_blank"
          rel="noreferrer"
          className="glass-card p-6 flex items-center gap-4 hover:-translate-y-1 transition-transform"
        >
          <div className="h-12 w-12 rounded-lg btn-hero grid place-items-center">
            <MessageCircle className="h-6 w-6" />
          </div>
          <div>
            <div className="font-semibold">WhatsApp</div>
            <div className="text-sm text-muted-foreground">+212 695 295 586</div>
          </div>
        </a>
      </div>
    </section>
  );
}
