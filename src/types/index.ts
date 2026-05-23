export type Locale = "he" | "ru";

export interface Service {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  slug: string;
}

export interface NavigationItem {
  labelKey: string;
  href: string;
  children?: NavigationItem[];
}
