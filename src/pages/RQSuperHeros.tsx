import HeroCard from "@/Shared/Card";
import { Button } from "@/components/ui/button";
import { Hero } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function RQSuperHeros() {
  // const [refetchInterval, setrefetchInterval] = useState<false | number>(3000);
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    isFetched,
    isSuccess,
  } = useQuery({
    queryKey: ["super-heros"],
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
    // select(data) {
    //     console.log(data.data.map((item: Hero) => item.name))
    //   return data.data.map((item: Hero) => item.name);
    // },
  });
  console.log("isFetching", isFetching, "isLoading", isLoading);
  //   if (isSuccess) {
  //     if (data.data.length == 4) {
  //       console.log("Success", data);
  //       setrefetchInterval(false);
  //     }
  //   }

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <button type="button" disabled>
          <svg
            className="animate-spin h-5 w-5 mr-3 ..."
            viewBox="0 0 24 24"
          ></svg>
          Loading...
        </button>
      </div>
    );
  }

  if (isError) {
    //4 trials before logging the error
    // setrefetchInterval(false);
    console.log(error);
    return (
      <div className="container mx-auto">
        <h2>{error.message}</h2>
      </div>
    );
  }
  return (
    <div className="container mx-auto flex justify-evenly flex-wrap mt-2">
      {/* {!isFetched && <Button onClick={() => refetch()}>Fetch Heros</Button>} */}
      {/* {data?.data.map((item: Hero) => (
        <HeroCard key={item.id} title={item.name} content={item.alterEgo} />
      ))} */}
      {data?.data.map((item: Hero,index:number) => (
        <HeroCard link={`/rq-super-heros/${item.id}`} key={index} title={item.name}  content={item.alterEgo}/>
      ))}
    </div>
  );
}
