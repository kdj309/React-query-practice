import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import axios from "axios";
import HeroCard from "@/Shared/Card";
const fetchColors = (page: number) => {
  return axios.get(
    `https://silver-happiness-j97r6xqp45phpwvp-4000.app.github.dev/colors?_per_page=2&_page=${page}`
  );
};
type item = {
  name: string;
  id: number;
};
const Colors = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { isLoading, isError, error, isFetching, data } = useQuery({
    queryKey: ["colors", currentPage],
    queryFn: () => fetchColors(currentPage),
    placeholderData: (previousData, _) => previousData,
  });
  const onPageDecrement = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);
  const onPageIncrement = useCallback(() => {
    if (currentPage < data?.data.pages) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage]);

  if (isLoading || isFetching) {
    return (
      <div className="container mx-auto flex justify-evenly flex-wrap mt-2">
        <h4>Loading...</h4>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="container mx-auto flex justify-evenly flex-wrap mt-2">
        <h4>{error.message}</h4>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex justify-evenly flex-wrap mt-2">
      <div className="my-4">
        {data?.data.data.map((item: item) => (
          <HeroCard key={`color${item.id}`} title={item.name} />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => onPageDecrement()} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{currentPage}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext  onClick={() => onPageIncrement()} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default Colors;
