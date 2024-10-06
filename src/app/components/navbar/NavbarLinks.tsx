"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navbarLinks = [
  {
    id: 0,
    name: "Home",
    href: "/",
  },
  {
    id: 1,
    name: "Templates",
    href: "#",
  },
  {
    id: 2,
    name: "Ui Kits",
    href: "#",
  },
  {
    id: 3,
    name: "Icons",
    href: "#",
  },
];

const NavbarLinks = () => {
  const location = usePathname();

  return (
    <div className="col-span-6 hidden md:flex justify-center gap-8">
      {navbarLinks.map((link) => {
        return (
          <Link
            className={cn("text-sm", location === link.href ? "font-semibold" : "text-gray-400")}
            key={link.id}
            href={link.href}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};

export default NavbarLinks;
