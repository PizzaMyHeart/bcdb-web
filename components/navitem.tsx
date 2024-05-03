"use client"

import Link from "next/link";
import {
    NavigationMenuItem,
  } from "@/components/ui/navigation-menu"

export default function NavItem({ href, innerText }){
    return (
        <NavigationMenuItem className="p-4 hover:bg-black hover:text-white active:bg-black active:text-white">
            <Link href={href}>
                {innerText}
            </Link>
            </NavigationMenuItem>
    )
}