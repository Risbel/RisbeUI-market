"use client";

import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { navbarLinks } from "./NavbarLinks";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const MobileMenu = () => {
  const location = usePathname();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu height={20} width={20} />
      </SheetTrigger>

      <SheetContent>
        <SheetTitle hidden>Navigation</SheetTitle>
        <SheetDescription hidden>Navigation on mobile view</SheetDescription>
        <div className="flex flex-col gap-2 mt-4">
          {navbarLinks.map((link) => {
            return (
              <Link
                className={cn("pl-4", location === link.href ? "bg-secondary font-semibold text-primary" : "")}
                key={link.id}
                href={link.href}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
