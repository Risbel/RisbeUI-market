import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AvatarTrigger from "./AvatarTrigger";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LogOut } from "lucide-react";
import Link from "next/link";

const UserDropDown = ({ user }: { user: KindeUser<Record<string, any>> }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none select-none">
        <AvatarTrigger />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-40">
        <DropdownMenuLabel>
          <p>{user?.given_name}</p>
          <p>{user?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={"/sell"}>Sell</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>
          <LogoutLink className="flex gap-2 w-full items-center font-semibold hover:bg-secondary p-1">
            Logout <LogOut height={15} width={15} />
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
