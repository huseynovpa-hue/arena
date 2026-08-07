"use client";
import { useLang } from "@/lib/i18n";

export default function PrivacyPage() {
  const { t } = useLang();
  const lastUpdated = "August 7, 2026";

  return (
    <div className="py-6 max-w-xl mx-auto">
      <h1 className="text-lg font-black mb-2">{t.privacyTitle}</h1>
      <p className="text-[11px] text-[--muted] mb-6">{t.privacyLastUpdated}: {lastUpdated}</p>

      <div className="card p-5 space-y-6 text-xs text-[--muted] leading-relaxed">
        <section>
          <h2 className="text-sm font-bold text-[--text] mb-2">{t.privacyIntroTitle}</h2>
          <p>{t.privacyIntro}</p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[--text] mb-2">{t.privacyCollectTitle}</h2>
          <p className="mb-2">{t.privacyCollectDesc}</p>
          <p className="mb-1"><span className="text-[--text] font-semibold">{t.username}:</span> {t.privacyCollectAccount}</p>
          <p className="mb-1"><span className="text-[--text] font-semibold">Usage Data:</span> {t.privacyCollectUsage}</p>
          <p className="mb-1"><span className="text-[--text] font-semibold">Device Info:</span> {t.privacyCollectDevice}</p>
          <p><span className="text-[--text] font-semibold">Cookies:</span> {t.privacyCollectCookies}</p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[--text] mb-2">{t.privacyUseTitle}</h2>
          <p className="mb-1">{t.privacyUseDesc}</p>
          <p className="mb-1">• {t.privacyUse1}</p>
          <p className="mb-1">• {t.privacyUse2}</p>
          <p className="mb-1">• {t.privacyUse3}</p>
          <p className="mb-1">• {t.privacyUse4}</p>
          <p className="mb-1">• {t.privacyUse5}</p>
          <p className="mb-1">• {t.privacyUse6}</p>
          <p>• {t.privacyUse7}</p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[--text] mb-2">{t.privacyAdsTitle}</h2>
          <p className="mb-2">{t.privacyAds1}</p>
          <p>{t.privacyAds2} <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Google Ads Settings</a>.</p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[--text] mb-2">{t.privacyShareTitle}</h2>
          <p className="mb-1">{t.privacyShareDesc}</p>
          <p className="mb-1">• {t.privacyShare1}</p>
          <p className="mb-1">• {t.privacyShare2}</p>
          <p>• {t.privacyShare3}</p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[--text] mb-2">{t.privacySecurityTitle}</h2>
          <p>{t.privacySecurity}</p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[--text] mb-2">{t.privacyRetentionTitle}</h2>
          <p>{t.privacyRetention}</p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[--text] mb-2">{t.privacyRightsTitle}</h2>
          <p className="mb-1">{t.privacyRightsDesc}</p>
          <p className="mb-1">• {t.privacyRights1}</p>
          <p className="mb-1">• {t.privacyRights2}</p>
          <p className="mb-1">• {t.privacyRights3}</p>
          <p className="mb-1">• {t.privacyRights4}</p>
          <p>• {t.privacyRights5}</p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[--text] mb-2">{t.privacyChildrenTitle}</h2>
          <p>{t.privacyChildren}</p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[--text] mb-2">{t.privacyChangesTitle}</h2>
          <p>{t.privacyChanges}</p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[--text] mb-2">{t.privacyContactTitle}</h2>
          <p>{t.privacyContact}{" "}<a href="mailto:khannhuseyn@gmail.com" className="text-green-400 hover:underline">khannhuseyn@gmail.com</a></p>
        </section>
      </div>
    </div>
  );
}
