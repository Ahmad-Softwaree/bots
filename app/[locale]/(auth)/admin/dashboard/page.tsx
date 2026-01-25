import Page from "@/containers/Page";

import { getBots } from "@/lib/react-query/actions/bot.action";
import { BotsQueryParams } from "@/hooks/useBotsQueries";
import { SearchQueryParams } from "@/hooks/useSearchQuery";
import { PaginationQueryParams } from "@/hooks/usePaginationQueries";
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
  return (
    <Page search={true} parameters={["status"]}>
      <BotsContent data={data} />
    </Page>
  );
}
