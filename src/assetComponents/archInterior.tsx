export type MediaItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
  caption?: string;
};

// Dynamically create array for 29 images
export const archInterior: MediaItem[] = Array.from({ length: 5 }).map((_, i) => ({
  type: "image",
  src: `/assets/images/ArchInterior/${i + 1}.webp`, // URL to public folder
  alt: `Bedroom Render ${i + 1}`,
  caption: `Bedroom Render ${i + 1}`,
}));