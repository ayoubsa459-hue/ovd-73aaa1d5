import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Languages, Download } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function SiteHeader() {
  const { t, lang, toggle } = useI18n();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t("nav_home") },
    { to: "/#features", label: t("nav_features") },
    { to: "/#faq", label: t("nav_faq") },
    { to: "/about", label: t("nav_about") },
    { to: "/contact", label: t("nav_contact") },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg btn-hero">
            <Download className="h-5 w-5" />
          </span>
          <span className="bg-gradient-to-r from-primary to-accent-purple bg-clip-text text-transparent">
            OVD
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm">
          {links.map((l) => (
            <a key={l.to} href={l.to} className="text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-accent transition-colors"
            aria-label="Toggle language"
          >
            <Languages className="h-4 w-4" />
            <span>{lang === "ar" ? "EN" : "AR"}</span>
          </button>
          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg border border-border p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95">
          <nav className="flex flex-col px-4 py-3 gap-2">
            {links.map((l) => (
              <a
                key={l.to}
                href={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm hover:bg-accent"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
