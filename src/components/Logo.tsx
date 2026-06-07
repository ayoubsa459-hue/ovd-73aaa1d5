export function Logo({ showTagline = false, size = "default" }: { showTagline?: boolean; size?: "default" | "large" }) {
  const textSize = size === "large" ? "text-5xl sm:text-7xl" : "text-lg";
  const subSize = size === "large" ? "text-xl sm:text-3xl mt-2" : "text-xs mt-0.5";

  return (
    <div className="inline-flex flex-col items-center tracking-tight">
      <div className={`font-extrabold ${textSize} leading-none`}>
        <span className="text-logo-red">O</span>
        <span className="text-logo-green">V</span>
        <span className="text-logo-red">D</span>
      </div>
      {showTagline && (
        <div className={`font-medium ${subSize} leading-tight`}>
          <span className="text-logo-red/90">Online </span>
          <span className="text-logo-green/90">Video </span>
          <span className="text-logo-red/90">Downloader</span>
        </div>
      )}
    </div>
  );
}
