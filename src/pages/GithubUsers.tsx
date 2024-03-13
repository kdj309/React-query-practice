import HeroCard from "@/Shared/Card";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";
interface props {
  ids: number[];
}
const fetchGithubUser = (id: number) => {
  return axios.get(`https://api.github.com/users/${id}`);
};
export default function GithubUsers({ ids }: props) {
  const queryResults = useQueries({
    queries: ids.map((id) => {
      return {
        queryKey: ["post", id],
        queryFn: () => fetchGithubUser(id),
      };
    }),
  });
  console.log(queryResults.map((r) => r.data?.data));
  return (
    <div>
      {queryResults.map((r) => (
        <HeroCard
          title={r.data?.data.name}
          content={r.data?.data.type}
          id={r.data?.data.id}
          link={`GithubProfile/${r.data?.data.id}`}
        />
      ))}
    </div>
  );
}
