import BotContent from "@/containers/BotContent";
import { getBot } from "@/lib/react-query/actions/bot.action";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await getBot(id);
  if ((data as any).__isError) throw new Error("Failed to fetch bot data");
  if (!data) return notFound();
  return <BotContent data={data} />;
};

export default page;
