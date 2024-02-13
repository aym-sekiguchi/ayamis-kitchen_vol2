import { Header } from "@/components"
import { Footer } from "@/components"
import "@/styles/globals.css"
import type { Metadata } from "next"
import { GoogleAnalytics } from "@next/third-parties/google"

// Metadata
export const metadata: Metadata = {
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  keywords: process.env.NEXT_PUBLIC_SITE_KEYWORDS,
  themeColor: process.env.NEXT_PUBLIC_THEME_COLOR,
  title: {
    default: process.env.NEXT_PUBLIC_SITE_TITLE ?? "",
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_TITLE}`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <meta
          content={process.env.NEXT_PUBLIC_SITE_TITLE}
          property="og:title"
        />
        <meta
          content={metadata.description as string}
          property="og:description"
        />
      </head>
      <body
        className="bg-repeat-y bg-left-top text-[#441800]"
        style={{ backgroundImage: "url(/images/background.webp)" }}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ""} />
    </html>
  )
}
