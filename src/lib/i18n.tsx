import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";

type Dict = Record<string, { ar: string; en: string }>;

export const dict: Dict = {
  brand: { ar: "OVD", en: "OVD" },
  tagline: { ar: "OVD – محمل الفيديوهات عبر الإنترنت", en: "OVD – Online Video Downloader" },
  nav_home: { ar: "الرئيسية", en: "Home" },
  nav_features: { ar: "المميزات", en: "Features" },
  nav_faq: { ar: "الأسئلة الشائعة", en: "FAQ" },
  nav_about: { ar: "من نحن", en: "About" },
  nav_contact: { ar: "اتصل بنا", en: "Contact" },
  hero_desc: {
    ar: "حمّل الفيديوهات من أشهر المنصات بجودة عالية وسرعة فائقة، مجانًا وبدون تسجيل.",
    en: "Download videos from the most popular platforms in high quality, fast and free — no signup required.",
  },
  url_placeholder: { ar: "ألصق رابط الفيديو هنا...", en: "Paste your video URL here..." },
  download: { ar: "تحميل", en: "Download" },
  features_title: { ar: "لماذا OVD؟", en: "Why OVD?" },
  features_subtitle: {
    ar: "كل ما تحتاجه لتحميل الفيديوهات بأفضل تجربة ممكنة.",
    en: "Everything you need for the best video downloading experience.",
  },
  faq_title: { ar: "الأسئلة الشائعة", en: "Frequently Asked Questions" },
  about_title: { ar: "من نحن", en: "About Us" },
  contact_title: { ar: "اتصل بنا", en: "Contact Us" },
  privacy: { ar: "سياسة الخصوصية", en: "Privacy Policy" },
  terms: { ar: "شروط الاستخدام", en: "Terms of Use" },
  rights: { ar: "جميع الحقوق محفوظة", en: "All rights reserved" },
  back_top: { ar: "العودة للأعلى", en: "Back to top" },
};

interface I18nCtx {
  lang: Lang;
  dir: "rtl" | "ltr";
  t: (k: keyof typeof dict) => string;
  toggle: () => void;
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && (localStorage.getItem("ovd-lang") as Lang)) || "ar";
    setLang(stored);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.classList.add("dark");
    localStorage.setItem("ovd-lang", lang);
  }, [lang]);

  const value: I18nCtx = {
    lang,
    dir: lang === "ar" ? "rtl" : "ltr",
    t: (k) => dict[k]?.[lang] ?? String(k),
    toggle: () => setLang((l) => (l === "ar" ? "en" : "ar")),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
