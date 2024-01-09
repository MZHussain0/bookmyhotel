import { useAppContext } from "@/contexts/AppContext";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
const Header = () => {
  const { isLoggedIn } = useAppContext();
  console.log(isLoggedIn);
  return (
    <div className="bg-theme-500 py-6">
      <div className="container mx-auto flex items-center justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>Hotels.com</Link>
        </span>
        <div className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link to={"/my-bookings"} className="text-theme-600 font-bold">
                My Bookings
              </Link>
              <Link to={"/my-hotels"} className="text-theme-600 font-bold">
                My Hotels
              </Link>
              <Button className="text-theme-600 font-bold" onClick={() => {}}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button className="text-theme-600 font-bold" onClick={() => {}}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
