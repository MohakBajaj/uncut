import { Calendar, GraduationCap, Medal } from "lucide-react";
import Link from "next/link";
import { Icons } from "../Icons";

export default function AppSidebar() {
  const tags = [
    {
      href: "#",
      icon: <Icons.logo className="stroke-primary fill-none w-8 h-6" />,
      label: "General",
    },
    {
      href: "#academics",
      icon: <GraduationCap className="stroke-primary fill-none" />,
      label: "Academics",
    },
    {
      href: "#sports",
      icon: <Medal className="stroke-primary fill-none" />,
      label: "Sports",
    },
    {
      href: "#events",
      icon: <Calendar className="stroke-primary fill-none" />,
      label: "Events",
    },
  ];
  return (
    <div className="border-r p-4">
      <div className="flex flex-col gap-2 pr-1">
        <div className="text-xl font-bold text-primary/70 mb-4">
          Filter by Tags
        </div>
        {tags.map((item) => (
          <Link
            key={item.href}
            className="w-1/2 text-center p-4 rounded-lg hover:bg-accent transform active:scale-75 transition-transform flex gap-2"
            href={item.href}
          >
            {item.icon} {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
