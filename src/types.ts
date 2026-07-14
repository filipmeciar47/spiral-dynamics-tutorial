export interface Slide {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  title: string;
  titleEn: string;
  color: string;
  slides: Slide[];
}

export interface AppSettings {
  language: 'sk' | 'en' | 'de';
}
