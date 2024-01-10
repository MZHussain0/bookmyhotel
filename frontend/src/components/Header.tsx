﻿import { useAppContext } from "@/contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import SignoutButton from "./SignoutButton";
import { Button } from "./ui/button";
const Header = () => {
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();

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
              <SignoutButton />
            </>
          ) : (
            <Button
              className="text-theme-600 font-bold"
              onClick={() => navigate("/login")}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
