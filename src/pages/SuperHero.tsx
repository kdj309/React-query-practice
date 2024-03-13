import useSuperHeroData from '@/hooks/useSuperHeroData';
import { useParams } from 'react-router'

export default function SuperHero() {
    const {id}=useParams();
    const {isLoading,isError,error,data}=useSuperHeroData(id??"1")
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
    <div className="container mx-auto">{data?.data.name}-{data?.data.alterEgo}</div>
  )
}
