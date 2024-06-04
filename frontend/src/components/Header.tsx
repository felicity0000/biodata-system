import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { Badge } from "@/components/ui/badge";
import SignOutButton from "./SignOutButton";
import MobileNav from "./MobileNav";
import { CircleUserRound } from "lucide-react";

const Header = () => {
  const { isLoggedIn, userName } = useAppContext();
  return (
    <div className="bg-slate-800 py-2">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl font-poppins text-white font-bold tracking-tight">
          <Link to="/">Bio Data</Link>
        </span>
        <span className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <Badge className="hidden md:relative flex  flex-row item-center"><CircleUserRound/>{userName}</Badge>
              <div className="hidden md:block">
                <SignOutButton />
              </div>

              <div className="md:hidden">
                <MobileNav />
              </div>
            </>
          ) : (
            <>
              <Button className="hidden md:block">
                <Link
                  to="/sign-in"
                  className="font-poppins flex items-center text-white px-3 font-bold "
                >
                  Sign In
                </Link>
              </Button>
              <div className="md:hidden">
                <MobileNav />
              </div>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
