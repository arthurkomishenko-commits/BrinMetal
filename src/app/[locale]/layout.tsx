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
import Script from "next/script";
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="bg-[var(--graphite)] text-[var(--off-white)] font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <CustomCursor />
          <SmoothScroll>
            <Header />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
          <WhatsAppButton />
        </NextIntlClientProvider>
        <Script id="scroll-reveal" strategy="afterInteractive">{`
(function(){
  var ease = "cubic-bezier(0.22, 1, 0.36, 1)";

  function initReveal() {
    var els = document.querySelectorAll("[data-assemble]");
    if (!els.length) return;

    // Set hidden state instantly
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var dir = el.getAttribute("data-assemble") || "up";
      var d = parseInt(el.getAttribute("data-assemble-delay") || "0", 10);
      var delay = Math.min(d * 0.06, 0.4);

      el.style.transition = "none";
      el.style.opacity = dir === "line" ? "1" : "0";

      if (dir === "up") el.style.transform = "translateY(30px)";
      else if (dir === "left") el.style.transform = "translateX(-30px)";
      else if (dir === "right") el.style.transform = "translateX(30px)";
      else if (dir === "scale") el.style.transform = "scale(0.93)";
      else if (dir === "line") el.style.transform = "scaleX(0)";

      el._delay = delay;
      el._dir = dir;
    }

    // Force reflow
    document.body.offsetHeight;

    // Add transitions
    for (var j = 0; j < els.length; j++) {
      var e = els[j];
      e.style.transition = "opacity 0.7s " + ease + " " + e._delay + "s, transform 0.7s " + ease + " " + e._delay + "s";
    }

    // IntersectionObserver
    var observer = new IntersectionObserver(function(entries) {
      for (var k = 0; k < entries.length; k++) {
        var entry = entries[k];
        var t = entry.target;
        if (entry.isIntersecting) {
          t.style.opacity = "1";
          t.style.transform = t._dir === "line" ? "scaleX(1)" : "none";
        } else {
          var dd = t._dir;
          t.style.opacity = dd === "line" ? "1" : "0";
          if (dd === "up") t.style.transform = "translateY(30px)";
          else if (dd === "left") t.style.transform = "translateX(-30px)";
          else if (dd === "right") t.style.transform = "translateX(30px)";
          else if (dd === "scale") t.style.transform = "scale(0.93)";
          else if (dd === "line") t.style.transform = "scaleX(0)";
        }
      }
    }, { threshold: 0.05, rootMargin: "20px" });

    for (var m = 0; m < els.length; m++) {
      observer.observe(els[m]);
    }
  }

  // Run after DOM is ready
  if (document.readyState === "complete") {
    setTimeout(initReveal, 100);
  } else {
    window.addEventListener("load", function() { setTimeout(initReveal, 100); });
  }
})();
        `}</Script>
      </body>
    </html>
  );
}
