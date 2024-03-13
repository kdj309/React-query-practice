import HeroCard from "@/Shared/Card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";

export default function GithubUserAndFollower() {
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["github", id],
    queryFn: () => axios.get("https://api.github.com/users/1"),
  });
  const followers_url = data?.data.followers_url;
  const { isLoading: followersLoading, data: followers } = useQuery({
    queryKey: ["github-followers", id],
    queryFn: () => axios.get(followers_url),
    enabled: !!followers_url,
  });
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

  return (
    <div>
      <HeroCard
        title={data?.data.name as string}
        content={data?.data.location as string}
        id={data?.data.id as number}
      ></HeroCard>
      {!followersLoading && (
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Followers</AccordionTrigger>
            <AccordionContent>
              {followers?.data.map((item: any) => (
                <div className="user-row flex flex-col items-center justify-between cursor-pointer  p-4 duration-300 sm:flex-row sm:py-4 sm:px-8 hover:bg-[#f6f8f9]">
                  <div className="user flex items-center text-center flex-col sm:flex-row sm:text-left">
                    <div className="avatar-content mb-2.5 sm:mb-0 sm:mr-2.5">
                      <img
                        className="avatar w-20 h-20 rounded-full"
                        src={item.avatar_url}
                      />
                    </div>
                    <div className="user-body flex flex-col mb-4 sm:mb-0 sm:mr-4">
                      <a href="#" className="title font-medium no-underline">
                        {item.login}
                      </a>
                    </div>
                  </div>
                  <div className="user-option mx-auto sm:ml-auto sm:mr-0">
                    <a
                      href={item.url}
                      target="_blank"
                      className="btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0 bg-[#6911e7] hover:bg-[#590acb] duration-300"
                      type="button"
                    >
                      Follow
                    </a>
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
