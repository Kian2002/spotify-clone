import React from "react";
import Link from "next/link";
import { IconType } from "react-icons";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={`flex w-full text-neutral-400 font-medium p-3 items-center gap-x-4 cursor-pointer hover:text-white transition ${
        active && "text-white"
      }`}
    >
      <Icon size={26} />
      <p className="truncate w-full">{label}</p>
    </Link>
  );
};

export default SidebarItem;
