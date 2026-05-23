"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function MobileCTA() {
  const t = useTranslations("contact");
  const isDesktop = useMediaQuery("lg");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 500);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isDesktop) return null;

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-40 transition-transform duration-500 ${visible ? "translate-y-0" : "translate-y-full"}`}
      style={{
        background: "linear-gradient(180deg, rgba(17,17,19,0.95) 0%, rgba(17,17,19,0.99) 100%)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        {/* WhatsApp -- primary */}
        <a
          href={siteConfig.social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#25D366] text-white text-base font-semibold active:bg-[#20BD5A] min-h-[48px]"
        >
          <MessageCircle size={20} />
          WhatsApp
        </a>

        {/* Call */}
        <a
          href={`tel:${siteConfig.contact.phone}`}
          className="flex items-center justify-center gap-2 py-3.5 px-5 border border-[var(--copper)] text-[var(--copper)] text-base font-semibold active:bg-[var(--copper)]/10 min-h-[48px]"
        >
          <Phone size={18} />
          {t("phone")}
        </a>
      </div>
    </div>
  );
}
