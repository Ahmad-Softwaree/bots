import { BotsQueryParams } from "@/hooks/useBotsQueries";
import { SearchQueryParams } from "@/hooks/useSearchQuery";
import { PaginationQueryParams } from "@/hooks/usePaginationQueries";
import { getBots } from "@/lib/react-query/actions/bot.action";
import BotsContent from "@/containers/BotsContent";
export default async function page({
  searchParams,
}: {
  searchParams: Promise<
    BotsQueryParams & SearchQueryParams & PaginationQueryParams
  >;
}) {
  let params = await searchParams;
  const data = await getBots(params, params, params);
  return <BotsContent data={data} />;
}
