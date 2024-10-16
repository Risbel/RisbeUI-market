import Link from "next/link";
import NavbarLinks from "./NavbarLinks";
import { buttonVariants } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserDropDown from "./user-menu";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="relative max-w-7xl w-full flex justify-between md:grid md:grid-cols-12 items-center px-4 mx-auto py-4 md:py-7">
      <div className="md:col-span-3">
        <Link href="/">
          <h1 className="text-2xl font-bold">
            Risbe<span className="text-primary">UI</span>
          </h1>
        </Link>
      </div>
      <NavbarLinks />
      <div className="col-span-3 flex justify-end items-center gap-4">
        {user ? (
          <UserDropDown user={user} />
        ) : (
          <>
            <LoginLink className={buttonVariants({ variant: "default" })}>Signin</LoginLink>
            <RegisterLink className={buttonVariants({ variant: "outline" })}>Signup</RegisterLink>
          </>
        )}

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
