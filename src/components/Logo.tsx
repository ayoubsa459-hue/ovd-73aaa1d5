import { useI18n } from "@/lib/i18n";

export function Logo({ showTagline = false, size = "default" }: { showTagline?: boolean; size?: "default" | "large" }) {
  const { lang } = useI18n();

  const textSize = size === "large" ? "text-5xl sm:text-7xl" : "text-lg";
  const letterSpacing = size === "large" ? "tracking-tight" : "tracking-tight";
  const subSize = size === "large" ? "text-xl sm:text-3xl mt-2" : "text-xs mt-0.5";

  return (
    <div className={`inline-flex flex-col items-center ${letterSpacing}`}>
      <div className={`font-extrabold ${textSize} leading-none`}>
        <span className="text-red-500">O</span>
        <span className="text-green-500">V</span>
        <span className="text-red-500">D</span>
      </div>
      {showTagline && (
        <div className={`font-medium ${subSize} leading-tight`}>
          <span className="text-red-500/90">Online </span>
          <span className="text-green-500/90">Video </span>
          <span className="text-red-500/90">Downloader</span>
        </div>
      )}
    </div>
  );
}
