import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Download, Zap, Smartphone, Sparkles, ShieldCheck, MousePointerClick,
  ChevronDown, Link as LinkIcon, ClipboardPaste, Loader2, Play,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Logo } from "@/components/Logo";
import { getVideoInfo, type VideoInfo } from "@/lib/api/video.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OVD – Online Video Downloader" },
      {
        name: "description",
        content:
          "Download videos online for free in high quality. Fast, simple and works on all devices.",
      },
      { property: "og:title", content: "OVD – Online Video Downloader" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const { t, lang } = useI18n();
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [videoData, setVideoData] = useState<VideoInfo | null>(null);

  const fetchVideoInfo = useServerFn(getVideoInfo);

  const mutation = useMutation({
    mutationFn: async (videoUrl: string) => {
      return fetchVideoInfo({ data: { url: videoUrl } });
    },
    onSuccess: (data) => {
      setVideoData(data);
      setStatus(null);
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : String(err);
      setVideoData(null);
      setStatus(message || t("error_generic"));
    },
  });

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        setStatus(null);
        setVideoData(null);
      }
    } catch {
      setStatus(lang === "ar" ? "تعذر الوصول إلى الحافظة." : "Could not access clipboard.");
    }
  };

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setStatus(t("error_invalid_url"));
      setVideoData(null);
      return;
    }
    setVideoData(null);
    setStatus(null);
    mutation.mutate(url.trim());
  };

  const features = [
    { icon: MousePointerClick, ar: "واجهة سهلة الاستخدام", en: "Easy-to-use interface", arD: "تجربة بسيطة مصممة لأي مستخدم.", enD: "A simple experience for any user." },
    { icon: Zap, ar: "سرعة عالية", en: "Blazing fast", arD: "معالجة وتحميل في ثوانٍ.", enD: "Processing and downloads in seconds." },
    { icon: Smartphone, ar: "متوافق مع جميع الأجهزة", en: "Works everywhere", arD: "هواتف، أجهزة لوحية وحواسيب.", enD: "Phones, tablets and desktops." },
    { icon: Sparkles, ar: "تصميم عصري", en: "Modern design", arD: "واجهة احترافية وأنيقة.", enD: "Sleek, professional UI." },
    { icon: ShieldCheck, ar: "آمن ومجاني", en: "Safe & free", arD: "بدون تسجيل أو إعلانات مزعجة.", enD: "No signup or intrusive ads." },
    { icon: Download, ar: "جودة عالية", en: "High quality", arD: "اختر الجودة المناسبة لك.", enD: "Pick the quality that fits you." },
  ];

  const faqs = [
    { q_ar: "هل OVD مجاني بالكامل؟", q_en: "Is OVD completely free?", a_ar: "نعم، خدمتنا مجانية بالكامل وبدون حدود.", a_en: "Yes, our service is 100% free with no limits." },
    { q_ar: "هل أحتاج إلى تثبيت أي شيء؟", q_en: "Do I need to install anything?", a_ar: "لا، يعمل OVD مباشرة من المتصفح.", a_en: "No, OVD works directly in your browser." },
    { q_ar: "هل بياناتي آمنة؟", q_en: "Is my data safe?", a_ar: "نحن لا نخزن أي روابط أو ملفات شخصية.", a_en: "We don't store any of your links or personal files." },
    { q_ar: "ما المنصات المدعومة؟", q_en: "Which platforms are supported?", a_ar: "ندعم أشهر منصات الفيديو الشعبية.", a_en: "We support the most popular video platforms." },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground animate-fade-up">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {lang === "ar" ? "سريع · مجاني · بدون تسجيل" : "Fast · Free · No signup"}
          </div>
          <div className="mt-6 animate-fade-up">
            <Logo showTagline size="large" />
          </div>
          <p className="mt-5 mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground animate-fade-up">
            {t("hero_desc")}
          </p>

          <form
            onSubmit={handleDownload}
            className="mt-10 mx-auto max-w-2xl glass-card p-2 flex flex-col sm:flex-row items-stretch gap-2 animate-fade-up"
          >
            <div className="flex-1 flex items-center gap-2 px-4">
              <LinkIcon className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t("url_placeholder")}
                className="w-full bg-transparent py-3 text-base outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={handlePaste}
                className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 transition-colors border border-primary/20"
                title={t("paste")}
              >
                <ClipboardPaste className="h-4 w-4" />
                <span className="hidden sm:inline">{t("paste")}</span>
              </button>
            </div>
            <button
              type="submit"
              className="btn-hero rounded-lg px-6 py-3 font-semibold inline-flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:brightness-110"
            >
              <Download className="h-5 w-5" />
              {t("download")}
            </button>
          </form>
          {status && (
            <p className="mt-4 text-sm text-muted-foreground">{status}</p>
          )}
        </div>

        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -left-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-float" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-accent-purple/20 blur-3xl animate-float" />
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 sm:px-6 py-16 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold">{t("features_title")}</h2>
          <p className="mt-3 text-muted-foreground">{t("features_subtitle")}</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div key={i} className="glass-card p-6 hover:-translate-y-1 transition-transform">
              <div className="h-11 w-11 rounded-lg btn-hero grid place-items-center mb-4">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg">{lang === "ar" ? f.ar : f.en}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{lang === "ar" ? f.arD : f.enD}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 sm:px-6 py-16 scroll-mt-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">{t("faq_title")}</h2>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <details key={i} className="glass-card group p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-medium">
                <span>{lang === "ar" ? f.q_ar : f.q_en}</span>
                <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">
                {lang === "ar" ? f.a_ar : f.a_en}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
