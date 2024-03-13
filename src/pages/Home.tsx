import { Outlet } from "react-router";

const Home = () => {
 
  return (
    <>
      <h2>Welcome To Heros Community</h2>
      <Outlet></Outlet>
    </>
  );
};
export default Home;
