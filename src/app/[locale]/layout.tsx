import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter, Space_Grotesk } from "next/font/google";
import { routing } from "@/i18n/routing";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";
import { generateLocalBusinessSchema } from "@/lib/seo/schema";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { MobileCTA } from "@/components/mobile/MobileCTA";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return genMeta({ locale: locale as "he" | "ru" });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "he" | "ru")) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === "he" ? "rtl" : "ltr";
  const schema = generateLocalBusinessSchema();

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{history.scrollRestoration="manual";window.scrollTo(0,0)}catch(e){}` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="bg-[var(--graphite)] text-[var(--off-white)] font-sans antialiased">
        <script dangerouslySetInnerHTML={{ __html: `window.scrollTo(0,0)` }} />
        <NextIntlClientProvider messages={messages}>
          <CustomCursor />
          <SmoothScroll>
            <Header />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
          <WhatsAppButton />
          <MobileCTA />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
