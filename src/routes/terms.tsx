import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — OVD" },
      { name: "description", content: "Terms and conditions for using OVD." },
      { property: "og:title", content: "Terms of Use — OVD" },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  const { t, lang } = useI18n();
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-20">
      <h1 className="text-4xl font-bold">{t("terms")}</h1>
      <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
        {lang === "ar" ? (
          <>
            <p>يُستخدم OVD للأغراض الشخصية فقط. يُمنع استخدام الموقع لتحميل محتوى يخالف حقوق النشر.</p>
            <p>الموقع يُقدَّم "كما هو" دون أي ضمانات صريحة أو ضمنية.</p>
            <p>نحتفظ بحق تعديل هذه الشروط في أي وقت.</p>
          </>
        ) : (
          <>
            <p>OVD is intended for personal use only. Using the site to download content that infringes copyright is prohibited.</p>
            <p>The website is provided "as is" without any express or implied warranties.</p>
            <p>We reserve the right to modify these terms at any time.</p>
          </>
        )}
      </div>
    </section>
  );
}
