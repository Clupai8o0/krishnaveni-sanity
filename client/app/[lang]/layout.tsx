import { SUPPORTED_LANGUAGES } from "@/lib/constants";

export async function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const { lang } = params;

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}