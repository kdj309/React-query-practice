import HeroCard from "@/Shared/Card";
import { Button } from "@/components/ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment } from "react";
type item = {
  name: string;
  id: number;
};
const fetchColors = ({ pageParam }: { pageParam: number }) => {
  console.log({
    pageParam,
  });
  return axios.get(
    `https://silver-happiness-j97r6xqp45phpwvp-4000.app.github.dev/colors?_per_page=2&_page=${pageParam}`
  );
};
export default function InfinitedQuery() {
  const {
    data,
    isError,
    isLoading,
    error,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["colors"],
    queryFn: fetchColors,
    initialPageParam: 1,
    getNextPageParam: (lastpage, allpages, _, _allPagesParam) => {
      if (allpages.length < lastpage.data.pages) {
        return allpages.length + 1;
      } else {
        return undefined;
      }
    },
  });
  if (isLoading) {
    return <h4>Loading...</h4>;
  }
  if (isSuccess) {
    console.log(data);
  }
  if (isError) {
    console.log(error);
  }

  return (
    <div>
      {data?.pages.map((group, i) => {
        return (
          <Fragment key={i}>
            {group.data.data.map((item: item) => (
              <HeroCard key={`infinite${item.id}`} title={item.name} />
            ))}
          </Fragment>
        );
      })}
      <Button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
        Show More
      </Button>
    </div>
  );
}
