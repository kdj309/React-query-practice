import Footer from "./Footer";
import Navbar from "./Navbar";
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="relative h-screen">
      <Navbar />
      {props.children}
      <Footer />
    </div>
  );
};
export default Layout;
