import { CircleUserRound, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { Badge } from "./ui/badge";
import SignOutButton from "./SignOutButton";
const MobileNav = () => {
  const { isLoggedIn, userName } = useAppContext();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent>
        <span className="flex flex-col py-4">
          {isLoggedIn ? (
            <>
              <Badge className="font-poppins p-2 flex justify-center"><CircleUserRound/>{userName}</Badge>
              <SignOutButton />
              <div className="md:hidden p-4">
                <MobileNav />
              </div>
            </>
            
          ) : (
            <>
              <Button className="">
                <Link
                  to="/sign-in"
                  className="font-poppins flex items-center text-white px-3 font-bold"
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
