"use client";

import React, { useState } from "react";
import NextLink from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import {
  DashboardIcon,
  ProductsIcon,
  BlogsIcon,
  CategoriesIcon,
} from "@/components/icons";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const sidebarItems = [
    { label: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },
    { label: "Products", href: "/products", icon: <ProductsIcon /> },
    { label: "Blogs", href: "/blogs", icon: <BlogsIcon /> },
    { label: "Categories", href: "/categories", icon: <CategoriesIcon /> },
  ];

  const goTo = (path: string) => {
    router.push(path);
  };

  return (
    <div
      className={`relative text-white shadow-lg transition-width duration-300 ease-in-out  ${
        isOpen ? "w-64" : "w-18"
      }`}
    >
      <aside className={`h-screen bg-gray-900  ${isOpen ? "w-64" : "w-18"}`}>
        <div className="p-4 flex justify-between items-center">
          <span className="text-xl font-bold">{isOpen && "Sidebar"}</span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <ChevronLeftIcon className="h-5 w-5" />
            ) : (
              <ChevronRightIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.href}>
                <NextLink href={item.href} onClick={() => goTo(item.href)}>
                  <div
                    className={`flex items-center px-4 py-2 rounded transition-colors duration-200 ${
                      isActive(item.href) ? "bg-gray-700" : "hover:bg-gray-700"
                    }`}
                  >
                    <span className={`${isOpen ? "mr-3" : "mr-0"}`}>
                      {item.icon}
                    </span>
                    {isOpen && <span>{item.label}</span>}
                  </div>
                </NextLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
