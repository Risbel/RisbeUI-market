import { Flame, GlobeIcon, PartyPopper } from "lucide-react";
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
    name: "template",
    title: "Template",
    image: <GlobeIcon />,
    description: "",
  },
  {
    id: 1,
    name: "uikit",
    title: "Ui Kit",
    image: <Flame />,
    description: "",
  },
  {
    id: 2,
    name: "icon",
    title: "Icon",
    image: <PartyPopper />,
    description: "",
  },
];
