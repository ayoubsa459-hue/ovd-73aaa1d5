import { Link } from "@tanstack/react-router";
import { Download, Mail, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-bold text-lg">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg btn-hero">
              <Download className="h-5 w-5" />
            </span>
            <span>OVD</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">{t("tagline")}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">{t("nav_contact")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="mailto:ayoubsa459@gmail.com" className="hover:text-foreground inline-flex items-center gap-2">
                <Mail className="h-4 w-4" /> ayoubsa459@gmail.com
              </a>
            </li>
            <li>
              <a href="https://wa.me/212695295586" className="hover:text-foreground inline-flex items-center gap-2">
                <MessageCircle className="h-4 w-4" /> +212 695 295 586
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/privacy" className="hover:text-foreground">{t("privacy")}</Link></li>
            <li><Link to="/terms" className="hover:text-foreground">{t("terms")}</Link></li>
            <li><Link to="/about" className="hover:text-foreground">{t("nav_about")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} OVD. {t("rights")}.
      </div>
    </footer>
  );
}
