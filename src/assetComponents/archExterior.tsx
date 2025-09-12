import img1 from "/assets/images/ArchExterior/farmhouse_1.webp"
import img2 from "/assets/images/ArchExterior/farmhouse_2.webp"
import vid3 from "/assets/images/ArchExterior/farhouse.mp4"

type MediaItem = {
  type: 'image' | 'video'
  src: string
  alt?: string
  caption?: string
}
export const archExterior: MediaItem[] = [
  {
    type: "image",
    src: img1,
    caption: "Front Elevation",
  },
  {
    type: "image",
    src: img2,
    caption: "Evening Render",
  },
  {
    type: "video",
    src: vid3,
    caption: "Courtyard",
  },
];