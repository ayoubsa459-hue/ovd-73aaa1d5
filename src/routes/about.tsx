import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — OVD" },
      { name: "description", content: "Learn more about OVD, the online video downloader built for speed and simplicity." },
      { property: "og:title", content: "About — OVD" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t, lang } = useI18n();
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-20">
      <h1 className="text-4xl font-bold">{t("about_title")}</h1>
      <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
        {lang === "ar" ? (
          <>
            <p>OVD هو موقع متخصص في تحميل الفيديوهات من أشهر منصات الإنترنت، يهدف إلى تقديم تجربة سريعة، آمنة ومجانية للجميع.</p>
            <p>نؤمن بأن أدوات الويب يجب أن تكون بسيطة وفعّالة، لذلك بنينا OVD ليكون أداتك المفضلة لتحميل الفيديوهات بكل سهولة.</p>
          </>
        ) : (
          <>
            <p>OVD is a dedicated online video downloader built to deliver a fast, safe, and free experience to everyone.</p>
            <p>We believe web tools should be simple and effective. That's why we built OVD — your favorite tool to download videos with ease.</p>
          </>
        )}
      </div>
    </section>
  );
}
