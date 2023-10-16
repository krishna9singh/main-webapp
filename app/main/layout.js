import Header from "../Component/Header";
import Siderbar from "../Component/Siderbar";
import Tabbar from "../Component/Tabbar";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-row pn:max-sm:flex-col">
      <div className="pn:max-sm:hidden z-10  ">
        <Siderbar />
      </div>
      <div className=" z-10 top-0 w-full fixed sm:hidden ">
        <Header />
      </div>
      <div className="h-screen z-0 pn:max-md:w-full w-screen">{children}</div>
      <div className="md:hidden bg-gray-200">
        <Tabbar />
      </div>
    </div>
  );
}
