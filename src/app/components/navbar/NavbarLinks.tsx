"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navbarLinks = [
  {
    id: 0,
    name: "All",
    href: "/products/all",
  },
  {
    id: 1,
    name: "Components",
    href: "/products/components",
  },
  {
    id: 2,
    name: "Templates",
    href: "/products/template",
  },
  {
    id: 3,
    name: "Ui Kits",
    href: "/products/uikit",
  },
];

const NavbarLinks = () => {
  const location = usePathname();

  return (
    <div className="col-span-6 hidden md:flex justify-center gap-6">
      {navbarLinks.map((link) => {
        return (
          <Link
            className={cn(
              "text-sm font-semibold border border-transparent px-2 rounded-md",
              location === link.href ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
            )}
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
