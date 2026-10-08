import { notFound } from "next/navigation";
import { isLang, LANGS } from "@/lib/i18n";
import type { Lang } from "@/lib/data";
import Book from "@/components/book/Book";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return <Book lang={lang as Lang} />;
}
