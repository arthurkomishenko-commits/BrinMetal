"use client";

import { useTranslations } from "next-intl";
import { Shield, Clock, MapPin, MessageCircle } from "lucide-react";

const ITEMS = [
  { icon: Shield, key: "years" },
  { icon: Clock, key: "projects" },
  { icon: MapPin, key: "area" },
  { icon: MessageCircle, key: "response" },
] as const;

export function TrustStrip() {
  const t = useTranslations("trustStrip");

  return (
    <div className="relative py-4 sm:py-5" style={{
      background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(42,45,53,0.6) 50%, rgba(0,0,0,0.3) 100%)",
      borderTop: "1px solid rgba(255,255,255,0.04)",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
    }}>
      <div className="container-wide">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.key} className="flex items-center gap-2.5">
                <Icon size={18} className="text-[var(--copper)] shrink-0" />
                <span className="text-base text-[var(--titanium)]">{t(item.key)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
