import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

const useSuperHeroQuery = (
  queryId: string,
  select: ((data: AxiosResponse<any, any>) => any) | undefined
) => {
  return useQuery({
    queryKey: [queryId],
    queryFn: () => {
      return axios.get(
        "https://silver-happiness-j97r6xqp45phpwvp-4000.app.github.dev/superheroes"
      );
    },
    // gcTime:5000
    // refetchOnMount:true,
    // refetchOnWindowFocus:true
    // staleTime:5000
    // refetchInterval,
    // refetchIntervalInBackground:true
    // enabled: false,
    select: select,
  });
};
export default useSuperHeroQuery;
