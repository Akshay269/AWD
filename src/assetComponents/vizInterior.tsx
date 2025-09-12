export type MediaItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
  caption?: string;
};

// Dynamically create array for 29 images
export const vizInterior: MediaItem[] = Array.from({ length: 17 }).map((_, i) => ({
  type: "image",
  src: `/assets/images/3DInterior/${i + 1}.png`, // URL to public folder
  alt: `Bedroom Render ${i + 1}`,
  caption: `Bedroom Render ${i + 1}`,
}));