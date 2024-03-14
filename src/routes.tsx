import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Shared/Layout";
import SuperHeros from "./pages/SuperHeros";
import RQSuperHeros from "./pages/RQSuperHeros";
import SuperHero from "./pages/SuperHero";
import GithubUsers from "./pages/GithubUsers";
import GithubUserAndFollower from "./pages/GithubUserAndFollower";
import Colors from "./pages/PaginatedQuery";
import InfinitedQuery from "./pages/InfinitedQuery";
import { ProfileForm } from "./pages/HeroForm";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    children: [
      {
        path: "/super-heros",
        element: <SuperHeros />,
      },
      {
        path: "/rq-super-heros",
        element: <RQSuperHeros />,
      },
      {
        path: "/rq-super-heros/:id",
        element: <SuperHero />,
      },
      {
        path: "/GithubUsers",
        element: <GithubUsers ids={[1, 4, 5]}></GithubUsers>,
      },
      {
        path: "/GithubProfile/:id",
        element: <GithubUserAndFollower></GithubUserAndFollower>,
      },
      {
        path:"/PaginatedColors",
        element:<Colors/>
      },
      {
        path:"/InfiniteColors",
        element:<InfinitedQuery/>
      },
      {
        path:"/heroform",
        element:<><ProfileForm/><RQSuperHeros/></>
      },
    ],
  },
]);
export default routes;
