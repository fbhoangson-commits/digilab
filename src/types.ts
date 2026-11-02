export type Book = {
  id: string; code: string; title: string; author: string; category: string;
  description: string; format: "PDF" | "EPUB"; pages: number; cover?: string;
  progress?: number; allowDownload: boolean;
};
export type ReaderLocation = { type: "pdf" | "epub"; page?: number; cfi?: string };