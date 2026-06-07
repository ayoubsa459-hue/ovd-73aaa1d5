import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — OVD" },
      { name: "description", content: "How OVD handles your data and protects your privacy." },
      { property: "og:title", content: "Privacy Policy — OVD" },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { t, lang } = useI18n();
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-20">
      <h1 className="text-4xl font-bold">{t("privacy")}</h1>
      <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
        {lang === "ar" ? (
          <>
            <p>نحن في OVD نحترم خصوصيتك. لا نخزن الروابط التي تدخلها ولا ملفات الفيديوهات.</p>
            <p>قد نستخدم بعض ملفات تعريف الارتباط (Cookies) لتحسين تجربة المستخدم وقياس الأداء.</p>
            <p>باستخدامك للموقع فإنك توافق على هذه السياسة. لأي استفسار يرجى التواصل معنا.</p>
          </>
        ) : (
          <>
            <p>At OVD we respect your privacy. We do not store the URLs you enter or any video files.</p>
            <p>We may use cookies to improve user experience and measure performance.</p>
            <p>By using the website you agree to this policy. For any questions please contact us.</p>
          </>
        )}
      </div>
    </section>
  );
}
