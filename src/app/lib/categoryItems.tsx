import { ComponentIcon, LayoutTemplate, PackageIcon } from "lucide-react";
import { ReactNode } from "react";

interface iAppProps {
  id: number;
  name: string;
  title: string;
  image: ReactNode;
  description: string;
}

export const categoryItems: iAppProps[] = [
  {
    id: 0,
    name: "component",
    title: "Component",
    image: <ComponentIcon />,
    description: "",
  },
  {
    id: 1,
    name: "template",
    title: "Template",
    image: <LayoutTemplate />,
    description: "",
  },
  {
    id: 2,
    name: "uikit",
    title: "Ui Kit",
    image: <PackageIcon />,
    description: "",
  },
];
