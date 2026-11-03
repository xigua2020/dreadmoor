"use client";

import Script from "next/script";
import { site } from "../config/site";

/** GA4 loader — inactive until NEXT_PUBLIC_GA_ID is configured. */
export default function GoogleAnalytics() {
  if (!site.gaId) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.gaId}');`}
      </Script>
    </>
  );
}
