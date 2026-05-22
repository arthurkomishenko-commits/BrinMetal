export type Locale = "he" | "ru";

export interface Service {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  slug: string;
}

export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  images: string[];
  category: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  nameKey: string;
  roleKey: string;
  quoteKey: string;
  rating: number;
}

export interface ContactForm {
  name: string;
  phone: string;
  email: string;
  message: string;
  service?: string;
}

export interface NavigationItem {
  labelKey: string;
  href: string;
  children?: NavigationItem[];
}
