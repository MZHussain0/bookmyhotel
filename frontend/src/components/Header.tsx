import { useAppContext } from "@/contexts/AppContext";
import { Link } from "react-router-dom";
import SignoutButton from "./SignoutButton";
const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-theme-500 py-6">
      <div className="container mx-auto flex items-center justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>Hotels.com</Link>
        </span>
        <div className="flex space-x-2">
          {isLoggedIn ? (
            <div className="flex items-center justify-center gap-x-4">
              <Link
                to={"/my-bookings"}
                className="text-theme-600 font-semibold bg-theme-200 px-2 py-2 rounded-lg hover:bg-theme-300 duration-300">
                My Bookings
              </Link>
              <Link
                to={"/my-hotels"}
                className="text-theme-600 font-semibold bg-theme-200 px-2 py-2 rounded-lg hover:bg-theme-300 duration-300">
                My Hotels
              </Link>
              <SignoutButton />
            </div>
          ) : (
            <Link
              to={"/login"}
              className="text-theme-200 bg-theme-900 hover:bg-theme-800 font-bold px-4 py-2 rounded-lg duration-300">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
