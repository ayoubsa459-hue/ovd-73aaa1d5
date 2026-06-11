import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const urlSchema = z.object({
  url: z.string().url().min(1),
});

export type VideoFormat = {
  label: string;
  quality: string;
  ext: string;
  url: string;
  sizeText: string;
};

export type VideoInfo = {
  title: string;
  thumbnail: string;
  duration: string;
  formats: VideoFormat[];
};

export const getVideoInfo = createServerFn({ method: "POST" })
  .inputValidator(urlSchema)
  .handler(async ({ data }): Promise<VideoInfo> => {
    // TODO: Replace with real RapidAPI call once key is configured.
    // For now return a mock response so the UI can show loading + preview.
    await new Promise((r) => setTimeout(r, 1500));

    const isYouTube =
      data.url.includes("youtube.com") || data.url.includes("youtu.be");

    if (!isYouTube) {
      throw new Error("Only YouTube URLs are supported in this demo.");
    }

    return {
      title: "Sample Video Title – Demo Preview",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "03:32",
      formats: [
        {
          label: "2160p (4K)",
          quality: "2160p",
          ext: "mp4",
          url: "#",
          sizeText: "120 MB",
        },
        {
          label: "1440p",
          quality: "1440p",
          ext: "mp4",
          url: "#",
          sizeText: "80 MB",
        },
        {
          label: "1080p",
          quality: "1080p",
          ext: "mp4",
          url: "#",
          sizeText: "45 MB",
        },
        {
          label: "720p",
          quality: "720p",
          ext: "mp4",
          url: "#",
          sizeText: "25 MB",
        },
        {
          label: "480p",
          quality: "480p",
          ext: "mp4",
          url: "#",
          sizeText: "15 MB",
        },
        {
          label: "360p",
          quality: "360p",
          ext: "mp4",
          url: "#",
          sizeText: "10 MB",
        },
        {
          label: "Audio only (MP3)",
          quality: "audio",
          ext: "mp3",
          url: "#",
          sizeText: "5 MB",
        },
      ],
    };
  });
