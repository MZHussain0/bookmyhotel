import { Link } from "react-router-dom";
import { Button } from "./ui/button";
const Header = () => {
  return (
    <div className="bg-theme-500 py-6">
      <div className="container mx-auto flex items-center justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>Hotels.com</Link>
        </span>
        <Button className="text-theme-600 font-bold">Sign In</Button>
      </div>
    </div>
  );
};

export default Header;
