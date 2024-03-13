import HeroCard from "@/Shared/Card";
import useSuperHeroQuery from "@/hooks/useSuperHeros";
import { Hero } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SuperHeros() {
  const [heros, setheros] = useState<Hero[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const {isLoading,data} = useSuperHeroQuery("super-heros", (data) => {
  //   console.log(data.data.map((item: Hero) => item.name));
  //   return data.data.map((item: Hero) => item.name);
  // });
    useEffect(() => {
      const fetchHeros = async () => {
        setLoading(true);
        const heros = await axios.get(
          "https://silver-happiness-j97r6xqp45phpwvp-4000.app.github.dev/superheroes"
        );
        setLoading(false);
        setheros(heros.data);
      };
      fetchHeros();
    }, []);
  if (loading) {
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
    <div className="container mx-auto flex justify-evenly flex-wrap mt-2">
       {heros?.map((item: Hero,index:number) => (
        <HeroCard key={index} title={item.name} id={item.id} content={item.alterEgo}/>
      ))}
    </div>
  );
}
