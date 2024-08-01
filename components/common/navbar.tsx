'use client';
import { menuItems } from "@/lib/data/data";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { signIn, useSession, signOut } from "next-auth/react";
import { Button } from "../ui/button";


const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { data: session } = useSession();
  return (
    <div className="flex justify-between items-center w-full h-20 px-6 py-2 text-white bg-black fixed nav">
      <div>
        <Link className="link-underline link-underline-black" href="/" rel="noreferrer">
          <h1 className="text-3xl font-signature font-bold">Hyea Me Ha</h1>
          <span className="text-yellow-500">...meet me there</span>
        </Link>
      </div>

      <ul className="hidden md:flex">
        {menuItems.map(({ id, title, path, subMenu }) => (
          <li key={id} className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline">
            {subMenu ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center">
                  {title} <ChevronDown className="ml-1" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {subMenu.map(({ id, path, title }) => (
                    <DropdownMenuItem key={id}>
                      <Link href={path}>{title}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href={path}>{title}</Link>
            )}
          </li>
        ))}
      </ul>
      {/* Sign Menu */}
      <div className="hidden md:flex gap-5 items-center">
        <Link href={"tel:+233 24 111 1122"} className="flex gap-2 items-center">
          <Phone className="h-3 w-3" />
          <span>+233 24 111 1122</span>
        </Link>
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center">
              {session?.user?.name}
              <ChevronDown className="ml-1" />
              <DropdownMenuContent>
                <Button
                  className="w-full"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </DropdownMenuContent>
            </DropdownMenuTrigger>
          </DropdownMenu>
        ) : (
          <div className="gap-4 flex">
            <Button
              onClick={() => signIn()}
            >
              Log In
            </Button>
            <Button
              variant={'outline'}
              className="text-black"
              onClick={() => signIn()}>
              Sign Up
            </Button>
          </div>
        )}
      </div>

      <button
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <X /> : <Menu />}
      </button>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {menuItems.map(({ id, path, title, subMenu }) => (
            <li key={id} className="px-4 cursor-pointer capitalize py-6 text-4xl">
              {subMenu ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center">
                    {title} <ChevronDown className="ml-1" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {subMenu.map(({ id, path, title }) => (
                      <DropdownMenuItem key={id}>
                        <Link onClick={() => setNav(false)} href={path}>
                          {title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link onClick={() => setNav(false)} href={path}>{title}</Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;