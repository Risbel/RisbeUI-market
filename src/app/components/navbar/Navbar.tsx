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
    <div className="fixed z-50 backdrop-blur-md w-screen border-b flex justify-between md:grid md:grid-cols-12 items-center px-4 sm:px-16 lg:px-32 mx-auto py-4">
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
