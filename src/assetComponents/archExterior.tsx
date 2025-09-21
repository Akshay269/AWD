
type MediaItem = {
  type: 'image' | 'video'
  src: string
  alt?: string
  caption?: string
}
export const archExterior: MediaItem[] = [
  {
    type: "video",
    src:"https://res.cloudinary.com/dsgbgr8or/video/upload/v1757688371/farhouse_rzrujx.mp4",
    caption: "Farmhouse | Pench | A.W Designer",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dsgbgr8or/image/upload/v1757688342/farmhouse_1_rdvkax.webp",
    caption: "Farmhouse | Pench | A.W Designer",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dsgbgr8or/image/upload/v1757688343/farmhouse_2_bw3sad.webp",
    caption: "Farmhouse | Pench | A.W Designer",
  },
  
];