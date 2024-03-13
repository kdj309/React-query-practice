import { queryClient } from "@/App";
import {  useQuery ,useQueryClient} from "@tanstack/react-query";
import axios from "axios";

export default function useSuperHeroData(id:string) {
    return useQuery({
        queryKey:['super-hero',id],
        queryFn:({queryKey})=>{
            return axios.get(`https://silver-happiness-j97r6xqp45phpwvp-4000.app.github.dev/superheroes/${queryKey[1]}`)
        },
        initialData:()=>{
            console.log("cached data",queryClient.getQueryData(["super-heros"]))
            const hero=queryClient.getQueryData(["super-heros"])?.data?.find((hero)=>hero.id===id);
            console.log("cachedid",hero)
            if (hero) {
                return {
                    data:hero
                }
            }else{
                return undefined;
            }
        }
    })
}