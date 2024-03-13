import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Shared/Layout";
import SuperHeros from "./pages/SuperHeros";
import RQSuperHeros from "./pages/RQSuperHeros";
import SuperHero from "./pages/SuperHero";
import GithubUsers from "./pages/GithubUsers";
import GithubUserAndFollower from "./pages/GithubUserAndFollower";

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
    ],
  },
]);
export default routes;
