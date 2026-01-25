import { redirect } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  redirect(`/${locale}/auth/dashboard`);
}
